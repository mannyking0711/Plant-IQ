<script setup lang="ts">
import ProcessList from '@/views/Process/ProcessList.vue';
import MetricsTable from '@/views/Process/MetricsTable.vue';
import DetectorsList from '@/views/Process/DetectorsList.vue';
import { useProcessStore } from '@/stores/process';
import { onMounted } from 'vue';

const store = useProcessStore();

onMounted(() => {
  store.loadProcessList();
});
</script>

<template>
  <div class="process-view">
    <b-row>
      <b-col lg="3" class="pt-4 flex flex-col">
        <process-list class="flex-1" />
      </b-col>

      <b-col lg="6" class="pt-4">
        <metrics-table />
      </b-col>

      <b-col lg="3" class="pt-4 flex flex-col">
        <detectors-list class="flex-1" />
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
.process-view {
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
