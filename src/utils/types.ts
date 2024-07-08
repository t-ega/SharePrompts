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
  username: string;
  picture: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string;
}

export interface IPost {
  prompt: string;
  tag: string;
  creator: IUser;
  username: string;
}
