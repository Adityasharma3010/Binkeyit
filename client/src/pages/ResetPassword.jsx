import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "./../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const valideValue = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location.state.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New Password and Confirm Password must be same.");
      return;
    }

    try {
      const res = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });

      if (res.data.error) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login", {
          state: data,
        });

        setData;
        ({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }

      console.log("response", res);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      <div className="w-full container mx-auto px-2">
        <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
          <p className="font-semibold text-lg">Enter Your Password</p>

          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="newPassword">New Password: </label>
              <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200 gap-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="flex-1 bg-transparent outline-none"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                  placeholder="Enter a new password"
                />
                <div
                  onClick={() => setShowPassword((preve) => !preve)}
                  className="cursor-pointer"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            <div className="grid gap-1">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200 gap-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="flex-1 bg-transparent outline-none"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter a confirm password"
                />
                <div
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            <button
              disabled={!valideValue}
              className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
            >
              Change Password
            </button>
          </form>

          <p>
            Already have an Account?{" "}
            <Link
              to={"/login"}
              className="font-semibold text-green-700 hover:text-green-800"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
