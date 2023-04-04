<script lang="ts" setup>
import ICON_DATASOURCE from '@/assets/icon/db.vue';
import ICON_PLUS from '@/assets/icon/plus.vue';
import ICON_EDIT from '@/assets/icon/edit.vue';
import ICON_TRASH from '@/assets/icon/trash.vue';
import DatasourceItem from '@/components/DatasourceItem.vue';
import { Status } from '@/model/status';

const dbList: DatasourceItem.Props[] = [
  {
    name: 'Datasource1',
    url: 'http://localhost:3306',
    status: Status.ACTIVATED,
  },
  {
    name: 'Datasource2',
    url: 'http://localhost:3306',
    status: Status.PENDING,
  },
  {
    name: 'Datasource3',
    url: 'http://localhost:3306',
    status: Status.ACTIVATED,
  },
  {
    name: 'Datasource4',
    url: 'http://localhost:3306',
    status: Status.PENDING,
  },
  {
    name: 'Datasource4',
    url: 'http://localhost:3306',
    status: Status.PENDING,
  },
  {
    name: 'Datasource4',
    url: 'http://localhost:3306',
    status: Status.PENDING,
  },
  {
    name: 'Datasource4',
    url: 'http://localhost:3306',
    status: Status.PENDING,
  },
  {
    name: 'Datasource4',
    url: 'http://localhost:3306',
    status: Status.PENDING,
  },
];
</script>

<template>
  <b-card>
    <template #header>
      <div class="d-flex justify-between">
        <div class="card-head d-inline-flex place-items-center">
          <ICON_DATASOURCE class="mr-1" />
          Data sources ({{ dbList.length }})
        </div>
        <div class="d-inline-flex place-items-center">
          <ICON_PLUS v-b-tooltip="'Add'" class="mx-1" />
          <ICON_EDIT v-b-tooltip="'edit'" class="mx-1" />
          <ICON_TRASH v-b-tooltip="'trash'" class="mx-1" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="h-100 px-1 overflow-y-scroll">
        <DatasourceItem
          v-for="(db, index) in dbList"
          :key="index"
          :name="db.name"
          :status="db.status"
          :url="db.url"
          class="mb-2"
        />
      </div>
    </template>
  </b-card>
</template>
