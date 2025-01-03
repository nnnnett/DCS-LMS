<template>
  <q-page>
    <div class="main-container q-px-xl">
      <q-card-section
        class="q-mt-lg q-pl-md flex q-px-none headerTxtBtn"
        style="width: 100%"
      >
        <div class="text-subtitle1 text-weight-medium" style="color: #4b4b4b">
          Course List > Sample Course
        </div>
      </q-card-section>
      <!-- main content -->
      <div class="viewReport-container">
        <q-card-section>
          <div class="text-subtitle1 text-primary text-weight-medium">
            Grades
          </div>
        </q-card-section>

        <div>
          <q-table
            style="box-shadow: none"
            :rows="rows"
            :columns="columns"
            row-key="id"
            :rows-per-page-options="[0, 5, 10, 15, 20, 25, 30]"
            separator="cell"
          >
            <template #body="props">
              <q-tr :pops="props">
                <q-td key="firstName">
                  {{ props.row.firstName }}, {{ props.row.lastName }}
                </q-td>
                <q-td key="oveRallGrade" class="text-center text-gray-2">
                  {{ props.row.oveRallGrade }}
                </q-td>
                <q-td
                  key="assignment1"
                  class="text-center text-primary text-center"
                >
                  {{ props.row.assignment1 }}/100
                  <q-btn-dropdown
                    style="display: block; width: 15px"
                    flat
                    dropdown-icon="more_vert"
                    class="absolute-right"
                    ><q-list>
                      <q-item clickable v-close-popup @click="openSubmission">
                        <q-item-section>
                          <q-item-label>View Submission</q-item-label>
                        </q-item-section>
                      </q-item></q-list
                    >
                  </q-btn-dropdown>
                </q-td>
                <q-td key="assignment2" class="text-center text-primary">
                  {{ props.row.assignment2 }}/100
                  <q-btn-dropdown
                    style="display: block; width: 15px"
                    flat
                    dropdown-icon="more_vert"
                    class="absolute-right"
                    ><q-list>
                      <q-item clickable v-close-popup @click="openSubmission">
                        <q-item-section>
                          <q-item-label>View Submission</q-item-label>
                        </q-item-section>
                      </q-item></q-list
                    >
                  </q-btn-dropdown>
                </q-td>
                <q-td key="assignment3" class="text-center text-primary">
                  {{ props.row.assignment3 }}/100
                  <q-btn-dropdown
                    style="display: block; width: 15px"
                    flat
                    dropdown-icon="more_vert"
                    class="absolute-right"
                    ><q-list>
                      <q-item clickable v-close-popup @click="openSubmission">
                        <q-item-section>
                          <q-item-label>View Submission</q-item-label>
                        </q-item-section>
                      </q-item></q-list
                    >
                  </q-btn-dropdown>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style lang="sass" scoped>
.main-container
  width: 100%
  height: auto
.viewReport-container
  height: 500px
</style>
<script setup>
import { ref } from "vue";

const rows = ref([
  {
    id: 1,
    firstName: "Kenneth",
    lastName: "Doblon",
    oveRallGrade: "no grade",
    assignment1: 23,
    assignment2: 100,
    assignment3: 0,
  },
  {
    id: 1,
    firstName: "Kenneth",
    lastName: "Doblon",
    oveRallGrade: "no grade",
    assignment1: 23,
    assignment2: 100,
    assignment3: 0,
  },
  {
    id: 1,
    firstName: "Kenneth",
    lastName: "Doblon",
    oveRallGrade: "no grade",
    assignment1: 23,
    assignment2: 100,
    assignment3: 0,
  },
  {
    id: 1,
    firstName: "Kenneth",
    lastName: "Doblon",
    oveRallGrade: "no grade",
    assignment1: 23,
    assignment2: 100,
    assignment3: 0,
  },
]);
const columns = ref([
  {
    name: "firstName",
    label: "Name",
    align: "left",
    field: "firstName",
    sortable: true,
  },
  {
    name: "oveRallGrade",
    label: "Overall grade",
    align: "center",
    field: "oveRallGrade",
  },
  {
    name: "assignment1",
    label: "assignment1",
    align: "center",
    field: "assignment1",
  },
  {
    name: "assignment2",
    label: "assignment2",
    align: "center",
    field: "assignment2",
  },
  {
    name: "assignment3",
    label: "assignment3",
    align: "center",
    field: "assignment3",
  },
]);
async function openSubmission() {
  console.log("open");
}
</script>
