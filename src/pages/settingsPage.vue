<template>
  <q-page>
    <!-- main container  -->
    <div class="main-container q-px-xl">
      <q-card-section class="q-mt-lg flex q-px-none">
        <div class="text-h5 text-weight-medium q-ml-xl" style="color: #4b4b4b">
          Settings
        </div>
      </q-card-section>
      <!-- Main Content -->
      <q-card-section class="settings-container flex flex-center">
        <q-card class="settings-content">
          <q-card-section> Account Settings </q-card-section>
          <!-- Personal Details -->
          <!-- <q-form @submit.prevent="updateImage"> </q-form> -->
          <q-form @submit.prevent="updateUserProfile">
            <div
              style="display: flex; flex-direction: column; align-items: center"
            >
              <div style="color: #4b4b4b" class="imageTxt">Profile Picture</div>
              <div style="color: #8f9bb3" class="imageTxt">
                (PNG, JPG, GIF files, 200x200px recommended)
              </div>
              <div
                style="border: 8px solid #46af4b; border-radius: 50%"
                class="q-mt-md"
              >
                <q-img
                  :src="Image"
                  style="width: 150px; height: 150px; border-radius: 50%"
                />
              </div>
              <div
                style="
                  background-color: #46af4b;
                  border-radius: 24px;
                  width: auto;
                "
                class="q-px-md q-mt-md fileInput"
              >
                <q-file
                  label="Update Profile"
                  accept="image/*"
                  v-model="uploadImage"
                  borderless
                  label-color="white"
                  clearable
                />
              </div>
              <!-- <div>
                <q-btn :loading="loading" label="save" type="submit"></q-btn>
              </div> -->
            </div>
            <div class="personalDetailsPassword">
              <q-card-section class="changePass">
                <div class="changePass-content">
                  <!-- Profile Image -->

                  <!-- username password -->
                  <div class="usernamePassword">
                    <q-card-section class="q-pl-none text-h6 q-pb-none">
                      Account Details
                    </q-card-section>
                    <div style="width: 100%">
                      <q-card-section class="q-px-none q-pb-xs">
                        Student ID
                      </q-card-section>
                      <q-input
                        class="q-pl-md"
                        type="text"
                        borderless
                        disable
                        v-model="username"
                        style="border: 1px solid #4b4b4b; border-radius: 14px"
                      />
                    </div>
                    <div style="width: 100%">
                      <q-card-section class="q-px-none q-pb-xs">
                        Password
                      </q-card-section>
                      <q-input
                        class="q-pl-md"
                        type="password"
                        borderless
                        v-model="password"
                        style="border: 1px solid #4b4b4b; border-radius: 14px"
                      />
                    </div>
                    <div style="width: 100%">
                      <q-card-section class="q-px-none q-pb-xs">
                        Confirm Password
                      </q-card-section>
                      <q-input
                        class="q-pl-md"
                        type="password"
                        borderless
                        v-model="confirmPassword"
                        style="border: 1px solid #4b4b4b; border-radius: 14px"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <!-- Change username and Password -->
              <q-card-section class="personalDetails">
                <div class="personalDetails-content">
                  <q-card-section class="q-pl-none text-h6 q-pb-none">
                    Personal Details
                  </q-card-section>
                  <div style="width: 100%">
                    <q-card-section class="q-px-none q-pb-xs">
                      First Name
                    </q-card-section>
                    <q-input
                      class="q-pl-md"
                      type="text"
                      borderless
                      v-model="firstName"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    />
                  </div>
                  <div style="width: 100%">
                    <q-card-section class="q-px-none q-pb-xs">
                      Middle Name
                    </q-card-section>
                    <q-input
                      class="q-pl-md"
                      type="text"
                      borderless
                      v-model="middleName"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    />
                  </div>
                  <div style="width: 100%">
                    <q-card-section class="q-px-none q-pb-xs">
                      Last Name
                    </q-card-section>
                    <q-input
                      class="q-pl-md"
                      type="text"
                      borderless
                      v-model="lastName"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    />
                  </div>
                  <div style="width: 100%">
                    <q-card-section class="q-px-none q-pb-xs">
                      Email
                    </q-card-section>
                    <q-input
                      class="q-pl-md"
                      type="email"
                      borderless
                      v-model="email"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    />
                  </div>
                  <!-- submit discard button -->
                  <div class="buttonsContainer q-mt-md">
                    <!-- Submit btn -->
                    <div class="submitBtn">
                      <q-btn
                        :loading="loading"
                        label="Submit Changes"
                        type="Submit"
                        style="
                          text-transform: capitalize;
                          background-color: #46af4b;
                          color: #ffffff;
                          width: 100%;
                          border-radius: 24px;
                          height: 50px;
                        "
                      />
                    </div>
                    <!-- discard button -->
                    <div class="discardBtn">
                      <q-btn
                        label="Discard Changes"
                        @click="reloadCurrentPage"
                        style="
                          text-transform: capitalize;
                          color: #8f9bb3;
                          width: 100%;
                          border-radius: 24px;
                          border: 1px solid #d9d9d9;
                          height: 50px;
                        "
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </div>
          </q-form>
        </q-card>
      </q-card-section>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.main-container
  width: 99vw
  height: auto

