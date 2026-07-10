import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "./../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password must be same");
      return;
    }

    try {
      const res = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (res.data.error) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeTerms: false,
        });
        navigate("/login");
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
          <p>Welcome to Binkeyit</p>

          <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                autoFocus
                className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
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
                  placeholder="Confirm your password"
                />
                <div
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={data.agreeTerms}
                onChange={handleChange}
                className="cursor-pointer w-4 h-4 accent-green-800"
              />
              <label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                I agree to the{" "}
                <span className="relative inline-block group">
                  <span className="font-semibold text-green-700 hover:text-green-800 underline underline-offset-2 cursor-pointer">
                    Terms &amp; Conditions
                  </span>
                  <span
                    className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                      w-80 rounded-md bg-gray-900 text-white text-xs leading-snug px-3 py-2
                      opacity-0 scale-75 origin-bottom
                      group-hover:opacity-100 group-hover:scale-100
                      transition-all duration-150 ease-out shadow-lg z-10"
                  >
                    Nothing to see here just that u wont get any product
                    physically, but you will get the digital product.
                    <span
                      className="absolute top-full left-1/2 -translate-x-1/2
                        border-4 border-transparent border-t-gray-900"
                    ></span>
                  </span>
                </span>
              </label>
            </div>

            <button
              disabled={!valideValue}
              className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
            >
              Register
            </button>
          </form>

          <p>
            Already have Account?{" "}
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

export default Register;
