import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { BookmarkIcon, CompassIcon, HomeIcon } from "../../icons/Icons";
import MobileNavbarButton from "./buttons/MobileNavbarButton";

type Props = {
  openTab: string;
  setOpenTab: Dispatch<SetStateAction<string>>;
};

const NavbarMobile = ({ openTab, setOpenTab }: Props) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  return (
    <div className="text-secondary flex px-1 bg-white">
      {/* home */}
      {user && <MobileNavbarButton url="/" Icon={<HomeIcon />} />}
      <MobileNavbarButton url="/explore" Icon={<CompassIcon />} />
      {user && <MobileNavbarButton url="/bookmarks" Icon={<BookmarkIcon />} />}
    </div>
  );
};

export default NavbarMobile;
