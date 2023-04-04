<script lang="ts" setup>
import SearchByDatetime from '@/views/Dashboard/SearchByDatetime.vue';
import ProcessTabsCarousel from '@/views/Dashboard/ProcessTabsCarousel.vue';
import ProcessDetectorList from '@/views/Dashboard/ProcessDetectorList.vue';
import ProcessStatisticsChart from '@/views/Dashboard/ProcessStatisticsChart.vue';
</script>

<template>
  <div class="dashboard">
    <b-row>
      <b-col cols="4" class="pt-4 pr-5">
        <SearchByDatetime />
      </b-col>

      <b-col cols="8" class="text-center">
        <ProcessTabsCarousel />
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="4">
        <ProcessDetectorList />
      </b-col>

      <b-col cols="8">
        <ProcessStatisticsChart />
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
.dashboard {
  .card {
    border-radius: 10px;
    box-shadow: -8px 8px 8px #DADEE8;
  }

  .card-head {
    color: #3A405B;
    font-weight: 600;
    font-size: 1.2rem;
  }
}
</style>
