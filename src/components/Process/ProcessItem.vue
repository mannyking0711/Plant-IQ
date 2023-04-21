<script setup lang="ts">
import ICON_PROCESS from '@/assets/icon/nav/process.vue';
import { Status } from '@/model/status';
import { onUpdated, ref, watch } from 'vue';

const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  activated: { type: Boolean, required: true },
  description: { type: String, required: true },
  checked: { type: Boolean, default: true },
  static: { type: Boolean, default: true },
});

const emit = defineEmits(['click']);

onUpdated(() => {
  status.value = props.activated;
});

const status = ref(props.activated);

watch(
  () => status.value,
  async () => {}
);

const loadMetrics = () => {
  emit('click', props.id);
};
</script>

<template>
  <div
    class="flex gap-1 px-1 my-2 align-items-center cursor-pointer rounded-md transition-all hover:bg-[#E5E7EB]"
  >
    <a
      class="flex flex-1 gap-1 py-1 align-items-center cursor-pointer"
      href="#"
      @click="loadMetrics"
    >
      <ICON_PROCESS v-b-tooltip="description" class="icon-item" />
      <div>{{ name }}</div>
    </a>

    <b-checkbox v-if="!static" v-model="status" switch />
    <span
      v-else
      class="rounded-pill text-xs"
      :class="{
        success: status,
        danger: !status,
      }"
    >
      {{ status ? Status.ACTIVATED : Status.DISABLED }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.success {
  padding: 0.1rem 0.6rem;
  background-color: #21965310;
  color: #219653;
  font-family: 'Inter', serif;
}
.danger {
  padding: 0.1rem 0.6rem;
  background-color: #d3405310;
  color: #d34053;
  font-family: 'Inter', serif;
}
</style>
