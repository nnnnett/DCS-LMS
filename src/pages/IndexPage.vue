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
          <div class="sub-content-1-1">
            <q-card-section class="active-pendingTask-container">
              <div>
                <q-icon name="library_books" color="primary" size="29px" />
              </div>
              <div class="q-ml-sm">
                <div class="text-h6">6</div>
                <div class="text-body2">Active Courses</div>
              </div>
            </q-card-section>
            <q-card-section class="active-pendingTask-container">
              <div>
                <q-icon name="library_books" color="primary" size="29px" />
              </div>
              <div class="q-ml-sm">
                <div class="text-h6">6</div>
                <div class="text-body2">Pending Task</div>
              </div>
            </q-card-section>
          </div>
          <!-- under sub content 1 -->
          <div class="sub-content-1-2 q-mt-lg">
            <q-card-section class="flex q-px-none">
              <div class="text-h6">Enrolled Courses</div>
              <q-space />
              <router-link
                class="text-h6"
                to="enrolledCourses"
                style="color: #2584e9; text-decoration: none"
              >
                See more
              </router-link>
            </q-card-section>
            <q-card-section
              style="
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
                width: 100%;
                row-gap: 150px;
                height: 400px;
                max-height: 500px;
                overflow: hidden;
              "
              class="q-px-none"
            >
              <!-- Courses -->
              <div
                class="enrolledCoursesContainer"
                style="width: calc(50% - 8px); box-sizing: border-box"
              >
                <div
                  class="enrolledCourses"
                  style="
                    width: 100%;
                    height: 180px;
                    background-image: url('https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702966/assets/mtmjbgnoj8viqadlanma.jpg');
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    border-radius: 14px 14px 0px 0px;
                    overflow: hidden;
                  "
                >
                  <q-btn-dropdown
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
                  </q-btn-dropdown>
                  <div class="course-info">
                    <div>
                      <div>Capstone 1</div>
                      <div style="font-size: 12px; opacity: 0.8">
                        Rosalina D. Lacuesta
                      </div>
                    </div>
                    <q-img
                      src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                      style="width: 50px; height: 50px; border-radius: 50%"
                    />
                  </div>
                </div>
                <div class="course-Schedule">
                  <q-card-section class="q-pb-none" style="overflow: hidden">
                    <div>Due Today</div>
                    <div>Chapter 1: Introduction</div>
                  </q-card-section>
                  <q-card-section style="overflow: hidden">
                    <div>Due Friday</div>
                    <div>Chapter 2: Review of Related Literature</div>
                  </q-card-section>

                  <q-card-section
                    style="
                      display: flex;
                      justify-content: flex-end;
                      padding: 8px;
                    "
                  >
                    <q-btn style="border: 1px solid #4b4b4b">
                      <q-icon name="chevron_right" />
                    </q-btn>
                  </q-card-section>
                </div>
              </div>

              <div
                class="enrolledCoursesContainer"
                style="width: calc(50% - 8px); box-sizing: border-box"
              >
                <div
                  class="enrolledCourses"
                  style="
                    width: 100%;
                    height: 180px;
                    background-image: url('https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702966/assets/mtmjbgnoj8viqadlanma.jpg');
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    border-radius: 14px 14px 0px 0px;
                    overflow: hidden;
                  "
                >
                  <q-btn-dropdown
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
                  </q-btn-dropdown>
                  <div class="course-info">
                    <div>
                      <div>Capstone 2</div>
                      <div style="font-size: 12px; opacity: 0.8">
                        John D. Smith
                      </div>
                    </div>
                    <q-img
                      src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                      style="width: 50px; height: 50px; border-radius: 50%"
                    />
                  </div>
                </div>
                <div class="course-Schedule">
                  <q-card-section class="q-pb-none">
                    <div>Due Tomorrow</div>
                    <div>Chapter 3: Methodology</div>
                  </q-card-section>
                  <q-card-section>
                    <div>Due Next Week</div>
                    <div>Chapter 4: Data Analysis</div>
                  </q-card-section>
                  <q-card-section
                    style="
                      display: flex;
                      justify-content: flex-end;
                      padding: 8px;
                    "
                  >
                    <q-btn style="border: 1px solid #4b4b4b">
                      <q-icon name="chevron_right" />
                    </q-btn>
                  </q-card-section>
                </div>
              </div>
            </q-card-section>
          </div>
        </div>
        <!-- notifcation side/ sub content 2 -->
        <div class="sub-content-2">
          <q-card-section
            class="flex"
            style="display: flex; align-items: center"
          >
            <div class="text-h6">Notification</div>
            <q-space />
            <div style="width: 150px">
              <q-input
                borderless
                type="date"
                v-model="notifDate"
                label="Select Date"
              />
            </div>
          </q-card-section>
          <!-- notification container -->
          <div style="height: auto">
            <q-scroll-area style="height: 450px; max-width: 100%">
              <q-card-section style="display: flex" v-for="n in 100" :key="n">
                <div class="q-mr-xs">
                  <q-img
                    src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                    style="width: 50px; height: 50px; border-radius: 50%"
                  />
                </div>
                <div style="text-align: justify">
                  <!-- notif content -->
                  <div>
                    Rosalina D. Lacuesta posted a new announcement in “Capstone
                    1” feed. Rosalina D. Lacuesta posted a new announcement in
                    “Capstone 1” feed. Rosalina D. Lacuesta posted a new
                    announcement in “Capstone 1” feed. Rosalina D. Lacuesta
                    posted a new announcement in “Capstone 1” feed. Rosalina D.
                    Lacuesta posted a new announcement in “Capstone 1” feed.
                    Rosalina D. Lacuesta posted a new announcement in “Capstone
                    1” feed. Rosalina D. Lacuesta posted a new announcement in
                    “Capstone 1” feed. Rosalina D. Lacuesta posted a new
                    announcement in “Capstone 1” feed.
                  </div>
                  <!-- notif date -->
                  <div class="text-caption">just now</div>
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
  justify-content: space-between
  height: auto
.sub-content-1

  width: 48%
  height: auto
.active-pendingTask-container
  border: 1px solid #46AF4B
  color: #4B4B4B
  display: flex
  width: 49%
  align-items: center
  border-radius: 14px
.sub-content-1-1
  display: flex
  justify-content: space-between
.sub-content-1-2
  color: #4B4B4B
.course-info
  display: flex
  position: absolute
  bottom: 0
  width: 100%
  background-color: rgba(0, 0, 0, 0.6)
  color: white
  padding: 8px
  display: flex
  justify-content: space-between
  align-items: center
.course-Schedule
  border: 1px solid #8F9BB3
  width: 100%
  height: auto
  border-radius: 0px 0px 14px 14px
  overflow: hidden
  white-space: nowrap

// notification side
.sub-content-2
  color: #4B4B4B
  border: 1px solid #46AF4B
  width: 48%
  max-height: 550px
  border-radius: 24px
</style>

<script setup>
import { ref } from "vue";

const notifDate = ref("");
</script>
