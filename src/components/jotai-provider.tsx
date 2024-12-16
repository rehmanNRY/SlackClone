"use client"

import { Provider } from "jotai"

interface JotaiProviderProps {
  children: React.ReactNode;
}

export default function JotaiProvider({ children }: JotaiProviderProps) {
  return <Provider>{children}</Provider>
}