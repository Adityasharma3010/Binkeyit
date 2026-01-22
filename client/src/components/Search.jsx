import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  console.log("Search: ", isSearchPage);

  return (
    <>
      <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg flex border items-center text-neutral-600 bg-slate-50 overflow-hidden group">
        <button className="flex justify-center items-center p-3">
          <FaSearch size={22} />
        </button>
        <div className="w-full flex self-stretch">
          {!isSearchPage ? (
            // not in search page
            <>
              <div
                onClick={redirectToSearchPage}
                className="w-full flex cursor-text items-center"
              >
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'Search "milk"',
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    'Search "bread"',
                    1000,
                    'Search "sugar"',
                    1000,
                    'Search "panner"',
                    1000,
                    'Search "chocolate"',
                    1000,
                    'Search "curd"',
                    1000,
                    'Search "rice"',
                    1000,
                    'Search "egg"',
                    1000,
                    'Search "chips"',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
            </>
          ) : (
            // in search page
            <>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search for atta dal and more."
                  autoFocus
                  className="bg-transparent w-full h-full outline-none"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
