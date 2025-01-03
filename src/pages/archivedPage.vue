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
              backgroundPosition: 'center',
              position: 'relative',
              borderRadius: '14px 14px 0px 0px',
              overflow: 'hidden',
            }"
          >
            <q-btn-dropdown
              flat
              color="white"
              dropdown-icon="more_vert"
              style="position: absolute; top: 8px; right: 8px"
            >
              <q-list>
                <q-item clickable @click="UnarchivedCourses(archived._id)">
                  <q-item-section>
                    <q-item-label>Unarchived Course</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <div class="course-info">
              <div>
                <div class="course-title">{{ archived.name }}</div>
                <div class="course-instructor">Rosalina D. Lacuesta</div>
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
              <div style="align-self: center">See your works</div>
              <q-space></q-space>
              <q-btn to="/main/coursePage" style="border: 1px solid #46af4b">
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
  color: #46AF4B

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
import { getArchivedCourses } from "src/components/course";
import { Notify } from "quasar";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const archivedCourses = ref(null);

// const courseId = route.params.courseId;

async function getArchivedCourse() {
  try {
    const getCourseDetails = await getArchivedCourses();
    archivedCourses.value = getCourseDetails;
    archivedCourses.value.forEach((course, index) => {
      archivedCourses.value.name;
    });
  } catch (err) {
    console.error(err);
  }
}

async function UnarchivedCourses(courseId) {
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
    location.reload();
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went Wrong",
    });
  }
}

onMounted(() => {
  getArchivedCourse();
});
</script>
