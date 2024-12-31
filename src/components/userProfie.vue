<template>
  <div>
    <q-img
      :src="userImage"
      style="width: 50px; height: 50px; border-radius: 50%"
    />
  </div>
</template>

<script setup>
import { userInfo } from "src/components/userInfoUtility";
import axios from "axios";
import { ref, onMounted } from "vue";

const userImage = ref(null);
const firstname = ref(null);
async function getInfo() {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${process.env.api_host}/users/myProfile`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    userImage.value = response.data.file;
  } catch (err) {
    console.error(err);
  }
}
onMounted(() => {
  getInfo();
});
</script>
