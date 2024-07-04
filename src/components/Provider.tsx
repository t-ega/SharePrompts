"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
interface ProviderProps {
  session?: Session;
  children: ReactNode;
}

const Provider = (props: ProviderProps) => {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
};

export default Provider;
