import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "./../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "./../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (res.data.error) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("accesstoken", res.data.data.accesstoken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: "",
        });
        navigate("/");
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
          {/* <p>Login</p> */}

          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Password: </label>
              <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200 gap-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="flex-1 bg-transparent outline-none"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter a password"
                  autoComplete="new-password"
                />
                <div
                  onClick={() => setShowPassword((preve) => !preve)}
                  className="cursor-pointer"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>

              <Link
                to={"/forgot-password"}
                className="block ml-auto hover:text-primary-200"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              disabled={!valideValue}
              className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
            >
              Login
            </button>
          </form>

          <p>
            Don't have an Account?{" "}
            <Link
              to={"/register"}
              className="font-semibold text-green-700 hover:text-green-800"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
