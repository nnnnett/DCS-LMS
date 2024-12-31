<template>
  <div>
    <q-img
      :src="userImage"
      style="width: 50px; height: 50px; border-radius: 50%"
    />
  </div>
</template>

<script setup>
import { viewViewerUser } from "src/components/user";
import { ref, onMounted } from "vue";

const userImage = ref(null);
async function getInfo() {
  try {
    const getUserDetails = await viewViewerUser();
    userImage.value = getUserDetails.file;
  } catch (err) {
    console.error(err);
  }
}
onMounted(() => {
  getInfo();
});
</script>
