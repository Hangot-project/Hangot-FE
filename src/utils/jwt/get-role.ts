import { UserRole } from "../../shared/types/user";
import { parseJwt } from "./parse-jwt";

export function getRole(token: string): UserRole {
  return parseJwt(token).auth;
}
