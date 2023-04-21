<script lang="ts" setup>
import { Status } from '@/model/status';
import ICON_CURVE from '@/assets/icon/curve.vue';

const color = {
  [Status.ACTIVATED]: '#219653',
  [Status.PENDING]: '#FFA70B',
  [Status.DISABLED]: '#D34053',
};

defineProps<{
  name: string;
  status: Status;
  detectors: object[];
}>();
</script>
<template>
  <b-card class="max-w-[300px] px-2">
    <div class="d-flex justify-between">
      <span class="text-base font-weight-bold">{{ name }}</span>
      <span
        :style="{
          backgroundColor: color[status] + '50',
          color: color[status],
        }"
        class="px-1 py-[0.1rem] rounded-lg"
      >
        {{ status }}
      </span>
    </div>

    <div class="px-4 py-3">
      <ICON_CURVE class="w-100 min-h-full" />
    </div>

    <div class="d-flex justify-center gap-[1rem]">
      <span
        v-for="(detector, index) in detectors"
        :key="index"
        :style="{
          backgroundColor: color[detector.status] + '50',
          color: color[detector.status],
        }"
        class="px-1 py-[0.1rem] rounded-lg"
      >
        {{ detector.name }}
      </span>
    </div>
  </b-card>
</template>
