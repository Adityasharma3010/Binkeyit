import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-neutral-500">you Don't have permission</p>
        </div>
      )}
    </>
  );
};

export default AdminPermission;
