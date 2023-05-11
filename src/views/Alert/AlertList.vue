<script lang="ts" setup>
import ICON_ALERT from '@/assets/icon/nav/alerts.vue';
import ICON_TRASH from '@/assets/icon/trash.vue';
import ICON_PLUS from '@/assets/icon/plus.vue';
import ICON_EDIT from '@/assets/icon/edit.vue';
import {computed} from 'vue';
import Swal from 'sweetalert2';
import AlertListItem from "@/components/Alert/AlertListItem.vue";
import {useAlertStore} from "@/stores/alert";
import CreateAlertModal from "@/views/Alert/CreateAlertModal.vue";
import UpdateAlertModal from "@/views/Alert/UpdateAlertModal.vue";

const store = useAlertStore();

const alertsList = computed(() => {
  return store.getAlerts;
});

const onSelectAlert = async (id: number) => {
  store.setCurrentAlertId(id);
  await store.loadHistory(id);
};

const onDeleteEvent = async () => {
  if(store.getSelectedAlertId === -1)
    return;

  const r = await Swal.fire({
    icon: 'question',
    title: 'Do you want to delete it?',
    showConfirmButton: true,
    showCancelButton: true,
  });

  if (r.isConfirmed) {
    await store.deleteAlert(store.getSelectedAlertId);

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
            <ICON_ALERT class="mr-1" variant="dark"/>
            Alerts ({{ alertsList.length }})
          </div>
          <div class="d-inline-flex place-items-center">
            <ICON_PLUS
              v-b-modal="'new-alert-modal'"
              v-b-tooltip="'Add'"
              class="mx-1"
            />
            <create-alert-modal />
            <span
              v-b-modal="'update-alert-modal'"
              v-b-tooltip="'Edit'"
              class="mx-1"
              :role="store.getSelectedAlertId === -1 ? '' : 'button'"
              :disabled="store.getSelectedAlertId === -1"
            >
              <ICON_EDIT/>
            </span>
            <update-alert-modal />
            <span
              v-b-tooltip="'Trash'"
              class="mx-1"
              :role="store.getSelectedAlertId === -1 ? '' : 'button'"
              @click="onDeleteEvent"
            >
              <ICON_TRASH/>
            </span>
          </div>
        </div>
      </template>
      <template #default>
        <div class="max-h-[1000px] overflow-y-auto detector-list">
          <span v-if="alertsList.length === 0">
            Empty alerts ...
          </span>

          <alert-list-item
            v-for="(alert, index) in alertsList"
            :id="alert.pk"
            :key="index"
            :static="false"
            :status="alert.fields.status"
            :description="alert.fields.description"
            :class="{
              'bg-[#E5E7EB]': store.getSelectedAlertId === alert.pk,
            }"
            :name="alert.fields.name"
            @click="onSelectAlert"
          />
        </div>
      </template>
    </b-card>
  </div>
</template>
