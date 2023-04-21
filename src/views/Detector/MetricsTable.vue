<script lang="ts" setup>
import ICON_METRICS from '@/assets/icon/metrics.vue';
import { useDetectorStore } from '@/stores/detector';

const store = useDetectorStore();
</script>

<template>
  <div>
    <b-card>
      <template #header>
        <div class="d-flex justify-between">
          <div class="card-head d-inline-flex place-items-center">
            <ICON_METRICS variant="dark" class="mr-1" />
            Metrics ({{ store.getMetrics.length }})
          </div>
        </div>
      </template>
      <template #default>
        <div
          class="overflow-x-auto grid grid-rows-6 grid-flow-col gap-x-6 gap-y-4 py-2"
        >
          <span v-if="store.getMetrics.length === 0">Empty metrics ...</span>
          <span
            v-for="(metric, index) in store.getMetrics"
            :key="index"
            class="flex gap-1 align-items-center"
          >
            <ICON_METRICS variant="normal" class="icon-item" />
            {{ metric }}
          </span>
        </div>
      </template>
    </b-card>
  </div>
</template>
