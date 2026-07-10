import React from "react";
import UserMenu from "../components/UserMenu";
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <>
      <section className="bg-white h-full w-full py-2">
        <button
          className="text-neutral-800 block w-fit ml-auto mb-4 px-3 cursor-pointer"
          onClick={() => window.history.back()}
        >
          <IoClose size={25} />
        </button>
        <div className="mx-auto px-3 pb-8">
          <UserMenu />
        </div>
      </section>
    </>
  );
};

export default UserMenuMobile;
