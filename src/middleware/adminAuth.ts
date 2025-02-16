import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, AuthUtils } from "../server/utils/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const decoded = await verifyToken(token);
    if (!decoded.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
