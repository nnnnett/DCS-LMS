<template>
  <q-page>
    <!-- Main Container -->
    <div class="main-container q-px-xl">
      <!-- Course Text -->
      <q-card-section class="q-mt-lg flex q-px-none">
        <div class="text-h6 sampleCoursetxt" style="color: #4b4b4b">
          Enrolled Courses > Sample Course
        </div>
      </q-card-section>
      <!-- Main Content -->
      <q-card-section class="q-pb-none">
        <div class="headerNav q-px-md">
          <div class="q-px-xl" @click="showFeed">
            <q-card-section :class="{ active: feedLink }">Feed</q-card-section>
          </div>
          <div class="q-px-xl" @click="showTask">
            <q-card-section :class="{ active: taskLink }">Task</q-card-section>
          </div>
          <div class="q-px-xl" @click="showMyWorks">
            <q-card-section :class="{ active: myWorksLink }"
              >My Works</q-card-section
            >
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section>
        <!-- feed tab -->
        <div v-if="feedLink" class="feed-container">
          <q-card-section class="flex flex-center">
            <!-- course info  -->
            <q-responsive
              :ratio="16 / 9"
              class="col"
              style="max-height: 35vh; max-width: 70vw"
            >
              <div
                style="
                  background-image: url('https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702966/assets/mtmjbgnoj8viqadlanma.jpg');
                  background-size: cover;
                  background-position: center;
                  position: relative;
                  border-radius: 14px;
                  overflow: hidden;
                  display: flex;
                "
              >
                <div class="courseInstructor">
                  <q-img
                    src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                    style="
                      width: 70px;
                      height: 70px;
                      border-radius: 50%;
                      min-width: 50px;
                      min-height: 50px;
                    "
                  />
                  <div style="font-size: 1em" class="q-py-sm">
                    Rosalina D. Lacuesta
                  </div>
                  <div style="font-size: 1.5em; font-weight: 500">
                    Capstone 1
                  </div>
                </div>
              </div>
            </q-responsive>
          </q-card-section>
          <!-- course Description -->
          <q-card-section class="flex courseDescUpcoming">
            <div class="courseDescription q-px-xl">
              <div class="text-subtitle1">Course Description</div>
              <div style="text-indent: 50px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                praesentium, reiciendis veritatis voluptatum mollitia expedita
                accusamus quia vitae exercitationem temporibus cumque et magnam
                non dignissimos at iste dolores. Nemo, reprehenderit?
              </div>
            </div>

            <div class="upcomingAssign q-px-xl">
              <div style="text-transform: uppercase; color: #46af4b">
                UPCOMING assignment
              </div>
              <q-scroll-area style="height: 150px; width: 100%">
                <div v-for="n in 100" :key="n">
                  <q-card-section>
                    <div style="color: #8f9bb3; font-size: 1em">Due Today</div>
                    <div style="font-size: 1.2em; color: #4b4b4b">
                      Chapter 1: Introduction
                    </div>
                  </q-card-section>
                </div>
              </q-scroll-area>
            </div>
          </q-card-section>
          <!-- Course Announcement -->
          <q-card-section class="flex flex-center courseAnnouncement">
            <q-card class="announcementContent q-px-lg">
              <q-card-section
                class="flex"
                style="align-items: center; color: #4b4b4b"
              >
                <div class="q-mr-lg">
                  <q-img
                    src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                    style="width: 50px; height: 50px; border-radius: 50%"
                  />
                </div>
                <div>
                  <div>Rosalina D. Lacuesta</div>
                  <div class="text-caption">December 12, 2024</div>
                </div>
              </q-card-section>
              <q-card-section class="q-px-xl" style="color: #4b4b4b">
                <div class="text-h6 q-mb-sm">Capstone Forms</div>
                <div style="text-align: justify">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quasi accusamus ex nulla hic esse, numquam itaque obcaecati
                  id. Harum excepturi porro numquam quasi ut, corporis sit rem
                  fuga maiores beatae.
                </div>
              </q-card-section>
              <!-- download file -->
              <q-card-section class="q-px-xl">
                <div style="width: 100%">
                  <q-btn
                    target="_blank"
                    style="
                      text-decoration: none;
                      color: var(--q-primary);
                      text-align: justify;
                    "
                  >
                    //file name
                  </q-btn>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div>
                  <q-img
                    src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                    style="width: 30px; height: 30px; border-radius: 50%"
                  />
                  <!-- might need q-form -->
                  <div>
                    <q-input type="textarea" label="Comment here..." />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <!-- Course Materials-->
          <q-card-section class="flex flex-center courseMaterials">
            <q-card
              class="materialsContent q-px-lg"
              clickable
              @click="goToMaterialPage"
            >
              <q-card-section class="row materialsAssignment-container">
                <div class="col-1">
                  <q-img
                    src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                    style="width: 50px; height: 50px; border-radius: 50%"
                  />
                </div>
                <div class="col-9">
                  <div style="height: auto; text-align: justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fuga itaque harum tempora quas dolores voluptatibus optio
                    rem praesentium qui non deserunt maiores quam voluptas
                    eveniet quasi, repellat voluptate, similique laudantium.
                  </div>
                  <div class="text-caption">December 12, 2024</div>
                </div>
                <div
                  class="flex flex-center icon q-ml-md"
                  style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #46af4b;
                  "
                >
                  <q-icon name="library_books" color="white" size="24px" />
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <!-- Course Assignment  -->
          <q-card-section class="flex flex-center courseAssignment">
            <q-card class="assignmentContent q-px-lg">
              <q-card-section class="row materialsAssignment-container">
                <div class="col-1">
                  <q-img
                    src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                    style="width: 50px; height: 50px; border-radius: 50%"
                  />
                </div>
                <div class="col-9">
                  <div style="height: auto; text-align: justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fuga itaque harum tempora quas dolores voluptatibus optio
                    rem praesentium qui non deserunt maiores quam voluptas
                    eveniet quasi, repellat voluptate, similique laudantium.
                  </div>
                  <div class="text-caption">December 12, 2024</div>
                </div>

                <div
                  class="flex flex-center icon q-ml-md"
                  style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #46af4b;
                  "
                >
                  <q-icon name="edit_square" color="white" size="24px" />
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </div>
        <!-- task tab -->
        <div v-if="taskLink" class="task-container">
          <!-- Course Materials-->
          <q-card-section class="flex flex-center courseMaterials">
            <q-card class="materialsContent q-px-lg">
              <q-card-section class="row materialsAssignment-container">
                <div class="col-1">
                  <q-img
                    src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                    style="width: 50px; height: 50px; border-radius: 50%"
                  />
                </div>
                <div class="col-9">
                  <div style="height: auto; text-align: justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fuga itaque harum tempora quas dolores voluptatibus optio
                    rem praesentium qui non deserunt maiores quam voluptas
                    eveniet quasi, repellat voluptate, similique laudantium.
                  </div>
                  <div class="text-caption">December 12, 2024</div>
                </div>

                <div
                  class="flex flex-center icon q-ml-md"
                  style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #46af4b;
                  "
                >
                  <q-icon name="library_books" color="white" size="24px" />
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <!-- Course Assignment  -->
          <q-card-section class="flex flex-center courseAssignment">
            <q-card class="assignmentContent q-px-lg">
              <q-card-section class="row materialsAssignment-container">
                <div class="col-1">
                  <q-img
                    src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                    style="width: 50px; height: 50px; border-radius: 50%"
                  />
                </div>
                <div class="col-9">
                  <div style="height: auto; text-align: justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fuga itaque harum tempora quas dolores voluptatibus optio
                    rem praesentium qui non deserunt maiores quam voluptas
                    eveniet quasi, repellat voluptate, similique laudantium.
                  </div>
                  <div class="text-caption">December 12, 2024</div>
                </div>

                <div
                  class="flex flex-center icon q-ml-md"
                  style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #46af4b;
                  "
                >
                  <q-icon name="edit_square" color="white" size="24px" />
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </div>
        <!-- my works tab -->
        <div v-if="myWorksLink" class="myWorks-container">
          <q-card-section class="q-ml-xl filter-container">
            <div class="filterSelect">
              <q-select
                outlined
                label="Filter"
                v-model="filter"
                :options="selectMyWorks.options"
              />
            </div>
          </q-card-section>
          <!-- Submitted status -->
          <q-card-section class="flex flex-center courseMyWorks">
            <q-card class="myWorksContent q-pr-lg">
              <q-card-section class="row statusWorks-container q-px-md">
                <div class="col-9">
                  <div style="height: auto; text-align: justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fuga itaque harum tempora quas dolores voluptatibus optio
                    rem praesentium qui non deserunt maiores quam voluptas
                    eveniet quasi, repellat voluptate, similique laudantium.
                  </div>
                  <div class="text-caption">December 12, 2024</div>
                </div>
                <q-space></q-space>
                <div class="flex flex-center submittedStatus q-ml-md">
                  Submitted
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <!-- Pending status -->
          <q-card-section class="flex flex-center courseMyWorks">
            <q-card class="myWorksContent q-pr-lg">
              <q-card-section class="row statusWorks-container q-px-md">
                <div class="col-9">
                  <div style="height: auto; text-align: justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fuga itaque harum tempora quas dolores voluptatibus optio
                    rem praesentium qui non deserunt maiores quam voluptas
                    eveniet quasi, repellat voluptate, similique laudantium.
                  </div>
                  <div class="text-caption">December 12, 2024</div>
                </div>
                <q-space></q-space>
                <div class="flex flex-center pendingStatus q-ml-md">
                  Pending
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <!-- Missing Status -->
          <q-card-section class="flex flex-center courseMyWorks">
            <q-card class="myWorksContent q-pr-lg">
              <q-card-section class="row statusWorks-container q-px-md">
                <div class="col-9">
                  <div style="height: auto; text-align: justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fuga itaque harum tempora quas dolores voluptatibus optio
                    rem praesentium qui non deserunt maiores quam voluptas
                    eveniet quasi, repellat voluptate, similique laudantium.
                  </div>
                  <div class="text-caption">December 12, 2024</div>
                </div>
                <q-space></q-space>
                <div class="flex flex-center missingStatus q-ml-md">
                  Missing
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>
<style lang="sass" scoped>
.main-container
  width: 100vw
  height: auto
