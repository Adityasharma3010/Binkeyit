import React from "react";
import { FiX } from "react-icons/fi";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-neutral-800/70 p-4 flex justify-center items-center">
        <div className="bg-white w-full max-w-md p-4 rounded relative animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Permanent Deleted
            </h3>

            <button
              onClick={close}
              className="absolute top-2 right-2 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FiX size={25} />
            </button>
          </div>

          <p className="my-4">Are you Sure?</p>
          <div className="w-fit ml-auto flex items-center gap-3">
            <button
              onClick={confirm}
              className="px-4 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
            >
              Confirm
            </button>
            <button
              onClick={cancel}
              className="px-4 py-1 border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmBox;
