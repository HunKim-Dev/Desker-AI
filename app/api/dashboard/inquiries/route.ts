import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { ERROR_MESSAGE } from "@/config/constants";

export const GET = async (req: NextRequest) => {
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

  const chatbot = await prisma.chatbot.findFirst({
    where: { userId },
    select: { id: true },
  });

  if (!chatbot) {
    return NextResponse.json(
      {
        error: {
          code: "CHATBOT_NOT_FOUND",
          message: ERROR_MESSAGE.CHATBOT_NOT_FOUND,
        },
      },
      { status: 404 }
    );
  }

  try {
    const inquiries = await prisma.inquiry.findMany({
      where: { botId: chatbot.id },
      select: {
        id: true,
        name: true,
        companyName: true,
        phoneNumber: true,
        email: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(inquiries, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: "INQUIRIES_LIST_FETCH_FAILURE",
          message: ERROR_MESSAGE.INQUIRIES_LIST_FETCH_FAILURE,
        },
      },
      { status: 500 }
    );
  }
};
