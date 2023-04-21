<script setup lang="ts">
import ICON_TRASH from '@/assets/icon/trash.vue';
import ICON_PLUS from '@/assets/icon/plus.vue';
import ICON_PROCESS from '@/assets/icon/nav/process.vue';
import ICON_EDIT from '@/assets/icon/edit.vue';
import { useProcessStore } from '@/stores/process';
import { computed, onMounted } from 'vue';
import ProcessItem from '@/components/Process/ProcessItem.vue';
import ProcessModal from '@/views/Process/ProcessModal.vue';

const store = useProcessStore();

const processList = computed(() => {
  return store.getProcessList;
});

const clickEvent = async (id: number) => {
  await store.loadMetricsByProcessId(id);
  await store.loadDetectorsByProcessId(id);
  await store.setCurrentProcess(id);
};
</script>

<template>
  <div>
    <b-card>
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
            <ICON_EDIT v-b-tooltip="'Edit'" role="button" class="mx-1" />
            <ICON_TRASH v-b-tooltip="'Trash'" role="button" class="mx-1" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="max-h-[1000px] overflow-y-auto">
          <span v-if="processList.length === 0">
            Click plus button to add new process.
          </span>

          <process-item
            v-else
            v-for="(process, index) in processList"
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
