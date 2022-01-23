<template>
  <RenderComponent
    v-if="data"
    :components="data.page_components"
    :page="data.title"
    :entryUid="data.uid"
    :locale="data.locale"
  />
</template>

<script>
import Stack from '../plugins/contentstack';
import RenderComponent from '../components/RenderComponents';
import { onEntryChange } from '../plugins/contentstack';

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
      const response = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: `${this.$route.fullPath}`,
        referenceFieldPath: ['page_components.from_blog.featured_blogs'],
        jsonRtePath: [
          'page_components.section_with_buckets.buckets.description'
        ]
      });
      this.data = response[0];
      this.$store.dispatch('setPage', response[0]);
      this.$store.dispatch('setBlogpost', null);
      document.title = this.data.title;
    }
  },
  mounted() {
    onEntryChange(() => {
      if (process.env.VUE_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
        this.getData();
      }
    });
  }
};
</script>
