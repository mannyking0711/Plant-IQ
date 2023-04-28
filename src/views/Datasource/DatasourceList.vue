<script lang="ts" setup>
import ICON_DATASOURCE from '@/assets/icon/db.vue';
import ICON_PLUS from '@/assets/icon/plus.vue';
import ICON_EDIT from '@/assets/icon/edit.vue';
import ICON_TRASH from '@/assets/icon/trash.vue';
import DatasourceItem from '@/components/Datasource/DatasourceItem.vue';
import DatasourceModal from '@/views/Datasource/DatasourceModal.vue';
import { Status } from '@/model/status';
import { onMounted } from 'vue';
import { useDSStore } from '@/stores/datasource';
import UpdateDatasourceModal from '@/views/Datasource/UpdateDatasourceModal.vue';
import Swal from 'sweetalert2';

const store = useDSStore();

onMounted(() => {
  store.loadDatasource();
});

const dbItemClicked = async (id: number) => {
  if (id !== store.datasourceId) {
    // Load metrics
    await store.setCurrentDatasourceId(id);
  }
};

const onDeleteEvent = async () => {
  const r = await Swal.fire({
    icon: 'question',
    title: 'Do you want to delete it?',
    showConfirmButton: true,
    showCancelButton: true,
  });

  if (r.isConfirmed) {
    await store.deleteDatasource(store.getCurrentDatasourceId);

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
  <b-card class="h-100">
    <template #header>
      <div class="d-flex justify-between">
        <div class="card-head d-inline-flex place-items-center">
          <ICON_DATASOURCE class="mr-1" />
          Data sources ({{ store.getDatasourceList.length }})
        </div>
        <div class="d-inline-flex place-items-center">
          <ICON_PLUS
            v-b-modal="'new-datasource-modal'"
            v-b-tooltip="'Add'"
            role="button"
            class="mx-1"
          />
          <DatasourceModal />
          <span
            v-b-modal="'update-datasource-modal'"
            v-b-tooltip="'Edit'"
            class="mx-1"
            :role="store.getCurrentDatasourceId === -1 ? '' : 'button'"
            :disabled="store.getCurrentDatasourceId === -1"
          >
            <ICON_EDIT />
          </span>
          <UpdateDatasourceModal />
          <span
            v-b-tooltip="'Trash'"
            class="mx-1"
            :role="store.getCurrentDatasourceId === -1 ? '' : 'button'"
            :disabled="store.getCurrentDatasourceId === -1"
            @click="onDeleteEvent"
          >
            <ICON_TRASH />
          </span>
        </div>
      </div>
    </template>
    <template #default>
      <div class="max-h-[1000px] px-1 overflow-y-auto">
        <span v-if="store.getDatasourceList.length === 0">
          Click plus button to add new datasource.
        </span>
        <datasource-item
          v-for="(db, index) in store.getDatasourceList"
          :id="db.pk"
          :key="index"
          :name="db.fields.name"
          :status="Status.ACTIVATED"
          :url="db.fields.url"
          :class="{
            active: store.getCurrentDatasourceId === db.pk,
          }"
          class="mb-2"
          @click="dbItemClicked(db.pk)"
        />
      </div>
    </template>
  </b-card>
</template>
