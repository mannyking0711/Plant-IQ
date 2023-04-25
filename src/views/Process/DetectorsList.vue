<script lang="ts" setup>
import ICON_DETECTOR from '@/assets/icon/nav/detectors.vue';
import { useProcessStore } from '@/stores/process';
import { computed } from 'vue';
import DetectorListItem from '@/components/Process/DetectorListItem.vue';

const store = useProcessStore();

const detectorList = computed(() => {
  return store.getDetectors;
});
</script>

<template>
  <div>
    <b-card class="h-100">
      <template #header>
        <div class="d-flex justify-between">
          <div class="card-head d-inline-flex place-items-center">
            <ICON_DETECTOR class="mr-1" variant="dark" />
            Detectors ({{ detectorList.length }})
          </div>
        </div>
      </template>
      <template #default>
        <div class="max-h-[1000px] overflow-y-auto detector-list">
          <span v-if="store.getDetectors.length === 0">
            Empty detectors ...
          </span>

          <detector-list-item
            v-for="(detector, index) in detectorList"
            :id="detector.pk"
            :key="index"
            :status="detector.fields.status"
            :description="detector.fields.description"
            :name="detector.fields.name"
          />
        </div>
      </template>
    </b-card>
  </div>
</template>
