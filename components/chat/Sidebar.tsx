import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { mutate } from "swr";
// Icons
import {
  AddIcon,
  ArrowForwardIcon,
  CloseIcon,
  SearchIcon,
} from "../../icons/Icons";
import { Chat, Conversation, User } from "../../types/typing";
// data relative
import useChannels from "../../utils/chat/useChannels";
import useConnectedUser from "../../utils/users/useConnectedUser";
import { key } from "../../utils/chat/useChannels";

// Components
import ChannelCard from "./ChannelCard";
import NewChannel from "./NewChannel";
import toast from "react-hot-toast";

type Props = {
  setSidebarIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ setSidebarIsOpen }: Props) => {
  const router = useRouter();
  const { user } = useConnectedUser();

  const [newChannelIsOpen, setNewChannelIsOpen] = useState<boolean>(false);

  const [input, setInput] = useState<string>("");
  const [channel, setChannel] = useState<Conversation | null>(null);

  // fetch user channels
  // can use debounce maybe later
  const { channels, channelsIsError, channelsIsLoading } = useChannels(
    user?._id,
    input
  );

  const ref = useRef<HTMLInputElement>(null);

  const handleChannel = (channelId: string | undefined) => {
    if (channels && channelId) {
      const activeChannel = channels.filter((item) => item._id === channelId);
      setChannel(activeChannel[0]);
    }
  };

  const handleSearch = (
    event:
      | React.KeyboardEvent<HTMLElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (ref.current) {
      setInput(ref.current.value);
    }
  };

  return (
    <div
      onClick={() => setSidebarIsOpen((prev) => !prev)}
      style={{ height: "inherit" }}
      className="fixed lg:relative w-screen lg:w-[35%] lg:max-w-[500px]  lg:bg-black/0 bg-secondary/30 z-[1]"
    >
      {newChannelIsOpen && (
        <NewChannel setNewChannelIsOpen={setNewChannelIsOpen} />
      )}

      {/* when active */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={` bg-gray3 px-4 py-2  h-full overflow-auto absolute top-0 w-[50%] lg:w-full transition-transform duration-200 ${
          channel ? "translate-x-0" : "-translate-x-full"
        } z-10`}
      >
        <div
          onClick={() => setChannel(null)}
          className="flex items-center mb-6 cursor-pointer"
        >
          <div className="h-6 rotate-180">
            <ArrowForwardIcon />
          </div>
          <p className="ml-4 text-primary text-2xl font-medium">All channels</p>
        </div>

        <h2 className="uppercase font-medium text-xl my-4">{channel?.name} </h2>
        <p className="">{channel?.desc} </p>
        <h2 className="uppercase font-medium text-xl my-4">members </h2>

        <div>
          {channel?.members.map((member) => {
            return (
              <div
                onClick={() => router.push(`/profile/${member._id}`)}
                className="flex items-center my-2 hover:bg-gray2 p-2 rounded-lg cursor-pointer"
              >
                <div className="h-12 w-12 rounded-lg overflow-hidden mr-2 ">
                  <img src={member.image} alt="" />
                </div>
                <p className="font-medium text-lg">{member.name}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setChannel(null);
            mutate(key(user?._id, input), async (channels: Conversation[]) => {
              const response = await fetch(
                `/api/conversation/removeUser?conversationID=${channel?._id}&userID=${user?._id}`
              );
              const data = await response.json();
              if (response.status === 200) {
                toast(data.message);
                let newChannel = channels.find(
                  (item) => item._id === channel?._id
                );
                if (!newChannel) return toast.error("channel not found");
                newChannel.members =
                  // @ts-ignore
                  newChannel.members.filter(
                    (item: User) => item._id !== user?._id
                  );
                return channels;
              } else {
                toast.error(data.message);
              }
            });
          }}
          type="button"
          className="px-4 py-2 bg-red text-white rounded-lg font-medium mt-auto"
        >
          Leave
        </button>
      </div>

      {/* channels */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray3 px-4 py-2 w-[50%] lg:w-full  max-w-[500px] h-full flex flex-col relative"
      >
        {/* title */}
        <div className="flex justify-between items-center ">
          <h1 className="capitalize text-primary font-semibold text-xl">
            Channels
          </h1>
          <button
            onClick={() => setNewChannelIsOpen((prev) => !prev)}
            type="button"
            aria-label="create a channel"
            className="text-gray3 p-2 bg-gray rounded-lg"
          >
            <div className="h-6">
              <AddIcon />
            </div>
          </button>
        </div>
        {/* input */}
        <div className="flex items-center rounded-lg overflow-hidden bg-white px-2 my-3 text-secondary">
          <button
            type="button"
            aria-label="search channel"
            onClick={handleSearch}
            className="h-6 mr-1"
          >
            <SearchIcon />
          </button>
          <input
            ref={ref}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(e);
            }}
            type="text"
            placeholder="Search channel"
            className="py-4  text-secondary outline-none w-full"
          />
        </div>

        {/* channels */}
        <div className="">
          <h2 className="uppercase text-primary text-xl font-semibold">
            Your Channels
          </h2>
          {channelsIsLoading ? (
            <p>Loading...</p>
          ) : channelsIsError ? (
            <p>is error {channelsIsError} </p>
          ) : channels.length === 0 ? (
            <p>u dont have channels yet, create one</p>
          ) : (
            channels.map((channel) => {
              return (
                <ChannelCard
                  handleChannel={handleChannel}
                  query={input}
                  key={channel._id}
                  channel={channel}
                />
              );
            })
          )}
        </div>

        {/* close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarIsOpen((prev) => !prev);
          }}
          type="button"
          aria-label="close sidebar"
          className="text-gray3 absolute -right-12 bg-black/50 p-2 rounded-full lg:hidden"
        >
          <div className="h-6">
            <CloseIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
