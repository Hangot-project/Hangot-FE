export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/my-page", "/dataset/request", "/dataset/create", "/qna/create"],
};
