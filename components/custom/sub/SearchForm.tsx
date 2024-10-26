import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchFormReset from "./SearchFormReset";
import SearchInput from "./SearchInput";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action={"/"} scroll={false} className="search-form">
      <SearchInput query={query} />

      <div className="flex gap-2">
        {query ? (
          <SearchFormReset query={query} />
        ) : (
          <>
            <span className="items-center flex justify-center text-3xl">
              ⌘K
            </span>
          </>
        )}
        <Button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </Button>
      </div>
      <div className="hidden">
        <kbd />
        <kbd />
      </div>
    </Form>
  );
};

export default SearchForm;
