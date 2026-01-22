import React from "react";
import logo from "../assets/logo.webp";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="h-20 shadow-md sticky top-0">
        <div className="container mx-auto flex items-center justify-between h-full px-2">
          {/* Logo */}
          <div>
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
          <div>
            <Search />
          </div>

          {/* Login And My Cart */}
          <div>Login and my Cart</div>
        </div>
      </header>
    </>
  );
};

export default Header;
