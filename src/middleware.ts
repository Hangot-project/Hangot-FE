import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRole } from "./utils/jwt/get-role";
import { getUserId } from "./utils/jwt/parse-jwt";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken) {
    try {
      const role = getRole(accessToken);
      const userId = getUserId(accessToken);

      // 세션 정보를 헤더에 추가
      response.headers.set("x-user-id", userId);
      response.headers.set("x-user-role", role);
      response.headers.set("x-access-token", accessToken);
      response.headers.set("x-authenticated", "true");
    } catch (error) {
      response.headers.set("x-authenticated", "false");
    }
  } else {
    response.headers.set("x-authenticated", "false");
  }

  // 보호된 라우트 확인
  const protectedRoutes = ["/my-page"];
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
