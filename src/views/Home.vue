<template>
  <RenderComponent
    v-if="data"
    :components="data.page_components"
    :page="data.title"
  />
</template>

<script>
import Stack from '../plugins/contentstack';
import RenderComponent from '../components/RenderComponents';

export default {
  name: 'Home',
  components: {
    RenderComponent
  },
  data() {
    return {
      data: null
    };
  },
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      const response = await Stack.getEntryByUrl(
        'page',
        `${this.$route.fullPath}`,
        ['page_components.from_blog.featured_blogs']
      );
      this.data = response[0];
      document.title = this.data.title;
    }
  }
};
</script>
