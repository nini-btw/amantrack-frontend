import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "ADMIN" | "MANAGER" | "INSPECTOR" | "VIEWER";
      avatar?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "MANAGER" | "INSPECTOR" | "VIEWER";
    avatar?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "MANAGER" | "INSPECTOR" | "VIEWER";
    accessToken?: string;
  }
}
