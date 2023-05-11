<script lang="ts" setup>
import VueSlickCarousel from 'vue-slick-carousel';
import ProcessTab from '@/components/Dashboard/ProcessTab.vue';
import {onMounted, ref} from 'vue';

import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import {useProcessStore} from "@/stores/process";

const currentPage = ref(1);
const pages = ref(0);

const selectedProcess = ref(-1);

const processStore = useProcessStore();

const slickSetting = {
  arrows: false,
  dots: true,
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

const onSelectTab = async (id: number) => {
  selectedProcess.value = id;
};

onMounted(async () => {
  await processStore.loadProcessList(false);
});
</script>

<template>
  <div>
    <VueSlickCarousel
      v-if="processStore.getProcessList.length"
      v-bind="slickSetting"
      class="mb-5"
    >
      <ProcessTab
        v-for="(pTab, index) in processStore.getProcessList"
        :key="index"
        :active="selectedProcess === pTab.pk"
        v-bind="pTab"
        @click="onSelectTab"
      />
    </VueSlickCarousel>

    <!--    <b-pagination-nav-->
    <!--      v-model="currentPage"-->
    <!--      :number-of-pages="pages"-->
    <!--      class="mb-0"-->
    <!--      align="center"-->
    <!--      base-url="#"-->
    <!--      first-number-->
    <!--      last-number-->
    <!--      next-text=">"-->
    <!--      pills-->
    <!--      prev-text="<"-->
    <!--    />-->
  </div>
</template>
