<script lang="ts" setup>
import ICON_GRAPH from '@/assets/icon/graph.vue';
import DatePicker from 'vue2-datepicker';
import { ref, watch } from 'vue';
import 'vue2-datepicker/index.css';
import { useDetectorStore } from '@/stores/detector';

const store = useDetectorStore();

const seriesData = ref<any[]>([]);

const chartOptions = ref({
  rangeSelector: {
    selected: 1,
  },
  xAxis: {
    type: 'datetime',
  },
  title: {
    text: 'InfluxDB Graph',
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
});

watch(
  () => store.getChartData,
  () => {
    const jsonData = store.getChartData;

    const series: any = {};
    for (let i = 0; i < jsonData.length; i++) {
      if (series[jsonData[i][0]] === undefined) {
        series[jsonData[i][0]] = [];
      }
      series[jsonData[i][0]].push([
        new Date(jsonData[i][1]).getTime(),
        jsonData[i][2],
      ]);
    }

    seriesData.value.splice(0);
    Object.keys(series).forEach(name => {
      seriesData.value.push({
        name,
        data: series[name],
      });
      return null;
    });
  }
);

const searchByDates = async () => {
  alert(store.getSelectedDetectorId);
  if (store.detectorId !== -1) {
    await store.loadRecords();
  }
};
</script>

<template>
  <b-card>
    <template #header>
      <div class="d-flex">
        <div class="card-head d-inline-flex place-items-center">
          <ICON_GRAPH class="mr-1" />
          Graph
        </div>
        <div class="w-100 text-center place-self-center">
          <b-input-group class="mx-1 justify-center d-inline-flex !w-auto">
            <b-input-group-prepend class="w-[4rem]">
              <b-input-group-text class="w-100 justify-content-center">
                START
              </b-input-group-text>
            </b-input-group-prepend>
            <date-picker
              v-model="store.startDt"
              placeholder=""
              type="datetime"
            />
          </b-input-group>

          <b-input-group class="mx-1 justify-center d-inline-flex !w-auto">
            <b-input-group-prepend class="w-[4rem]">
              <b-input-group-text class="w-100 justify-content-center">
                END
              </b-input-group-text>
            </b-input-group-prepend>
            <date-picker v-model="store.endDt" placeholder="" type="datetime" />
          </b-input-group>

          <b-button class="mt-[-5px]" variant="primary" @click="searchByDates">
            Search
          </b-button>
        </div>
      </div>
    </template>
    <template #default>
      <div class="h-100">
        <highcharts :constructor-type="'stockChart'" :options="chartOptions" />
      </div>
    </template>
  </b-card>
</template>
