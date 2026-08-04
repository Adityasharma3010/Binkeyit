import React, { useEffect, useMemo, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiArrowUp,
  FiArrowDown,
  FiSearch,
} from "react-icons/fi";

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
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState("");

  const displayData = useMemo(() => {
    let filtered = categoryData;

    if (search.trim()) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (sortOrder) {
      filtered = [...filtered].sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    return filtered;
  }, [categoryData, sortOrder, search]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

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
    <section className="py-2">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {categoryData.length} {categoryData.length === 1 ? "category" : "categories"}
          </p>
        </div>

        <button
          className="flex items-center gap-2 text-sm font-medium bg-primary-100 hover:bg-primary-200 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          onClick={() => setOpenUploadCategory(true)}
        >
          <FiPlus size={16} />
          <span className="hidden sm:inline">Add Category</span>
        </button>
      </div>

      {/* Search + Sort */}
      {categoryData.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <FiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-primary-200 transition-colors"
            />
          </div>
          <button
            onClick={toggleSort}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${sortOrder ? "border-primary-200 bg-primary-50 text-primary-200" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            {sortOrder === "desc" ? <FiArrowDown size={14} /> : <FiArrowUp size={14} />}
            A-Z
          </button>
        </div>
      )}

      {!categoryData[0] && !loading && <NoData />}

      {/* Category Grid */}
      <div className="grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {displayData.map((category) => (
          <div
            key={category._id}
            className="relative bg-white rounded-xl border border-gray-200 p-3 group hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
          >
            {/* Action buttons */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(category);
                }}
                className="p-1 rounded-md bg-white border border-gray-200 text-gray-400 hover:text-primary-200 hover:border-primary-200 shadow-sm transition-colors cursor-pointer"
                title="Edit"
              >
                <FiEdit2 size={12} />
              </button>
              <button
                onClick={() => {
                  setOpenConfirmBoxDelete(true);
                  setDeleteCategory(category);
                }}
                className="p-1 rounded-md bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 shadow-sm transition-colors cursor-pointer"
                title="Delete"
              >
                <FiTrash2 size={12} />
              </button>
            </div>

            {/* Image */}
            <div className="aspect-square rounded-lg bg-gray-50 flex items-center justify-center mb-2.5 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-3/4 h-3/4 object-scale-down"
              />
            </div>

            {/* Name */}
            <p className="text-xs sm:text-sm font-medium text-gray-800 text-center truncate" title={category.name}>
              {category.name}
            </p>
          </div>
        ))}
      </div>

      {search && displayData.length === 0 && categoryData.length > 0 && (
        <div className="text-center py-12">
          <FiSearch size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-400">
            No categories match "<span className="font-medium text-gray-500">{search}</span>"
          </p>
        </div>
      )}

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
