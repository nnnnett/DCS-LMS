<template>
  <q-page>
    <!-- Main Container -->
    <div class="main-container q-px-xl">
      <q-card-section
        class="q-mt-lg q-pl-md flex q-px-none headerTxtBtn"
        style="width: 100%"
      >
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          Reports
        </div>
      </q-card-section>
      <!-- Main Content -->

      <q-card-section class="q-py-none" v-if="courses">
        <q-card-section> Course List </q-card-section>
        <div>
          <div style="display: flex; height: 50px; align-items: center">
            <div
              class="q-pl-md"
              style="width: 35%; font-size: 1em; font-weight: 500"
            >
              Course
            </div>
            <div style="width: 35%; font-size: 1em; font-weight: 500">
              Section
            </div>
          </div>
          <q-separator />
          <div>
            <div
              clickable
              @click="viewCourse"
              style="
                display: flex;
                height: 50px;
                align-items: center;
                border-bottom: 1px solid #d9d9d9;
                cursor: pointer;
              "
              v-for="course in courses"
              :key="course"
            >
              <div class="q-pl-md" style="width: 35%; font-size: 1em">
                {{ course.name }}
              </div>
              <div style="width: 35%; font-size: 1em">{{ course.section }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.main-container
  width: 100%
  height: auto
</style>

<script setup>
import { getCourses } from "src/components/course";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const courses = ref("");
const route = useRoute();
const courseId = route.params.courseId;
const router = useRouter();
async function getUserCourses() {
  try {
    const getCourseDetails = await getCourses();
    courses.value = getCourseDetails;
    console.log("here", courses.value);
  } catch (err) {
    console.error(err);
  }
}

async function viewCourse() {
  console.log("here");
  router.replace(`/main/viewReport/` + courseId);
}

onMounted(() => {
  getUserCourses();
});
</script>
