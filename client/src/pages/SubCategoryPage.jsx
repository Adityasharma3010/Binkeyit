import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  return (
    <>
      <section>
        <div className="p-2 bg-white shadow-md flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Sub Categories</h2>
          <button
            className="flex items-center gap-2 text-sm font-medium bg-secondary-200 hover:brightness-110 text-white px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm"
            onClick={() => setOpenAddSubCategory(true)}
          >
            <FiPlus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">Add Sub Category</span>
          </button>
        </div>

        {openAddSubCategory && (
          <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} />
        )}
      </section>
    </>
  );
};

export default SubCategoryPage;
