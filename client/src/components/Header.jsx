import React, { useState } from "react";
import logo from "../assets/logo.webp";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };

  return (
    <>
      <header className="h-28 lg:h-20 lg:shadow-md sticky top-0 flex flex-col gap-1 justify-center bg-white">
        {!(isSearchPage && isMobile) && (
          <div className="container mx-auto flex items-center justify-between px-2 gap-10">
            {/* Logo */}
            <div className="">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  width={170}
                  height={60}
                  className="hidden lg:block"
                />
                <img
                  src={logo}
                  alt="Logo"
                  width={120}
                  height={60}
                  className="lg:hidden"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1">
              <Search />
            </div>

            {/* Login And My Cart */}
            <div>
              {/* User icon display in mobile view only */}
              <button
                className="text-neutral-600 lg:hidden cursor-pointer"
                onClick={handleMobileUser}
              >
                <FaRegCircleUser size={26} />
              </button>
              {/* Desktop login and cart */}
              <div className="hidden lg:flex items-center gap-10">
                {user?._id ? (
                  <div className="relative">
                    <div
                      className="flex items-center select-none gap-1 cursor-pointer"
                      onClick={() => setOpenUserMenu((prev) => !prev)}
                    >
                      <p>Account</p>
                      {openUserMenu ? (
                        <GoTriangleUp size={25} />
                      ) : (
                        <GoTriangleDown size={25} />
                      )}
                    </div>
                    {openUserMenu && (
                      <div className="absolute right-0 top-13 lg:shadow-lg rounded-b-sm flex flex-col">
                        <div className="bg-white rounded-b-sm py-2 min-w-52">
                          <UserMenu close={handleCloseUserMenu} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={redirectToLoginPage}
                    className="text-[18px] leading-[1.15] font-normal px-2 cursor-pointer"
                  >
                    Login
                  </button>
                )}

                <button className="flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 px-2 py-1 rounded-lg text-white h-13 w-28 cursor-pointer">
                  {/* Add to cart icon */}
                  <div className="hover:animate-cart">
                    <BsCart3 size={28} />
                  </div>
                  <div className="font-bold text-[14px]">
                    <p>My Cart</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-2 lg:hidden">
          <Search />
        </div>
      </header>
    </>
  );
};

export default Header;
