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
          <div class="q-px-xl" @click="showTask" v-if="isStudent">
            <q-card-section :class="{ active: taskLink }">Task</q-card-section>
          </div>
          <div class="q-px-xl" @click="showMyWorks" v-if="isStudent">
            <q-card-section :class="{ active: myWorksLink }"
              >My Works</q-card-section
            >
          </div>
          <div class="q-px-xl" @click="showStudents" v-if="isInstructor">
            <q-card-section :class="{ active: studentList }"
              >Students</q-card-section
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
                <!-- Edit course button -->
                <div
                  v-if="isInstructor"
                  style="
                    position: absolute;
                    border: 1px solid #d9d9d9;
                    border-radius: 14px;
                    right: 5px;
                    top: 5px;
                  "
                >
                  <q-btn
                    flat
                    icon="edit"
                    color="white"
                    alt="edit button"
                    @click="editCoursePopup = true"
                  />
                </div>
                <div class="courseInstructor" v-if="courses">
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
                  <div style="font-size: 1.5em; font-weight: 500">
                    {{ courses.name }}
                  </div>
                  <div style="font-size: 1em" class="q-py-sm">
                    Rosalina D. Lacuesta
                  </div>

                  <div style="font-size: 1em; font-weight: 500">
                    Hub: 102723
                  </div>
                </div>
              </div>
            </q-responsive>
          </q-card-section>
          <!-- course Description -->
          <q-card-section class="flex courseDescUpcoming">
            <div class="courseDescription q-px-xl" v-if="courses">
              <div class="text-subtitle1">Course Description</div>
              <div style="text-indent: 50px">
                {{ courses.description }}
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
          <!-- post new announcement, materials, and assignments -->
          <q-card-section
            v-if="isInstructor"
            class="flex flex-center createNewPost-container"
          >
            <q-card class="q-px-lg createNewPost">
              <!-- create post navbar -->
              <q-card-section class="createNewPost-navBar q-mt-lg q-py-none">
                <div class="PostnavBar" @click="showAnnouncement">
                  <q-card-section :class="{ active: announcementLink }"
                    >Announcement</q-card-section
                  >
                </div>
                <div class="PostnavBar" @click="showMaterials">
                  <q-card-secton :class="{ active: materialsLink }"
                    >Material</q-card-secton
                  >
                </div>
                <div class="PostnavBar" @click="showAssignment">
                  <q-card-section :class="{ active: assignmentLink }"
                    >Assignment</q-card-section
                  >
                </div>
              </q-card-section>
              <q-card-section>
                <!-- Announcement -->
                <q-form>
                  <div v-if="announcementLink">
                    <q-card-section class="newPost-container">
                      New Announcement
                      <!-- textarea -->
                      <q-card-section
                        style="
                          background-color: #f3f3f3;
                          border: 1px solid #d9d9d9;
                          border-radius: 14px;
                        "
                      >
                        <q-input
                          type="textarea"
                          borderless
                          v-model="createAnnouncement"
                        />
                      </q-card-section>
                      <!-- q-file and button -->
                      <q-card-section class="q-px-none uploadAndBtn">
                        <q-file
                          v-model="announcementFile"
                          style="width: auto"
                          label="Upload File"
                          clearable
                          multiple
                        >
                          <template v-slot:prepend>
                            <q-icon name="attach_file" />
                          </template>
                        </q-file>
                        <!-- Cancel Button -->
                        <q-space />
                        <q-btn flat label="Cancel" class="q-mr-sm" />
                        <!-- Post Button -->
                        <q-btn
                          flat
                          label="Post"
                          style="
                            background-color: #46af4b;
                            color: #ffffff;
                            border-radius: 14px;
                          "
                        />
                      </q-card-section>
                    </q-card-section>
                  </div>
                </q-form>
                <!-- Material -->
                <q-forrm>
                  <div v-if="materialsLink">
                    <q-card-section class="newPost-container">
                      New Materials
                      <q-card-section
                        class="q-mb-md"
                        style="
                          background-color: #f3f3f3;
                          border: 1px solid #d9d9d9;
                          border-radius: 14px;
                        "
                      >
                        <q-input
                          type="input"
                          borderless
                          v-model="materialTitle"
                          label="Title of the Material"
                        />
                      </q-card-section>
                      <!-- textarea -->
                      <q-card-section
                        style="
                          background-color: #f3f3f3;
                          border: 1px solid #d9d9d9;
                          border-radius: 14px;
                        "
                      >
                        <q-input
                          type="textarea"
                          borderless
                          v-model="materialDescription"
                          label="Description of the Material (optional)"
                        />
                      </q-card-section>
                      <!-- q-file and button -->
                      <q-card-section class="q-px-none uploadAndBtn">
                        <q-file
                          v-model="materialsFile"
                          style="width: auto"
                          label="Upload File"
                          clearable
                          multiple
                        >
                          <template v-slot:prepend>
                            <q-icon name="attach_file" />
                          </template>
                        </q-file>
                        <!-- Cancel Button -->
                        <q-space />
                        <q-btn flat label="Cancel" class="q-mr-sm" />
                        <!-- Post Button -->
                        <q-btn
                          flat
                          label="Post"
                          style="
                            background-color: #46af4b;
                            color: #ffffff;
                            border-radius: 14px;
                          "
                        />
                      </q-card-section>
                    </q-card-section>
                  </div>
                </q-forrm>
                <!-- Assignment -->
                <div v-if="assignmentLink">
                  <q-card-section class="newPost-container">
                    New Assignment
                    <q-card-section
                      class="q-mb-md"
                      style="
                        background-color: #f3f3f3;
                        border: 1px solid #d9d9d9;
                        border-radius: 14px;
                      "
                    >
                      <q-input
                        type="input"
                        borderless
                        v-model="assignemntTitle"
                        label="Title of the Assignment"
                      />
                    </q-card-section>
                    <!-- textarea -->
                    <q-card-section
                      style="
                        background-color: #f3f3f3;
                        border: 1px solid #d9d9d9;
                        border-radius: 14px;
                      "
                    >
                      <q-input
                        type="textarea"
                        borderless
                        v-model="assignemntDescription"
                        label="Description of the assignment (optional)"
                      />
                    </q-card-section>

                    <!-- Due Date/Grade -->
                    <q-card-section class="q-px-none dueDateGrade-container">
                      <div class="q-pl-sm dueDateGrade">
                        <div style="color: #8f9bb3" class="text-caption">
                          Grade
                        </div>
                        <q-input
                          class="q-pl-sm"
                          type="number"
                          v-model="grade"
                          borderless
                        />
                      </div>
                      <div class="q-pl-sm dueDateGrade">
                        <div style="color: #8f9bb3" class="text-caption">
                          Due Date
                        </div>
                        <q-input type="date" v-model="dueDate" borderless />
                      </div>
                      <div class="q-pl-sm dueDateGrade">
                        <div style="color: #8f9bb3" class="text-caption">
                          Time Due
                        </div>
                        <q-input type="time" v-model="dueTime" borderless />
                      </div>
                    </q-card-section>

                    <!-- q-file and button -->
                    <q-card-section class="q-px-none uploadAndBtn">
                      <q-file
                        v-model="assignemntFile"
                        style="width: auto"
                        label="Upload File"
                        clearable
                        multiple
                      >
                        <template v-slot:prepend>
                          <q-icon name="attach_file" />
                        </template>
                      </q-file>
                      <!-- Cancel Button -->
                      <q-space />
                      <q-btn flat label="Cancel" class="q-mr-sm" />
                      <!-- Post Button -->
                      <q-btn
                        flat
                        label="Post"
                        style="
                          background-color: #46af4b;
                          color: #ffffff;
                          border-radius: 14px;
                        "
                      />
                    </q-card-section>
                  </q-card-section>
                </div>
              </q-card-section>
            </q-card>
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
                    Rosalina D. Lacuesta posted a new material: Capstone
                    Documentation Format.
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
            <q-card
              class="assignmentContent q-px-lg"
              clickable
              @click="gotoActivityPage"
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
                    Rosalina D. Lacuesta posted a new assignment : Chapter 1
                    Introduction
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
          <div>
            <q-dialog v-model="editCoursePopup" persistent>
              <q-card style="width: 700px; max-width: 80vw">
                <q-card-section>
                  <div class="text-h6">Edit Course</div>
                </q-card-section>
                <!-- q form -->
                <q-form>
                  <div
                    style="width: 100%; color: #4b4b4b"
                    class="q-px-xl flex flex-center"
                  >
                    <!-- <div style="width: 80%">
                    <q-card-section class="q-px-none">
                      Course Image
                    </q-card-section>
                    <q-file
                      v-model="courseImage"
                      borderless
                      class="q-px-md"
                      style="border: 1px solid #4b4b4b; border-radius: 14px"
                    >
                      <template #append>
                        <q-icon name="upload_file"></q-icon>
                      </template>
                    </q-file>
                  </div> -->
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
                      style="
                        width: 80%;
                        display: flex;
                        justify-content: flex-end;
                      "
                    >
                      <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn flat label="Save" type="submit" />
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
        </div>
        <!-- task tab -->
        <div v-if="taskLink" class="task-container">
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
                    Rosalina D. Lacuesta posted a new material: Capstone
                    Documentation Format.
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
            <q-card
              class="assignmentContent q-px-lg"
              clickable
              @click="gotoActivityPage"
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
                    Rosalina D. Lacuesta posted a new assignment : Chapter 1
                    Introduction
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

        <!-- for instructor show all students -->
        <div v-if="studentList" class="studentList-container">
          <q-card-section style="display: flex; justify-content: space-between">
            <div style="color: #8f9bb3; font-size: 1.5em">List of Students</div>
            <div style="color: #8f9bb3; font-size: 1.5em" class="q-pl-sm">
              Hub Code:
              <span style="color: #4b4b4b; font-weight: 600">022723</span>
            </div>
          </q-card-section>
          <!-- list of students -->
          <div>
            <q-table :rows="rows" :columns="columns" row-key="id"> </q-table>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>
