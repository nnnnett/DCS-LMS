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
                    :src="materials.instructorImage"
                    style="width: 50px; height: 50px; border-radius: 50%"
                  />
                </div>
                <div>
                  <div>{{ materials.instructorName }}</div>
                  <div class="text-caption">{{ materials.createdAt }}</div>
                </div>
              </div>
              <div class="dueDateTxtBtn">
                <div v-if="materials.type === 'assignment'">
                  <div>Due {{ newDueDate }}</div>
                  <div>{{ materials.grade }} Points</div>
                </div>
                <div v-if="isInstructor">
                  <div v-if="materials.type === 'assignment'">
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
                        <q-item
                          clickable
                          v-close-popup
                          @click="deleteMaterials = true"
                        >
                          <q-item-section>
                            <q-item-label>Delete</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </div>
                  <div v-if="materials.type === 'material'">
                    <q-btn-dropdown flat dropdown-icon="more_vert">
                      <q-list>
                        <q-item
                          clickable
                          v-close-popup
                          @click="editMaterial = true"
                        >
                          <q-item-section>
                            <q-item-label>Edit</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="deleteMaterials = true"
                        >
                          <q-item-section>
                            <q-item-label>Delete</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </div>
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
                  <q-form @submit.prevent="updateAssignment">
                    <div
                      style="width: 100%; color: #4b4b4b"
                      class="q-px-xl flex flex-center"
                    >
                      <div style="width: 90%">
                        <q-card-section class="q-px-none">
                          Title
                        </q-card-section>
                        <q-input
                          v-model="editTitleAssignment"
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
                          v-model="editDescriptionAssignment"
                          type="textarea"
                          borderless
                          class="q-px-md"
                          style="border: 1px solid #4b4b4b; border-radius: 14px"
                        >
                        </q-input>
                      </div>

                      <div style="width: 90%">
                        <q-file
                          v-model="newFileAssignment"
                          style="width: auto"
                          label="Upload File"
                          clearable
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
                          <q-btn
                            flat
                            :loading="loading"
                            label="Save"
                            type="submit"
                          />
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
            <!-- materials edit -->
            <div>
              <div>
                <q-dialog v-model="editMaterial" persistent>
                  <q-card style="width: 700px; max-width: 80vw">
                    <q-card-section>
                      <div class="text-h6">Edit Material</div>
                    </q-card-section>
                    <!-- q form -->
                    <q-form @submit.prevent="updateMaterial">
                      <div
                        style="width: 100%; color: #4b4b4b"
                        class="q-px-xl flex flex-center"
                      >
                        <div style="width: 90%">
                          <q-card-section class="q-px-none">
                            Title
                          </q-card-section>
                          <q-input
                            v-model="editTitleMaterial"
                            type="text"
                            borderless
                            class="q-px-md"
                            style="
                              border: 1px solid #4b4b4b;
                              border-radius: 14px;
                            "
                          >
                          </q-input>
                        </div>
                        <div style="width: 90%">
                          <q-card-section class="q-px-none">
                            Material Description
                          </q-card-section>
                          <q-input
                            v-model="editDescriptionMaterial"
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

                        <div style="width: 90%">
                          <q-file
                            v-model="newFileMaterials"
                            style="width: auto"
                            label="Upload File"
                            clearable
                          >
                            <template v-slot:prepend>
                              <q-icon name="attach_file" />
                            </template>
                          </q-file>
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
                            <q-btn
                              flat
                              :loading="loading"
                              label="Save"
                              type="submit"
                            />
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
            </div>
            <div>
              <q-dialog v-model="deleteMaterials" persistent>
                <q-card>
                  <q-form
                    @submit.prevent="deleteCurrentMaterials(materials._id)"
                  >
                    <q-card-section class="bg-primary text-white">
                      you sure you want to delete?
                    </q-card-section>
                    <q-card-section align="right">
                      <q-btn
                        flat
                        type="submit"
                        :loading="loading"
                        label="Delete"
                      />
                      <q-btn flat type="submit" label="Cancel" v-close-popup />
                    </q-card-section>
                  </q-form>
                </q-card>
              </q-dialog>
            </div>
            <!-- Activity Image -->
            <div v-if="isRenderFile">
              <q-card-section>
                <div ref="canvasContainer" class="canvas-container"></div>
              </q-card-section>
            </div>
            <div v-if="isImageFile">
              <q-card-section>
                <div style="height: auto">
                  <q-img
                    :src="materials.file"
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
            </div>

            <!-- download file -->
            <div v-if="isDocuFile" class="q-py-sm">
              <q-card-section class="q-px-xl assignmentFile">
                <div style="width: 100%">
                  <q-btn
                    @click="downloadFile(materials.file)"
                    no-caps
                    flat
                    target="_blank"
                    style="
                      text-decoration: none;
                      color: var(--q-primary);
                      width: auto;
                      border: 1px solid #46af4b;
                    "
                  >
                    {{ materials.name }}
                  </q-btn>
                </div>
              </q-card-section>
            </div>
            <!-- assignment content -->
            <q-card-section
              class="q-px-xl assignmentContentTxt"
              style="color: #4b4b4b"
            >
              <div class="text-h6 q-mb-sm">Description</div>
              <div
                style="
                  text-align: left;
                  font-size: 1.2em;
                  line-height: 1.6;
                  white-space: pre-wrap;
                "
              >
                {{ materials.description }}
              </div>
            </q-card-section>

            <q-separator />
            <!-- comment -->
            <!-- <q-card-section>
              <div>
                <q-img
                  src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                  style="width: 30px; height: 30px; border-radius: 50%"
                />

                <div>
                  <q-input type="textarea" label="Comment here..." />
                </div>
              </div>
            </q-card-section> -->
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
                  <div>
                    {{ submittedStatus }}
                  </div>
                  <!-- missing status -->
                </div>
                <!-- List of submitted Work -->
                <div>
                  <div class="submittedWork-container q-mt-sm">
                    <div style="width: 100%">
                      <q-btn
                        v-if="isDone"
                        @click="downloadFile(mySubmission.file)"
                        target="_blank"
                        flat
                        no-caps
                        style="
                          text-decoration: none;
                          width: 100%;
                          color: var(--q-primary);
                        "
                      >
                        {{ mySubmission.file.split("/").pop() }}
                      </q-btn>
                    </div>
                  </div>
                </div>
                <!-- file input and submit button -->
                <q-form @submit.prevent="submitAssignment">
                  <div>
                    <!-- file input for submit work -->
                    <div
                      class="q-mt-sm"
                      style="border: 1px solid #46af4b; border-radius: 14px"
                    >
                      <q-file
                        v-if="!isDone"
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
                        v-if="!isDone"
                        type="submit"
                        :disable="!submitWork"
                        :loading="loading"
                        flat
                        label="Submit"
                        style="width: 100%; text-transform: capitalize"
                      />
                    </div>
                    <!-- Unsubmit Button -->
                    <!-- <div
                      class="q-mt-sm"
                      style="
                        background-color: #d9d9d9;
                        color: #ffffff;
                        border-radius: 14px;
                      "
                    >
                      <q-btn
                        flat
                        label="Unsubmit"
                        style="width: 100%; text-transform: capitalize"
                      />
                    </div> -->
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </div>
      <!-- student submission -->
      <div class="studentSubmission-container" v-if="studentSubmission">
        <!-- <q-card-section class="flex flex-center">
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
        </q-card-section> -->
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
                <q-tr :key="props.row.id" :props="props">
                  <q-td>{{ props.row.studentId }}</q-td>
                  <q-td> {{ props.row.name }}</q-td>
                  <q-td>
                    <q-btn
                      @click="downloadFile(props.row.submissions)"
                      target="_blank"
                      flat
                      no-caps
                      style="
                        text-decoration: none;
                        width: 100%;
                        color: var(--q-primary);
                      "
                    >
                      {{ props.row.submissions.split("/").pop() }}
                    </q-btn>
                  </q-td>
                  <q-td>
                    <div style="width: 100%">
                      <q-form
                        @submit.prevent="
                          gradeSubmission(props.row.id, props.row.gradeInput)
                        "
                      >
                        <div style="display: flex; align-items: center">
                          <div style="width: 50px">
                            <q-input
                              v-model="props.row.gradeInput"
                              name=""
                              type="number"
                            />
                          </div>
                          <div class="q-ml-sm">
                            <q-btn
                              no-caps
                              :loading="loading"
                              type="submit"
                              class="bg-primary text-white"
                              label="enter"
                            />
                          </div>
                        </div>
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

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMaterialData } from "src/components/courseMaterials";
import { viewViewerUser } from "src/components/user";
import { uploadToCloud } from "src/components/cloudinaryUtility";
import axios from "axios";
import { Notify } from "quasar";
// for 3d viewer
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const loading = ref(false);
const canvasContainer = ref(null);
const route = useRoute();
const router = useRouter();
const submitWork = ref("");

