<template>
  <q-page>
    <!-- Main Container -->
    <div class="main-container">
      <!-- Back btn and Assignment name -->
      <q-card-section class="flex flex-center headerNavAssign" v-if="materials">
        <div class="backBtn">
          <q-btn
            label="<"
            size="20px"
            flat
            :to="`/main/coursePage/` + courseId"
            style="
              background-color: #f2f7ff;
              border-radius: 50%;
              height: 50px;
              width: 50px;
            "
          />
          <div class="q-ml-lg text-h6">{{ materials.name }}</div>
        </div>
      </q-card-section>
      <q-card-section
        class="flex flex-center q-py-none headerNavAssign"
        style="width: 100%"
      >
        <div class="materialNav" v-if="materials.type === 'assignment'">
          <div @click="showAssignmentDetails">
            <q-card-section
              class="q-pl-none"
              :class="{ active: assgnmentDetails }"
            >
              Assignment Details
            </q-card-section>
          </div>
          <div @click="showStudentSubmission" v-if="isInstructor">
            <q-card-section :class="{ active: studentSubmission }"
              >Student Submissions
            </q-card-section>
          </div>
        </div>
        <div class="materialNav" v-if="materials.type === 'material'">
          <div @click="showAssignmentDetails">
            <q-card-section
              class="q-pl-none"
              :class="{ active: assgnmentDetails }"
            >
              Materials Details
            </q-card-section>
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <!-- assignment details -->
      <div
        class="assignment-Submit-Container flex flex-center"
        v-if="assgnmentDetails"
      >
        <!-- assgnment  -->
        <q-card-section class="courseAssignment">
          <q-card class="assignemntContent q-px-lg">
            <q-card-section class="contentHeader">
              <div class="imgInstructor">
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
              </div>
              <div class="dueDateTxtBtn">
                <div>
                  <div>DUE JAN. 06 2025</div>
                  <div>100 points</div>
                </div>
                <div v-if="isInstructor">
                  <q-btn-dropdown flat dropdown-icon="more_vert">
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editAssignment = true"
                      >
                        <q-item-section>
                          <q-item-label>Edit</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </div>
            </q-card-section>
            <!-- Assignment Edit -->
            <div>
              <q-dialog v-model="editAssignment" persistent>
                <q-card style="width: 700px; max-width: 80vw">
                  <q-card-section>
                    <div class="text-h6">Edit Assignment</div>
                  </q-card-section>
                  <!-- q form -->
                  <q-form>
                    <div
                      style="width: 100%; color: #4b4b4b"
                      class="q-px-xl flex flex-center"
                    >
                      <div style="width: 90%">
                        <q-card-section class="q-px-none">
                          Title
                        </q-card-section>
                        <q-input
                          v-model="editTitle"
                          type="text"
                          borderless
                          class="q-px-md"
                          style="border: 1px solid #4b4b4b; border-radius: 14px"
                        >
                        </q-input>
                      </div>
                      <div style="width: 90%">
                        <q-card-section class="q-px-none">
                          Assignment Description
                        </q-card-section>
                        <q-input
                          v-model="editDescription"
                          type="textarea"
                          borderless
                          class="q-px-md"
                          style="border: 1px solid #4b4b4b; border-radius: 14px"
                        >
                        </q-input>
                      </div>
                      <div style="width: 90%">
                        <q-card-section class="q-px-none">
                          Assignment Description
                        </q-card-section>
                        <q-file
                          v-model="newFile"
                          style="width: auto"
                          label="Upload File"
                          clearable
                          multiple
                        >
                          <template v-slot:prepend>
                            <q-icon name="attach_file" />
                          </template>
                        </q-file>
                      </div>
                      <q-card-section class="q-px-none dueDateGrade-container">
                        <div class="q-pl-sm dueDateGrade">
                          <div style="color: #8f9bb3" class="text-caption">
                            Grade
                          </div>
                          <q-input
                            class="q-pl-sm"
                            type="number"
                            v-model="editGrade"
                            borderless
                          />
                        </div>
                        <div class="q-pl-sm dueDateGrade">
                          <div style="color: #8f9bb3" class="text-caption">
                            Due Date
                          </div>
                          <q-input
                            type="date"
                            v-model="editDueDate"
                            borderless
                          />
                        </div>
                        <div class="q-pl-sm dueDateGrade">
                          <div style="color: #8f9bb3" class="text-caption">
                            Time Due
                          </div>
                          <q-input
                            type="time"
                            v-model="editDueTime"
                            borderless
                          />
                        </div>
                      </q-card-section>

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
                          <q-btn flat label="Save" type="submit" />
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
            <!-- Activity Image -->
            <q-card-section>
              <div style="height: auto">
                <q-img
                  src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702966/assets/mtmjbgnoj8viqadlanma.jpg"
                  style="
                    height: auto;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    border-radius: 14px;
                    overflow: hidden;
                    display: flex;
                  "
                />
              </div>
            </q-card-section>
            <!-- assignment content -->
            <q-card-section
              class="q-px-xl assignmentContentTxt"
              style="color: #4b4b4b"
            >
              <div class="text-h6 q-mb-sm">{{ materials.name }}</div>
              <div style="text-align: justify">
                {{ materials.description }}
              </div>
            </q-card-section>
            <!-- download file -->
            <q-card-section class="q-px-xl assignmentFile">
              <div style="width: 100%">
                <q-btn
                  target="_blank"
                  style="text-decoration: none; color: var(--q-primary)"
                >
                  //file name lore accusamus ex nulla hic esse, numquam itaque
                  obcaecati id. Harum excepturi porro numquam quasi ut, corporis
                  sit rem fuga maiores beatae.
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

        <!-- Submit Work -->
        <q-card-section class="submitWork" v-if="isAssignment">
          <div>
            <q-card class="submitWorkContent" v-if="isStudent">
              <q-card-section>
                <div class="workStatusTxt">
                  <div class="text-h5 text-weight-medium">Your Work</div>
                  <!-- pending status -->
                  <div
                    v-if="isPending"
                    class="text-weight-medium"
                    style="color: #ffcf32; font-size: 1rem"
                  >
                    Pending
                  </div>
                  <!-- done status -->
                  <div
                    v-if="isDone"
                    class="text-weight-medium"
                    style="color: #46af4b; font-size: 1rem"
                  >
                    Done
                  </div>
                  <!-- missing status -->
                  <div
                    v-if="isMissing"
                    class="text-weight-medium"
                    style="color: #ff7070; font-size: 1rem"
                  >
                    Missing
                  </div>
                </div>
                <!-- List of submitted Work -->
                <div>
                  <div class="submittedWork-container q-mt-sm">
                    <div>wewe</div>
                  </div>
                </div>
                <!-- file input and submit button -->
                <div>
                  <!-- file input for submit work -->
                  <div
                    class="q-mt-sm"
                    style="border: 1px solid #46af4b; border-radius: 14px"
                  >
                    <q-file
                      class="q-px-xl"
                      borderless
                      v-model="submitWork"
                      label="Attach Activity"
                      clearable
                      icon="home"
                    >
                      <template v-slot:append>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </div>
                  <!-- no unsubmit btn if no attach file * vice versa -->
                  <!-- Submit button -->
                  <div
                    class="q-mt-sm"
                    style="
                      background-color: #46af4b;
                      color: #ffffff;
                      border-radius: 14px;
                    "
                  >
                    <q-btn
                      v-model="subBtn"
                      :disable="!submitWork"
                      flat
                      label="Submit"
                      style="width: 100%; text-transform: capitalize"
                    />
                  </div>
                  <!-- Unsubmit Button -->
                  <div
                    class="q-mt-sm"
                    style="
                      background-color: #d9d9d9;
                      color: #ffffff;
                      border-radius: 14px;
                    "
                  >
                    <q-btn
                      :disable="!subBtn"
                      flat
                      label="Unsubmit"
                      style="width: 100%; text-transform: capitalize"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </div>
      <!-- student submission -->
      <div class="studentSubmission-container" v-if="studentSubmission">
        <q-card-section class="flex flex-center">
          <div class="submissionDetails">
            <div class="q-px-md submissionAnalytics">
              <div>4</div>
              <div>Submitted</div>
            </div>
            <div class="q-px-md submissionAnalytics">
              <div>30</div>
              <div>Students</div>
            </div>
            <div class="q-px-md submissionAnalytics">
              <div>1</div>
              <div>Graded</div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="flex flex-center">
          <div style="width: 70vw">
            <q-table
              :filter="filter"
              :rows="rows"
              :columns="columns"
              row-key="id"
              separator="cell"
            >
              <template v-slot:top>
                <div>
                  <q-input
                    dense
                    debounce="300"
                    color="primary"
                    v-model="filter"
                    :rows-per-page-options="[0, 15, 20, 25, 30]"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </template>
              <template #body="props">
                <q-tr key="id" :props="props">
                  <q-td> {{ props.row.name }}</q-td>
                  <q-td> {{ props.row.submissions }}</q-td>
                  <q-td> {{ props.row.status }}</q-td>
                  <q-td>
                    <div style="width: 20%">
                      <q-form @submit.prevent="gradeSubmission">
                        <q-input v-model="gradeInput" type="number" />
                      </q-form>
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>
<style lang="sass" scoped>
.main-container
  height: auto
