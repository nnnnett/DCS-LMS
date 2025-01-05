<template>
  <q-page class=" ">
    <!-- main container -->

    <div class="main-container q-px-xl">
      <!-- Overview Text -->
      <q-card-section class="q-mt-lg">
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          Overview
        </div>
      </q-card-section>
      <!-- Main content -->
      <q-card-section class="main-content">
        <!-- sub content 1 -->
        <div class="sub-content-1">
          <!-- Under sub content 1 -->
          <div class="sub-content-1-1" v-if="!isAdmin">
            <!-- student -->

            <q-card-section
              class="active-pendingTask-container"
              v-if="isStudent"
            >
              <div>
                <q-icon name="library_books" color="primary" size="29px" />
              </div>
              <div class="q-ml-sm">
                <div class="text-h6">6</div>
                <div class="text-body2">Active Courses</div>
              </div>
            </q-card-section>
            <q-card-section
              class="active-pendingTask-container"
              v-if="isStudent"
            >
              <div>
                <q-icon name="library_books" color="primary" size="29px" />
              </div>
              <div class="q-ml-sm">
                <div class="text-h6">6</div>
                <div class="text-body2">Pending Task</div>
              </div>
            </q-card-section>

            <!-- instructor -->

            <q-card-section
              class="active-pendingTask-container"
              v-if="isInstructor"
            >
              <div>
                <q-icon name="library_books" color="primary" size="29px" />
              </div>
              <div class="q-ml-sm" v-if="courseDetailInfo">
                <div class="text-h6">{{ courseDetailInfo.data.length }}</div>
                <div class="text-body2">Active Courses</div>
              </div>
            </q-card-section>
            <q-card-section
              class="active-pendingTask-container"
              v-if="isInstructor"
            >
              <div>
                <q-icon name="library_books" color="primary" size="29px" />
              </div>
              <div class="q-ml-sm" v-if="userCount">
                <div class="text-h6">{{ userCount.data.length }}</div>
                <div class="text-body2">Student</div>
              </div>
            </q-card-section>
          </div>

          <!-- under sub content 1 -->
          <div class="sub-content-1-2 q-mt-lg" v-if="!isAdmin">
            <q-card-section class="flex q-px-none" style="max-width: 929px">
              <div class="text-h6">Enrolled Courses</div>
              <q-space />
              <router-link
                class="text-h6"
                to="/main/enrolledCourses"
                style="color: #2584e9; text-decoration: none"
              >
                See more
              </router-link>
            </q-card-section>
            <q-card-section
              v-if="courses"
              style="
                display: flex;
                flex-wrap: wrap;
                column-gap: 20px;
                width: 100%;
                row-gap: 150px;
                height: 420px;
                max-height: 500px;
                overflow: hidden;
              "
              class="q-px-none row"
            >
              <!-- Courses -->

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
                    <!-- archived? -->
                    <!-- <q-btn-dropdown
                      flat
                      color="white"
                      dropdown-icon="more_vert"
                      style="position: absolute; top: 8px; right: 8px"
                    >
                      <q-list>
                        <q-item clickable>
                          <q-item-section>
                            <q-item-label>View Details</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown> -->
                    <div class="course-info">
                      <div>
                        <div class="course-title">{{ course.name }}</div>
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
                      style="
                        display: flex;
                        justify-content: flex-end;
                        padding: 8px;
                      "
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
            </q-card-section>
          </div>

          <div
            v-if="isAdmin"
            style="height: auto; border: 1px solid #d9d9d9; border-radius: 14px"
          >
            <div class="adminPieChart-container">
              <div style="width: 80%">
                <q-card-section>
                  <div class="text-h6">User Statistics</div>
                </q-card-section>
              </div>
              <div class="adminPieChart">
                <pieChart />
              </div>
            </div>
          </div>
        </div>
        <!-- notifcation side/ sub content 2 -->
        <div class="sub-content-2">
          <q-card-section
            class="flex"
            style="display: flex; align-items: center"
          >
            <div class="text-h6">Notification</div>
          </q-card-section>
          <!-- notification container -->
          <div style="height: auto" v-if="notifications">
            <q-scroll-area style="height: 450px; max-width: 100%">
              <q-card-section
                style="display: flex"
                v-for="notification in notifications"
                :key="notification"
              >
                <div class="q-mr-xs">
                  <q-img
                    :src="notification.instructorImage"
                    style="width: 50px; height: 50px; border-radius: 50%"
                  />
                </div>
                <div style="text-align: justify">
                  <!-- notif content -->
                  <div>{{ notification.message }}</div>
                  <!-- notif date -->
                  <div class="text-caption">
                    {{ notification.createdAt.split("T")[0] }}
                  </div>
                </div>
              </q-card-section>
            </q-scroll-area>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>

