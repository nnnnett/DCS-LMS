<template>
  <div class="q-py-sm">
    <q-item clickable @click="router.replace(`/`)">
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Homepage</q-item-label>
      </q-item-section>
    </q-item>
  </div>
  <div class="q-py-sm">
    <q-item clickable @click="router.replace(`/enrolledCourses`)">
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
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="settings" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Settings</q-item-label>
      </q-item-section>
    </q-item>
  </div>
  <!-- @click="router.replace(`/instructorDashboard`)" -->
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
defineOptions({
  name: "EssentialLink",
});
</script>
