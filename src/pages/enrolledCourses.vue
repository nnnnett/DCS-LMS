<template>
  <q-page>
    <div class="main-container q-px-xl">
      <!-- Enrolled Courses Text -->
      <q-card-section
        class="q-mt-lg flex q-px-none headerTxtBtn"
        style="width: 100%"
      >
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          Courses
        </div>
        <q-space />
        <div
          style="width: auto; color: #46af4b"
          v-if="isStudent"
          class="joinCreateBtn"
        >
          <q-btn
            class="joinCreateBtn"
            label="Join Class"
            flat
            @click="classCodePopup = true"
            icon="add"
            style="
              border: 1px solid #46af4b;
              border-radius: 10px;
              width: 100%;
              height: 40px;
              text-transform: capitalize;
            "
          />
        </div>

        <div
          style="width: auto; color: #46af4b"
          v-if="isInstructor"
          class="joinCreateBtn"
        >
          <q-btn
            class="joinCreateBtn"
            label="Create Class"
            flat
            icon="add"
            @click="createCoursePopup = true"
            style="
              border: 1px solid #46af4b;
              border-radius: 10px;
              width: 100%;
              height: 40px;
              text-transform: capitalize;
            "
          />
        </div>
      </q-card-section>
      <!-- Main Content -->
      <q-card-section class="enrolled-container" v-if="courses">
        <!-- erolled list -->
        <div v-for="course in courses" :key="course._id">
          <div class="enrolledCoursesContainer">
            <div
              class="enrolledCourses"
              :style="{
                width: '100%',
                height: '180px',
                backgroundImage: `url(${course.file})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                borderRadius: '14px 14px 0px 0px',
                overflow: 'hidden',
              }"
            >
              <!-- archived button -->
              <q-btn-dropdown
                flat
                color="white"
                dropdown-icon="more_vert"
                style="position: absolute; top: 8px; right: 8px"
              >
                <q-list>
                  <q-item clickable @click="archivedCourses(course._id)">
                    <q-item-section>
                      <q-item-label>Archive</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <div class="course-info">
                <div>
                  <div class="course-title">
                    {{ course.name }} - {{ course.section }}
                  </div>
                  <div class="course-instructor">
                    {{ course.instructorName }}
                  </div>
                </div>
                <q-img
                  :src="course.instructorImage"
                  style="width: 50px; height: 50px; border-radius: 50%"
                />
              </div>
            </div>
            <div class="course-Schedule">
              <q-card-section class="q-pb-none" style="overflow: hidden">
                <div class="due-text">Due Today</div>
                <div class="chapter-text">Chapter 1: Introduction</div>
              </q-card-section>
              <q-card-section style="overflow: hidden">
                <div class="due-text">Due Friday</div>
                <div class="chapter-text">
                  Chapter 2: Review of Related Literature
                </div>
              </q-card-section>
              <q-card-section
                style="display: flex; justify-content: flex-end; padding: 8px"
              >
                <q-btn
                  :to="`/main/coursePage/` + course._id"
                  style="border: 1px solid #4b4b4b"
                >
                  <q-icon name="chevron_right" />
                </q-btn>
              </q-card-section>
            </div>
          </div>
        </div>

        <!-- join class popup (student) -->
        <div>
          <q-dialog v-model="classCodePopup">
            <q-card>
              <q-card-section>
                <div class="text-h6">Input Class Code</div>
              </q-card-section>
              <q-form @submit.prevent="joinClass(classCode)">
                <div class="flex flex-center column">
                  <div style="width: 80%">
                    <q-input
                      v-model="classCode"
                      type="text"
                      borderless
                      class="q-px-md"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    >
                    </q-input>
                  </div>
                  <div
                    style="width: 80%; display: flex; justify-content: flex-end"
                  >
                    <q-card-actions align="right" class="bg-white text-teal">
                      <q-btn
                        flat
                        label="Join"
                        type="submit"
                        :loading="loading"
                      />
                    </q-card-actions>
                    <q-card-actions align="right" class="bg-white text-teal">
                      <q-btn flat label="Cancel" v-close-popup />
                    </q-card-actions>
                  </div>
                </div>
              </q-form>
            </q-card>
          </q-dialog>
        </div>

        <!-- Create Course Pop Up (instructor) -->
        <div>
          <q-dialog v-model="createCoursePopup" persistent>
            <q-card style="width: 700px; max-width: 80vw">
              <q-card-section>
                <div class="text-h6">Create Course</div>
              </q-card-section>
              <!-- q form -->
              <q-form @submit.prevent="createCourse">
                <div
                  style="width: 100%; color: #4b4b4b"
                  class="q-px-xl flex flex-center"
                >
                  <div style="width: 80%">
                    <q-card-section class="q-px-none">
                      Course Image
                    </q-card-section>
                    <q-file
                      v-model="courseImage"
                      borderless
                      label="upload Image"
                      class="q-px-md"
                      accept="image/*"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    >
                      <template #append>
                        <q-icon name="upload_file"></q-icon>
                      </template>
                    </q-file>
                  </div>
                  <div style="width: 80%">
                    <q-card-section class="q-px-none">
                      Course Name
                    </q-card-section>
                    <q-input
                      v-model="courseName"
                      type="text"
                      borderless
                      class="q-px-md"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    >
                    </q-input>
                  </div>
                  <div style="width: 80%">
                    <q-card-section class="q-px-none">
                      Course Section
                    </q-card-section>
                    <q-input
                      v-model="courseSection"
                      type="text"
                      borderless
                      class="q-px-md"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    >
                    </q-input>
                  </div>
                  <div style="width: 80%">
                    <q-card-section class="q-px-none">
                      Course Description
                    </q-card-section>
                    <q-input
                      v-model="courseDescription"
                      type="textarea"
                      borderless
                      class="q-px-md"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    >
                    </q-input>
                  </div>

                  <div
                    style="width: 80%; display: flex; justify-content: flex-end"
                  >
                    <q-card-actions align="right" class="bg-white text-teal">
                      <q-btn
                        flat
                        label="Create Course"
                        :loading="loading"
                        type="submit"
                      />
                    </q-card-actions>
                    <q-card-actions align="right" class="bg-white text-teal">
                      <q-btn flat label="Cancel" v-close-popup />
                    </q-card-actions>
                  </div>
                </div>
              </q-form>
            </q-card>
          </q-dialog>
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.main-container
  width: 100%
  height: auto
.enrolled-container
  width: 100%
  height: auto
  display: flex
  column-gap: 50px
  row-gap: 30px
  flex-wrap: wrap
.enrolledCoursesContainer
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
.course-Schedule
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
  .enrolled-container
    width: 700px
@media (max-width:722px)
  .enrolled-container
    width: 350px

@media (max-width:500px)
  .headerTxtBtn
    display: flex
    flex-direction: column
</style>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { Notify } from "quasar";
import { uploadToCloud } from "src/components/cloudinaryUtility";
import {
  getActiveCourses,
  getMyCourses,
  getMyClass,
} from "src/components/course";
import { viewViewerUser } from "src/components/user";

const loading = ref(false);

const roleValidation = ref("");
const isStudent = ref("");
const isInstructor = ref("");
const isAdmin = ref("");
const createCoursePopup = ref(false);
const classCodePopup = ref(false);
// create course
const courseImage = ref(null);
const courseName = ref("");
const courseSection = ref("");
const courseDescription = ref("");

const classCode = ref("");
// course
const courses = ref(null);

async function getUserCourses() {
  try {
    const myUser = await viewViewerUser();
    console.log("user", myUser.role);
    if (myUser.role === "student") {
      const getCourseDetails = await getMyCourses(myUser._id);
      courses.value = getCourseDetails;
    } else if (myUser.role === "instructor") {
      const getCourseDetails = await getMyClass(myUser._id);
      courses.value = getCourseDetails;
    } else {
      const getCourseDetails = await getActiveCourses();
      courses.value = getCourseDetails;
    }

    courses.value.forEach((course, index) => {
      course.file;
    });
  } catch (err) {
    console.error(err);
  }
}

async function createCourse() {
  const token = localStorage.getItem("authToken");
  loading.value = true;
  const imageUrl = await uploadToCloud(courseImage.value);
  try {
    if (
      !courseImage.value ||
      !courseName.value ||
      !courseSection.value ||
      !courseDescription.value ||
      !courseImage.value
    ) {
      Notify.create({
        type: "warning",
        message: "Please complete all required fields!",
      });
      return;
    }
    await axios.post(
      `${process.env.api_host}/courses/create`,
      {
        name: courseName.value,
        section: courseSection.value,
        description: courseDescription.value,
        file: imageUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    createCoursePopup.value = false;
    getUserCourses();
    Notify.create({
      type: "positive",
      message: "created Succesfully!",
    });
    return;
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went wrong!",
    });
  } finally {
    loading.value = false;
  }
}

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

async function archivedCourses(courseId) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${process.env.api_host}/courses/update/${courseId}`,
      {
        isArchived: true,
      },
      {
        headers: { "Content-Type": "application/json", authorization: token },
      }
    );
    getUserCourses();
    Notify.create({
      type: "positive",
      message: "Course Archived Succesfully",
    });
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went Wrong",
    });
  }
}

async function joinClass(courseCode) {
  if (!classCode.value) {
    Notify.create({
      type: "warning",
      message: "Please type Correct Code",
    });
    return;
  }
  try {
    loading.value = true;
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${process.env.api_host}/courses/joinCourse/${courseCode}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    Notify.create({
      type: "positive",
      message: "Class Joined!",
    });
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went wrong",
    });
  } finally {
    loading.value = false;
    classCodePopup.value = false;
    getUserCourses();
  }
}

onMounted(() => {
  getUserCourses();
  displayUserInfo();
});
</script>
