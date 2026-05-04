import React, { useState, useRef, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "./../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const valideValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (res.data.error) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: res.data,
            email: location?.state?.email,
          },
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
          <p className="font-semibold text-lg">Enter OTP</p>

          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="otp">Enter Your OTP: </label>
              <div className="flex items-center gap-2 justify-between mt-3">
                {data.map((el, i) => {
                  return (
                    <input
                      key={`otp-${i}`}
                      type="text"
                      id="otp"
                      ref={(ref) => {
                        inputRef.current[i] = ref;
                        return ref;
                      }}
                      value={data[i]}
                      onChange={(e) => {
                        const value = e.target.value;
                        console.log("Value: ", value);

                        const newData = [...data];
                        newData[i] = value;
                        setData(newData);

                        if (value && i < 5) {
                          inputRef.current[i + 1]?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          if (data[i]) {
                            // Handle clear + move back in one press
                            e.preventDefault();
                            const newData = [...data];
                            newData[i] = "";
                            setData(newData);
                            if (i > 0) {
                              inputRef.current[i - 1]?.focus();
                            }
                          } else if (i > 0) {
                            inputRef.current[i - 1]?.focus();
                          }
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const paste = e.clipboardData
                          .getData("text")
                          .slice(0, 6)
                          .split("");
                        const newData = [...data];
                        paste.forEach((char, idx) => {
                          newData[idx] = char;
                        });
                        setData(newData);
                        // Move focus to the last filled input
                        const lastIndex = Math.min(paste.length - 1, 5);
                        inputRef.current[lastIndex]?.focus();
                      }}
                      maxLength={1}
                      className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus-within:border-primary-200 text-center font-semibold"
                    />
                  );
                })}
              </div>
            </div>

            <button
              disabled={!valideValue}
              className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
            >
              Send Otp
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

export default OtpVerification;
