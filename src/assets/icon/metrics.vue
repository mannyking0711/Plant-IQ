<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'light',
    validator(value: string): boolean {
      return ['light', 'normal', 'dark'].indexOf(value) >= 0;
    },
  },
});

const color = ref('');

if (props.variant === 'light') color.value = '#A7A9B6';
else if (props.variant === 'normal') color.value = '#8A8A8A';
else if (props.variant === 'dark') color.value = '#5A5A5A';
</script>
<template>
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :stroke="color"
  >
    <g clip-path="url(#clip0_112_1017)">
      <path
        d="M18.7501 4.16669H6.25008C5.09949 4.16669 4.16675 5.09943 4.16675 6.25002V18.75C4.16675 19.9006 5.09949 20.8334 6.25008 20.8334H18.7501C19.9007 20.8334 20.8334 19.9006 20.8334 18.75V6.25002C20.8334 5.09943 19.9007 4.16669 18.7501 4.16669Z"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.625 9.375H9.375V15.625H15.625V9.375Z"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.375 1.04169V4.16669"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.625 1.04169V4.16669"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.375 20.8333V23.9583"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.625 20.8333V23.9583"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.8333 9.375H23.9583"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.8333 14.5833H23.9583"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.04175 9.375H4.16675"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.04175 14.5833H4.16675"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_112_1017">
        <rect width="25" height="25" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
