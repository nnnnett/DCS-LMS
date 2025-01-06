<template>
  <q-page>
    <div class="main-container q-px-xl">
      <!-- Enrolled Courses Text -->
      <q-card-section class="q-mt-lg flex q-px-none">
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          Archived Courses
        </div>
      </q-card-section>
      <!-- Main Content -->
      <q-card-section class="archived-container" v-if="archivedCourses">
        <!-- archived list -->

        <div
          class="archivedCoursesContainer"
          v-for="archived in archivedCourses"
          :key="archived"
        >
          <div
            class="archivedCourses"
            :style="{
              width: '100%',
              height: '180px',
              backgroundImage: `url(${archived.file})`,
              backgroundSize: 'cover',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' /* Add this line */,
              backgroundPosition: 'center',
              position: 'relative',
              borderRadius: '14px 14px 0px 0px',
              overflow: 'hidden',
            }"
          >
            <div v-if="!isStudent">
              <q-btn-dropdown
                flat
                color="white"
                dropdown-icon="more_vert"
                style="position: absolute; top: 8px; right: 8px"
              >
                <q-list>
                  <q-item clickable @click="unarchivedCourses(archived._id)">
                    <q-item-section>
                      <q-item-label>Unarchive Course</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="course-info">
              <div>
                <div class="course-title">
                  {{ archived.name }} - {{ archived.section }}
                </div>
                <div class="course-instructor">
                  {{ archived.instructorName }}
                </div>
                <div class="course-instructor">
                  {{ archived.section }}
                </div>
              </div>
              <q-img
                src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                style="width: 50px; height: 50px; border-radius: 50%"
              />
            </div>
          </div>
          <div class="seeYourWork">
            <q-card-section
              style="display: flex; justify-content: flex-end; padding: 8px"
            >
              <q-space></q-space>
              <q-btn :to="`/main/coursePage/` + archived._id">
                <q-icon name="chevron_right" />
              </q-btn>
            </q-card-section>
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
.archived-container
  width: 100%
  height: auto
  display: flex
  column-gap: 50px
  row-gap: 30px
  flex-wrap: wrap
.archivedCoursesContainer
  width: 300px
.course-info
  display: flex
  position: absolute
  bottom: 0
  width: 100%
  background-color: rgba(0, 0, 0, 0.6)
  color: white
  padding: 8px 16px
  justify-content: space-between
  align-items: center
.course-title
  font-size: 14px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.course-instructor
  font-size: 12px
  opacity: 0.8
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.seeYourWork
  border: 1px solid #8f9bb3
  border-radius: 0px 0px 14px 14px
  overflow: hidden
  padding: 8px


.due-text,
.chapter-text
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.due-text
  font-size: 1rem
.chapter-text
  font-size: 0.9rem
@media (max-width:1129px)
  .main-container
    justify-content: center
    display: flex
    flex-direction: column
    align-items: center
  .archived-container
    width: 700px
@media (max-width:722px)
  .archived-container
    width: 350px
</style>

<script setup>
import { ref, onMounted } from "vue";
import {
  getArchivedCourses,
  getMyClassArchived,
  getMyCoursesArchived,
} from "src/components/course";
import { Notify } from "quasar";
import axios from "axios";
import { useRoute } from "vue-router";
import { viewViewerUser } from "src/components/user";
const route = useRoute();
const archivedCourses = ref(null);

const roleValidation = ref("");
const isStudent = ref("");
const isInstructor = ref("");
const isAdmin = ref("");
const courses = ref("");
// const courseId = route.params.courseId;
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

async function getArchivedCourse() {
  try {
    const myUser = await viewViewerUser();
    console.log("user", myUser.role);
    if (myUser.role === "student") {
      const getCourseDetails = await getMyCoursesArchived(myUser._id);
      archivedCourses.value = getCourseDetails;
    } else if (myUser.role === "instructor") {
      const getCourseDetails = await getMyClassArchived(myUser._id);
      archivedCourses.value = getCourseDetails;
    } else {
      const getCourseDetails = await getArchivedCourses();
      archivedCourses.value = getCourseDetails;
    }

    archivedCourses.value.forEach((course, index) => {
      course.file;
    });
  } catch (err) {
    console.error(err);
  }
}

async function unarchivedCourses(courseId) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${process.env.api_host}/courses/update/${courseId}`,
      {
        isArchived: false,
      },
      {
        headers: { "Content-Type": "application/json", authorization: token },
      }
    );

    Notify.create({
      type: "positive",
      message: "Course Unarchived Succesfully",
    });
    getArchivedCourse();
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went Wrong",
    });
  }
}

onMounted(() => {
  displayUserInfo();
  getArchivedCourse();
});
</script>
