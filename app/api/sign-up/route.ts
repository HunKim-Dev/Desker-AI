import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validators/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  SIGNUP_STATUS,
  MILLISECONDS_PER_DAY,
  EMAIL_SEND_ROUTE,
  SALT_ROUNDS,
} from "@/config/constants";
import { createRawToken, hashToken } from "@/lib/email-verify";
import { Resend } from "resend";
import EmailVerifyTemplate from "@/components/email/email-verify-template";

export const runtime = "nodejs";

export const POST = async (req: NextRequest) => {
  try {
    const requestInputData = await req.json();
    const validatedSignUp = signUpSchema.safeParse(requestInputData);

    if (!validatedSignUp.success) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_INPUT",
            message: SIGNUP_STATUS.ERROR.INVALID_INPUT,
          },
        },
        { status: 400 }
      );
    }

    const { email, password, phoneNumber } = validatedSignUp.data;
    const exist = await prisma.user.findUnique({ where: { email } });

    if (exist) {
      return NextResponse.json(
        {
          error: {
            code: "EMAIL_ALREADY_EXISTS",
            message: SIGNUP_STATUS.ERROR.EMAIL_ALREADY_EXISTS,
          },
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await prisma.user.create({
      data: { email, passwordHash, phoneNumber },
      select: { id: true, email: true, createdAt: true },
    });

    const rawToken = createRawToken();
    const hashed = await hashToken(rawToken);

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashed,
        expires: new Date(Date.now() + MILLISECONDS_PER_DAY),
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const verifyUrl = `${process.env.NEXT_PUBLIC_DESEKER_SERVER_URL}/api/auth/verify-email?email=${encodeURIComponent(
      email
    )}&token=${encodeURIComponent(rawToken)}`;

    const { data, error } = await resend.emails.send({
      from: EMAIL_SEND_ROUTE.FROM,
      to: [EMAIL_SEND_ROUTE.TEST_TO], // 도메인 구매 전 개발단계에서만 이 이메일로 적용
      subject: EMAIL_SEND_ROUTE.SUBJECT,
      react: EmailVerifyTemplate({ verifyUrl: verifyUrl }),
    });

    if (error) {
      return NextResponse.json(
        {
          error: {
            code: "EMAIL_SEND_FAILED",
            message: SIGNUP_STATUS.ERROR.NOT_SEND_EMAIL,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        redirectTo: `/login?email=${encodeURIComponent(email)}&sentVerification=1`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: { code: "SIGNUP_SERVER_ERROR" } },
      { status: 500 }
    );
  }
};
