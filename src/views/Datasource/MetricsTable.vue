<script lang="ts" setup>
import ICON_METRICS from '@/assets/icon/metrics.vue';
import { ref } from 'vue';

const selected = ref([]);
const options = [
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
];
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
      <div class="px-1 overflow-x-scroll">
        <div class="grid grid-rows-6 grid-flow-col gap-4 pb-3">
          <b-form-checkbox
            v-for="option in options"
            :key="option.value"
            v-model="selected"
            :value="option.value"
            name="flavour-4a"
            class="w-[150px]"
          >
            {{ option.text }}
          </b-form-checkbox>
        </div>
      </div>
    </template>
  </b-card>
</template>
