<script setup lang="ts">
import DatasourceList from '@/views/Datasource/DatasourceList.vue';
import MetricsTable from '@/views/Datasource/MetricsTable.vue';
import GraphChart from '@/views/Datasource/GraphChart.vue';
</script>

<template>
  <div class="datasource">
    <b-row>
      <b-col lg="3" class="pt-4">
        <DatasourceList />
      </b-col>

      <b-col lg="9" class="pt-4">
        <MetricsTable />

        <div class="p-3" />

        <GraphChart />
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
.datasource {
  .card-head {
    color: #3A405B;
    font-weight: 600;
    font-size: 1.3rem;
  }
  .card-header {
    background-color: white;
    border-bottom: 4px solid #EAEEF3;
  }
}
</style>
