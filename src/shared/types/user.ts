import { ROLE } from "../../constants/role";

export type UserRole = (typeof ROLE)[keyof typeof ROLE];
