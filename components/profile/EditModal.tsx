import React, { Dispatch, SetStateAction, useContext, useState } from "react";
// Icons
import { ArrowForwardIcon, RoundArrowDropDownIcon } from "../../icons/Icons";
// Type
import { User } from "../../types/typing";
// Hooks
import useAutoIncreaseHeight from "../../hooks/useAutoIncreaseHeight";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

export interface FormValues {
  image: string;
  banner?: string;
  username: string;
  bio: string;
  email: string;
}

type Props = {
  setEditIsOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
};

const EditModal = ({ setEditIsOpen, user }: Props) => {
  const { setUser } = useContext(AuthContext);
  const [formValues, setFormValues] = useState<FormValues>({
    image: user.image,
    banner: user.banner,
    username: user.name,
    bio: user.bio as string,
    email: user.email,
  });
  const textareaRef = useAutoIncreaseHeight(formValues.bio);

  const handleImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const newImage = e.target[0].value;
    setFormValues((prev) => ({
      ...prev,
      image: newImage,
    }));
  };
  const handleBannerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const newBanner = e.target[0].value;
    setFormValues((prev) => ({
      ...prev,
      banner: newBanner,
    }));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setFormValues((prev) => ({
      ...prev,
      bio: e.target.value,
    }));
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleSave = async () => {
    // TODO: save DATA
    const response = await fetch(`/api/users/updateUser`, {
      body: JSON.stringify(formValues),
      method: "POST",
    });
    const data = await response.json();
    if (response.status === 200) {
      setUser((prev) => {
        if (!prev) return;
        return {
          ...prev,
          image: formValues.image,
          banner: formValues.banner,
          name: formValues.username,
          bio: formValues.bio,
          email: formValues.email,
        };
      });
      toast(data.message);
      setEditIsOpen((prev) => !prev);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div
      onClick={() => setEditIsOpen((prev) => !prev)}
      className="fixed w-screen h-screen top-0 left-0 bg-secondary/30 z-[1]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray3 float-right p-4 w-[50%] h-full flex flex-col"
      >
        {/* title */}
        <h1 className="text-2xl text-primary font-bold mb-4">
          Edit your Profile
        </h1>
        {/* image */}
        <div className="bg-white flex p-2 rounded-lg items-center">
          <div className="h-20 w-20 mr-2 rounded-lg overflow-hidden">
            <img src={formValues.image} alt="user" />
          </div>
          <form
            onSubmit={(e) => handleImageSubmit(e)}
            className="flex flex-col items-start "
          >
            <h2 className="text-primary font-semibold text-lg">
              Upload a Profile picture
            </h2>
            <input
              placeholder="add image link"
              className="bg-gray3 p-2 rounded-lg outline-gray4 outline-1 my-1"
              type="text"
            />
            <button
              type="submit"
              className="px-4 py-2 border-primary border rounded-lg text-primary w-fit"
            >
              Add image
            </button>
          </form>
        </div>
        {/* banner */}
        <div className="bg-white flex flex-col p-2 rounded-lg items-center my-4">
          <div className="w-full h-[100px] rounded-lg overflow-hidden">
            <img
              src={formValues.banner}
              alt="banner"
              className="w-full h-full object-cover bg-[#C4C4C4] "
            />
          </div>
          <h2 className="text-primary font-semibold text-lg">
            Upload a Banner
          </h2>
          <form onSubmit={(e) => handleBannerSubmit(e)} className="flex w-full">
            <input
              placeholder="add banner link"
              className="bg-gray3 p-2 rounded-lg outline-gray4 outline-1 grow"
              type="text"
            />
            <button
              type="submit"
              className="px-4 py-2 border-primary border rounded-lg text-primary w-fit ml-2"
            >
              Add banner
            </button>
          </form>
        </div>
        {/* username */}
        <div className="bg-white flex flex-col p-2 rounded-lg items-start my-4">
          <div className="flex items-center justify-between w-full">
            <h3 className="mb-1">Change your Name</h3>
            <p>{`${formValues.username?.length ?? 0} / 30`}</p>
          </div>
          <input
            maxLength={30}
            onChange={(e) => handleUsernameChange(e)}
            value={formValues.username}
            type="text"
            className="bg-gray3 p-2 rounded-lg outline-gray border border-gray4 outline-1 w-full"
          />
        </div>
        {/* bio */}
        <div className="bg-white flex flex-col p-2 rounded-lg items-start my-4">
          <div className="flex items-center justify-between w-full">
            <h3 className="mb-1">Change your Biography</h3>
            <p>{`${formValues.bio?.length ?? 0} / 250`}</p>
          </div>
          <textarea
            maxLength={250}
            aria-label="Write your tweet"
            onChange={(e) => handleBioChange(e)}
            ref={(element) => {
              textareaRef.current = element;
            }}
            className="bg-gray3 font-medium text-secondary p-2 outline-none w-full resize-none overflow-hidden border border-gray4 rounded-lg"
          ></textarea>
        </div>
        {/* email */}
        <div className="bg-white flex flex-col p-2 rounded-lg items-start my-4">
          <h3 className="mb-1">Change your Email</h3>
          <input
            maxLength={30}
            onChange={(e) => handleEmailChange(e)}
            value={formValues.email}
            type="email"
            className="bg-gray3 p-2 rounded-lg outline-gray border border-gray4 outline-1 w-full"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue px-4 py-2 text-white rounded-lg w-full text-lg font-medium"
        >
          Save
        </button>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          setEditIsOpen((prev) => !prev)}}
        type="button"
        aria-label="close adit panel"
        className="h-9 bg-white rounded-full p-2 float-right m-4"
      >
        <ArrowForwardIcon />
      </button>
    </div>
  );
};

export default EditModal;
