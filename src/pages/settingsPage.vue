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
          <q-form>
            <div class="personalDetailsPassword">
              <q-card-section class="changePass">
                <div class="changePass-content">
                  <!-- Profile Image -->
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    "
                  >
                    <div style="color: #4b4b4b" class="imageTxt">
                      Profile Picture
                    </div>
                    <div style="color: #8f9bb3" class="imageTxt">
                      (PNG, JPG, GIF files, 200x200px recommended)
                    </div>
                    <div
                      style="border: 8px solid #46af4b; border-radius: 50%"
                      class="q-mt-md"
                    >
                      <q-img
                        src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
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
                        v-model="Image"
                        borderless
                        label-color="white"
                        clearable
                      />
                    </div>
                  </div>
                  <!-- username password -->
                  <div class="usernamePassword">
                    <q-card-section class="q-pl-none text-h6 q-pb-none">
                      Change Password
                    </q-card-section>
                    <div style="width: 100%">
                      <q-card-section class="q-px-none q-pb-xs">
                        Username
                      </q-card-section>
                      <q-input
                        class="q-pl-md"
                        type="text"
                        borderless
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
                        type="Submit"
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
import { ref } from "vue";

const Image = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const email = ref("");
</script>
