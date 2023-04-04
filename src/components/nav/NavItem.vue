<script setup lang="ts">
const props = defineProps<{
  title: string;
  href: string;
}>();
</script>

<template>
  <b-nav-item :to="props.href" class="text-center">
    <slot />
    <div class="font-[Oswald] font-weight">{{ props.title.toUpperCase() }}</div>
  </b-nav-item>
</template>

<style lang="scss">
.router-link-active {
  div {
    color: #2f80ed;
  }

  path {
    stroke: #2f80ed;
  }
}
</style>
