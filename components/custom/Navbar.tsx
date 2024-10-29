import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Navbar = async () => {
  const session = await auth();
  console.log(session);
  return (
    <header className="px-5 py-3 shadow-sm font-work-sans text-white">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} height={30} width={144} alt="logo" />
        </Link>
        <div className="flex justify-between items-center gap-3">
          {session && session.user ? (
            <>
              <Link href={"/create"}>
                <span className="max-sm:hidden text-black">Create</span>
                <BadgePlus className="size-6 sm:hidden text-blue-500" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </Button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={session.user?.image} />
                  <AvatarFallback className="text-alpha font-balck uppercase">
                    {session.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <Button type="submit">
                  <GitHubLogoIcon />
                  <span>Login</span>
                </Button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
