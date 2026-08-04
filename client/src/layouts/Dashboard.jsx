import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr]">
          {/* Menu */}
          <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-auto hidden lg:block">
            <UserMenu />
          </div>

          {/* Content */}
          <div className="bg-white min-h-[75vh] pl-4 border-l">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
