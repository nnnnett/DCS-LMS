<template>
  <q-page>
    <!-- Main Container -->
    <div class="main-container q-px-xl">
      <!-- Course Text -->
      <q-card-section class="q-mt-lg flex q-px-none">
        <div
          class="text-h6 sampleCoursetxt"
          style="color: #4b4b4b"
          v-if="courses"
        >
          <div v-if="courses.isArchived === false">
            Courses > {{ courses.name }}
          </div>
          <div v-if="courses.isArchived === true">
            Archived Courses > {{ courses.name }}
          </div>
        </div>
      </q-card-section>
      <!-- Main Content -->
      <q-card-section class="q-py-none">
        <div class="headerNav q-px-md">
          <div class="q-px-xl" @click="showFeed">
            <q-card-section :class="{ active: feedLink }">Feed</q-card-section>
          </div>
          <div class="q-px-xl" @click="showTask">
            <q-card-section :class="{ active: taskLink }"
              >Lessons</q-card-section
            >
          </div>
          <div class="q-px-xl" @click="showMyWorks">
            <q-card-section :class="{ active: myWorksLink }"
              >Task</q-card-section
            >
          </div>
          <div class="q-px-xl" @click="showQuizes">
            <q-card-section :class="{ active: quizLink }"
              >Quizzes</q-card-section
            >
          </div>
          <div class="q-px-xl" @click="showStudents">
            <q-card-section :class="{ active: studentList }"
              >Students</q-card-section
            >
          </div>
          <div class="q-px-xl" @click="showGrades">
            <q-card-section :class="{ active: studentGrades }"
              >Grades</q-card-section
            >
          </div>
        </div>
      </q-card-section>
      <!-- <q-card-section class="q-pb-none" v-if="isInstructor">
        <div class="headerNav q-px-md">
          <div class="q-px-xl" @click="showFeed">
            <q-card-section :class="{ active: feedLink }">Feed</q-card-section>
          </div>
        </div>
      </q-card-section> -->
      <q-separator />

      <q-card-section class="q-pr-none">
        <!-- feed tab -->
        <div v-if="feedLink" class="feed-container">
          <q-card-section class="flex flex-center" v-if="courses">
            <!-- course info  -->
            <q-responsive
              :ratio="16 / 9"
              class="col"
              style="max-height: 35vh; max-width: 70vw"
            >
              <div
                :style="{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${courses.file})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column', // Adjusts for better stacking on mobile
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }"
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

                <div class="courseInstructor">
                  <!-- Instructor Image -->
                  <q-img
                    :src="courses.instructorImage"
                    style="
                      width: 70px;
                      height: 70px;
                      border-radius: 50%;
                      min-width: 30px;
                      min-height: 30px;
                    "
                    class="q-mb-sm instructorImg"
                  />

                  <!-- Course Title -->
                  <div
                    class="q-pb-xs text-center"
                    style="
                      font-size: 1.2em;
                      font-weight: 500;
                      text-transform: capitalize;
                    "
                  >
                    {{ courses.name }} - {{ courses.section }}
                  </div>

                  <!-- Instructor Name -->
                  <div
                    style="font-size: 1em"
                    class="q-py-sm text-center instructorImg"
                  >
                    {{ courses.instructorName }}
                  </div>

                  <!-- Copy Button -->
                  <q-btn
                    icon-right="content_paste"
                    @click="copyToClipboard(courses._id)"
                    no-caps
                    flat
                    style="
                      font-size: 0.9em;
                      font-weight: 500;
                      cursor: pointer;
                      color: inherit;
                      text-align: center;
                      display: block;
                    "
                  >
                    Class: {{ courses._id }}
                  </q-btn>
                </div>
              </div>
            </q-responsive>
          </q-card-section>
          <!-- course Description -->
          <q-card-section class="flex courseDescUpcoming">
            <div class="courseDescription q-px-md" v-if="courses">
              <div class="text-subtitle1">Course Description</div>
              <div style="text-indent: 20px">
                {{ courses.description }}
              </div>
            </div>

            <div class="upcomingAssign q-px-sm">
              <div style="text-transform: uppercase; color: #46af4b">
                UPCOMING assignment
              </div>
              <q-scroll-area
                style="height: 150px; width: 100%"
                v-if="materials"
              >
                <div v-for="material in materials" :key="material">
                  <q-card-section>
                    <div style="color: #8f9bb3; font-size: 1em">
                      {{ material.createdAt.split("T")[0] }}
                    </div>
                    <div style="font-size: 1.2em; color: #4b4b4b">
                      {{ material.name }}
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
                <div class="PostnavBar" @click="showCreateQuizPopup = true">
                  <q-card-section>Quiz</q-card-section>
                </div>
              </q-card-section>
              <q-card-section>
                <!-- Announcement -->
                <q-form @submit.prevent="postAnnouncement">
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
                        <!-- Cancel Button -->
                        <q-space />
                        <q-btn flat label="Cancel" class="q-mr-sm" />
                        <!-- Post Button -->
                        <q-btn
                          type="submit"
                          :loading="loading"
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
                <q-form @submit.prevent="postMaterial">
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
                          type="submit"
                          :loading="loading"
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
                <!-- Assignment -->
                <q-form @submit.prevent="postAssignment">
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
                            class="q-px-sm"
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
                        <!-- <div class="q-pl-sm dueDateGrade">
                          <div style="color: #8f9bb3" class="text-caption">
                            Time Due
                          </div>
                          <q-input type="time" v-model="dueTime" borderless />
                        </div> -->
                      </q-card-section>
                      <!-- q-file and button -->
                      <q-card-section class="q-px-none uploadAndBtn">
                        <q-file
                          v-model="assignemntFile"
                          style="width: auto"
                          label="Upload File"
                          clearable
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
                          :loading="loading"
                          type="submit"
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
                <!-- create quiz -->
                <div class="newPost-container">
                  <q-dialog v-model="showCreateQuizPopup">
                    <q-card class="flex flex-center column">
                      <q-card-section>
                        Do you want to create a quiz?
                      </q-card-section>

                      <div>
                        <q-btn
                          :to="`../quizPage/` + courseId"
                          label="Yes"
                        ></q-btn>
                        <q-btn label="Cancel" v-close-popup></q-btn>
                      </div>
                    </q-card>
                  </q-dialog>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <div v-if="materials">
            <div v-for="material in materials" :key="material._id">
              <div v-if="material.type === 'announcement'">
                <!-- Course Announcement -->
                <q-card-section class="flex flex-center courseAnnouncement">
                  <q-card class="announcementContent q-px-lg">
                    <q-card-section class="contentHeader">
                      <div class="imgInstructor">
                        <div class="q-mr-lg">
                          <q-img
                            :src="material.instructorImage"
                            style="
                              width: 50px;
                              height: 50px;
                              border-radius: 50%;
                            "
                          />
                        </div>
                        <div>
                          <div>{{ material.instructorName }}</div>
                          <div class="text-caption">
                            {{ material.createdAt.split("T")[0] }}
                          </div>
                        </div>
                      </div>
                      <div class="dueDateTxtBtn">
                        <div v-if="isInstructor">
                          <q-btn-dropdown flat dropdown-icon="more_vert">
                            <q-list>
                              <q-item
                                clickable
                                v-close-popup
                                @click="editAnnouncement = true"
                              >
                                <q-item-section>
                                  <q-item-label>Edit</q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-item
                                clickable
                                v-close-popup
                                @click="deleteAnnouncement = true"
                              >
                                <q-item-section>
                                  <q-item-label>Delete</q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-btn-dropdown>
                        </div>
                      </div>
                    </q-card-section>
                    <!-- announcement content -->
                    <q-card-section class="q-px-xl" style="color: #4b4b4b">
                      <div class="text-h6 q-mb-sm">Announcement</div>
                      <div style="text-align: justify">
                        {{ material.description }}
                      </div>
                    </q-card-section>

                    <!-- edit annoucement -->

                    <div>
                      <q-dialog v-model="editAnnouncement" persistent>
                        <q-card style="width: 700px; max-width: 80vw">
                          <q-form
                            @submit.prevent="updateAnnouncement(material._id)"
                          >
                            <q-card-section>
                              <div class="text-h6">Edit Announcement</div>
                            </q-card-section>
                            <!-- q form -->

                            <div
                              style="width: 100%; color: #4b4b4b"
                              class="q-px-xl flex flex-center"
                            >
                              <div style="width: 90%">
                                <q-card-section class="q-px-none">
                                  Announcement Description
                                </q-card-section>
                                <q-input
                                  v-model="editAnnouncementContent"
                                  type="textarea"
                                  borderless
                                  class="q-px-md"
                                  style="
                                    border: 1px solid #4b4b4b;
                                    border-radius: 14px;
                                  "
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
                                <q-card-actions
                                  align="right"
                                  class="bg-white text-teal"
                                >
                                  <q-btn type="submit" flat label="Save" />
                                </q-card-actions>
                                <q-card-actions
                                  align="right"
                                  class="bg-white text-teal"
                                >
                                  <q-btn flat label="Cancel" v-close-popup />
                                </q-card-actions>
                              </div>
                            </div>
                          </q-form>
                        </q-card>
                      </q-dialog>
                    </div>
                    <!-- edit announcement popup confirm -->
                    <div>
                      <q-dialog v-model="deleteAnnouncement" persistent>
                        <q-card>
                          <q-form
                            @submit.prevent="
                              deleteCurrentAnnouncement(material._id)
                            "
                          >
                            <q-card-section class="bg-primary text-white">
                              you sure you want to delete?
                            </q-card-section>
                            <q-card-section align="right">
                              <q-btn flat type="submit" label="Delete" />
                              <q-btn
                                flat
                                type="submit"
                                label="Cancel"
                                v-close-popup
                              />
                            </q-card-section>
                          </q-form>
                        </q-card>
                      </q-dialog>
                    </div>
                    <q-separator />
                    <q-card-section>
                      <div>
                        <!-- might need q-form / type comments -->
                        <!-- <q-form @submit.prevent="addCommentF(material._id)">
                          <div>
                            <q-input
                              type="textarea"
                              v-model="addComment"
                              label="Comment here..."
                            />
                            <q-btn
                              type="submit"
                              label="Add Comment"
                              :loading="loading"
                            />
                          </div>
                        </q-form> -->

                        <!-- shows comments -->

                        <!-- <div style="text-align: justify">
                          <q-card-section style="display: flex">
                            <q-img
                              src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                              style="
                                min-width: 30px;
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                              "
                            />
                            <div style="width: 90%" class="q-ml-sm">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Dolorum provident iste harum rem aliquid!
                              Culpa quam laudantium consequatur at officiis
                              dicta provident commodi, iste consequuntur iure
                              labore. Cumque, mollitia officia.
                            </div>
                          </q-card-section>
                          <q-card-section style="display: flex">
                            <q-img
                              src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                              style="
                                min-width: 30px;
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                              "
                            />
                            <div style="width: 90%" class="q-ml-sm"></div>
                          </q-card-section>
                        </div> -->
                      </div>
                    </q-card-section>
                  </q-card>
                </q-card-section>
              </div>
              <!-- Course Assignment  -->
              <div v-if="material.type !== 'announcement'">
                <q-card-section class="flex flex-center courseAssignment">
                  <q-card
                    class="assignmentContent q-px-lg"
                    clickable
                    @click="gotoActivityPage(material._id)"
                  >
                    <q-card-section class="row materialsAssignment-container">
                      <div class="col-1">
                        <q-img
                          :src="material.instructorImage"
                          style="width: 50px; height: 50px; border-radius: 50%"
                        />
                      </div>
                      <div class="col-9">
                        <div style="height: auto; text-align: justify">
                          {{ material.instructorName }} <br />
                          <span
                            style="text-transform: uppercase; font-weight: bold"
                          >
                            {{ material.type }} :
                          </span>
                          {{ material.name }}
                        </div>
                        <div class="text-caption">
                          {{ material.createdAt.split("T")[0] }}
                        </div>
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
            </div>
          </div>
          <div>
            <q-dialog v-model="editCoursePopup" persistent>
              <q-card style="width: 700px; max-width: 80vw">
                <q-card-section>
                  <div class="text-h6">Edit Course</div>
                </q-card-section>
                <!-- q form -->
                <q-form @submit.prevent="updateCourse">
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
                        accept="image/*"
                        borderless
                        class="q-px-md"
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
                      style="
                        width: 80%;
                        display: flex;
                        justify-content: flex-end;
                      "
                    >
                      <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn
                          :loading="loading"
                          flat
                          label="Save"
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
        </div>
        <!-- Lessons tab -->
        <div v-if="taskLink" class="task-container">
          <!-- Course Lessons  -->
          <div v-if="materials">
            <div v-for="material in materials" :key="material._id">
              <q-card-section
                class="flex flex-center courseAssignment"
                v-if="material.type === 'material'"
              >
                <q-card
                  class="assignmentContent q-px-lg"
                  clickable
                  @click="gotoActivityPage(material._id)"
                >
                  <q-card-section class="row materialsAssignment-container">
                    <div class="col-1">
                      <q-img
                        :src="material.instructorImage"
                        style="width: 50px; height: 50px; border-radius: 50%"
                      />
                    </div>
                    <div class="col-9">
                      <div style="height: auto; text-align: justify">
                        Rosalina D. Lacuesta posted a new
                        <span style="text-transform: capitalize"
                          >{{ material.type }} : {{ material.name }}</span
                        >
                      </div>
                      <div class="text-caption">
                        {{ material.createdAt.split("T")[0] }}
                      </div>
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
          </div>
        </div>
        <!-- my works tab -->
        <div v-if="myWorksLink" class="myWorks-container">
          <div v-if="materials">
            <q-card-section class="q-ml-xl filter-container">
              <!-- <div class="filterSelect">
                <q-select
                  outlined
                  label="Filter"
                  v-model="filter"
                  :options="selectMyWorks.options"
                />
              </div> -->
            </q-card-section>
            <div v-for="material in materials" :key="material._id">
              <!-- Submitted status -->
              <q-card-section
                class="flex flex-center courseMyWorks"
                v-if="material.type === 'assignment'"
              >
                <q-card
                  class="assignmentContent q-pr-lg"
                  clickable
                  @click="gotoActivityPage(material._id)"
                >
                  <q-card-section class="row statusWorks-container q-px-md">
                    <div class="col-1">
                      <q-img
                        :src="material.instructorImage"
                        style="width: 50px; height: 50px; border-radius: 50%"
                      />
                    </div>
                    <div class="col-9">
                      <div style="height: auto; text-align: justify">
                        Rosalina D. Lacuesta posted a new
                        <span style="text-transform: capitalize"
                          >{{ material.type }} : {{ material.name }}</span
                        >
                      </div>
                      <div class="text-caption">
                        {{ material.createdAt.split("T")[0] }}
                      </div>
                    </div>
                    <q-space></q-space>
                    <!-- <div class="flex flex-center submittedStatus q-ml-md">
                      Submitted
                    </div> -->
                    <!-- <div class="flex flex-center pendingStatus q-ml-md">
                      Pending
                    </div> -->
                    <!-- <div class="flex flex-center missingStatus q-ml-md">
                      Missing
                    </div> -->
                  </q-card-section>
                </q-card>
              </q-card-section>
            </div>
          </div>
          <!-- Pending status -->
          <!-- Missing Status -->
          <!-- <q-card-section class="flex flex-center courseMyWorks">
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
          </q-card-section> -->
        </div>
        <!-- for instructor show all students -->
        <div v-if="studentList" class="studentList-container">
          <q-card-section style="display: flex; justify-content: space-between">
            <div style="color: #8f9bb3; font-size: 1.5em">List of Students</div>
          </q-card-section>
          <!-- list of students -->
          <div>
            <q-table
              style="box-shadow: none"
              :rows="studentRows"
              :columns="studentColumns"
              separator="cell"
              row-key="id"
              :rows-per-page-options="[0, 5, 10, 15, 20, 25, 30]"
            >
              <template #body="props">
                <q-tr :key="props.row._id" :props="props">
                  <q-td>
                    {{ props.row.username }}
                  </q-td>
                  <q-td>
                    {{ props.row.lastName }}
                  </q-td>
                  <q-td>
                    {{ props.row.firstName }}
                  </q-td>
                </q-tr>
              </template>
              <template v-slot:top-right v-if="isInstructor">
                <q-btn
                  color="primary"
                  icon-right="archive"
                  label="Export to csv"
                  no-caps
                  @click="exportStudentList"
                />
              </template>
            </q-table>
          </div>
        </div>
        <!-- show grade for st -->
        <div class="viewReport-container" v-if="studentGrades">
          <q-card-section>
            <div class="text-subtitle1 text-primary text-weight-medium">
              Grades
            </div>
          </q-card-section>

          <div>
            <q-table
              style="box-shadow: none"
              :rows="gradeRows"
              :columns="gradeColumns"
              row-key="id"
              :rows-per-page-options="[0, 5, 10, 15, 20, 25, 30]"
              separator="cell"
            >
              <template #head="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in gradeColumns"
                    :key="col.name"
                    :props="props"
                    class="text-center"
                  >
                    {{ col.label }}
                    <div
                      v-if="col.gradeSummary"
                      class="text-gray-6 text-caption"
                    >
                      {{ col.gradeSummary }}
                    </div>
                  </q-th>
                </q-tr>
              </template>

              <template #body="props">
                <q-tr :key="props.row.id" :props="props">
                  <q-td v-for="col in gradeColumns" :key="col.name">
                    {{ props.row[col.field] }}
                  </q-td>
                </q-tr>
              </template>
              <template v-slot:top-right v-if="!isStudent">
                <q-btn
                  color="primary"
                  icon-right="archive"
                  label="Export to csv"
                  no-caps
                  @click="exportStudentSubmission"
                />
              </template>
            </q-table>
          </div>
        </div>
        <!-- show quizes for students -->
        <div v-if="quizLink">
          <q-card-section>
            <div class="text-subtitle1 text-primary text-weight-medium">
              Quizes
            </div>
          </q-card-section>
          <div v-if="quizes">
            <q-card
              style="
                border: 1px solid #d9d9d9;
                border-radius: 14px;
                column-gap: 14px;
                box-shadow: none;
                display: flex;
              "
              v-for="quiz in quizes"
              :key="quiz"
              class="q-mb-md"
            >
              <q-card-section
                clickable
                @click="goToQuizPage(quiz._id)"
                class="q-py-md"
                style="width: 100%; display: flex; align-items: center"
              >
                <div class="q-mr-md"><q-icon name="quiz" size="24px" /></div>
                <div>
                  <div>{{ quiz.name }}</div>
                  <div>
                    Total Number of Questions: {{ quiz.questions.length }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
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

  align-items: center
  flex-wrap: wrap
.headerNav div
  padding: 8px 16px
  cursor: pointer
  position: relative
  text-align: center
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
.contentHeader
  align-items: center
  display: flex
  color: #4b4b4b
  width: 100%
.imgInstructor
  display: flex
  align-items: center
  width: 50%
.dueDateTxtBtn
  display: flex
  justify-content: flex-end
  width: 50%
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
  justify-content: flex-start
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
  width: 120px

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
  .headerNav
    font-size: 0.9rem
    flex-direction: column
    align-items: flex-start
  .headerNav div
    padding: 8px
    width: 100%
  .headerNav .active::after
    height: 2px
@media (max-width:650px)
  .main-container
    width: 100%
    padding: 0px
  .instructorImg
    visibility: hidden
    position: absolute
  .courseInstructor div
    font-size: 1em !important
  .courseInstructor q-img
    width: 30px !important
    height: 30px !important
    visibility: hidden
  .q-btn
    font-size: 0.8em !important
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
  .contentHeader
    display: flex
    flex-direction: column
  .imgInstructor
    width: 100%
  .dueDateTxtBtn
    width: 100%
    margin-top: 10px
    display: flex
    justify-content: flex-end
    margin-top: 15px
@media (max-width: 480px)
  .headerNav
    font-size: 0.8rem
    padding: 0
  .headerNav div
    padding: 6px
</style>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import { Notify, exportFile } from "quasar";
import { uploadToCloud } from "src/components/cloudinaryUtility";
import { getCoursesMaterials } from "src/components/courseMaterials";
import { viewViewerUser } from "src/components/user";
import { addCommentMaterials } from "src/components/addComments";

const loading = ref(false);
const route = useRoute();
const editCoursePopup = ref(false);
const router = useRouter();
const editAnnouncementContent = ref("");
const editAnnouncement = ref(false);
const deleteAnnouncement = ref(false);

// course nav
const feedLink = ref(true);
const taskLink = ref(false);
const myWorksLink = ref(false);
const studentList = ref(false);
const studentGrades = ref(false);
const quizLink = ref(false);
const announcementLink = ref(true);
const materialsLink = ref(false);
const assignmentLink = ref(false);

const addComment = ref("");
const getComment = ref();
// create new post
const createAnnouncement = ref("");
const materialTitle = ref("");
const materialDescription = ref("");
const materialsFile = ref("");
const assignemntTitle = ref("");
const assignemntDescription = ref("");
const assignemntFile = ref("");
const grade = ref();
const dueDate = ref();
const dueTime = ref("");
// role validation
const roleChecker = ref("");
const isStudent = ref("");
const isInstructor = ref("");

const courses = ref(null);
const courseId = route.params.courseId;

const materials = ref(null);
const materiialId = ref(null);
const filter = ref("");
const selectMyWorks = ref({
  options: ["All", "Submitted", "Missing", "Pending"],
});

// quiz

// update/edit course
const courseImage = ref("");
const courseName = ref("");
const courseSection = ref("");
const courseDescription = ref("");

// quizz
const quizes = ref("");
const showCreateQuizPopup = ref(false);
const isoDate = ref();
const showFeed = () => {
  feedLink.value = true;
  taskLink.value = false;
  myWorksLink.value = false;
  studentList.value = false;
  studentGrades.value = false;
  quizLink.value = false;
};
const showTask = () => {
  feedLink.value = false;
  taskLink.value = true;
  myWorksLink.value = false;
  studentList.value = false;
  studentGrades.value = false;
  quizLink.value = false;
};
const showMyWorks = () => {
  feedLink.value = false;
  taskLink.value = false;
  myWorksLink.value = true;
  studentList.value = false;
  studentGrades.value = false;
  quizLink.value = false;
};

const showQuizes = () => {
  feedLink.value = false;
  taskLink.value = false;
  myWorksLink.value = false;
  studentList.value = false;
  studentGrades.value = false;
  quizLink.value = true;
};

const showGrades = () => {
  studentList.value = false;
  feedLink.value = false;
  taskLink.value = false;
  myWorksLink.value = false;
  studentGrades.value = true;
  quizLink.value = false;
};

const showStudents = () => {
  studentList.value = true;
  feedLink.value = false;
  taskLink.value = false;
  myWorksLink.value = false;
  studentGrades.value = false;
  quizLink.value = false;
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

async function gotoActivityPage(materialId) {
  router.replace(`/main/materialPage/` + courses.value._id + "/" + materialId);
}
// checks if its user, instructor, admin
async function displayUserInfo() {
  const checkUser = await viewViewerUser();
  roleChecker.value = checkUser.role;
  if (roleChecker.value === "student") {
    return (isStudent.value = true);
  } else if (roleChecker.value === "instructor") {
    return (isInstructor.value = true);
  }
}
const studentRows = ref([]);
const studentColumns = ref([
  {
    name: "username",
    label: "Student ID",
    align: "left",
    field: "username",
    sortable: true,
  },
  {
    name: "lastName",
    label: "Surname",
    align: "left",
    field: "lastName",
  },
  {
    name: "firstName",
    label: "First Name",
    align: "left",
    field: "firstName",
  },
]);

// Fetch the student data when the component mounts

// Function to get the students from the API
async function getStudents() {
  const token = localStorage.getItem("authToken");
  let response = null;
  try {
    const user = await viewViewerUser();

    response = await axios.get(
      `${process.env.api_host}/users?courseId=${courseId}`,
      {
        headers: { authorization: token },
      }
    );

    studentRows.value = response.data; // Assuming 'data' contains the user list
  } catch (err) {
    console.error("Error fetching students:", err);
  }
}

const gradeColumns = ref([]);
const gradeRows = ref([]);

// Define base columns
const baseColumns = [
  {
    name: "username",
    label: "Username",
    align: "left",
    field: "username",
    sortable: true,
  },
  {
    name: "name",
    label: "Name",
    align: "left",
    field: "name",
  },
];

// Fetch grades and assignments from API and adjust columns
async function getGradesAndAssignments() {
  const token = localStorage.getItem("authToken");
  let response = null;
  try {
    const user = await viewViewerUser();
    console.log(user.role);
    if (user.role === "student") {
      response = await axios.get(
        `${process.env.api_host}/courses/getGrade?courseId=${courseId}&studentId=${user._id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
    } else {
      response = await axios.get(
        `${process.env.api_host}/courses/getGrade?courseId=${courseId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
    }

    const students = response.data;

    // Generate dynamic columns for grades and assignments
    gradeColumns.value = [...baseColumns, ...generateDynamicColumns(students)];

    // Process rows for grades and assignments
    gradeRows.value = students.map((student, index) => {
      const gradeDetails = student.grades.reduce((acc, grade) => {
        acc[grade.quizName] = grade.total ? `${grade.score} ` : grade.score; // Format as "score/total" if total exists
        return acc;
      }, {});

      const assignmentDetails = student.assignments.reduce(
        (acc, assignment) => {
          console.log("ass", assignment);
          acc[assignment.materialName] = assignment.grade
            ? `${assignment.grade} `
            : "Not graded";
          return acc;
        },
        {}
      );

      return {
        id: index + 1,
        username: student.username,
        name: student.name,
        ...gradeDetails,
        ...assignmentDetails, // Add dynamic fields for assignments
      };
    });
  } catch (err) {
    console.error("Error fetching grades and assignments:", err);
  }
}

// Generate dynamic columns based on grades and assignments data
function generateDynamicColumns(students) {
  const dynamicFields = new Set();
  const gradeSummaries = {};

  students.forEach((student) => {
    student.grades.forEach((grade) => {
      dynamicFields.add(grade.quizName);

      if (!gradeSummaries[grade.quizName]) {
        gradeSummaries[grade.quizName] = {
          total: 0,
          count: 0,
        };
      }

      if (grade.total) {
        gradeSummaries[grade.quizName].total += parseInt(grade.total);
        gradeSummaries[grade.quizName].count += parseInt(grade.score || 0);
      }
    });

    student.assignments.forEach((assignment) => {
      dynamicFields.add(assignment.materialName);
    });
  });

  return Array.from(dynamicFields).map((fieldName) => ({
    name: fieldName,
    label: fieldName,
    align: "left",
    field: fieldName,
    gradeSummary: gradeSummaries[fieldName]
      ? `${gradeSummaries[fieldName].count}/${gradeSummaries[fieldName].total}`
      : null,
  }));
}

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
async function postAnnouncement() {
  loading.value = true;
  const token = localStorage.getItem("authToken");
  try {
    if (!createAnnouncement.value) {
      Notify.create({
        type: "warning",
        message: "Please type Something before Posting!",
      });
      return;
    }
    const response = await axios.post(
      `${process.env.api_host}/courses/material/${courseId}`,
      {
        description: createAnnouncement.value,
        type: "announcement",
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    Notify.create({
      type: "positive",
      message: "Announcement Posted Succesfully",
    });
    getMaterials();
    createAnnouncement.value = "";
    return;
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went Wrong",
    });
  } finally {
    loading.value = false;
  }
}
async function postMaterial() {
  loading.value = true;
  const token = localStorage.getItem("authToken");
  const fileSubmit = await uploadToCloud(materialsFile.value);
  try {
    if (!materialTitle.value || !materialsFile.value) {
      Notify.create({
        type: "warning",
        message: "Fll in all required fields",
      });
      return;
    }
    await axios.post(
      `${process.env.api_host}/courses/material/${courseId}`,
      {
        name: materialTitle.value,
        description: materialDescription.value,
        type: "material",
        file: fileSubmit,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    Notify.create({
      type: "positive",
      message: "Material Posted Succesfully",
    });
    getMaterials();
    materialTitle.value = "";
    materialDescription.value = "";
    materialsFile.value = null;
    return;
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went Wrong",
    });
  } finally {
    loading.value = false;
  }
}
async function postAssignment() {
  loading.value = true;
  const token = localStorage.getItem("authToken");
  const fileSubmit = await uploadToCloud(assignemntFile.value);
  try {
    if (
      !assignemntTitle.value ||
      !assignemntFile.value ||
      !grade.value ||
      !dueDate.value
    ) {
      Notify.create({
        type: "warning",
        message: "Fill in required fields",
      });
      return;
    }
    const intGrade = parseInt(grade.value);
    await axios.post(
      `${process.env.api_host}/courses/material/${courseId}`,
      {
        name: assignemntTitle.value,
        description: assignemntDescription.value,
        grade: intGrade,
        dueDate: dueDate.value,
        type: "assignment",
        file: fileSubmit,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    Notify.create({
      type: "positive",
      message: "Assignment Posted Succesfully",
    });
    getMaterials();
    assignemntTitle.value = "";
    assignemntFile.value = "";
    assignemntDescription.value = "";
    grade.value = "";
    dueDate.value = "";
    return;
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went Wrong",
    });
  } finally {
    loading.value = false;
  }
}

async function getMaterials() {
  try {
    const materialsDetails = await getCoursesMaterials(courseId);
    materials.value = await materialsDetails;
  } catch (err) {
    console.error(err);
  }
}

async function updateCourse() {
  loading.value = true;

  try {
    const token = localStorage.getItem("authToken");
    let imageUrl = null;
    if (courseImage.value) {
      imageUrl = await uploadToCloud(courseImage.value);
    }

    // Prepare the payload with conditional inclusion of the image URL
    const payload = {
      name: courseName.value,
      section: courseSection.value,
      description: courseDescription.value,
    };

    // Add image URL if it's provided
    if (imageUrl) {
      payload.file = imageUrl;
    }
    const response = await axios.post(
      `${process.env.api_host}/courses/update/${courseId}`,
      payload,
      {
        headers: { "Content-Type": "application/json", authorization: token },
      }
    );
    Notify.create({
      type: "positive",
      message: "Course Updated Succesfully",
    });
    location.reload();
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went wrong",
    });
  } finally {
    loading.value = false;
  }
}

async function updateAnnouncement(materialId) {
  if (!editAnnouncementContent.value) {
    Notify.create({
      type: "negative",
      message: "Announcement content cannot be empty",
    });
    return;
  }
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${process.env.api_host}/courses/material/update/${materialId}`,
      {
        description: editAnnouncementContent.value,
        type: "announcement",
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );

    Notify.create({
      type: "positive",
      message: "Announcement Edited Successfully",
    });

    getMaterials();
    editAnnouncement.value = false;
  } catch (err) {
    console.error(err.response || err);
    Notify.create({
      type: "negative",
      message: err.response?.data?.message || "Something went wrong",
    });
  }
}

async function deleteCurrentAnnouncement(materialId) {
  loading.value = true;
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${process.env.api_host}/courses/material/update/${materialId}`,
      {
        isArchived: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    Notify.create({
      type: "positive",
      message: "Announcement Deleted Successfully",
    });

    getMaterials();

    deleteAnnouncement.value = false;
  } catch (err) {
    console.error(err.response || err);
    Notify.create({
      type: "negative",
      message: err.response?.data?.message || "Something went wrong",
    });
  } finally {
    loading.value = false;
  }
}

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

function exportStudentSubmission() {
  const content = [
    gradeColumns.value.map((col) => wrapCsvValue(col.label)).join(","), // Header row
    ...gradeRows.value.map((row) =>
      gradeColumns.value
        .map((col) =>
          wrapCsvValue(
            typeof col.field === "function" ? col.field(row) : row[col.field],
            col.format,
            row
          )
        )
        .join(",")
    ),
  ].join("\r\n");

  const status = exportFile("Student-Submissions.csv", content, "text/csv");

  if (status !== true) {
    Notify.create({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
}

function exportStudentList() {
  // Naive encoding to CSV format
  const content = [
    studentColumns.value.map((col) => wrapCsvValue(col.label)).join(","), // Header row
    ...studentRows.value.map((row) =>
      studentColumns.value
        .map((col) =>
          wrapCsvValue(
            typeof col.field === "function" ? col.field(row) : row[col.field],
            col.format,
            row
          )
        )
        .join(",")
    ),
  ].join("\r\n");

  const status = exportFile("Student-List.csv", content, "text/csv");

  if (status !== true) {
    Notify.create({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
}

async function addCommentF(materialId) {
  try {
    loading.value = true;
    await addCommentMaterials(materialId, addComment.value);
    addComment.value = "";
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function getQuizes() {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${process.env.api_host}/courses/getQuiz?courseId=${courseId}`
    );
    quizes.value = response.data;
  } catch (err) {
    console.error(err);
  }
}

// async function getCommentsF(materialId) {
//   try {
//     const response = await axios.get(
//       `${process.env.api_host}/courses/getComment?courseId=${materialId}`
//     );
//     getComment.value = await response.data;
//     console.log("dsa0", getComment.value);
//     return getComment.value;
//   } catch (err) {
//     console.error(err);
//   }
// }

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      Notify.create({
        type: "positive",
        message: "Copied to clipboard!",
      });
    },
    (err) => {
      console.error("Could not copy text: ", err);
      Notify.create({
        type: "negative",
        message: "Failed to copy to clipboard.",
      });
    }
  );
}

async function goToQuizPage(quizId) {
  router.replace(`/main/answerQuizPage/` + courseId + "/" + quizId);
}

onMounted(async () => {
  await getStudents();
  getStudents();
  getGradesAndAssignments();
  getQuizes();
  getMaterials();
  getCourses();
  displayUserInfo();
});
</script>