.headerNav
  font-size: 1rem
  display: flex
.headerNav div
  padding: 8px 16px
  cursor: pointer
  position: relative
.headerNav .active
  color: #28a745
.headerNav .active::after
  content: ''
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 3px
  background-color: #28a745
  // feed container
.feed-container
  height: auto
.courseInstructor
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 100%
  color: #ffffff
.courseDescUpcoming
  display: flex
  justify-content: center
.courseDescription
  width: 38%
  height: 250px
  border: 1px solid #46AF4B
  display: flex
  flex-direction: column
  justify-content: center
  text-align: justify
  color: #4B4B4B
  border-radius: 24px 0px 0px 24px
.upcomingAssign
  width: 38%
  height: 250px
  border: 1px solid #46AF4B
  border-radius: 0px 24px 24px 0px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: flex-start
  text-align: justify
  color: #4B4B4B
.courseAnnouncement
  height: auto
.announcementContent
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  width: 70vw
  height: auto

// course materials and assignment for feed and task
.courseMaterials
  height: auto
.materialsContent
  width: 70vw
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  height: auto
.materialsContent:hover
  background-color: #D9D9D9
  cursor: pointer
.courseAssignment
  height: auto
.assignmentContent
  width: 70vw
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  height: auto
// task container
.task-container
  height: auto
