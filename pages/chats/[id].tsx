import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Pusher from "pusher-js";
// Components
import Chat from "../../components/chat/Chat";
// Icons
import { NavigationIcon } from "../../icons/Icons";
// Type
import { Chat as ChatType } from "../../types/typing";
// data relative
import useChats, { key } from "../../utils/chat/useChats";
import useConnectedUser from "../../utils/users/useConnectedUser";

const index = () => {
  const router = useRouter();
  const { user } = useConnectedUser();
  const {
    chats: fetchedChats,
    chatsIsError,
    chatsIsLoading,
  } = useChats(router.query.id as string);

  const [chats, setChats] = useState<ChatType[]>([]);
  const [sendingChat, setSendingChat] = useState<ChatType | null>();

  useEffect(() => {
    console.log(fetchedChats, 'fetched chats');
    
    if (!chatsIsError || !chatsIsLoading || fetchedChats) {
      setChats(fetchedChats);
    }
  }, [fetchedChats]);

  const ref = useRef<HTMLInputElement>(null);
  // manage websocket
  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY as string, {
      cluster: process.env.PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe(`channel-${router.query.id}`);

    channel.bind("new-message", (data: any) => {
      setSendingChat(null);
      setChats((prev) => [...prev, data.chat]);
    });

    return () => {
      pusher.disconnect();
    };
  }, [router.query.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast.error("you should be connected to post a message");
    if (ref !== null && ref.current !== null) {
      if (ref.current.value.length === 0)
        return toast.error("you canno't send an empty text");

      const body = {
        userID: user._id,
        conversationID: router.query.id as string,
        images: [],
        // @ts-ignore
        text: ref.current.value,
        author: user,
      };

      setSendingChat({ ...body, isLoading: true });

      const response = await fetch(`/api/chat/postChat`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.status === 200) {
        await fetch(`/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="bg-white h-full flex flex-col justify-between">
      <div className=" grow">
        {chatsIsError ? (
          <div className="flex items-center justify-center h-full text-primary font-semibold">
            an error occured please try again later
          </div>
        ) : chatsIsLoading ? (
          <p>loading...</p>
        ) : chats?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-primary font-semibold">
            no chat yet create the first one !
          </div>
        ) : (
          chats?.map((chat) => {
            return <Chat key={chat._id} chat={chat} />;
          })
        )}
        {sendingChat && <Chat chat={sendingChat} />}
      </div>
      {/* input */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray3 px-2 py-1 mb-2 flex items-center rounded-lg overflow-hidden w-[90%] mx-auto "
      >
        <input
          ref={ref}
          type="text"
          placeholder="Chat away"
          className="bg-gray3 w-full p-4 text-base outline-none"
        />
        <button
          type="submit"
          aria-label="sumbit chat"
          className=" text-gray3 p-2 bg-secondary rounded-lg"
        >
          <div className="h-8 rotate-45">
            <NavigationIcon />
          </div>
        </button>
      </form>
    </div>
  );
};

export default index;
