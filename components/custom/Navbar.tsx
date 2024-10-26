import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  console.log(session);
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} height={30} width={144} alt="logo" />
        </Link>
        <div className="flex justify-between items-center gap-3">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"}>
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button type="submit">
                  <span>Logout</span>
                </Button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <Image
                  className="rounded-full"
                  src={session?.user?.image || "/user.png"}
                  width={35}
                  height={35}
                  alt="user-image"
                />
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
