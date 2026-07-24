import React, { useState, useRef } from "react";
import { FiX, FiUploadCloud } from "react-icons/fi";
import UploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-hot-toast";
import AxiosToastError from "./../utils/AxiosToastError";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setIsImageLoading(true);

    try {
      const response = await UploadImage(file);
      const { data: ImageResponse } = response;
      setData((preve) => {
        return {
          ...preve,
          image: ImageResponse.data.url,
        };
      });
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setData((preve) => ({
      ...preve,
      image: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasValidImage =
    Boolean(data.image) &&
    typeof data.image === "string" &&
    data.image.trim() !== "";

  const isSubmitDisabled =
    loading || isImageLoading || !data.name || !data.image;

  return (
    <section
      className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm p-4 flex items-center justify-center z-50 animate-in fade-in duration-150"
      onClick={close}
    >
      <div
        className="bg-white max-w-lg w-full rounded-xl border border-gray-200 shadow-xl p-5 relative animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <FiX size={20} />
        </button>

        <div className="w-full mb-5 pb-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Add Category</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Create a new product category
          </p>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1.5">
            <label
              htmlFor="categoryName"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="categoryName"
              type="text"
              placeholder="Category Name"
              value={data.name}
              name="name"
              className="bg-gray-50 p-2.5 border border-gray-200 focus-within:border-primary-200 outline-none rounded-lg text-sm transition-colors"
              onChange={handleOnChange}
            />
          </div>

          <div className="grid gap-1.5">
            <p className="text-sm font-medium text-gray-700">Image</p>

            <div className="relative">
              <label htmlFor="uploadCategoryImage" className="cursor-pointer">
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 hover:border-primary-200 hover:bg-white transition-colors">
                  <div className="w-36 h-36 rounded-lg overflow-hidden bg-white ring-1 ring-gray-200 flex items-center justify-center shrink-0">
                    {hasValidImage ? (
                      <img
                        src={data.image}
                        alt="category"
                        className="w-full h-full object-scale-down p-1"
                      />
                    ) : (
                      <FiUploadCloud size={28} className="text-gray-300" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {hasValidImage ? "Change image" : "Upload image"}
                    </p>
                    <p className="text-xs text-gray-400">JPG, PNG, or SVG</p>
                  </div>
                </div>
              </label>

              {hasValidImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1/2 -translate-y-1/2 right-3 bg-white text-red-500 border border-gray-200 rounded-full p-1 hover:bg-red-50 hover:border-red-200 shadow-sm transition-colors"
                  title="Remove Image"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              onClick={(e) => {
                e.target.value = null;
              }}
              onChange={handleUploadCategoryImage}
              type="file"
              id="uploadCategoryImage"
              className="hidden"
              accept=".jpg, .jpeg, .png, .webp, .gif, .svg"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`py-2.5 px-4 rounded-lg text-sm font-medium w-full transition-colors ${
              !isSubmitDisabled
                ? "bg-primary-100 hover:bg-primary-200 text-white cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading
              ? "Adding..."
              : isImageLoading
                ? "Uploading image..."
                : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
