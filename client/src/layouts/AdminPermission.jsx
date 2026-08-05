import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";
import { FiShield } from "react-icons/fi";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <div className="flex items-center justify-center min-h-[75vh]">
          <div className="max-w-md w-full text-center px-6">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5 border-4 border-red-100">
              <FiShield size={36} className="text-red-500" strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Restricted
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed">
              You don't have permission to access this page. This section is
              restricted to administrators only.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPermission;