<style lang="sass" scoped>
.main-container
  width: 99vw
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
.assignmentContent:hover
  background-color: #D9D9D9
  cursor: pointer
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
// studentList-container
.studentList-container
  height: auto
// create new post
.createNewPost-container
  height: auto
.createNewPost
  width: 70vw
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  height: auto
.createNewPost-navBar
  display: flex
  width: 100%
  justify-content:flex-start
  column-gap: 10px
  color: #8F9BB3
  cursor: pointer
  font-weight: 600
.createNewPost-navBar .active
  color: #4B4B4B
.createNewPost-navBar .active::after
  position: absolute
  background-color: #28a745
.newPost-container
  height: auto
.uploadAndBtn
  display: flex
.PostnavBar
  background-color: #f3f3f3
  height: 50px
  width: 190px
  justify-content: center
  align-items: center
  display: flex
  border-radius: 14px
.dueDateGrade-container
  display: flex
  justify-content: flex-end
  column-gap: 14px
  width: 100%
.dueDateGrade
  background-color: #f3f3f3
  border: 1px solid #d9d9d9
  width: 100px
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
@media (max-width:715px)
  .dueDateGrade-container
    display: flex
    flex-direction: column
    row-gap: 14px
    width: 100%
    align-items: flex-end
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
  .createNewPost-container
    padding: 16px 0px
  .createNewPost
    width: 100%
  .createNewPost-navBar
    display: flex
    flex-direction: column
    row-gap: 10px
  .PostnavBar
    width: 100%
  .uploadAndBtn
    display: flex
    flex-direction: column
    row-gap: 10px
