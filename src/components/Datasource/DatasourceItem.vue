<script setup lang="ts">
import ICON_DATASOURCE from '@/assets/icon/db.vue';
import ICON_SUCCESS from '@/assets/icon/status/success.svg';
import ICON_WARNING from '@/assets/icon/status/warning.svg';
import { Status } from '@/model/status';

export interface Props {
  id: number;
  name: string;
  status: Status;
  url: string;
}

defineProps<Props>();
</script>

<template>
  <a
    class="db-item p-2 hover:bg-sky-100 transition"
    href="#"
    @click="$emit('click', id)"
  >
    <div class="d-flex justify-between">
      <span class="text-base font-semibold">
        <ICON_DATASOURCE />
        {{ name }}
      </span>

      <span class="text-[#828080]">
        {{ status }}
        <template v-if="status === Status.ACTIVATED">
          <img :src="ICON_SUCCESS" alt="activated" width="20" />
        </template>
        <template v-else-if="status === Status.PENDING">
          <img :src="ICON_WARNING" alt="pending" width="20" />
        </template>
        <template v-else>
          <img :src="ICON_WARNING" alt="disabled" width="20" />
        </template>
      </span>
    </div>

    <div class="text-[#828080] px-4 py-2">
      {{ url }}
    </div>
  </a>
</template>

<style lang="scss">
.db-item {
  display: block;
  border: 1px solid #dddddd;
  border-radius: 10px;

  &.active {
    background-color: skyblue;
  }
}
</style>
