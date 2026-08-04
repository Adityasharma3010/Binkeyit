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
  FiGrid,
  FiList,
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
  const [viewMode, setViewMode] = useState("grid");

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
            Manage your product categories
            {categoryData.length > 0 && (
              <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                {categoryData.length}
              </span>
            )}
          </p>
        </div>

        <button
          className="flex items-center gap-2 text-sm font-medium bg-secondary-200 hover:brightness-110 text-white px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm"
          onClick={() => setOpenUploadCategory(true)}
        >
          <FiPlus size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Add Category</span>
        </button>
      </div>

      {/* Toolbar */}
      {categoryData.length > 0 && (
        <div className="flex items-center gap-2 mb-4 p-1.5 bg-white rounded-xl border border-gray-200">
          <div className="relative flex-1">
            <FiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="h-6 w-px bg-gray-200" />

          <button
            onClick={toggleSort}
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-2 rounded-lg transition-colors cursor-pointer shrink-0 ${sortOrder ? "bg-primary-100/20 text-primary-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            {sortOrder === "desc" ? <FiArrowDown size={13} /> : <FiArrowUp size={13} />}
            A-Z
          </button>

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "grid" ? "bg-gray-100 text-gray-800" : "text-gray-400 hover:text-gray-600"}`}
              title="Grid view"
            >
              <FiGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "list" ? "bg-gray-100 text-gray-800" : "text-gray-400 hover:text-gray-600"}`}
              title="List view"
            >
              <FiList size={14} />
            </button>
          </div>
        </div>
      )}

      {!categoryData[0] && !loading && <NoData />}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {displayData.map((category) => (
            <div
              key={category._id}
              className="relative bg-white rounded-xl border border-gray-200 group hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Action buttons */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="p-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-400 hover:text-primary-200 hover:border-primary-200 shadow-sm transition-all cursor-pointer"
                  title="Edit"
                >
                  <FiEdit2 size={12} />
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="p-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 shadow-sm transition-all cursor-pointer"
                  title="Delete"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>

              {/* Image */}
              <div className="p-4 pb-2">
                <div className="aspect-square rounded-xl bg-linear-to-br from-gray-50 to-gray-100/50 flex items-center justify-center overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-3/4 h-3/4 object-scale-down drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="px-3 pb-3">
                <p className="text-xs sm:text-sm font-medium text-gray-800 text-center truncate" title={category.name}>
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && displayData.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {displayData.map((category, index) => (
            <div
              key={category._id}
              className={`flex items-center gap-3 px-4 py-3 group hover:bg-gray-50 transition-colors ${index !== displayData.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-gray-50 to-gray-100/50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-7 h-7 object-scale-down"
                />
              </div>

              <p className="text-sm font-medium text-gray-800 truncate flex-1 min-w-0" title={category.name}>
                {category.name}
              </p>

              <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-primary-200 hover:bg-primary-100/10 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <FiEdit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {search && displayData.length === 0 && categoryData.length > 0 && (
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <FiSearch size={20} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">No results found</p>
          <p className="text-xs text-gray-400 mt-1">
            No categories match "<span className="text-gray-500">{search}</span>"
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
