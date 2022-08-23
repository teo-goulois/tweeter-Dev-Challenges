import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { AddIcon, MinusIcon } from "../../icons/Icons";
import { Conversation, User } from "../../types/typing";
import { key } from "../../utils/chat/useChannels";
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  channel: Conversation;
  query: string;
  handleChannel: (channelId: string | undefined) => void

};

const ChannelCard = ({ channel, query,  handleChannel }: Props) => {
  const router = useRouter();
  const { user } = useConnectedUser();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    remove: boolean
  ) => {
    e.stopPropagation();
    if (!user) return toast.error("you should be connected to do this");
    if (remove) {
      mutate(key(user._id, query), async (channels: Conversation[]) => {
        const response = await fetch(
          `/api/conversation/removeUser?conversationID=${channel._id}&userID=${user._id}`
        );
        const data = await response.json();
        if (response.status === 200) {
          toast(data.message);
          let newChannel = channels.find((item) => item._id === channel._id);
          if (!newChannel) return toast.error("channel not found");
          newChannel.members =
            // @ts-ignore
            newChannel.members.filter((item: User) => item._id !== user);
          return channels;
        } else {
          toast.error(data.message);
        }
      });
    } else {
      // add members
      mutate(key(user._id, query), async (channels: Conversation[]) => {
        const response = await fetch(
          `/api/conversation/addUser?conversationID=${channel._id}&userID=${user._id}`
        );
        const data = await response.json();
        if (response.status === 200) {
          toast(data.message);
          let newChannel = channels.find((item) => item._id === channel._id);
          if (!newChannel) return toast.error("channel not found");
          // @ts-ignore
          newChannel.members = [...newChannel.members, user];
          return channels;
        } else {
          toast.error(data.message);
        }
      });
    }
  };

  const isActive = () => {
    return channel.members.some((e) => {
      // @ts-ignore
      return e._id === user._id;
    });
  };

  return (
    <div
      onClick={() => {
        isActive() && router.push(`/chats/${channel._id}`);
        handleChannel(channel._id);
      }}
      className="flex items-center p-2 hover:bg-[#e3e3e3] rounded-lg cursor-pointer transition-colors mb-2"
    >
      <div className="uppercase text-xl font-bold rounded-lg bg-gray2 border border-[#C4C4C4] flex items-center justify-center w-[50px] h-[50px]  ">
        {channel.name[0]}
      </div>
      <p className="uppercase text-primary font-semibold text-xl ml-3">
        {channel.name}{" "}
      </p>

      <button
        onClick={(e) => {
          const remove = isActive();
          handleClick(e, remove);
        }}
        type="button"
        className={`ml-auto rounded-lg p-2 border-[3px] ${
          !isActive() ? "bg-blue text-white" : "text-blue"
        } border-blue transition-all duration-200`}
      >
        <div className="h-6">{isActive() ? <MinusIcon /> : <AddIcon />}</div>
      </button>
    </div>
  );
};

export default ChannelCard;
