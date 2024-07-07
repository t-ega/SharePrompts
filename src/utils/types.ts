import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}

export interface GoogleProfileType {
  name: string;
  email: string;
  image: string;
}

export interface IPost {
  post: string;
  tag: string;
  username: string;
}