// my works container
.myWorks-container
  height: auto
// .courseMyWorks
//   border: 1px solid black
.myWorksContent
  width: 70vw
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  height: auto
.submittedStatus
  background-color: #46af4b
  border-radius: 14px
  height: 50px
  width: 100px
  color: #ffffffff
.pendingStatus
  background-color: #FFCF32
  border-radius: 14px
  height: 50px
  width: 100px
  color: #ffffffff
.missingStatus
  background-color: #FF7070
  border-radius: 14px
  height: 50px
  width: 100px
  color: #ffffffff
.filterSelect
  width: 350px
@media (max-width:1004px)
  .courseDescUpcoming
    display: flex
    flex-direction: column
    align-items: center
  .courseDescription
    width: 83%
    border-radius: 24px
  .upcomingAssign
    margin-top: 20px
    width: 83%
    border-radius: 24px
  .materialsAssignment-container
    display: flex
    flex-direction: column
    position: relative

  .icon
    position: absolute
    bottom: 10px
    right: 5px
    float: none
  .submittedStatus
    position: absolute
    bottom: 10px
    right: 5px
    float: none
  .pendingStatus
    position: absolute
    bottom: 10px
    right: 5px
    float: none
  .missingStatus
    position: absolute
    bottom: 10px
    right: 5px
    float: none
  .statusWorks-container
    display: flex
    flex-direction: column
    position: relative
@media (max-width:547px)
  .main-container
    width: 100%
    padding: 0px
  .feed-container
    width: 80vw
    margin: 20px
  .courseDescUpcoming
    margin: 0px
    padding: 0px
    width: 100%
  .courseDescription
    width: 100%
    height: auto
  .upcomingAssign
    width: 100%
  .courseAnnouncement
    padding: 16px 0px
  .announcementContent
    margin: 0px
    padding: 0px
    width: 100%
  .courseAssignment
    padding: 16px 0px
  .assignmentContent
    margin: 0px
    padding: 0px
    width: 100%
  .courseMaterials
    padding: 16px 0px
  .materialsContent
    margin: 0px
    padding: 0px
    width: 100%
  .myWorksContent
    margin: 0px
    padding: 0px
    width: 100%
  .sampleCoursetxt
    font-size: 1rem
    margin-left: 20px
  .headerNav
    padding: 0px
  .filter-container
    margin-left: 0px
  .filterSelect
    width: 250px
</style>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const feedLink = ref(true);
const taskLink = ref(false);
const myWorksLink = ref(false);

const filter = ref("");
const selectMyWorks = ref({
  options: ["All", "Submitted", "Missing", "Pending"],
});

const showFeed = () => {
  feedLink.value = true;
  taskLink.value = false;
  myWorksLink.value = false;
};

const showTask = () => {
  feedLink.value = false;
  taskLink.value = true;
  myWorksLink.value = false;
};

const showMyWorks = () => {
  feedLink.value = false;
  taskLink.value = false;
  myWorksLink.value = true;
};

async function goToMaterialPage() {
  router.replace(`/main/materialsPage`);
}
</script>
