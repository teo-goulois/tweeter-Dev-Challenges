import React from "react";
// Icons
import { BookmarkIcon, CompassIcon, HomeIcon } from "../../icons/Icons";
// Components
import MobileNavbarButton from "./buttons/MobileNavbarButton";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {};

const NavbarMobile = ({}: Props) => {
  const { user } = useConnectedUser();

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
