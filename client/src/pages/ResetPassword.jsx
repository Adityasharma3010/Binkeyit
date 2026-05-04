import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

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

    try {
      const res = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (res.data.error) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/forgot-password-verify", {
          state: data,
        });

        setData;
        ({
          email: "",
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

export default ResetPassword;