// const editDueTimeAssignment = ref("");
const editTitleAssignment = ref("");
const editDueDate = ref("");
const editAssignment = ref(false);
const editGrade = ref("");
const editDescriptionAssignment = ref("");
const newFileAssignment = ref(null);
const currentAssignmentFile = ref("");
const gradeInput = ref("");
const isAssignment = ref("");
// role validation
const roleValidation = ref("");
const isStudent = ref("");
const isInstructor = ref("");
// submitted status
const submittedStatus = ref("");
const isDone = ref(false);
const isMissing = ref("");
const isPending = ref("");

// edit materials

const editMaterial = ref(false);
const editTitleMaterial = ref("");
const editDescriptionMaterial = ref("");
const newFileMaterials = ref(null);
const currentMaterialFile = ref("");
const courseId = route.params.courseId;
const materialId = route.params.materialId;

const materials = ref("");
const deleteMaterials = ref(false);

const assgnmentDetails = ref(true);
const studentSubmission = ref(false);

const user = ref("");
const mySubmission = ref("");
const newDueDate = ref();

async function showAssignmentDetails() {
  assgnmentDetails.value = true;
  studentSubmission.value = false;
}

async function showStudentSubmission() {
  assgnmentDetails.value = false;
  studentSubmission.value = true;
}

