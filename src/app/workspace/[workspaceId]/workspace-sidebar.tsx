import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal, Sidebar } from 'lucide-react';
import React from 'react'
import WorkspaceHeader from './workspace-header';
import { SidebarItem } from './sidebar-item';
import { useGetChannels } from '@/features/channels/api/use-get-channels';
import { WorkspaceSection } from './workspace-section';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { UserItem } from './user-item';
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal';

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

  const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId });

  const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId })



  if (memberLoading || workspaceLoading) {
    return (
      <div className='flex flex-col bg-[#5e2c5f] h-full items-center justify-center'>
        <Loader className='size-5 animate-spin text-white' />
      </div>
    )
  }

  if (!member || !workspace) {
    return (
      <div className='flex flex-col bg-[#5e2c5f] h-full items-center justify-center'>
        <AlertTriangle className='size-5 text-white' />
        <p className='text-white text-sm'>
          Workspace not found
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col bg-[#5e2c5f] h-full'>
      <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
      <div className="flex flex-col">
        <SidebarItem
          label='Threads'
          icon={MessageSquareText}
          id="threads"
        />
        <SidebarItem
          label='Drafts & Sent'
          icon={SendHorizonal}
          id="drafts"
        />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={ member.role === "admin" ? () => setOpen(true) : undefined }
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct message"
        onNew={() => { }}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
          />
        ))}
      </WorkspaceSection>
    </div>
  )
}

export default WorkspaceSidebar