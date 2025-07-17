import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();

    cookieStore.delete("accessToken");

    return NextResponse.json({
      success: true,
      message: "로그아웃 성공",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "로그아웃 실패",
      },
      { status: 500 },
    );
  }
}