.headerNavAssign
  width: 100%
  color: #4B4B4B
.backBtn
  width: 80vw
  display: flex
  align-items: center
.assignment-Submit-Container
  display: flex
.courseAssignment
  height: auto
.assignemntContent
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  width: 50vw
  height: auto
.submitWork
  height: auto
  align-self: flex-start
.submitWorkContent
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  width: 20vw
  height: auto
.submittedWork-container
  border: 1px solid #D9D9D9
  border-radius: 14px
  display: flex
  justify-content: center
  align-items: center
  height: 50px
.workStatusTxt
  display: flex
  justify-content: space-between
  align-items: center
  color: #4B4B4B
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
.dueDateGrade-container
  display: flex
  justify-content: flex-end
  column-gap: 14px
.dueDateGrade
  background-color: #f3f3f3
  border: 1px solid #d9d9d9
.materialNav
  width: 70vw
  display: flex
.materialNav div
  cursor: pointer
  position: relative
.materialNav .active
  color: #28a745
.materialNav .active::after
  content: ''
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 3px
  background-color: #28a745
.submissionDetails
  width: 70vw
  display: flex
  height: 100px
  align-items: center
.submissionAnalytics
  display: flex
  flex-direction: column
  border-left: 1px solid black
  height: 90px
  justify-content: space-evenly
