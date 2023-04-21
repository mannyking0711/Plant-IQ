<script setup lang="ts">
import ICON_DATASOURCE from '@/assets/icon/db.vue';

const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  active: { type: Boolean, default: false },
});

const emit = defineEmits(['click']);

const onItemClicked = () => {
  emit('click', props.id);
};
</script>
<template>
  <a
    href="#"
    class="px-3 py-2 flex gap-2 align-items-center hover:bg-[#EEF1F5]"
    :class="{
      'bg-[#EEF1F5]': active,
    }"
    @click="onItemClicked"
  >
    <ICON_DATASOURCE class="icon-item" />
    {{ name }}
  </a>
</template>
