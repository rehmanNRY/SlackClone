"use client"

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router])

  return (
    <div className="flex h-full items-center justify-center">
      <Loader className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
}