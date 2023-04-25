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
    <g clip-path="url(#clip0_89_1279)">
      <path
        d="M21.875 17.4999V9.16656C21.8746 8.80123 21.7782 8.44241 21.5954 8.12611C21.4125 7.80981 21.1497 7.54715 20.8333 7.36448L13.5417 3.19781C13.225 3.01496 12.8657 2.9187 12.5 2.9187C12.1343 2.9187 11.775 3.01496 11.4583 3.19781L4.16667 7.36448C3.85027 7.54715 3.58748 7.80981 3.40465 8.12611C3.22182 8.44241 3.12537 8.80123 3.125 9.16656V17.4999C3.12537 17.8652 3.22182 18.2241 3.40465 18.5404C3.58748 18.8567 3.85027 19.1193 4.16667 19.302L11.4583 23.4686C11.775 23.6515 12.1343 23.7478 12.5 23.7478C12.8657 23.7478 13.225 23.6515 13.5417 23.4686L20.8333 19.302C21.1497 19.1193 21.4125 18.8567 21.5954 18.5404C21.7782 18.2241 21.8746 17.8652 21.875 17.4999Z"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.40625 8.08325L12.5 13.3437L21.5938 8.08325"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 23.8333V13.3333"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_89_1279">
        <rect width="25" height="25" transform="translate(0 0.692627)" />
      </clipPath>
    </defs>
  </svg>
</template>
