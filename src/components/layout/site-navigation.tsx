import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../ui/theme-toggle";

export default function SiteNav() {
  return (
    <nav className="container flex items-center justify-between border-b py-2">
      <div>
        <Link href={"/"}>
          <Image
            className="hidden dark:block"
            src={"/logo-white.png"}
            alt="logo"
            width={200}
            height={200}
          />
          <Image
            className="dark:hidden"
            src={"/logo-black.png"}
            alt="logo"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
