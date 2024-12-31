<template>
  <div>
    <h1>Upload Image to Cloudinary</h1>
    <input type="file" @change="onFileChange" accept="image/*" />
    <button :disabled="!file" @click="uploadImage">Upload</button>

    <div v-if="uploadResult">
      <h2>Upload Successful</h2>
      <img :src="uploadResult.secure_url" alt="Uploaded Image" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const file = ref(null); // To store the selected file
const uploadResult = ref(null); // To store the Cloudinary upload response

// Handle file input
const onFileChange = (event) => {
  file.value = event.target.files[0];
};

// Upload file to Cloudinary
const uploadImage = async () => {
  if (!file.value) {
    alert("Please select a file first!");
    return;
  }
  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("upload_preset", "profile_Image"); // Replace with your unsigned preset name
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dqaw6ndtn/image/upload", // Replace `your-cloud-name` with your Cloudinary account’s cloud name
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    uploadResult.value = response.data.secure_url;
    console.log("hrere", uploadResult.value);
    toBackEnd(uploadResult.value);
    console.log("Upload Successful:", response.data);
  } catch (error) {
    console.error("Upload Failed:", error);
    alert("Upload failed. Please try again.");
  }
};

async function toBackEnd(file) {
  try {
    const response = await axios.post(
      `${process.env.api_host}/courses/test`,
      {
        file: file,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("dito");
  } catch (err) {
    console.error(err);
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
img {
  display: block;
  max-width: 100%;
  margin: 20px auto;
}
</style>
