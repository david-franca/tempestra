// app/providers.tsx
"use client";

import { PropsWithChildren } from "react";

import { SelectedItemProvider } from "@/context/SelectedItemContext";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <ChakraProvider>
      <SelectedItemProvider>{children}</SelectedItemProvider>
    </ChakraProvider>
  );
}
