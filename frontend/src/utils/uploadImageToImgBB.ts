// src/utils/imgbb.ts
import axios from "axios";

const uploadImageToImgBB = async (image: File | string): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );

  return response.data.data.url;
};

export default uploadImageToImgBB;
