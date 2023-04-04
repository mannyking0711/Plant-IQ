<script setup lang="ts">
import Header from '@/views/Layout/Header.vue';
import Footer from '@/views/Layout/Footer.vue';

document.title = import.meta.env.VITE_APP_TITLE || 'Plant IQ';
</script>

<template>
  <div>
    <Header />

    <main>
      <router-view />
    </main>

    <Footer />
  </div>
</template>
