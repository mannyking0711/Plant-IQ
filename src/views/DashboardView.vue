<script lang="ts" setup>
import SearchByDatetime from '@/views/Dashboard/SearchByDatetime.vue';
import ProcessTabsCarousel from '@/views/Dashboard/ProcessTabsCarousel.vue';
import ProcessDetectorList from '@/views/Dashboard/ProcessDetectorList.vue';
import ProcessStatisticsChart from '@/views/Dashboard/ProcessStatisticsChart.vue';
</script>

<template>
  <div class="dashboard">
    <b-row>
      <b-col md="4" class="pt-4">
        <search-by-datetime />
      </b-col>

      <b-col md="8" class="text-center pt-4">
        <process-tabs-carousel />
      </b-col>
    </b-row>

    <b-row>
      <b-col md="4">
        <process-detector-list />
      </b-col>

      <b-col md="8">
        <process-statistics-chart />
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
.dashboard {
  .card {
    border-radius: 10px;
    box-shadow: -8px 8px 8px #dadee8;
  }

  .card-head {
    color: #3a405b;
    font-weight: 600;
    font-size: 1.2rem;
  }
}
</style>
