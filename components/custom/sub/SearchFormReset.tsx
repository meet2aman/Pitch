"use client";
import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchFormReset = () => {
  const Reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <div>
      <Button type="reset" className="search-btn text-white" onClick={Reset}>
        <Link href={"/"}>
          <X className="size-5" />
        </Link>
      </Button>
    </div>
  );
};

export default SearchFormReset;
