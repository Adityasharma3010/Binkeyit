import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const fetchCategory = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your product categories
          </p>
        </div>

        <button
          className="flex items-center gap-1.5 text-sm font-medium bg-primary-100 hover:bg-primary-200 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          onClick={() => setOpenUploadCategory(true)}
        >
          <FiPlus size={16} />
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && <NoData />}

      <div className="pt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {categoryData.map((category) => {
          return (
            <div
              key={category._id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="p-3 flex items-center justify-center bg-gray-50 h-40">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-full max-w-full object-scale-down"
                />
              </div>

              <div className="p-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-800 text-center truncate">
                  {category.name}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      setOpenEdit(true);
                      setEditData(category);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <FiEdit2 size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setOpenConfirmBoxDelete(true);
                      setDeleteCategory(category);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <FiTrash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          fetchData={fetchCategory}
          close={() => setOpenEdit(false)}
        />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
