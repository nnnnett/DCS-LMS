<template>
  <!-- student -->
  <div v-if="isStudent">
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
      <q-item clickable @click="router.replace(`/main/archivedPage`)">
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
  </div>
  <!-- instructor -->
  <div v-if="isInstructor">
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
      <q-item clickable @click="router.replace(`/main/archivedPage`)">
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
  </div>
  <div v-if="isAdmin">
    <div class="q-py-sm">
      <q-item clickable @click="router.replace(`/main`)">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item clickable @click="router.replace(`/main/userManagementPage`)">
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label>User Management</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item clickable @click="router.replace(`/main`)">
        <q-item-section avatar>
          <q-icon name="library_books" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Courses Management</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item clickable @click="router.replace(`/main`)">
        <q-item-section avatar>
          <q-icon name="bar_chart" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Reports</q-item-label>
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
  </div>
  <!-- @click="router.replace(`/instructorDashboard`)" -->
</template>

<script setup>
import { useRouter } from "vue-router";
import { Notify } from "quasar";
import { viewViewerUser } from "./user";
import { ref, onMounted } from "vue";

const router = useRouter();
const roleValidation = ref("");
const isStudent = ref("");
const isInstructor = ref("");
const isAdmin = ref("");

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
    Notify.create({ type: "positive", message: "Logged out successfully" });
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Redirect to the login page
    router.push("/");
  } catch (error) {
    // If an error occurs during logout
    Notify.create({ type: "negative", message: "Error during logout" });
    console.error(error);
  } finally {
    // await isLogin();
  }
};

async function displayUserInfo() {
  const checkUser = await viewViewerUser();
  roleValidation.value = checkUser.role;
  if (roleValidation.value === "student") {
    return (isStudent.value = true);
  } else if (roleValidation.value === "instructor") {
    return (isInstructor.value = true);
  } else if (roleValidation.value === "admin") {
    return (isAdmin.value = true);
  }
}

onMounted(() => {
  displayUserInfo();
});
</script>
