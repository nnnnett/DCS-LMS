<template>
  <q-page>
    <div class="flex flex-center">
      <q-form @submit.prevent="createStudent">
        <q-input type="text" label="username" v-model="username" />
        <q-input type="password" label="password" v-model="password" />
        <q-btn type="submit" label="submit" :loading="loading" />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const username = ref("");
const password = ref("");
const loading = ref(false);

async function createStudent() {
  try {
    loading.value = true;
    const response = await axios.post(
      `${process.env.api_host}/users/login`,
      {
        username: username.value,
        password: password.value,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      const token = response.data.token; // Adjust based on your response structure
      localStorage.setItem("authToken", "Bearer " + token); // Save token to local storage

      $q.notify({ type: "positive", message: "Login successful!" });
      router.replace(`/main`);
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Handle successful login (e.g., redirect or store user info)
    } else {
      $q.notify({
        type: "negative",
        message: "Unexpected response from server.",
      });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error during Login.";
    $q.notify({ type: "negative", message: "Incorrect credentials" });
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function isLogin() {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(
      `${process.env.api_host}/users/tokenValidation`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    const isLogin = response.data.isValid === true;
    if (isLogin) {
      router.replace(`/main`);
    }

    return isLogin;
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  isLogin();
});
</script>
