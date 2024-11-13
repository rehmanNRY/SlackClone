"use client"
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div className="bg-[#5c3b58] h-full w-full">
      Logged in
      <Button onClick={()=> signOut()}>Sign Out</Button>
    </div>
  );
}