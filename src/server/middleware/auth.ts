import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthUtils } from "../utils/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const decoded = await AuthUtils.verifyToken(token);
    if (!decoded.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/api/admin/:path*", // Protect admin API routes
    "/api/protected/:path*", // Protect other sensitive API routes
  ],
};
