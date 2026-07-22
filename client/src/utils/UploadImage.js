import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";
const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await Axios({
    ...SummaryApi.uploadImage,
    data: formData,
  });

  return response;
};

export default UploadImage;