@media (max-width:1004px)
  .assignemntContent
    width: 90vw
  .assignment-Submit-Container
    display: flex
    flex-direction: column
  .submitWork
    justify-content: center
    display: flex
    width: 100vw
  .submitWorkContent
    width: 90vw
@media (max-width:574px)
  .assignmentContentTxt
    padding: 0px
  .assignmentFile
    padding: 14px 0px
    max-height: 50px
    overflow: hidden
    text-overflow: ellipsis
    width: 100%
    white-space: nowrap
  .contentHeader
    display: flex
    flex-direction: column
  .imgInstructor
    width: 100%
  .dueDateTxtBtn
    width: 100%
    margin-top: 10px
    display: flex
    justify-content: flex-start
    margin-top: 15px
  .dueDateGrade-container
    display: flex
    flex-direction: column
    align-items: flex-end
    row-gap: 14px
    width: 100%
  .materialNav
    display: flex
    flex-direction: column
  .dueDateGrade
    max-width: 120px
    display: flex
    flex-direction: column
    justify-content: flex-end
    row-gap: 14px
    width: 100%
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCoursesMaterials } from "src/components/courseMaterials";
import { viewViewerUser } from "src/components/user";
import axios from "axios";

const route = useRoute();
const submitWork = ref("");
const subBtn = ref("");
const editTitle = ref("");
const editDueDate = ref("");
const editDueTime = ref("");
const editGrade = ref("");
const editDescription = ref("");
const newFile = ref("");
// role validation
const roleValidation = ref("");
const isStudent = ref("");
const isInstructor = ref("");
// submitted status
const submittedStatus = ref("done");
const isDone = ref("");
const isMissing = ref("");
const isPending = ref("");

const editAssignment = ref(false);
const gradeInput = ref("");

const courseId = route.params.courseId;
const materialId = route.params.materialId;

const materials = ref("");
const isAssignment = ref("");

const assgnmentDetails = ref(true);
const studentSubmission = ref(false);

async function showAssignmentDetails() {
  assgnmentDetails.value = true;
  studentSubmission.value = false;
}

async function showStudentSubmission() {
  assgnmentDetails.value = false;
  studentSubmission.value = true;
}
const filter = ref("");
// checks if its user, instructor, admin

// check the users submitted assignment status
async function checkSubmitted() {
  if (submittedStatus.value === "done") {
    return (isDone.value = true);
  } else if (submittedStatus.value === "pending") {
    return (isPending.value = true);
  } else {
    return (isMissing.value = true);
  }
}

async function assignmentChecker() {
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses/getMaterial?query=${materialId}`
    );
    materials.value = response.data[0];
    if (materials.value.type === "assignment") {
      return (isAssignment.value = true);
    }
  } catch (err) {
    console.error(err);
  }
}

const rows = ref([
  { id: 1, name: "John", submissions: "M", status: "submitted", grade: "100" },
  {
    id: 2,
    name: "Kenneth",
    submissions: "A.",
    status: "submitted",
    grade: "90",
  },
  { id: 3, name: "Jules", submissions: "L", status: "pending", grade: "90" },
  { id: 4, name: "Khris", submissions: "U", status: "missing", grade: "90" },
  { id: 5, name: "Brt", submissions: "N", status: "missing", grade: "70" },
]);
const columns = ref([
  { name: "name", label: "Full name ", align: "left", field: "name" },
  {
    name: "submissions",
    label: "Activity",
    align: "left",
    field: "submissions",
  },
  { name: "status", label: "Status", align: "left", field: "status" },
  { name: "grade", label: "grade", align: "left", field: "grade" },
]);

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

async function gradeSubmission() {
  console.log("submited");
}

onMounted(() => {
  assignmentChecker();
  displayUserInfo();
  checkSubmitted();
});
</script>
