export type UserRole = "admin" | "manager" | "operator";

export interface User {
  username: string;
  role: UserRole;
}

export interface LoginCredentials {
  username: string;
  password: string;
}