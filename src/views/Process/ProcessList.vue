<script setup lang="ts">
import ICON_TRASH from '@/assets/icon/trash.vue';
import ICON_PLUS from '@/assets/icon/plus.vue';
import ICON_PROCESS from '@/assets/icon/nav/process.vue';
import ICON_EDIT from '@/assets/icon/edit.vue';
import { useProcessStore } from '@/stores/process';
import { computed, onMounted } from 'vue';
import ProcessItem from '@/components/Process/ProcessItem.vue';
import ProcessModal from '@/views/Process/ProcessModal.vue';
import UpdateProcessModal from '@/views/Process/UpdateProcessModal.vue';
import Swal from "sweetalert2";

const store = useProcessStore();

const processList = computed(() => {
  return store.getProcessList;
});

const clickEvent = async (id: number) => {
  await store.loadMetricsByProcessId(id);
  await store.loadDetectorsByProcessId(id);
  await store.setCurrentProcess(id);
};

const onDeleteEvent = async () => {
  const r = await Swal.fire({
    icon: 'question',
    title: 'Do you want to delete it?',
    showConfirmButton: true,
    showCancelButton: true,
  });

  if (r.isConfirmed) {
    await store.deleteProcess(store.getSelectedProcessId);

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
            <ICON_PROCESS variant="dark" class="mr-1" />
            Process ({{ store.getProcessList.length }})
          </div>
          <div class="d-inline-flex place-items-center">
            <ICON_PLUS
              v-b-modal="'new-process-modal'"
              v-b-tooltip="'Add'"
              class="mx-1"
            />
            <ProcessModal />
            <span
              v-b-modal="'update-process-modal'"
              v-b-tooltip="'Edit'"
              class="mx-1"
              :role="store.getSelectedProcessId === -1 ? '' : 'button'"
              :disabled="store.getSelectedProcessId === -1"
            >
              <ICON_EDIT />
            </span>
            <UpdateProcessModal />
            <span
              v-b-tooltip="'Trash'"
              class="mx-1"
              :role="store.getSelectedProcessId === -1 ? '' : 'button'"
              :disabled="store.getSelectedProcessId === -1"
              @click="onDeleteEvent"
            >
              <ICON_TRASH />
            </span>
          </div>
        </div>
      </template>
      <template #default>
        <div class="max-h-[1000px] overflow-y-auto">
          <span v-if="processList.length === 0">
            Click plus button to add new process.
          </span>

          <process-item
            v-for="(process, index) in processList"
            v-else
            :id="process.pk"
            :key="index"
            :static="false"
            :activated="process.fields.status"
            :name="process.fields.name"
            :description="process.fields.description"
            :checked="store.getSelectedProcessId === process.pk"
            :class="{
              'bg-[#E5E7EB]': store.getSelectedProcessId === process.pk,
            }"
            @click="clickEvent"
          />
        </div>
      </template>
    </b-card>
  </div>
</template>
