import axios from "axios";
import { Notify } from "quasar";

export async function uploadToCloud(file) {
  if (!file) {
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fileUpload"); // Replace with your unsigned preset name
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dqaw6ndtn/image/upload", // Replace `your-cloud-name` with your Cloudinary account’s cloud name
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Upload Failed:", error);
    Notify.create({
      type: "warning",
      message: "Upload Failed. Please Try Again",
    });
  }
}
