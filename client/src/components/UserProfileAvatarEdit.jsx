import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { FiEdit2, FiX } from "react-icons/fi";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "./../utils/AxiosToastError";
import { updatedAvatar } from "../store/userSlice";

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const [isCleared, setIsCleared] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageLoading(true);
      setSelectedFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
      setIsCleared(false);
    }
  };

  const handleRemoveAvatar = (e) => {
    e.preventDefault();
    setSelectedFile(null);
    setPreviewAvatar(null);
    setIsImageLoading(false);
    setIsCleared(true);
  };

  const handleUploadAvatarImage = async (e) => {
    e.preventDefault();

    // SCENARIO 1: Uploading a new file
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      setLoading(true);

      try {
        const response = await Axios({
          ...SummaryApi.uploadAvatar,
          data: formData,
        });

        const { data: responseData } = response;
        dispatch(updatedAvatar(responseData.data.avatar));

        setSelectedFile(null);
        setPreviewAvatar(null);

        if (close) {
          close();
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    }
    // SCENARIO 2: Removing the avatar permanently
    else if (isCleared && user?.avatar) {
      setLoading(true); // Turn on loading state for the removal process

      try {
        // Hit the new backend route to clear the database
        const response = await Axios({
          ...SummaryApi.clearAvatar,
        });

        if (response.data.success) {
          // Tell Redux to wipe the avatar
          dispatch(updatedAvatar(""));

          if (close) {
            close();
          }
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const displayAvatar = isCleared ? "" : previewAvatar || user?.avatar;

  const hasValidAvatar =
    Boolean(displayAvatar) &&
    typeof displayAvatar === "string" &&
    displayAvatar.trim() !== "";

  const isSubmitDisabled =
    loading || isImageLoading || (!selectedFile && !isCleared);

  return (
    <>
      <section
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm p-4 flex items-center justify-center z-50 animate-in fade-in duration-150"
        onClick={close}
      >
        <div
          className="bg-white max-w-xs w-full rounded-xl border border-gray-200 shadow-xl p-5 flex flex-col items-center relative animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={close}
            className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FiX size={20} />
          </button>

          <div className="w-full mb-5 pb-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">
              Update profile photo
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              JPG, PNG, or GIF. Max size 5MB.
            </p>
          </div>

          <div className="relative mb-2">
            <label htmlFor="uploadProfile" className="cursor-pointer">
              <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden bg-gray-50 ring-1 ring-gray-200 relative group">
                {hasValidAvatar ? (
                  <img
                    alt={user?.name || "User"}
                    src={displayAvatar}
                    className="w-full h-full object-cover"
                    onLoad={() => setIsImageLoading(false)}
                  />
                ) : (
                  <FaRegUserCircle size={60} className="text-gray-300" />
                )}

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiEdit2 size={25} className="text-white" />
                </div>
              </div>
            </label>

            {hasValidAvatar && (
              <button
                onClick={handleRemoveAvatar}
                className="absolute -top-1 -right-1 bg-white text-red-500 border border-gray-200 rounded-full p-1 hover:bg-red-50 hover:border-red-200 shadow-sm transition-colors"
                title="Remove Avatar"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          <p className="text-xs text-gray-400 mb-4">
            Click the photo to choose a new one
          </p>

          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleUploadAvatarImage}
          >
            <input
              onClick={(e) => {
                e.target.value = null;
              }}
              onChange={handleFileChange}
              type="file"
              id="uploadProfile"
              className="hidden"
              accept=".jpg, .jpeg, .png, .webp, .gif, .svg, .avif, .bmp, .tiff, .ico"
            />

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`px-4 py-2 rounded-lg text-sm font-medium w-full max-w-[140px] transition-colors ${
                !isSubmitDisabled
                  ? "bg-primary-100 hover:bg-primary-200 text-white cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading
                ? isCleared
                  ? "Removing..."
                  : "Uploading..."
                : isImageLoading
                  ? "Loading..."
                  : isCleared
                    ? "Remove"
                    : "Upload"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserProfileAvatarEdit;
