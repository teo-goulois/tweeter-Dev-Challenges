import moment from "moment";
import React from "react";
// Types
import { Chat, Conversation } from "../../types/typing";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";
// loader
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/router";

type Props = {
  chat: Chat;
};

const Chat = ({ chat }: Props) => {
  const router = useRouter();
  const { user } = useConnectedUser();

  const isMyChat = () => {
    return chat.author._id === user?._id;
  };

  return (
    <div
      className={`flex items-center p-2 ${
        isMyChat() && "flex-row-reverse justify-start"
      }`}
    >
      {chat?.isLoading && (
        <TailSpin
          height="20"
          width="20"
          color="blue"
          ariaLabel="tail-spin-loading"
          radius="6"
          wrapperStyle={{}}
          wrapperClass="m-2"
          visible={true}
        />
      )}
      <div
        onClick={() => router.push(`/profile/${chat.author._id}`)}
        className="h-8 w-8 rounded-full overflow-hidden cursor-pointer "
      >
        <img src={chat.author.image} alt="profile" />
      </div>
      {/* infos */}
      <div className={`${isMyChat() ? "mr-2" : "ml-2"}`}>
        <div className="flex items-center">
          <p className="font-semibold text-base text-primary">
            {chat.author.name}{" "}
          </p>
          <span
            className={`text-xs text-secondary ml-2
             `}
          >
            {moment(chat.createdAt).format("DD[.] MMMM")}{" "}
          </span>
        </div>
        <p className={`${isMyChat() && "text-right"}`}>{chat.text} </p>
      </div>
    </div>
  );
};

export default Chat;
