"use client";
import React from "react";

const SearchInput = ({ query }: { query?: string }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        console.log("pressed");
        e.preventDefault();
        inputRef?.current?.focus();
      } else if (e.key === "Escape") {
        inputRef?.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [inputRef]);

  return (
    <input
      ref={inputRef}
      type="text"
      name="query"
      defaultValue={query}
      className="search-input custom-input"
      placeholder="Search Startups"
    />
  );
};

export default SearchInput;
