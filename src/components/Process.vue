<script lang="ts" setup>
import { Status } from '@/model/status';
import type { PropType } from 'vue';
import { computed } from 'vue';
import ICON_SUCCESS from '@/assets/icon/status/success.svg';
import ICON_WARNING from '@/assets/icon/status/warning.svg';

const props = defineProps({
  status: { type: String as PropType<Status>, required: true },
  maxAnomaly: { type: Number, required: true },
  topAlerts: { type: Number, required: true },
  actualScore: { type: Number, required: true },
  date: { type: Date, required: true },
});

const icon = computed(() => {
  if (props.status === Status.ACTIVATED) return ICON_SUCCESS;
  else if (props.status === Status.PENDING) return ICON_WARNING;
  else return ICON_WARNING;
});
</script>

<template>
  <div class="process">
    <div class="text-lg font-weight-bold text-center mb-2">Energy Anomaly</div>

    <div class="d-flex justify-content-center space-x-4 mb-2">
      <div class="d-flex flex-column gap-[.25rem]">
        Status
        <img :src="icon" alt="status" class="h-[2rem]" />
      </div>
      <div class="d-flex flex-column gap-[.25rem]">
        Max Anomaly
        <div class="h-100 d-flex justify-center align-items-center text-lg font-semibold text-[#F89500]">
          {{ maxAnomaly }}
        </div>
      </div>
      <div class="d-flex flex-column gap-[.25rem]">
        Total Alerts
        <div class="h-100 d-flex justify-center align-items-center text-lg font-semibold text-[#2F80ED]">
          {{ topAlerts }}
        </div>
      </div>
      <div class="d-flex flex-column gap-[.25rem]">
        Actual Score
        <div class="h-100 d-flex justify-center align-items-center text-lg font-semibold text-[#00FF85]">
          {{ actualScore }}
        </div>
      </div>
    </div>

    <div class="d-flex flex-column">
      Last Anomaly
      <div class="text-lg font-semibold date-format">
        {{ date | date_format }}
        &nbsp;
        {{ date | time_format }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.process {
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;

  * {
    text-align: center;
  }
}
</style>
