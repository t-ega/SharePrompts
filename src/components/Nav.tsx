import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          width={30}
          height={30}
          className="object-contain"
          src={
            "https://img.icons8.com/?size=100&id=cWqZWF6g9uRy&format=png&color=000000"
          }
          alt="logo"
        />
      </Link>
    </nav>
  );
};

export default Nav;
