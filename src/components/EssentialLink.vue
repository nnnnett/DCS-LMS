<template>
  <div class="q-py-sm">
    <q-item clickable @click="router.replace(`/main`)">
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Homepage</q-item-label>
      </q-item-section>
    </q-item>
  </div>
  <div class="q-py-sm">
    <q-item clickable @click="router.replace(`/main/enrolledCourses`)">
      <q-item-section avatar>
        <q-icon name="import_contacts" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Enrolled Course</q-item-label>
      </q-item-section>
    </q-item>
  </div>
  <div class="q-py-sm">
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="archive" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Archived</q-item-label>
      </q-item-section>
    </q-item>
  </div>
  <div class="q-py-sm">
    <q-item clickable @click="router.replace(`/main/settings`)">
      <q-item-section avatar>
        <q-icon name="settings" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Settings</q-item-label>
      </q-item-section>
    </q-item>
  </div>
  <div class="q-py-sm">
    <q-item clickable @click="handleLogout">
      <q-item-section avatar>
        <q-icon name="logout" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Logout</q-item-label>
      </q-item-section>
    </q-item>
  </div>
  <!-- @click="router.replace(`/instructorDashboard`)" -->
</template>

<script setup>
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const $q = useQuasar();

const clearLocalStorage = () => {
  localStorage.clear();
  console.log("LocalStorage has been cleared.");
};

defineOptions({
  name: "EssentialLink",
});

const handleLogout = async () => {
  try {
    // Clear localStorage when logging out
    clearLocalStorage();

    // Show a notification
    $q.notify({ type: "positive", message: "Logged out successfully" });
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Redirect to the login page
    router.push("/");
  } catch (error) {
    // If an error occurs during logout
    $q.notify({ type: "negative", message: "Error during logout" });
    console.error(error);
  } finally {
    // await isLogin();
  }
};

// async function isLogin() {
//   const token = localStorage.getItem("authToken");
//   console.log("tken ", token);
//   try {
//     const response = await axios.get(
//       `${process.env.api_host}/users/tokenValidation`,
//       {
//         headers: {
//           authorization: token,
//         },
//       }
//     );
//     const isLogin = response.data.isValid === true;
//     if (isLogin) {
//       const userData = await axios.get(`${process.env.api_host}/users`, {
//         headers: {
//           authorization: token,
//         },
//       });
//       router.replace(`/`);
//     }

//     return isLogin;
//   } catch (err) {
//     console.error(err);
//   }
// }
</script>
