<script setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

const series = ref([44, 55, 13]);
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
</script>

<template>
  <div id="app">
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
