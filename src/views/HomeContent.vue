<template>

  <NotFound v-if="error" />
  <RenderComponent
    v-if="data"
    :components="data.page_components"
    :page="data.title"
    :entryUid="data.uid"
    :locale="data.locale"
  />
  <Skeletor height="100vh" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPage } from '../helper';
import RenderComponent from '../components/RenderComponents.vue';
import { onEntryChange } from '../plugins/contentstack';
import NotFound from './NotFound.vue';
import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';
import { Page } from '@/typescript/pages';

export default defineComponent({
  name: 'HomeContent',
  components: {
    RenderComponent,
    NotFound,
    Skeletor,
  },
  data() {
    return {
      data: {} as Page,
      error: false as boolean,
    };
  },
  async created() {
    try {
      await this.getData();
    } catch (error) {
      this.error = true;
      console.error(error);
    }
  },

  methods: {
    async getData() {
      const response = await getPage(`${this.$route.fullPath}`);
      this.data = response;
      this.$store.dispatch('setPage', response);
      this.$store.dispatch('setBlogpost', null);
      document.title = this.data.title;
      const element = document.getElementsByClassName('cslp-tooltip');
      element[0] ? element[0].outerHTML : '';
    },
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.VUE_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
        try {
          await this.getData();
        } catch (error) {
          this.error = true;
          console.error(error);
        }
      }
    });
  },
});
</script>
