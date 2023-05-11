<script lang="ts" setup>
import {Status} from '@/model/status';
import ICON_CURVE from '@/assets/icon/curve.vue';
import {computed, onMounted, ref, watch} from "vue";
import {API} from "@/api";
import {useDashboardStore} from "@/stores/dashboard";

const store = useDashboardStore();

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

const selectedDetectorId = ref(-1);

const status = computed(() => {
  return props.fields.status ? Status.ACTIVATED : Status.DISABLED;
})

const emit = defineEmits(['click']);

const clickEvent = () => {
  emit('click', props.pk);
}

const onClickEvent = (detectorId: number) => {
  selectedDetectorId.value = detectorId;
}

const convertToStatus = (state: number) => {
  if (state) return Status.ACTIVATED;
  else return Status.DISABLED;
}

onMounted(async () => {
  const res = await API.process.loadDetectorsByProcessId(props.pk);
  detectors.value = JSON.parse(res.data);
  if (res.data.length) {
    selectedDetectorId.value = detectors.value[0].pk;
  }
});
</script>
<template>
  <b-card class="max-w-[300px] px-2">
    <div class="d-flex justify-between">
      <a class="text-base font-weight-bold hover:cursor-pointer"
         @click="clickEvent"
         :class="{
            '!text-blue-700': active,
            'text-black': !active,
          }"
      >
        {{ fields.name }}
      </a>
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
      <button
        v-for="(detector, index) in detectors"
        :key="index"
        :style="{
          backgroundColor: color[convertToStatus(detector.fields.status)] + '50',
          color: color[convertToStatus(detector.fields.status)],
          border: selectedDetectorId === detector.pk ? '1px solid red' : 'none',
        }"
        class="px-1 py-[0.1rem] rounded-lg"
        @click="onClickEvent(detector.pk)"
      >
        {{ detector.fields.name }}
      </button>
    </div>
  </b-card>
</template>
