<template>
  <div>
    <Header />
    <router-view :key="$route.path" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/HeaderContent.vue';
import Footer from '@/components/FooterContent.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>
