import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const isProtected = pathname.startsWith("/dashboard");
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/dashboard/:path*", "/api/private/:path*"],
};