.settings-container
  height: auto
.settings-content
  border: 1px solid #D9D9D9
  border-radius: 14px
  height: auto
  width: 70vw
.personalDetailsPassword
  display: flex
.changePass
  width: 50%
.changePass-content
  height: auto
  width: 100%
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
.personalDetails
  width: 50%
.usernamePassword
  width: 80%
.personalDetails-content
  height: auto
  width: 80%
  display: flex
  flex-direction: column
  justify-self: center
.buttonsContainer
  width: 100%
  display: flex
  justify-content: space-between
  width: 100%
.submitBtn
  width: 45%
.discardBtn
  width: 45%
@media (max-width:1004px)
  .personalDetailsPassword
    display: flex
    flex-direction: column
  .changePass
    width: 100%
  .personalDetails
    width: 100%
@media (max-width:666px)
  .main-container
    padding: 0px
  .settings-content
    width: 99vw
  .buttonsContainer
    display: flex
    flex-direction: column
  .submitBtn
    width: 100%
  .discardBtn
    width: 100%
    margin-top:10px
  .imageTxt
    text-align: center
  .fileInput
    max-width: 50%
    max-height: 50px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
</style>

<script setup>
import { ref, onMounted } from "vue";
import { viewViewerUser } from "src/components/user";
import { uploadToCloud } from "src/components/cloudinaryUtility";
import { Notify } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const uploadImage = ref("");
const Image = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const email = ref("");
const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/; // Regex for special char, number, and min 8 chars
const loading = ref(false);

const userId = ref("");
async function displayUserInfo() {
  const userInfo = await viewViewerUser();
  Image.value = userInfo.file;
  username.value = userInfo.username;
  firstName.value = userInfo.firstName;
  middleName.value = userInfo.middleName;
  lastName.value = userInfo.lastName;
  email.value = userInfo.email;
  userId.value = userInfo._id;
}

async function updateUserProfile() {
  loading.value = true;
  try {
    if (
      !username.value ||
      !password.value ||
      !confirmPassword.value ||
      !email.value ||
      !firstName.value ||
      !middleName.value ||
      !lastName.value
    ) {
      Notify.create({
        type: "warning",
        message: "Please fill in all required fields.",
      });
      return;
    } else if (password.value !== confirmPassword.value) {
      Notify.create({
        type: "warning",
        message: "Passwords do not match! Please try again..",
      });
      return;
    } else if (password.value.length < 8) {
      Notify.create({
        type: "warning",
        message: "Use 8 or more characters for Passwords",
      });
      return;
    } else if (!passwordRegex.test(password.value)) {
      Notify.create({
        type: "warning",
        message:
          "Contain at least one special character (!@#$%^&*)\n" +
          "Contain at least one number",
      });
      return;
    }
    const token = localStorage.getItem("authToken");
    loading.value = true;

    // If there's an image to upload, upload it first and get the URL
    let imageUrl = null;
    if (uploadImage.value) {
      imageUrl = await uploadToCloud(uploadImage.value);
    }

    // Prepare the payload with conditional inclusion of the image URL
    const payload = {
      username: username.value,
      password: password.value, // Optional: include only if updating password
      email: email.value,
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
    };

    // Add image URL if it's provided
    if (imageUrl) {
      payload.file = imageUrl;
    }
    const response = await axios.post(
      `${process.env.api_host}/users/update/${userId.value}`,
      payload,
      {
        headers: { "Content-Type": "application/json", authorization: token },
      }
    );
    Notify.create({
      type: "positive",
      message: "Profile Updated Successfully",
    });
    location.reload();
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went wrong",
    });
  } finally {
    loading.value = false;
  }
}

async function reloadCurrentPage() {
  location.reload();
}

onMounted(() => {
  displayUserInfo();
});
</script>
