import React, { useEffect } from "react";
import notFoundBg from "../assets/notfound-404-error.webp";

const NotFound = () => {
  useEffect(() => {
    const torch = document.querySelector(".torch");
    const handleMouseMove = (e) => {
      if (torch) {
        torch.style.top = `${e.pageY}px`;
        torch.style.left = `${e.pageX}px`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-[78vh] w-screen flex flex-col justify-center items-center bg-cover bg-no-repeat overflow-hidden relative bg-center"
      style={{
        backgroundImage: `url(${notFoundBg})`,
      }}
    >
      <div className="text">
        <h1
          className="text-[15em] font-bold font-mono text-[#011718] text-center mt-[-200px] 
                       drop-shadow-[-5px_5px_0_rgba(0,0,0,0.7)]"
        >
          404
        </h1>
        <h2
          className="text-[5em] font-bold font-mono text-black text-center mt-[-150px] 
                       drop-shadow-[-5px_5px_0_rgba(0,0,0,0.7)]"
        >
          Uh, Ohh
        </h2>
        <h3
          className="text-2xl font-bold font-mono text-primary-200 mt-[-40px] ml-[30px] 
                       drop-shadow-[-5px_5px_0_rgba(0,0,0,0.7)]"
        >
          Sorry we can’t find what you are looking for 'cuz it’s so dark in here
        </h3>
      </div>

      <div className="torch"></div>
    </div>
  );
};

export default NotFound;
