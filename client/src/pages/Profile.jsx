import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Profile Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and how it appears on your account.
          </p>
        </div>

        {/* Profile Upload and Display Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-full overflow-hidden bg-gray-50 ring-1 ring-gray-200">
            {user.avatar ? (
              <img
                alt={user.name}
                src={user.avatar}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={55} className="text-gray-300" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <button
              className="text-xs font-medium text-primary-200 hover:text-primary-300 mt-1 cursor-pointer"
              onClick={() => setOpenProfileAvatarEdit(true)}
            >
              Change photo
            </button>
          </div>
        </div>
        {openProfileAvatarEdit && (
          <UserProfileAvatarEdit
            close={() => setOpenProfileAvatarEdit(false)}
          />
        )}

        {/* Name, mobile, email, chandge password */}
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="grid gap-1">
              <label
                htmlFor="name"
                className="text-xs font-medium text-gray-600 uppercase tracking-wide"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="p-2.5 bg-gray-50 outline-none border border-gray-200 rounded-lg focus:border-primary-200 focus:ring-2 focus:ring-primary-200/40 transition-colors"
                value={userData.name}
                name="name"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="grid gap-1">
              <label
                htmlFor="email"
                className="text-xs font-medium text-gray-600 uppercase tracking-wide"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-2.5 bg-gray-50 outline-none border border-gray-200 rounded-lg focus:border-primary-200 focus:ring-2 focus:ring-primary-200/40 transition-colors"
                value={userData.email}
                name="email"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="grid gap-1 sm:col-span-2">
              <label
                htmlFor="mobile"
                className="text-xs font-medium text-gray-600 uppercase tracking-wide"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                placeholder="Enter your mobile number"
                className="p-2.5 bg-gray-50 outline-none border border-gray-200 rounded-lg focus:border-primary-200 focus:ring-2 focus:ring-primary-200/40 transition-colors"
                value={userData.mobile}
                name="mobile"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
            <button
              disabled={loading}
              className="bg-primary-200 hover:bg-primary-300 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
