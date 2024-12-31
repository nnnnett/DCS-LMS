<template>
  <q-page>
    <!-- Main Container -->
    <div class="main-container q-pb-lg">
      <q-card-section>
        <div class="q-py-lg">
          <q-img
            src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702951/assets/fjqfqywlp4zvtxv5rkau.png"
            style="width: 90px; justify-self: center; display: flex"
          />
        </div>
      </q-card-section>
      <!-- login form -->
      <q-card class="login-container q-pa-xl">
        <q-form @submit.prevent="createStudent">
          <q-card-section>
            <div
              class="text-h4"
              style="color: #4b4b4b; font-weight: 500; text-align: center"
            >
              Sign in
            </div>
          </q-card-section>
          <q-card-section class="q-pl-none q-pb-xs">
            <div style="color: #6c7275">Username</div>
          </q-card-section>
          <!-- username -->
          <div class="login-input q-px-sm">
            <q-input type="text" borderless v-model="username" />
          </div>
          <q-card-section class="q-pl-none q-pb-xs">
            <div style="color: #6c7275">Password</div>
          </q-card-section>
          <!-- password -->
          <div class="login-input q-px-sm">
            <q-input
              :type="isPwd ? 'password' : 'text'"
              borderless
              v-model="password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div style="width: 100%; border-radius: 14px" class="q-mt-md">
            <!-- submit button -->
            <q-btn
              type="submit"
              flat
              label="Sign in"
              :loading="loading"
              style="
                width: 100%;
                background-color: #46af4b;
                color: #ffffff;
                text-transform: capitalize;
                border-radius: 14px;
                padding: 14px 0px;
              "
            />
          </div>
        </q-form>
      </q-card>
      <q-card-section class="q-my-md newCommunityTxt">
        <div style="border: 1px solid #d9d9d9; width: 33%; height: 0px"></div>
        <div style="width: 30%; color: #6c7275">New to our community</div>
        <div style="border: 1px solid #d9d9d9; width: 33%; height: 0px"></div>
      </q-card-section>
      <q-card-section class="createAccBtn">
        <div
          style="width: 100%; border-radius: 14px; border: 1px solid #4b4b4b"
        >
          <!-- submit button -->
          <q-btn
            to="registerPage"
            flat
            label="Create An Account"
            style="
              width: 100%;
              color: #4b4b4b;
              text-transform: capitalize;
              border-radius: 14px;
              padding: 14px 0px;
            "
          />
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.main-container
  height: auto
  width: 100vw
.login-container
  height: auto
  width: 40vw
  justify-self: center
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
.login-input
  width: 100%
  border-radius: 14px
  border: 1px solid #6C7275
.newCommunityTxt
  display: flex
  align-items: center
  justify-content: space-between
  text-align: center
  width: 40vw
  justify-self: center
.createAccBtn
  width: 40vw
  justify-self: center
@media (max-width:900px)
  .login-container,.newCommunityTxt,.createAccBtn
    width: 90vw
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const isPwd = ref(true);
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
