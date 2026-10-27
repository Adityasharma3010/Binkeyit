import React from "react";
import { FiX } from "react-icons/fi";

const UploadSubCategoryModel = ({ close }) => {
  return (
    <>
      <section className="fixed inset-0 bg-neutral-800/70 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white p-4 rounded relative">
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-semibold">Add Sub Category</h1>
            <button
              onClick={close}
              className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          <form action="">
            <div>
              <label htmlFor="">Sub Category Name</label>
              <input className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200" />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UploadSubCategoryModel;
