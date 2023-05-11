<script lang="ts" setup>
import {Status} from '@/model/status';
import ICON_CURVE from '@/assets/icon/curve.vue';
import {computed, onMounted, ref} from "vue";
import {API} from "@/api";

const color = {
  [Status.ACTIVATED]: '#219653',
  [Status.PENDING]: '#FFA70B',
  [Status.DISABLED]: '#D34053',
};

const detectors = ref([]);

const props = defineProps<{
  pk: number,
  fields: any,
  active: boolean,
}>();

const status = computed(() => {
  return props.fields.status ? Status.ACTIVATED : Status.DISABLED;
})

const emit = defineEmits(['click']);

const clickEvent = () => {
  emit('click', props.pk);
}

const convertToStatus = (state: number) => {
  if (state) return Status.ACTIVATED;
  else return Status.DISABLED;
}

onMounted(async () => {
  const res = await API.process.loadDetectorsByProcessId(props.pk);
  detectors.value = JSON.parse(res.data);
});
</script>
<template>
  <b-card class="max-w-[300px] px-2"
          @click="clickEvent"
          :class="{
            '!bg-[#DDD]': active,
            'bg-white': !active,
          }">
    <div class="d-flex justify-between">
      <span class="text-base font-weight-bold">{{ fields.name }}</span>
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
          backgroundColor: color[convertToStatus(detector.fields.status)] + '50',
          color: color[convertToStatus(detector.fields.status)],
        }"
        class="px-1 py-[0.1rem] rounded-lg"
      >
        {{ detector.fields.name }}
      </span>
    </div>
  </b-card>
</template>
