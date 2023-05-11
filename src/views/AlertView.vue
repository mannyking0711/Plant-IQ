<script setup lang="ts">
import DetectorList from "@/views/Alert/DetectorList.vue";
import AlertList from "@/views/Alert/AlertList.vue";
import AlertHistoryTable from "@/views/Alert/AlertHistoryTable.vue";
import {useDetectorStore} from "@/stores/detector";
import {onMounted} from "vue";

const store = useDetectorStore();

onMounted(async () => {
  await store.loadDetectorList();
});
</script>

<template>
  <div class="alert-view">
    <b-row>
      <b-col lg="3" class="mt-3">
        <detector-list />
      </b-col>

      <b-col lg="3" class="mt-3">
        <alert-list />
      </b-col>

      <b-col lg="6" class="mt-3">
        <alert-history-table />
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
.alert-view {
  .card-head {
    color: #3a405b;
    font-weight: 600;
    font-size: 1.3rem;
  }

  .card-header {
    background-color: white;
    border-bottom: 4px solid #eaeef3;
  }
}
</style>
