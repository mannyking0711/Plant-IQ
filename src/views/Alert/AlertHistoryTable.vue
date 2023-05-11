<script setup lang="ts">
import ICON_DETECTOR from "@/assets/icon/nav/detectors.vue";
import ICON_SUCCESS from "@/assets/icon/status/success.svg";
import ICON_WARNING from "@/assets/icon/status/warning.svg";
import ICON_ERROR from "@/assets/icon/status/error.svg";
import {useAlertStore} from "@/stores/alert";
import type {BvTableFieldArray} from "bootstrap-vue/src/components/table";

const store = useAlertStore();

const fields : BvTableFieldArray = [
  {
    key: 'status',
    label: '',
    sortable: false,
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'level',
    label: 'Anomaly Level',
    sortable: true,
  },
  {
    key: 'detector',
    label: 'Process/Detector',
    sortable: true,
  },
  {
    key: 'date',
    label: 'Last alert',
    sortable: false,
  },
];
const items = [
  { status: true, level: 40, name: 'Dickerson', detector: 'Macdonald' },
  { status: false, level: 21, name: 'Larsen', detector: 'Shaw' },
  { status: false, level: 89, name: 'Geneva', detector: 'Wilson' },
  { status: true, level: 38, name: 'Jami', detector: 'Carney' }
];
</script>

<template>
  <div>
    <b-card class="h-100">
      <template #header>
        <div class="d-flex justify-between">
          <div class="card-head d-inline-flex place-items-center">
            <ICON_DETECTOR class="mr-1" variant="dark" />
            Alert History ({{ store.getHistory.length }})
          </div>
        </div>
      </template>
      <template #default>
        <b-table borderless hover :items="items" :fields="fields">
          <template #cell(status)="data">
            <img v-if="data.value" :src="ICON_SUCCESS" alt="" width="15" />
            <img v-else :src="ICON_WARNING" alt="" width="15" />
          </template>

          <template #cell(name)="data">
            {{ data.value }}
          </template>

          <template #cell(level)="data">
            {{ data.value }}
          </template>

          <template #cell(detector)="data">
            {{ data.value }}
          </template>

          <template #cell(date)="data">
            {{ new Date().toLocaleString() }}
          </template>
        </b-table>
      </template>
    </b-card>
  </div>
</template>

<style lang="scss">
thead {
  background-color: #EFF4FB
}
</style>
