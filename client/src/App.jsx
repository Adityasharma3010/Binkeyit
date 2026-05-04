import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Header />
      <div className="min-h-[78vh]">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
