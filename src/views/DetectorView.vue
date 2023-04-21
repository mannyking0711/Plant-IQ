<script setup lang="ts">
import MetricsTable from '@/views/Detector/MetricsTable.vue';
import DetectorsList from '@/views/Detector/DetectorsList.vue';
import ProcessList from '@/views/Detector/ProcessList.vue';
import GraphChart from '@/views/Detector/GraphChart.vue';
import { onMounted } from 'vue';
import { useDetectorStore } from '@/stores/detector';

const store = useDetectorStore();

onMounted(async () => {
  await store.loadDetectorList();
});
</script>

<template>
  <div class="detector-view">
    <b-row>
      <b-col lg="3" class="pt-4">
        <detectors-list />
        <div class="pt-4" />
        <process-list />
      </b-col>

      <b-col lg="9" class="pt-4">
        <metrics-table />
        <div class="pt-4" />
        <graph-chart />
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
.detector-view {
  .card-head {
    color: #3a405b;
    font-weight: 600;
    font-size: 1.3rem;
  }

  .card-header {
    background-color: white;
    border-bottom: 4px solid #eaeef3;
  }
}
</style>
