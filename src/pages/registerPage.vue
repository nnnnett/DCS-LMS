<template>
  <q-page>
    <div class="flex flex-center">
      <q-form @submit.prevent="registerStudent">
        <q-input type="text" label="username" v-model="username" />
        <q-input type="password" label="password" v-model="password" />
        <q-input type="email" label="email" v-model="email" />
        <q-input type="text" label="First Name" v-model="firstName" />
        <q-input type="text" label="Middle Name" v-model="middleName" />
        <q-input type="text" label="Last Name" v-model="lastName" />
        <!-- <q-file v-model="image" label="Profile" /> -->
        <q-btn type="submit" :loading="loading" label="submit" />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const username = ref("");
const password = ref("");
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const middleName = ref("");
const image = ref("iamge");
const role = ref("student");
const isArchived = ref(false);
const loading = ref(false);

async function registerStudent() {
  try {
    // const formData = new FormData();
    // formData.append("username", username.value);
    // formData.append("password", password.value);
    // formData.append("email", email.value);
    // formData.append("firstName", firstName.value);
    // formData.append("middleName", middleName.value);
    // formData.append("lastName", lastName.value);
    // formData.append("role", role.value);
    // formData.append("isArchived", isArvhived.value);
    // formData.append("image", image.value);
    loading.value = true;
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
        image: image.value,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>
