<script setup lang="ts">
import ICON_PROCESS from '@/assets/icon/nav/process.vue';
import ProcessItem from '@/components/Process/ProcessItem.vue';
import { useDetectorStore } from '@/stores/detector';
import { computed } from 'vue';

const store = useDetectorStore();

const process = computed(() => store.getProcess);
</script>

<template>
  <div>
    <b-card>
      <template #header>
        <div class="d-flex justify-between">
          <div class="card-head d-inline-flex place-items-center">
            <ICON_PROCESS variant="dark" class="mr-1" />
            Process
          </div>
        </div>
      </template>
      <template #default>
        <div class="max-h-[800px] overflow-y-auto">
          <span v-if="!store.getProcess">No process ...</span>

          <process-item
            v-else
            :id="process.pk"
            :activated="process.fields.status"
            :name="process.fields.name"
            :description="process.fields.description"
          />
        </div>
      </template>
    </b-card>
  </div>
</template>
