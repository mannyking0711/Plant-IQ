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
import {useAlertStore} from "@/stores/alert";

const store = useDetectorStore();
const alertStore = useAlertStore();

const onSelectDetector = async (id: number) => {
  alertStore.setCurrentDetectorId(id);
  await alertStore.loadAlertsByDetectorId();
};

</script>

<template>
  <div>
    <b-card class="h-100">
      <template #header>
        <div class="d-flex justify-between">
          <div class="card-head d-inline-flex place-items-center">
            <ICON_DETECTOR class="mr-1" variant="dark" />
            Detectors ({{ store.getDetectors.length }})
          </div>
        </div>
      </template>
      <template #default>
        <div class="max-h-[1000px] overflow-y-auto detector-list">
          <span v-if="store.getDetectors.length === 0">
            Empty detectors ...
          </span>

          <detector-list-item
            v-for="(detector, index) in store.getDetectors"
            :id="detector.pk"
            :key="index"
            :static="true"
            :status="detector.fields.status"
            :description="detector.fields.description"
            :class="{
              'bg-[#E5E7EB]': alertStore.getSelectedDetectorId === detector.pk,
            }"
            :name="detector.fields.name"
            @click="onSelectDetector"
          />
        </div>
      </template>
    </b-card>
  </div>
</template>
