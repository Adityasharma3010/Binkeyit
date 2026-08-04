import React from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <section
      className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-sm p-4 flex justify-center items-center animate-in fade-in duration-150"
      onClick={close}
    >
      <div
        className="bg-white w-full max-w-sm rounded-xl border border-gray-200 shadow-xl p-5 relative animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
            <FiAlertTriangle size={24} className="text-red-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">
            Delete permanently?
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={cancel}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmBox;
