<template>
  <q-page>
    <!-- Main Container -->
    <div class="main-container q-px-xl">
      <q-card-section
        class="q-mt-lg q-pl-md flex q-px-none headerTxtBtn"
        style="width: 100%"
      >
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          Reports
        </div>
      </q-card-section>
      <!-- Main Content -->
      <div>
        <q-table
          :filter="filter"
          :rows="rows"
          :columns="columns"
          row-key="id"
          separator="cell"
          title="User Activity Details"
          title-class="text-subtitle1"
          :rows-per-page-options="[0, 1, 2, 5, 15, 20, 25, 30]"
        >
          <template v-slot:top-right>
            <div>
              <q-input dense debounce="300" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="q-ml-sm">
              <q-btn
                class="bg-primary text-white"
                flat
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportTable"
              />
            </div>
          </template>
          <template #body="props">
            <q-tr key="id" :props="props">
              <q-td>{{ props.row.username }}</q-td>
              <q-td>{{ props.row.lastLogin }}</q-td>
              <q-td>{{ props.row.noOfCourse }}</q-td>
              <q-td>{{ props.row.activityCount }}</q-td>
            </q-tr>
          </template>
          <template v-slot:bottom-left> ew</template>
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
import { exportFile } from "quasar";
const filter = ref("");

const rows = ref([
  {
    id: 1,
    username: "John",
    lastLogin: "02-25-2024",
    noOfCourse: 5,
    activityCount: 15,
  },
  {
    id: 2,
    username: "Kenneth",
    lastLogin: "02-15-2024",
    noOfCourse: 10,
    activityCount: 6,
  },
  {
    id: 3,
    username: "Jules",
    lastLogin: "02-05-2024",
    noOfCourse: 12,
    activityCount: 3,
  },
  {
    id: 4,
    username: "Khris",
    lastLogin: "02-20-2024",
    noOfCourse: 30,
    activityCount: 1,
  },
  {
    id: 5,
    username: "Brt",
    lastLogin: "02-25-2024",
    noOfCourse: 7,
    activityCount: 0,
  },
]);
const columns = ref([
  { name: "username", label: "User Name ", align: "left", field: "username" },
  {
    name: "lastLogin",
    label: "Last Login",
    align: "left",
    field: "lastLogin",
  },
  {
    name: "noOfCourse",
    label: "No. of Course",
    align: "left",
    field: "noOfCourse",
  },
  {
    name: "activityCount",
    label: "Activity Count",
    align: "left",
    field: "activityCount",
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

  const status = exportFile("users-activity-details.csv", content, "text/csv");

  if (status !== true) {
    Notify.create({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
}
</script>
