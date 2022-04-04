<template>
  <div>
    <Header />
    <router-view :key="$route.path" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>
