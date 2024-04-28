import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") {
    const { cookies } = request;
    if (cookies.has("refreshToken")) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
    return NextResponse.next();
  }
  // return NextResponse.redirect(new URL("/", request.nextUrl.origin));
}

export const config = {
  matcher: ["/login"],
};
