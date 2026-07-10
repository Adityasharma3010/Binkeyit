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
        className="fixed inset-0 bg-neutral-900/60 p-4 flex items-center justify-center z-50"
        onClick={close}
      >
        <div
          className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={close}
            className="absolute top-3 right-3 text-neutral-500 hover:text-red-500 transition-colors"
          >
            <FiX size={20} />
          </button>

          <div className="relative mb-4 mt-4">
            <label htmlFor="uploadProfile" className="cursor-pointer">
              <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm relative group">
                {hasValidAvatar ? (
                  <img
                    alt={user?.name || "User"}
                    src={displayAvatar}
                    className="w-full h-full"
                    onLoad={() => setIsImageLoading(false)}
                  />
                ) : (
                  <FaRegUserCircle size={65} />
                )}

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiEdit2 size={25} className="text-white" />
                </div>
              </div>
            </label>

            {hasValidAvatar && (
              <button
                onClick={handleRemoveAvatar}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md transition-colors"
                title="Remove Avatar"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

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
              className={`px-4 py-1 rounded text-sm my-3 w-full max-w-[120px] transition-colors border ${
                !isSubmitDisabled
                  ? "border-primary-200 bg-white hover:bg-primary-200 text-black cursor-pointer"
                  : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
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
