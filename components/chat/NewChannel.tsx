import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
// Hooks
import useAutoIncreaseHeight from "../../hooks/useAutoIncreaseHeight";
// Icons
import { CloseIcon } from "../../icons/Icons";
import { Conversation } from "../../types/typing";
import { key } from "../../utils/chat/useChannels";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  setNewChannelIsOpen: Dispatch<SetStateAction<boolean>>;
  query: string;
  isOpen: boolean;
};

type FormValues = {
  name: string;
  desc: string;
};

const overlayVariants = {
  open: { opacity: 1, visibility: "visible" as "visible" },
  closed: { opacity: 0.5, visibility: "hidden" as "hidden" },
};
const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0.5 },
};

const NewChannel = ({ setNewChannelIsOpen, query, isOpen }: Props) => {
  const { user } = useConnectedUser();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    desc: "",
  });
  const textareaRef = useAutoIncreaseHeight(formValues.desc);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user)
      return toast.error("You should be connected to create a Channel");
    const body: {
      author: string;
      desc: string;
      name: string;
      members: string[];
    } = {
      author: user._id,
      desc: formValues.desc,
      name: formValues.name,
      members: [user._id],
    };

    mutate(key(user._id, query), async (channels: Conversation[]) => {
      const response = await fetch(`/api/conversation/postConversation`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast(data.message);
        setNewChannelIsOpen((prev) => !prev);
        setFormValues({
          name: "",
          desc: "",
        });
        return [
          { ...data.conversation, author: user, members: [user] },
          ...channels,
        ];
      } else {
        return toast.error(
          "An error occured during the creation of the new channel please try again later"
        );
      }
    });
  };

  return (
    <motion.div
      variants={overlayVariants}
      animate={isOpen ? "opened" : "closed"}
      onClick={(e) => {
        e.stopPropagation();
        setNewChannelIsOpen(false);
      }}
      className="fixed w-screen h-screen top-0 left-0 bg-black/20 z-[1] flex items-center justify-center"
    >
      <motion.form
        variants={variants}
        animate={isOpen ? "opened" : "closed"}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white md:max-w-[50%] w-[70%] lg:max-w-[700px] rounded-xl p-4 font-[Noto Sans] relative flex flex-col "
      >
        {/* title */}
        <div className="flex justify-between items-center text-primary w-full">
          <h1 className="uppercase font-semibold">New Channel</h1>
          <button
            type="button"
            aria-label="close"
            onClick={() => setNewChannelIsOpen((prev) => !prev)}
            className="h-6"
          >
            <CloseIcon />
          </button>
        </div>
        {/* divider */}
        <div
          id="divider"
          className="w-full border-b border-b-gray3 h-0 py-2"
        ></div>
        {/* channel name */}
        <label
          htmlFor="input"
          className="flex justify-between items-center text-primary font-medium capitalize"
        >
          Channel Name{" "}
          <span className="text-sm text-secondary">
            {formValues.name.length}/30
          </span>{" "}
        </label>
        <input
          name="name"
          onChange={(e) => handleFormChange(e)}
          value={formValues.name}
          maxLength={30}
          type="text"
          placeholder="Your Channel Name"
          className="p-2 rounded-lg bg-gray2 border border-gray3 outline-none"
        />
        {/* channel description */}
        <label
          htmlFor="textarea"
          className="flex justify-between items-center text-primary font-medium capitalize"
        >
          Channel description{" "}
          <span className="text-sm text-secondary">
            {formValues.desc.length}/250
          </span>{" "}
        </label>
        <textarea
          placeholder="Describe your Channel as best as possible"
          name="desc"
          maxLength={250}
          aria-label="Write your tweet"
          onChange={(e) => handleFormChange(e)}
          ref={(element) => {
            textareaRef.current = element;
          }}
          className="p-2 outline-none w-full resize-none overflow-hidden bg-gray2 border border-gray3 rounded-lg"
        ></textarea>

        <button
          disabled={formValues.desc.length < 1 || formValues.name.length < 1}
          className="capitalize px-4 py-2 disabled:bg-gray2 disabled:border disabled:border-gray3 disabled:text-primary bg-blue rounded-lg w-fit text-white ml-auto mt-2"
          type="submit"
        >
          Save
        </button>
      </motion.form>
    </motion.div>
  );
};

export default NewChannel;
