import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaCheck } from "react-icons/fa6";
import { HiOutlineInformationCircle } from "react-icons/hi";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "", percent: 0 };

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1)
      return { score: 1, label: "Weak", color: "bg-red-500", percent: 25 };
    if (score <= 2)
      return { score: 2, label: "Fair", color: "bg-orange-500", percent: 50 };
    if (score <= 3)
      return { score: 3, label: "Good", color: "bg-yellow-500", percent: 75 };
    return { score: 4, label: "Strong", color: "bg-green-600", percent: 100 };
  };

  const passwordStrength = getPasswordStrength(data.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password must be same");
      return;
    }

    if (!data.agreeTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    if (passwordStrength.score < 2) {
      toast.error(
        "Password is too weak. Please use at least 8 characters with more variety.",
      );
      return;
    }

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full container mx-auto px-2">
        <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-2xl shadow-sm border border-gray-100 p-7">
          <p>Welcome to Binkeyit</p>

          <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                autoFocus
                className="bg-blue-50 p-2 border rounded outline-none focus:ring-2 focus:ring-primary-200/50 focus-within:border-primary-200"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                className="bg-blue-50 p-2 border rounded outline-none focus:ring-2 focus:ring-primary-200/50 focus-within:border-primary-200"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Password: </label>
              <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200 focus-within:ring-2 focus-within:ring-primary-200/50 gap-1">
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
              {data.password && (
                <div className="mt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">
                      Password strength
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        passwordStrength.score === 1
                          ? "text-red-500"
                          : passwordStrength.score === 2
                            ? "text-orange-500"
                            : passwordStrength.score === 3
                              ? "text-yellow-600"
                              : "text-green-600"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.percent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="grid gap-1">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200 focus-within:ring-2 focus-within:ring-primary-200/50 gap-1">
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
              <label
                htmlFor="agreeTerms"
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={data.agreeTerms}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <span
                  className="w-4 h-4 shrink-0 rounded border border-gray-300 bg-white flex items-center justify-center
                    peer-checked:bg-green-800 peer-checked:border-green-800
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200
                    transition-all duration-200 ease-out hover:border-green-600"
                >
                  <FaCheck
                    className={`text-white text-[10px] transition-all duration-200 ${
                      data.agreeTerms
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    }`}
                  />
                </span>
              </label>
              <span className="text-sm">
                I agree to the{" "}
                <span className="relative inline-block group">
                  <span
                    tabIndex={0}
                    className="inline-flex items-center gap-1 font-semibold text-green-700 hover:text-green-800 underline decoration-dashed decoration-green-400 hover:decoration-green-700 underline-offset-4 cursor-pointer outline-none transition-colors"
                  >
                    Terms &amp; Conditions
                    <HiOutlineInformationCircle className="text-base" />
                  </span>
                  <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-md bg-gray-900 text-white text-xs leading-snug px-3 py-2.5 opacity-0 scale-75 origin-bottom group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-150 ease-out ring-1 ring-white/10 shadow-xl z-10">
                    Nothing to see here just that u wont get any product
                    physically, but you will get the digital product.
                    <span
                      className="absolute top-full left-1/2 -translate-x-1/2
                         border-4 border-transparent border-t-gray-900"
                    ></span>
                  </span>
                </span>
              </span>
            </div>

            <button
              disabled={!valideValue || loading || passwordStrength.score < 2}
              className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
            >
              {loading ? "Registering..." : "Register"}
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
