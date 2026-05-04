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
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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
        setData;
        ({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
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
