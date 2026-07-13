import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const UploadCategoryModel = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  return (
    <>
      <section className="fixed inset-0 bg-neutral-800/60 p-4 flex items-center justify-center z-50">
        <div className="bg-white max-w-4xl w-full p-4 rounded">
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-semibold">Category</h1>

            <button className="w-fit block cursor-pointer" onClick={close}>
              <FiX size={26} />
            </button>
          </div>

          <form>
            <div className="grid gap-1">
              <label htmlFor="categoryName">Name</label>
              <input
                id="categoryName"
                type="text"
                placeholder="Category Name"
                value={data.name}
                name="name"
                className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none"
                onChange={handleOnChange}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UploadCategoryModel;
