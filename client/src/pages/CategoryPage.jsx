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
      console.log(responseData);
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
    <>
      <section>
        <div className="p-2 bg-white shadow-md flex items-center justify-between">
          <h2 className="font-semibold">Category</h2>

          <button
            className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded cursor-pointer"
            onClick={() => setOpenUploadCategory(true)}
          >
            Add Category
          </button>
        </div>

        {!categoryData[0] && !loading && <NoData />}

        <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 justify-items-center">
          {categoryData.map((category) => {
            return (
              <div key={category._id} className="w-32 h-56 rounded shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full object-scale-down"
                />
                <div className=" flex items-center gap-2 h-9">
                  <button
                    onClick={() => {
                      setOpenEdit(true);
                      setEditData(category);
                    }}
                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setOpenConfirmBoxDelete(true);
                      setDeleteCategory(category);
                    }}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded cursor-pointer"
                  >
                    Delete
                  </button>
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
    </>
  );
};

export default CategoryPage;
