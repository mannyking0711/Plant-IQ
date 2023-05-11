<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps({

});

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
</script>

<template>

</template>
