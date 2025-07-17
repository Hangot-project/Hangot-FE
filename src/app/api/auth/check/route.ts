import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRole } from "../../../../utils/jwt/get-role";
import { getUserId } from "../../../../utils/jwt/parse-jwt";

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({
        isAuthenticated: false,
        userId: null,
        role: null,
        accessToken: null,
      });
    }

    const role = getRole(accessToken);
    const userId = getUserId(accessToken);

    return NextResponse.json({
      isAuthenticated: true,
      userId,
      role,
      accessToken,
    });
  } catch (error) {
    return NextResponse.json({
      isAuthenticated: false,
      userId: null,
      role: null,
      accessToken: null,
    });
  }
}
