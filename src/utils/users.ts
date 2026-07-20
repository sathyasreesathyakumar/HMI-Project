import type { LoginCredentials, User } from "../types/auth";

interface DummyUser extends LoginCredentials {
  role: User["role"];
}

export const dummyUsers: DummyUser[] = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    username: "manager",
    password: "manager123",
    role: "manager",
  },
  {
    username: "operator",
    password: "operator123",
    role: "operator",
  },
];