<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
});
</script>

<template>
  <b-form-checkbox :value="name" class="!pl-8 pr-2 py-2">
    {{ name }}
  </b-form-checkbox>
</template>
