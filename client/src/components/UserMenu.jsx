import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Divider from "./Divider";
import Axios from "./../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import { toast } from "react-hot-toast";
import AxiosToastError from "./../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";

const menuItemClass = ({ isActive }) =>
  `mx-2 px-2 py-2 rounded-md transition-colors duration-150 focus-visible:outline-none ${
    isActive
      ? "bg-green-50 text-green-800 font-medium"
      : "hover:bg-zinc-100 active:bg-zinc-200 focus-visible:bg-zinc-100"
  }`;

const menuLinks = [
  { to: "/dashboard/category", label: "Category" },
  { to: "/dashboard/subcategory", label: "Sub Category" },
  { to: "/dashboard/upload-product", label: "Upload Product" },
  { to: "/dashboard/product", label: "Product" },
  { to: "/dashboard/myorders", label: "My Orders" },
  { to: "/dashboard/address", label: "Saved Address" },
];

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message || "Logout successful");
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <>
      <div>
        <div>
          <div className="px-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
            My Account
          </div>
          <Link
            onClick={handleClose}
            to={"/dashboard/profile"}
            className="text-sm flex items-center justify-between gap-2 mt-0.5 font-medium mx-2 px-2 py-1.5 rounded-md transition-colors duration-150 hover:bg-zinc-100 active:bg-zinc-200 focus-visible:outline-none focus-visible:bg-zinc-100 group"
          >
            <span className="max-w-52 text-ellipsis line-clamp-1">
              {user?.name || user?.mobile}
            </span>
            <HiOutlineExternalLink
              size={15}
              className="text-neutral-400 group-hover:text-primary-200 transition-colors duration-150 shrink-0"
            />
          </Link>
        </div>

        <Divider />

        <div className="text-sm grid gap-0.5">
          {menuLinks.map((item) => (
            <NavLink
              key={item.to}
              onClick={handleClose}
              to={item.to}
              className={menuItemClass}
            >
              {item.label}
            </NavLink>
          ))}

          <button
            className="text-left mx-2 px-2 py-2 rounded-md transition-colors duration-150 text-red-600 hover:bg-red-50 active:bg-red-100 focus-visible:outline-none focus-visible:bg-red-50 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
