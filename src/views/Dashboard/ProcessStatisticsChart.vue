<script setup lang="ts">
import {ref, watch} from 'vue';
import {useDashboardStore} from "@/stores/dashboard";

const store = useDashboardStore();

const seriesData = ref<any[]>([]);

const chartOptions = ref({
  rangeSelector: {
    selected: 1,
  },
  xAxis: {
    type: 'datetime',
  },
  title: {
    text: '',
  },
  legend: {
    enabled: true,
  },
  tooltip: {
    pointFormat:
      '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
    valueDecimals: 2,
    split: true,
  },
  series: seriesData,
  credits: {
    enabled: false,
  },
});

watch(
  () => store.selectedDetectorId,
  async () => {
    await store.loadChartDataByDetectorId();
  }
);

watch(
  () => store.charData,
  (val) => {
    seriesData.value = val;
  }
)
</script>

<template>
  <b-card>
    <highcharts :constructor-type="'stockChart'" :options="chartOptions" />
  </b-card>
</template>
