"use client";

import { createContext, useContext, useRef, RefObject } from "react";

type GlobalContextType = {
  inputRef: RefObject<HTMLInputElement> | null;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(inputRef.current);
  return (
    <GlobalContext.Provider value={{ inputRef }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context.inputRef;
};
