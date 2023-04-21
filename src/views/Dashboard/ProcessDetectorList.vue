<script setup lang="ts">
import Process from '@/components/Dashboard/Process.vue';
import { Status } from '@/model/status';

const processList: Process.Props[] = [
  {
    date: new Date(),
    actualScore: 1.2,
    topAlerts: 1,
    maxAnomaly: 0.4,
    status: Status.ACTIVATED,
  },
  {
    date: new Date(),
    actualScore: 1.5,
    topAlerts: 2,
    maxAnomaly: 1.1,
    status: Status.PENDING,
  },
  {
    date: new Date(),
    actualScore: 1.5,
    topAlerts: 1,
    maxAnomaly: 1.1,
    status: Status.DISABLED,
  },
];
</script>

<template>
  <b-card>
    <p class="card-head">Process - Cutting</p>

    <Process
      v-for="(process, index) in processList"
      :key="index"
      :actual-score="process.actualScore"
      :date="process.date"
      :max-anomaly="process.maxAnomaly"
      :status="process.status"
      :top-alerts="process.topAlerts"
    />
  </b-card>
</template>
