<script setup>
import { ref, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";

// State variables
const totalStudents = ref(0);
const totalInstructors = ref(0);
const totalUsers = ref(0);
const series = ref([0, 0, 0]); // Default values for the chart

const chartOptions = ref({
  chart: {
    width: 380,
    type: "pie",
  },
  labels: ["Total User", "Student", "Instructor"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 330,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});

// Fetch data from API
async function getUsers() {
  try {
    const responseAll = await axios.get(`${process.env.api_host}/users`);
    const responseStudents = await axios.get(
      `${process.env.api_host}/users?filter=student`
    );
    const responseInstructors = await axios.get(
      `${process.env.api_host}/users?filter=instructor`
    );

    // Update totals
    totalUsers.value = responseAll.data.length;
    totalStudents.value = responseStudents.data.length;
    totalInstructors.value = responseInstructors.data.length;

    // Update chart series
    series.value = [
      totalUsers.value,
      totalStudents.value,
      totalInstructors.value,
    ];
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  getUsers();
});
</script>

<template>
  <div id="app" v-if="totalUsers">
    <apexchart type="pie" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    apexchart: VueApexCharts,
  },
});
</script>
