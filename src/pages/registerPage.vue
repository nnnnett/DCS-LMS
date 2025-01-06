<template>
  <q-page>
    <div class="main-container q-pb-lg">
      <q-card-section>
        <div class="q-py-none">
          <q-img
            src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702951/assets/fjqfqywlp4zvtxv5rkau.png"
            style="width: 90px; justify-self: center; display: flex"
          />
        </div>
      </q-card-section>
      <!-- Registration  form -->
      <q-card class="registration-container q-pa-xl">
        <q-form @submit.prevent="registerStudent">
          <div>
            <q-btn icon="chevron_left" to="/"></q-btn>
          </div>
          <q-card-section>
            <div
              class="text-h4"
              style="color: #4b4b4b; font-weight: 500; text-align: center"
            >
              Create An Account
            </div>
          </q-card-section>

          <q-card-section class="q-pl-none q-pb-none text-h5">
            <div style="color: #4b4b4b">
              <span style="color: #46af4b">*</span> Basic info
            </div>
          </q-card-section>
          <!-- First Name -->
          <q-card-section class="q-pl-none q-pb-xs">
            <div style="color: #6c7275">First Name</div>
          </q-card-section>
          <div class="registration-input q-px-sm">
            <q-input type="text" borderless v-model="firstName" />
          </div>
          <!-- Middle Name -->
          <q-card-section class="q-pl-none q-pb-xs">
            <div style="color: #6c7275">Middle Name</div>
          </q-card-section>
          <div class="registration-input q-px-sm">
            <q-input type="text" borderless v-model="middleName" />
          </div>
          <!-- Last Name -->
          <q-card-section class="q-pl-none q-pb-xs">
            <div style="color: #6c7275">Last Name</div>
          </q-card-section>
          <div class="registration-input q-px-sm">
            <q-input type="text" borderless v-model="lastName" />
          </div>
          <!-- prfile image -->
          <div class="registration-input q-mt-md">
            <q-file
              class="q-px-md"
              v-model="imageProfile"
              accept="image/*"
              borderless
              label="Upload Profile Image"
            >
              <template #append>
                <q-icon name="upload"></q-icon>
              </template>
            </q-file>
          </div>
          <q-card-section class="q-pl-none q-pb-none text-h5">
            <div style="color: #4b4b4b">
              <span style="color: #46af4b">*</span> Login info
            </div>
          </q-card-section>
          <q-card-section class="q-pl-none q-pb-xs">
            <div style="color: #6c7275">Student ID</div>
          </q-card-section>
          <!-- username -->
          <div class="registration-input q-px-sm">
            <q-input type="text" borderless v-model="username" />
          </div>
          <!-- Email -->
          <q-card-section class="q-pl-none q-pb-xs">
            <div style="color: #6c7275">Email</div>
          </q-card-section>
          <div class="registration-input q-px-sm">
            <q-input type="email" borderless v-model="email" />
          </div>
          <q-card-section class="q-pl-none q-pb-xs">
            <div style="color: #6c7275">Password</div>
          </q-card-section>
          <!-- Password -->
          <div class="registration-input q-px-sm">
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
                /> </template
            ></q-input>
          </div>
          <q-card-section class="q-pl-none q-pb-xs">
            <div style="color: #6c7275">Confirm Password</div>
          </q-card-section>
          <!-- Password -->
          <div class="registration-input q-px-sm">
            <q-input
              :type="isCPwd ? 'password' : 'text'"
              borderless
              v-model="confirmPassword"
            >
              <template v-slot:append>
                <q-icon
                  :name="isCPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isCPwd = !isCPwd"
                />
              </template>
            </q-input>
          </div>

          <div style="width: 100%; border-radius: 14px" class="q-mt-md">
            <!-- submit button -->
            <q-btn
              type="submit"
              flat
              label="Sign Up"
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
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.main-container
  height: auto
  width: 99vw
.registration-container
  height: auto
  width: 40vw
  justify-self: center
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
.registration-input
  width: 100%
  border-radius: 14px
  border: 1px solid #6C7275
@media (max-width: 900px)
  .registration-container
    width: 90vw
</style>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { uploadToCloud } from "src/components/cloudinaryUtility";

const router = useRouter();
const $q = useQuasar();
const isPwd = ref(true);
const isCPwd = ref(true);
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const middleName = ref("");
const role = ref("student");
const isArchived = ref(false);
const loading = ref(false);
const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/; // Regex for special char, number, and min 8 chars
const imageProfile = ref(null);
const uploadResult = ref(null);

async function registerStudent() {
  if (
    !username.value ||
    !password.value ||
    !confirmPassword.value ||
    !email.value ||
    !firstName.value ||
    !middleName.value ||
    !lastName.value
  ) {
    $q.notify({
      type: "warning",
      message: "Please fill in all required fields.",
    });
    return;
  } else if (password.value !== confirmPassword.value) {
    $q.notify({
      type: "warning",
      message: "Passwords do not match! Please try again..",
    });
    return;
  } else if (password.value.length < 8) {
    $q.notify({
      type: "warning",
      message: "Use 8 or more characters",
    });
    return;
  } else if (!passwordRegex.test(password.value)) {
    $q.notify({
      type: "warning",
      message:
        "Contain at least one special character (!@#$%^&*)\n" +
        "Contain at least one number",
    });
    return;
  }
  try {
    loading.value = true;
    const imageUrl = await uploadToCloud(imageProfile.value);
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${process.env.api_host}/users/create`,
      {
        username: username.value,
        password: password.value,
        email: email.value,
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value,
        role: role.value,
        isArchived: isArchived.value,
        file: imageUrl,
      },
      {
        headers: { "Content-Type": "application/json", authorization: token },
      }
    );
    $q.notify({
      type: "positive",
      message: "Account Created Succesfully",
    });
    router.replace(`/`);
  } catch (err) {
    console.error(err);
    $q.notify({
      type: "negative",
      message:
        "An error occurred while creating the account. Please try again.",
    });
  } finally {
    loading.value = false;
  }
}
</script>
