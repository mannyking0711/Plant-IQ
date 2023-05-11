<script lang="ts" setup>
import ICON_DETECTOR from '@/assets/icon/nav/detectors.vue';
import ICON_TRASH from '@/assets/icon/trash.vue';
import ICON_PLUS from '@/assets/icon/plus.vue';
import ICON_EDIT from '@/assets/icon/edit.vue';
import { computed } from 'vue';
import { useDetectorStore } from '@/stores/detector';
import DetectorListItem from '@/components/Process/DetectorListItem.vue';
import DetectorModal from '@/views/Detector/DetectorModal.vue';
import UpdateDetectorModal from '@/views/Detector/UpdateDetectorModal.vue';
import Swal from 'sweetalert2';

const store = useDetectorStore();

const detectorList = computed(() => {
  return store.getDetectors;
});

const onSelectDetector = async (id: number) => {
  store.setCurrentDetector(id);
  await store.loadProcessByDetectorId(id);
  await store.loadMetricsByDetectorId(id);
  await store.loadRecords();
};

const onDeleteEvent = async () => {
  if (store.getSelectedDetectorId === -1)
    return;

  const r = await Swal.fire({
    icon: 'question',
    title: 'Do you want to delete it?',
    showConfirmButton: true,
    showCancelButton: true,
  });

  if (r.isConfirmed) {
    await store.deleteDetector(store.getSelectedDetectorId);

    await Swal.fire({
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
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
          <div class="d-inline-flex place-items-center">
            <ICON_PLUS
              v-b-modal="'new-detector-modal'"
              v-b-tooltip="'Add'"
              class="mx-1"
            />
            <DetectorModal />
            <span
              v-b-modal="'update-detector-modal'"
              v-b-tooltip="'Edit'"
              class="mx-1"
              :role="store.getSelectedDetectorId === -1 ? '' : 'button'"
              :disabled="store.getSelectedDetectorId === -1"
            >
              <ICON_EDIT />
            </span>
            <UpdateDetectorModal />
            <span
              v-b-tooltip="'Trash'"
              class="mx-1"
              :role="store.getSelectedDetectorId === -1 ? '' : 'button'"
              @click="onDeleteEvent"
            >
              <ICON_TRASH />
            </span>
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
            :static="false"
            :status="detector.fields.status"
            :description="detector.fields.description"
            :class="{
              'bg-[#E5E7EB]': store.getSelectedDetectorId === detector.pk,
            }"
            :name="detector.fields.name"
            @click="onSelectDetector"
          />
        </div>
      </template>
    </b-card>
  </div>
</template>
