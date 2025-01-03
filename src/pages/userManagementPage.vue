<template>
  <q-page>
    <!-- main container -->
    <div class="main-container q-px-xl">
      <q-card-section
        class="q-mt-lg flex q-px-none headerTxtBtn"
        style="width: 100%"
      >
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          User Management
        </div>
      </q-card-section>
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
              <q-td>{{ props.row.lastName }}</q-td>
              <q-td> {{ props.row.firstName }} </q-td>
              <q-td>{{ props.row.email }}</q-td>
              <q-td>{{ props.row.role }}</q-td>
              <q-td>{{ props.row.status }}</q-td>
              <q-td>{{ props.row.enrolledCourse }}</q-td>
              <q-td>
                <q-btn flat class="text-primary">Edit</q-btn>
                <q-btn flat class="text-red">Delete</q-btn></q-td
              >
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

<style scoped lang="sass">
.main-container
  width: 100%
  height: auto
</style>

<script setup>
import { ref } from "vue";
import { Notify, exportFile } from "quasar";

const filter = ref("");

const rows = ref([
  {
    id: 1,
    firstName: "Kenneth",
    lastName: "Doblon",
    email: "kennethdoblon@gmail.com",
    role: "student",
    status: "active",
    enrolledCourse: "Course 5, Course 2",
  },
  {
    id: 2,
    firstName: "Jules",
    lastName: "Barantes",
    email: "julesbarantes@gmail.com",
    role: "admin",
    status: "inactive",
    enrolledCourse: "Course 1, Course 3",
  },
  {
    id: 3,
    firstName: "Khris",
    lastName: "Wahing",
    email: "khriswahing@gmail.com",
    role: "instructor",
    status: "active",
    enrolledCourse: "Course 1, Course 3",
  },
]);

const columns = ref([
  {
    sortable: true,
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
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
  },
  {
    name: "role",
    label: "Role",
    align: "left",
    field: "role",
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
  },
  {
    name: "enrolledCourse",
    label: "Enrolled Course",
    align: "left",
    field: "enrolledCourse",
  },
  {
    name: "actions",
    label: "Actions",
    align: "left",
    field: "actions",
  },
]);

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

  const status = exportFile("users-data.csv", content, "text/csv");

  if (status !== true) {
    Notify.create({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
}
</script>
