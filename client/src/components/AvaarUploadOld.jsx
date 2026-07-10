// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaRegUserCircle } from "react-icons/fa";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "./../utils/AxiosToastError";
// import { updatedAvatar } from "../store/userSlice";

// const UserProfileAvatarEdit = () => {
//   const user = useSelector((state) => state?.user);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);

//   const handleUploadAvatarImage = async (e) => {
//     const file = e.target.files[0];

//     const formData = new FormData();
//     formData.append("avatar", file);

//     setLoading(true);

//     try {
//       const response = await Axios({
//         ...SummaryApi.uploadAvatar,
//         data: formData,
//       });

//       const { data: responseData } = response;
//       dispatch(updatedAvatar(responseData.data.avatar));
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <section className="fixed inset-0 bg-neutral-900/60 p-4 flex items-center justify-center z-50">
//         <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
//           <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
//             {user.avatar ? (
//               <img
//                 alt={user.name}
//                 src={user.avatar}
//                 className="w-full h-full"
//               />
//             ) : (
//               <FaRegUserCircle size={65} />
//             )}
//           </div>

//           <form className="" onSubmit={(e) => e.preventDefault()}>
//             <label htmlFor="uploadProfile">
//               <div className="border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3 cursor-pointer">
//                 {loading ? "Loading..." : "Upload"}
//               </div>
//             </label>
//             <input
//               onChange={handleUploadAvatarImage}
//               type="file"
//               id="uploadProfile"
//               className="hidden"
//               accept=".jpg, .jpeg, .png, .webp, .gif, .svg, .avif, .bmp, .tiff, .ico"
//             />
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default UserProfileAvatarEdit;
