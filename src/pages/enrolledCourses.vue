<template>
  <q-page>
    <!-- main container -->
    <div class="main-container q-px-xl">
      <!-- Enrolled Courses Text -->
      <q-card-section class="q-mt-lg flex q-px-none">
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          Enrolled Courses
        </div>
        <q-space />
        <div>
          <q-btn
            color="primary"
            label="Join Class"
            icon="add"
            flat
            style="border: 1px solid #46af4b"
          />
        </div>
      </q-card-section>

      <!-- Main content -->
      <q-card-section
        class="course-List row"
        style="
          display: flex;
          flex-wrap: wrap;
          column-gap: 50px;
          row-gap: 24px;

          width: 100%;
          height: auto;
        "
      >
        <div class="enrolledCoursesContainer col-2">
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
                <div class="course-title">Capstone 1</div>
                <div class="course-instructor">Rosalina D. Lacuesta</div>
              </div>
              <q-img
                src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
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
              <q-btn style="border: 1px solid #4b4b4b">
                <q-icon name="chevron_right" />
              </q-btn>
            </q-card-section>
          </div>
        </div>
        <div class="enrolledCoursesContainer col-2">
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
                <div class="course-title">Capstone 1</div>
                <div class="course-instructor">Rosalina D. Lacuesta</div>
              </div>
              <q-img
                src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
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
              <q-btn style="border: 1px solid #4b4b4b">
                <q-icon name="chevron_right" />
              </q-btn>
            </q-card-section>
          </div>
        </div>
        <div class="enrolledCoursesContainer col-2">
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
                <div class="course-title">Capstone 1</div>
                <div class="course-instructor">Rosalina D. Lacuesta</div>
              </div>
              <q-img
                src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
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
              <q-btn style="border: 1px solid #4b4b4b">
                <q-icon name="chevron_right" />
              </q-btn>
            </q-card-section>
          </div>
        </div>
        <div class="enrolledCoursesContainer col-2">
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
                <div class="course-title">Capstone 1</div>
                <div class="course-instructor">Rosalina D. Lacuesta</div>
              </div>
              <q-img
                src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
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
              <q-btn style="border: 1px solid #4b4b4b">
                <q-icon name="chevron_right" />
              </q-btn>
            </q-card-section>
          </div>
        </div>
        <div class="enrolledCoursesContainer col-2">
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
                <div class="course-title">Capstone 1</div>
                <div class="course-instructor">Rosalina D. Lacuesta</div>
              </div>
              <q-img
                src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
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
              <q-btn style="border: 1px solid #4b4b4b">
                <q-icon name="chevron_right" />
              </q-btn>
            </q-card-section>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>

<style scoped lang="sass">
.main-container
  width: 100%
  height: auto   // change height to auto after

.course-List

  width: 100%
.course-info
  display: flex
  position: absolute
  bottom: 0
  width: 100%
  background-color: rgba(0, 0, 0, 0.6)
  color: white
  padding: 8px
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
</style>

<script setup></script>