const isImageFile = ref(true);
const isRenderFile = ref(true);
const isDocuFile = ref(true);
const filter = ref("");
const allowedExtensionImage = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "svg",
  "webp",
];

// checks if its user, instructor, admin

// check the users submitted assignment status

async function checkSubmitted() {
  try {
    const token = localStorage.getItem("authToken");
    user.value = await viewViewerUser();

    const response = await axios.get(
      `${process.env.api_host}/courses/getSubmission?studentId=${user.value._id}&materialId=${materialId}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    mySubmission.value = response.data[0];
    if (response.data.length >= 1) {
      submittedStatus.value = "done";
      isDone.value = true;
    } else {
      submittedStatus.value = "pending";
    }
  } catch (err) {
    console.error(err);
  }
}

async function assignmentChecker() {
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses/getMaterial?query=${materialId}`
    );
    materials.value = response.data[0];
    await formatTime(materials.value.dueDate);
    await fileExtension(materials.value.file);

    if (materials.value.type === "assignment") {
      return (isAssignment.value = true);
    }
  } catch (err) {
    console.error(err);
  }
}

const rows = ref([]); // Starts as an empty array

const columns = ref([
  { name: "studentId", label: "Student Id", align: "left", field: "studentId" },
  { name: "name", label: "Full name", align: "left", field: "name" },
  {
    name: "submissions",
    label: "Submissions",
    align: "left",
    field: "submissions",
  },
  { name: "grade", label: "Grade", align: "left", field: "grade" },
]);

async function getSubmittedAssignment() {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${process.env.api_host}/courses/getSubmission?materialId=${materialId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    rows.value = response.data.map((item) => ({
      id: item._id,
      studentId: item.studentUsername,
      name: item.studentName,
      submissions: item.file,
      grade: item.grade,
    }));
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

async function gradeSubmission(submissionId, grade) {
  loading.value = true;
  try {
    const token = localStorage.getItem("authToken");
    if (!grade) {
      Notify.create({
        type: "warning",
        message: "Grade must not less than to 0",
      });
      return;
    } else if (grade > 100) {
      Notify.create({
        type: "warning",
        message: "Grade must not exced to 100",
      });
      return;
    }
    const response = await axios.post(
      `${process.env.api_host}/courses/submission/grade/${submissionId}`,
      {
        grade: grade,
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
      message: "Graded Successfully",
    });
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "warning",
      message: "Student Graded Already",
    });
  } finally {
    loading.value = false;
  }
}
async function fileExtension(file) {
  // Check if the file contains an extension
  const fileChecker = file.split(".").pop().toLowerCase();

  // If the file doesn't have an extension or is not allowed, return early
  if (allowedExtensionImage.includes(fileChecker)) {
    isImageFile.value = true;
    isRenderFile.value = false;
    isDocuFile.value = false;
  } else if (fileChecker === "glb") {
    isRenderFile.value = true;
    isImageFile.value = false;
    isDocuFile.value = false;
    render(file);
  } else {
    isDocuFile.value = true;
    isImageFile.value = false;
    isRenderFile.value = false;
  }

  return;
}
async function render(fileObject) {
  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 40); // Adjust camera position for a good initial view

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
  canvasContainer.value.appendChild(renderer.domElement);

  // Add ambient light
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true; // Enable shadows
  scene.add(directionalLight);
  // Add OrbitControls for interactivity
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Smooths the interaction
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 20; // Minimum zoom distance
  controls.maxDistance = 50; // Maximum zoom distance
  controls.maxTargetRadius = 40;
  controls.target.set(0, 1, 0); // Center the controls on the model

  // Load the 3D model
  const loader = new GLTFLoader();
  loader.load(
    `${fileObject}`,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Animate the scene
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // Update the controls each frame
        renderer.render(scene, camera);
      };
      animate();
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the model:", error);
    }
  );

  // Resize handler
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
function downloadFile(fileUrl) {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.target = "_blank";
  link.click();
}
async function formatTime(dueDate) {
  const date = new Date(dueDate);

  // Extract date components
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date
  const formattedDate = `${month}-${day}-${year}:${hours}-${minutes}-${seconds}`;
  newDueDate.value = formattedDate;
  return;
}

