<template>
  <q-page>
    <!-- Main Container -->
    <div class="main-container q-px-xl">
      <q-card-section
        class="q-mt-lg flex q-px-none headerTxtBtn"
        style="width: 100%"
      >
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          Course Management
        </div>
      </q-card-section>
      <!-- course Table -->
      <!-- user details table -->
      <div>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          separator="cell"
          :filter="filter"
          :rows-per-page-options="[0, 15, 20, 25, 30]"
        >
          <template #body="props">
            <q-tr key="id" :props="props">
              <q-td>{{ props.row.name }}</q-td>
              <q-td>{{ props.row.id }}</q-td>
              <q-td>{{ props.row.instructorName }}</q-td>
              <q-td>{{ props.row.noOfStudents }}</q-td>
              <q-td>{{ props.row.status }}</q-td>
              <q-td>{{ props.row.createdAt }}</q-td>

              <q-td align="center">
                <q-btn-dropdown dropdown-icon="more_vert" flat>
                  <q-list>
                    <q-item>
                      <q-btn flat class="text-primary" @click="editCourse"
                        >Edit</q-btn
                      ></q-item
                    >
                    <q-item>
                      <q-btn
                        flat
                        class="text-red"
                        @click="archiveCourse(props.row.id)"
                        >{{ props.row.button }}</q-btn
                      ></q-item
                    >
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:top-left>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-right>
            <q-btn
              color="primary"
              icon-right="archive"
              label="Export to csv"
              no-caps
              @click="exportTable"
            />
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.main-container
  width: 100%
  height: auto
</style>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Notify, exportFile } from "quasar";
const filter = ref("");
const rows = ref([]);

const columns = ref([
  {
    sortable: true,
    name: "courseTitle",
    label: "Course Title",
    align: "left",
    field: "courseTitle",
  },
  {
    name: "id",
    label: "Hub Code",
    align: "left",
    field: "id",
  },
  {
    name: "instructor",
    label: "Instructor",
    align: "left",
    field: "instructor",
  },

  {
    name: "noOfStudents",
    label: "No. of Students",
    align: "left",
    field: "noOfStudents",
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
  },
  {
    name: "createdAt",
    label: "Date Created",
    align: "left",
    field: "createdAt",
  },
  {
    name: "actions",
    label: "Actions",
    align: "left",
    field: "actions",
  },
]);

async function editCourse() {
  console.log("edit course");
}

async function getCourses() {
  try {
    const response = await axios.get(`${process.env.api_host}/courses`);
    console.log(response);
    rows.value = response.data.map((user) => ({
      id: user._id,
      name: user.name,
      instructorName: user.instructorName,
      noOfStudents: user.students.length,
      createdAt: user.createdAt,
      role: user.role,
      status: user.isArchived ? "archived" : "active", // Example: Determine status from backend data
      button: user.isArchived ? "unarchive" : "archive",
    }));
  } catch (err) {
    console.error(err);
  }
}
async function archiveCourse(courseId) {
  console.log("Archived user");
  try {
    const token = localStorage.getItem("authToken");
    const getCourse = await axios.get(
      `${process.env.api_host}/courses?query=${courseId}`
    );
    const isArchived = !getCourse.data[0].isArchived;

    console.log("new", isArchived);
    const response = await axios.post(
      `${process.env.api_host}/courses/update/${courseId}`,
      {
        isArchived: isArchived,
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
      message: "archived Courses successfully",
    });
    getCourses();
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went wrong",
    });
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

function exportTable() {
  // Naive encoding to CSV format
  const content = [columns.value.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.value.map((row) =>
        columns.value
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(",")
      )
    )
    .join("\r\n");

  const status = exportFile("courses-data.csv", content, "text/csv");

  if (status !== true) {
    Notify.create({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
}

onMounted(() => {
  getCourses();
});
</script>
