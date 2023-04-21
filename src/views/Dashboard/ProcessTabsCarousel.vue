<script lang="ts" setup>
import VueSlickCarousel from 'vue-slick-carousel';
import ProcessTab from '@/components/Dashboard/ProcessTab.vue';
import { ref } from 'vue';
import { ProcessModel } from '@/model/processModel';
import { Status } from '@/model/status';

import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

const currentPage = ref(1);
const pages = 2;

const slickSetting = {
  arrows: false,
  dots: false,
  focusOnSelect: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const processTabList: ProcessModel[] = [
  {
    name: 'Cutting',
    status: Status.ACTIVATED,
    detectors: [
      {
        name: 'D1',
        status: Status.ACTIVATED,
      },
    ],
  },
  {
    name: 'Cutting',
    status: Status.ACTIVATED,
    detectors: [
      {
        name: 'D1',
        status: Status.ACTIVATED,
      },
    ],
  },
  {
    name: 'Cutting',
    status: Status.ACTIVATED,
    detectors: [
      {
        name: 'D1',
        status: Status.ACTIVATED,
      },
    ],
  },
  {
    name: 'Cutting',
    status: Status.ACTIVATED,
    detectors: [
      {
        name: 'D1',
        status: Status.ACTIVATED,
      },
    ],
  },
];
</script>

<template>
  <div>
    <VueSlickCarousel v-bind="slickSetting">
      <ProcessTab
        v-for="(pTab, index) in processTabList"
        :key="index"
        v-bind="pTab"
      />
    </VueSlickCarousel>

    <b-pagination-nav
      v-model="currentPage"
      :number-of-pages="pages"
      class="mb-0"
      align="center"
      base-url="#"
      first-number
      last-number
      next-text=">"
      pills
      prev-text="<"
    />
  </div>
</template>
