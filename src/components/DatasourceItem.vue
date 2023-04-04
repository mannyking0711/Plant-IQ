<script setup lang="ts">
import ICON_DATASOURCE from '@/assets/icon/db.vue';
import ICON_SUCCESS from '@/assets/icon/status/success.svg';
import ICON_WARNING from '@/assets/icon/status/warning.svg';
import { Status } from '@/model/status';

export interface Props {
  name: string;
  status: Status;
  url: string;
}

defineProps<Props>();
</script>

<template>
  <div class="db-item p-2">
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
  </div>
</template>

<style lang="scss">
.db-item {
  border: 1px solid #DDDDDD;
  border-radius: 10px;
}
</style>
