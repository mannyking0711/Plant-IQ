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
    height="26"
    viewBox="0 0 25 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :stroke="color"
  >
    <g clip-path="url(#clip0_89_1297)">
      <path
        d="M18.75 9.02594C18.75 7.36834 18.0915 5.77862 16.9194 4.60652C15.7473 3.43442 14.1576 2.77594 12.5 2.77594C10.8424 2.77594 9.25268 3.43442 8.08058 4.60652C6.90848 5.77862 6.25 7.36834 6.25 9.02594C6.25 16.3176 3.125 18.4009 3.125 18.4009H21.875C21.875 18.4009 18.75 16.3176 18.75 9.02594Z"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.302 22.5676C14.1189 22.8833 13.856 23.1454 13.5398 23.3276C13.2235 23.5097 12.8649 23.6056 12.5 23.6056C12.135 23.6056 11.7764 23.5097 11.4601 23.3276C11.1439 23.1454 10.881 22.8833 10.6979 22.5676"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_89_1297">
        <rect
          width="25"
          height="25"
          fill="white"
          transform="translate(0 0.692627)"
        />
      </clipPath>
    </defs>
  </svg>
</template>