async function displayMaterialsInfoAssignment() {
  const materialInfo = await getMaterialData(materialId);
  editTitleAssignment.value = materialInfo.name;
  editDescriptionAssignment.value = materialInfo.description;
  editGrade.value = materialInfo.grade;
  editDueDate.value = materialInfo.dueDate;
  currentAssignmentFile.value = materialInfo.file;
}

async function updateAssignment() {
  loading.value = true;
  try {
    const token = localStorage.getItem("authToken");

    let fileSubmit = null;
    if (newFileAssignment.value) {
      fileSubmit = await uploadToCloud(newFileAssignment.value);
      const response = await axios.post(
        `${process.env.api_host}/courses/material/update/${materialId}`,
        {
          name: editTitleAssignment.value,
          description: editDescriptionAssignment.value,
          grade: editGrade.value,
          dueDate: editDueDate.value,
          file: fileSubmit,
          type: "assignment",
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
    } else {
      const response = await axios.post(
        `${process.env.api_host}/courses/material/update/${materialId}`,
        {
          name: editTitleAssignment.value,
          description: editDescriptionAssignment.value,
          grade: editGrade.value,
          dueDate: editDueDate.value,
          type: "assignment",
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
    }
    fileExtension(fileSubmit);
    Notify.create({
      type: "positive",
      message: "Announcement Edited Successfully",
    });
  } catch (err) {
    console.error(err.response || err);
    Notify.create({
      type: "negative",
      message: err.response?.data?.message || "Something went wrong",
    });
  } finally {
    loading.value = false;
    editAssignment.value = false;
    location.reload();
  }
}

async function displayMaterialsInfoMaterial() {
  const materialInfo = await getMaterialData(materialId);
  editTitleMaterial.value = materialInfo.name;
  editDescriptionMaterial.value = materialInfo.description;
  currentMaterialFile.value = materialInfo.file;
}

async function updateMaterial() {
  loading.value = true;
  try {
    const token = localStorage.getItem("authToken");

    let fileSubmit = null;
    if (newFileMaterials.value) {
      fileSubmit = await uploadToCloud(newFileMaterials.value);
      const response = await axios.post(
        `${process.env.api_host}/courses/material/update/${materialId}`,
        {
          name: editTitleMaterial.value,
          description: editDescriptionMaterial.value,
          file: fileSubmit,
          type: "material",
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
    } else {
      const response = await axios.post(
        `${process.env.api_host}/courses/material/update/${materialId}`,
        {
          name: editTitleMaterial.value,
          description: editDescriptionMaterial.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
    }
    fileExtension(fileSubmit);
    Notify.create({
      type: "positive",
      message: "Material Edited Successfully",
    });
  } catch (err) {
    console.error(err.response || err);
    Notify.create({
      type: "negative",
      message: err.response?.data?.message || "Something went wrong",
    });
  } finally {
    loading.value = false;
    editMaterial.value = false;
    location.reload();
  }
}

async function deleteCurrentMaterials(materialId) {
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
      message: "Materials Deleted Successfully",
    });
  } catch (err) {
    console.error(err.response || err);
    Notify.create({
      type: "negative",
      message: err.response?.data?.message || "Something went wrong",
    });
  } finally {
    loading.value = false;
    deleteMaterials.value = false;
    router.replace(`/main/coursePage/` + courseId);
  }
}

async function submitAssignment() {
  loading.value = true;
  try {
    const token = localStorage.getItem("authToken");
    const submitFile = await uploadToCloud(submitWork.value);
    const response = await axios.post(
      `${process.env.api_host}/courses/submission/${materialId}`,
      {
        file: submitFile,
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
      message: "Submitted Successfully",
    });
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "Negative",
      message: "Something went wrong",
    });
  } finally {
    loading.value = false;
    location.reload();
  }
}

onMounted(() => {
  getSubmittedAssignment();
  displayMaterialsInfoAssignment();
  displayMaterialsInfoMaterial();
  assignmentChecker();
  displayUserInfo();
  checkSubmitted();
});
</script>

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
