<template>
  <q-page>
    <!-- Main Container -->
    <div class="main-container q-px-xl">
      <q-card-section
        class="q-mt-lg flex q-px-none headerTxtBtn"
        style="width: 100%"
      >
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          Grade Report
        </div>
      </q-card-section>
      <!-- Main Content -->
      <div>
        <q-card-section>
          <div>Student Name</div>
        </q-card-section>
        <q-table
          style="box-shadow: none"
          :rows="showGraderow"
          :columns="showGradeColumn"
          separator="cell"
        >
          <template #body="props">
            <q-tr :props="props">
              <q-td style="width: 30%">{{ props.row.taskName }}</q-td>
              <q-td>{{ props.row.grade }}</q-td>
            </q-tr>
          </template>

          <!-- Footer for Total Grade -->
          <template #bottom>
            <q-tr>
              <q-td colspan="1" class="text-bold">Total Grade (Average):</q-td>
              <q-td class="text-bold">{{ totalAverage }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <!-- Remarks and comment -->

      <q-card-section class="commentRemarks" v-if="remarks">
        <div class="commentRemarks-content q-pa-sm text-subtitle1">
          <div>
            <span class="text-weight-bold">Weakness:</span>
            {{ remarks.weakness }}
          </div>
          <div>
            <span class="text-weight-bold">Weakness Details:</span>
            {{ remarks.weaknessDetails }}
          </div>
          <div>
            <span class="text-weight-bold">Performance Feedback: </span
            >{{ remarks.performanceFeedback }}
          </div>
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { viewViewerUser } from "src/components/user";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const roleValidation = ref("");
const isStudent = ref("");
const isInstructor = ref("");
const isAdmin = ref("");

const remarks = ref();
const courseId = route.params.courseId;
const studentId = route.params.studentId;

const showGraderow = ref([]);

const showGradeColumn = ref([
  {
    name: "taskName",
    label: "Assignment Name",
    align: "left",
    field: "taskName",
  },
  {
    name: "grade",
    label: "Grade",
    align: "left",
    field: "grade",
  },
]);
const totalAverage = ref(0);

// Compute total grade dynamically
// const totalGrade = computed(() => {
//   const total = showGraderow.value.reduce(
//     (sum, row) => sum + (row.grade || 0),
//     0
//   );
//   return Math.round(total / showGraderow.value.length);
// });

async function checkUser() {
  const token = localStorage.getItem("authToken");
  const user = await viewViewerUser();
  roleValidation.value = user.role;
  if (roleValidation.value === "student") {
    return (isStudent.value = true);
  } else if (roleValidation.value === "instructor") {
    return (isInstructor.value = true);
  }
  console.log(roleValidation.value);
}

async function getGrades() {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses/grades/totalGrades/${studentId}`
    );

    // Process response to populate table
    const data = response.data;
    totalAverage.value = data.average;

    remarks.value = response.data;
    // Flatten and process grades
    showGraderow.value = data.grades.map((item) => ({
      taskName: item.taskName,
      grade: item.grades[0]?.grade || "N/A", // Safeguard for missing grades
    }));
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  checkUser();
  getGrades();
});
</script>

<style lang="sass" scoped>
.main-container
  width: 100%
  height: auto
.commentRemarks
  width: 100%
  height: auto
  column-gap: 14px
.commentRemarks-content
  width: 465px
  border: 1px solid #d9d9d9
  min-height: 200px
  height: auto
  text-align: justify
  display: flex
  color: #494949
  flex-direction: column
  justify-content: space-around
  border-radius: 14px
@media (max-width:700px)
  .commentRemarks-content
    width: 100%
@media (max-width:500px)
  .main-container
    padding: 2px
</style>
