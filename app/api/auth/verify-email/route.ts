import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compareToken } from "@/lib/email-verify";

export const runtime = "nodejs";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const paramsemail = searchParams.get("email");
  const paramsToken = searchParams.get("token");

  const fail = () =>
    NextResponse.redirect(new URL("/login?verifyError=1", req.url), {
      status: 303,
    });

  if (!paramsemail || !paramsToken) return fail();

  try {
    const verification = await prisma.verificationToken.findFirst({
      where: { identifier: paramsemail },
    });

    if (!verification) return fail();
    if (verification.expires < new Date()) return fail();

    const resOk = await compareToken(paramsToken, verification.token);

    if (!resOk) return fail();

    await prisma.user.update({
      where: { email: paramsemail },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: verification.identifier,
          token: verification.token,
        },
      },
    });

    return NextResponse.redirect(new URL("/login?verified=1", req.url), {
      status: 303,
    });
  } catch (error) {
    console.error(error);
    return fail();
  }
};
