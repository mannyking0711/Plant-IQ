<script setup lang="ts">
import Header from '@/views/Layout/Header.vue';
import Footer from '@/views/Layout/Footer.vue';
import { useGlobalStore } from '@/stores/global';

document.title = import.meta.env.VITE_APP_TITLE || 'Plant IQ';

const store = useGlobalStore();
</script>

<template>
  <div>
    <Header />

    <main>
      <router-view />
    </main>

    <Footer />

    <b-overlay
      v-if="store.overlay"
      :show="true"
      bg-color="transparent"
      class="position-fixed w-100 h-100 top-0 z-[9999]"
      rounded="sm"
    />

    <notifications position="top center" />
  </div>
</template>
