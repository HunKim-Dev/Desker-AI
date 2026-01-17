import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { ERROR_MESSAGE, SALT_ROUNDS } from "@/config/constants";
import { signUpSchema } from "@/lib/validators/auth";
import bcrypt from "bcryptjs";

const updatePhoneNumberSchema = signUpSchema.pick({ phoneNumber: true });
const updatePasswordSchema = signUpSchema.pick({ password: true });

export const GET = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      {
        error: {
          code: "NOT_FOUND_USERID",
          message: ERROR_MESSAGE.NOT_FOUND_USERID,
        },
      },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: {
            code: "USER_NOT_FOUND",
            message: ERROR_MESSAGE.USER_NOT_FOUND,
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: ERROR_MESSAGE.USER_NOT_FOUND,
        },
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      {
        error: {
          code: "NOT_FOUND_USERID",
          message: ERROR_MESSAGE.NOT_FOUND_USERID,
        },
      },
      { status: 400 }
    );
  }

  try {
    const requestData = await req.json();

    // 비밀번호 변경 요청인 경우
    if (requestData.currentPassword && requestData.newPassword) {
      const validatedPassword = updatePasswordSchema.safeParse({
        password: requestData.newPassword,
      });

      if (!validatedPassword.success) {
        return NextResponse.json(
          {
            error: {
              code: "INVALID_INPUT",
              message: validatedPassword.error.errors[0].message,
            },
          },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { passwordHash: true },
      });

      if (!user) {
        return NextResponse.json(
          {
            error: {
              code: "USER_NOT_FOUND",
              message: ERROR_MESSAGE.USER_NOT_FOUND,
            },
          },
          { status: 404 }
        );
      }

      const isPasswordValid = await bcrypt.compare(
        requestData.currentPassword,
        user.passwordHash
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          {
            error: {
              code: "CURRENT_PASSWORD_MISMATCH",
              message: ERROR_MESSAGE.CURRENT_PASSWORD_MISMATCH,
            },
          },
          { status: 400 }
        );
      }

      const newPasswordHash = await bcrypt.hash(
        requestData.newPassword,
        SALT_ROUNDS
      );

      await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newPasswordHash },
      });

      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 전화번호 변경 요청인 경우
    if (requestData.phoneNumber !== undefined) {
      const validatedData = updatePhoneNumberSchema.safeParse(requestData);

      if (!validatedData.success) {
        return NextResponse.json(
          {
            error: {
              code: "INVALID_INPUT",
              message: validatedData.error.errors[0].message,
            },
          },
          { status: 400 }
        );
      }

      const { phoneNumber } = validatedData.data;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { phoneNumber },
        select: {
          id: true,
          email: true,
          phoneNumber: true,
          emailVerified: true,
          createdAt: true,
        },
      });

      return NextResponse.json(updatedUser, { status: 200 });
    }

    return NextResponse.json(
      {
        error: {
          code: "INVALID_REQUEST",
          message: ERROR_MESSAGE.INVALID_REQUEST,
        },
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR_UPDATE",
          message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR_USER_UPDATE,
        },
      },
      { status: 500 }
    );
  }
};
