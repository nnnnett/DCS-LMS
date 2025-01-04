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
              <q-td>{{ props.row.courseTitle }}</q-td>
              <q-td>{{ props.row.hubCode }}</q-td>
              <q-td>{{ props.row.instructor }}</q-td>
              <q-td>{{ props.row.status }}</q-td>
              <q-td>{{ props.row.noOfStudents }}</q-td>
              <q-td>{{ props.row.dateCreated }}</q-td>

              <q-td align="center">
                <q-btn-dropdown dropdown-icon="more_vert" flat>
                  <q-list>
                    <q-item>
                      <q-btn flat class="text-primary" @click="editCourse"
                        >Edit</q-btn
                      ></q-item
                    >
                    <q-item>
                      <q-btn flat class="text-red" @click="archiveCourse"
                        >Archive</q-btn
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
import { ref } from "vue";

const filter = ref("");
const rows = ref([
  {
    id: 1,
    courseTitle: "Kenneth",
    hubCode: 20321,
    instructor: "jules",
    status: "active",
    noOfStudents: 30,
    dateCreated: "20-20-1090",
  },
  {
    id: 2,
    courseTitle: "Jules",
    hubCode: 20321,
    instructor: "jules",
    status: "inactive",
    noOfStudents: 35,
    dateCreated: "20-20-2090",
  },
  {
    id: 3,
    courseTitle: "Khris",
    hubCode: 81321,
    instructor: "kira",
    status: "active",
    noOfStudents: 25,
    dateCreated: "01-20-1090",
  },
]);

const columns = ref([
  {
    sortable: true,
    name: "courseTitle",
    label: "Course Title",
    align: "left",
    field: "courseTitle",
  },
  {
    name: "hubCode",
    label: "Hub Code",
    align: "left",
    field: "hubCode",
  },
  {
    name: "instructor",
    label: "Instructor",
    align: "left",
    field: "instructor",
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
  },
  {
    name: "noOfStudents",
    label: "No. of Students",
    align: "left",
    field: "noOfStudents",
  },
  {
    name: "dateCreated",
    label: "Date Created",
    align: "left",
    field: "dateCreated",
  },
  {
    name: "actions",
    label: "Actions",
    align: "left",
    field: "actions",
  },
]);

async function archiveCourse() {
  console.log("archived course");
}

async function editCourse() {
  console.log("edit course");
}
</script>
