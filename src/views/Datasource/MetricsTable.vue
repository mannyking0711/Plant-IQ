<script lang="ts" setup>
import ICON_METRICS from '@/assets/icon/metrics.vue';
import { watch } from 'vue';
import { useDSStore } from '@/stores/datasource';

const store = useDSStore();

watch(
  () => store.getMetric,
  async () => {
    await store.loadChartDataByMetricAndBetweenDates();
  }
);
</script>

<template>
  <b-card class="min-h-[300px]">
    <template #header>
      <div class="d-flex justify-between">
        <div class="card-head d-inline-flex place-items-center">
          <ICON_METRICS class="mr-1" />
          Metrics (27)
        </div>
      </div>
    </template>
    <template #default>
      <div class="px-1 overflow-x-auto">
        <div class="grid grid-rows-6 grid-flow-col gap-4 pb-3">
          <b-form-radio-group v-model="store.metric" name="flavour-4a">
            <b-form-radio
              v-for="(option, index) in store.metricsList"
              :key="index"
              class="w-[150px]"
              :value="option"
            >
              {{ option }}
            </b-form-radio>
          </b-form-radio-group>
        </div>
      </div>
    </template>
  </b-card>
</template>