<style scoped lang="sass">
.main-container
  width: 100%
  height: auto
.main-content
  display: flex
  justify-content: space-evenly
  height: auto
.sub-content-1
  width: 53%
  height: auto
.active-pendingTask-container
  border: 1px solid #46AF4B
  color: #4B4B4B
  display: flex
  width: 460px
  max-width: 500px
  align-items: center
  border-radius: 14px
.sub-content-1-1
  display: flex
  column-gap: 10px
.sub-content-1-2
  color: #4B4B4B
  height: auto
.adminPieChart-container
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
.adminPieChart
  width: 50%
.enrolledCoursesContainer
  width: 290px
  height: auto
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
// notification side
.sub-content-2
  color: #4B4B4B
  border: 1px solid #46AF4B
  width: 35%
  max-height: 550px
  border-radius: 24px
@media (max-width:1129px)
  .main-content
    display: flex
    flex-direction: column
  .sub-content-1
    width: 100%
    margin-bottom: 15px
  .sub-content-2
    width: 100%
@media (max-width:500px)
  .sub-content-1-1
    display: flex
    flex-direction: column
  .active-pendingTask-container
    width: 100%
    margin-bottom: 10px
  .main-container
    padding: 0px
  .adminPieChart
    width: 100%
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import {
  getActiveCourses,
  getMyCourses,
  getMyClass,
} from "src/components/course";
import { viewViewerUser } from "src/components/user";

import pieChart from "src/components/pieChart.vue";

const loading = ref(true);
const notifDate = ref("");
const router = useRouter();
const courses = ref(null);
const roleValidation = ref("");
const isStudent = ref("");
const isInstructor = ref("");
const isAdmin = ref("");

const notifications = ref([]);
const newDueDate = ref();
const courseDetailInfo = ref("");
const userCount = ref("");
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
    if (!isLogin) {
      router.replace(`/`);
    }

    return isLogin;
  } catch (err) {
    console.error(err);
  }
}

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

async function getNotifications() {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses/getNotification`,
      { headers: { authorization: token } }
    );

    response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // Format the createdAt date
    notifications.value = response.data;
  } catch (err) {
    console.error(err);
  }
}

// Helper function to format the date
function formatDate(isoDate) {
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

async function courseDetails() {
  try {
    const token = localStorage.getItem("authToken");
    const myUser = await viewViewerUser();
    const response = await axios.get(
      `${process.env.api_host}/courses?query=${myUser._id}&isArchived=false`,
      {
        headers: { authorization: token },
      }
    );
    courseDetailInfo.value = response;
  } catch (err) {
    console.error(err);
  }
}

async function getstudents() {
  try {
    const token = localStorage.getItem("authToken");
    const myUser = await viewViewerUser();
    const response = await axios.get(
      `${process.env.api_host}/users?filter=student`,
      {
        headers: { authorization: token },
      }
    );
    userCount.value = response;
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  getstudents();
  courseDetails();
  getNotifications();
  getUserCourses();
  displayUserInfo();
  isLogin();
});
</script>
