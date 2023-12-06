import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  export interface Session {
    token: string;
    user: {
      email: string;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"]
  }
  export interface User {
    token: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}
