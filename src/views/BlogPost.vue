<template>
  <main>
    <RenderComponent
      v-if="banner"
      :components="banner.page_components"
      :page="banner.title"
      :entryUid="banner.uid"
      :locale="banner.locale"
    />
    <div
      class="blog-container"
      :data-pageref="data?.uid"
      data-contenttype="blog_post"
      :data-locale="data?.locale"
    >
      <div v-if="data" class="blog-detail">
        <h2>{{ data.title }}</h2>
        <p>
          {{ moment(data.date) }}, <strong>{{ data.author[0].title }}</strong>
        </p>
        <p v-html="data.body" />
      </div>
      <div v-if="data" class="blog-column-right">
        <div class="related-post">
          <h2>{{ banner.page_components[2].widget.title_h2 }}</h2>
          <div v-for="(blog, index) in data.related_post" :key="index">
            <a :key="index" :href="blog.url"
              ><h4>{{ blog.title }}</h4></a
            >
            <p v-html="blog.body.slice(0, 80)" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';
import RenderComponent from '../components/RenderComponents.vue';
import { onEntryChange } from '../plugins/contentstack';
import { getPage, getBlogPost } from '@/helper';
import { BlogPost, Page } from '@/typescript/pages';

export default defineComponent({
  components: {
    RenderComponent,
  },
  data() {
    return {
      data: null as BlogPost | null,
      banner: null as Page | null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    moment(param: string) {
      return moment(param).format('ddd, MMM D YYYY');
    },
    async getData() {
      try {
        const banner = await getPage('/blog');
        const data = await getBlogPost(`${this.$route.fullPath}`);
        this.data = data;
        this.banner = banner;
        this.$store.dispatch('setPage', banner);
        this.$store.dispatch('setBlogpost', data);
        const element: any = document.getElementsByClassName('cslp-tooltip');
        element[0] ? (element[0].outerHTML = null) : '';
      } catch (e) {
        return false;
      }
    },
  },
  mounted() {
    onEntryChange(() => {
      if (process.env.VUE_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
        this.getData();
      }
    });
  },
});
</script>