</style>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

const loading = ref(false);
const route = useRoute();
const $q = useQuasar();
const editCoursePopup = ref(false);
const router = useRouter();

const feedLink = ref(true);
const taskLink = ref(false);
const myWorksLink = ref(false);
const studentList = ref(false);

const announcementLink = ref(true);
const materialsLink = ref(false);
const assignmentLink = ref(false);

// create new post
const createAnnouncement = ref("");
const announcementFile = ref("");

const materialTitle = ref("");
const materialDescription = ref("");
const materialsFile = ref("");

const assignemntTitle = ref("");
const assignemntDescription = ref("");
const assignemntFile = ref("");
const grade = ref("");
const dueDate = ref("");
const dueTime = ref("");
// role validation
const roleChecker = ref("student");
const isStudent = ref("");
const isInstructor = ref("");

const courses = ref(null);
const courseId = route.params.courseId;

const filter = ref("");
const selectMyWorks = ref({
  options: ["All", "Submitted", "Missing", "Pending"],
});

const showFeed = () => {
  feedLink.value = true;
  taskLink.value = false;
  myWorksLink.value = false;
  studentList.value = false;
};

const showTask = () => {
  feedLink.value = false;
  taskLink.value = true;
  myWorksLink.value = false;
  studentList.value = false;
};

const showMyWorks = () => {
  feedLink.value = false;
  taskLink.value = false;
  myWorksLink.value = true;
  studentList.value = false;
};

const showStudents = () => {
  studentList.value = true;
  feedLink.value = false;
  taskLink.value = false;
  myWorksLink.value = false;
};

const showAnnouncement = () => {
  announcementLink.value = true;
  materialsLink.value = false;
  assignmentLink.value = false;
};

const showMaterials = () => {
  announcementLink.value = false;
  materialsLink.value = true;
  assignmentLink.value = false;
};

const showAssignment = () => {
  announcementLink.value = false;
  materialsLink.value = false;
  assignmentLink.value = true;
};

async function goToMaterialPage() {
  router.replace(`/main/materialsPage`);
}

async function gotoActivityPage() {
  router.replace(`/main/assignmentPage`);
}

// checks if its user, instructor, admin
async function roleValidation() {
  if (roleChecker.value === "student") {
    return (isStudent.value = true);
  } else if (roleChecker.value === "instructor") {
    return (isInstructor.value = true);
  } else {
    return;
  }
}

const rows = ref([
  { id: 1, firstName: "John", middleName: "M.", lastName: "Doe" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Aane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },

  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
  { id: 2, firstName: "Jane", middleName: "A.", lastName: "Smith" },
]);

const columns = ref([
  { name: "firstName", label: "First Name", align: "left", field: "firstName" },
  {
    name: "middleName",
    label: "Middle Name",
    align: "left",
    field: "middleName",
  },
  { name: "lastName", label: "Last Name", align: "left", field: "lastName" },
]);

async function getCourses() {
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses?query=${courseId}`
    );
    courses.value = response.data[0];
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  getCourses();
  roleValidation();
});
</script>
