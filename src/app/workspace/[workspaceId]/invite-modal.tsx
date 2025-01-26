import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { DialogClose } from "@radix-ui/react-dialog";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

export const InviteModal = ({open, setOpen, name, joinCode}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confrim] = useConfirm(
    "Are you sure?",
    "This will deactivate the current invite code and generate new invite code"
  );


  const {mutate, isPending} = useNewJoinCode();

  const handleNewCode = async () => {
    const ok = await confrim();

    if(!ok) return;

    mutate({workspaceId}, {
      onSuccess: () => {
        toast.success("Invite code regenerated");
      },
      onError: () => {
        toast.error("Failed to regenerate invite code")
      }
    })
  }

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard
    .writeText(inviteLink)
    .then(() => toast.success("Invite link copied to clipboard"));
  }
  // const [first, setfirst] = useState(second)
  return (
    <>
    <ConfirmDialog />
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {name}</DialogTitle>
          <DialogDescription>
            Use the code below to invite people to your workspace
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 items-center justify-center py-10">
          <p className="text-4xl font-bold tracking-widest uppercase" >{joinCode}</p>
          <Button
            onClick={handleCopy}
            variant={"ghost"}
            size={"sm"}
          >
            Copy link
            <CopyIcon className="size-4 ml-2" />
          </Button>
        </div>
        <div className="flex items-center justify-between w-full" >
          <Button
            disabled={isPending}
            onClick={handleNewCode}
            variant={"outline"}
          >
            New code
            <RefreshCcw className="size-4 ml-2" />
          </Button>
          <DialogClose asChild >
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}