import { UserRole } from "./user";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      grantType: string;
      accessToken: string;
      role: UserRole;
    };
  }
}
