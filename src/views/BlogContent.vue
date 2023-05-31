<template>
  <main v-if="banner">
    <RenderComponent
      v-if="banner"
      :components="banner.page_components"
      :page="banner.title"
      :entryUid="banner.uid"
      :locale="banner.locale"
    />
    <div
      class="blog-container"
      :data-pageref="banner.uid"
      data-contenttype="page"
      :data-locale="banner.locale"
    >
      <div class="blog-column-left">
        <div v-for="(list, index) in recentBlog" :key="index" class="blog-list">
          <router-link :to="list.url">
            <img
              alt="blog img"
              class="blog-list-img"
              :src="list.featured_image.url"
            />
          </router-link>
          <div class="blog-content">
            <router-link :to="list.url">
              <h3>{{ list.title }}</h3>
            </router-link>
            <p>
              {{ moment(list.date) }},
              <strong>{{ list.author[0].title }}</strong>
            </p>
            <p v-html="list.body.slice(0, 250)" />
            <router-link :to="list.url">
              <span>Read more --&gt;</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="blog-column-right">
        <h2>{{ banner.page_components[1].widget.title_h2 }}</h2>
        <router-link
          v-for="(component, index) in archivedList"
          :key="index"
          :to="component.url"
        >
          <div>
            <h4>{{ component.title }}</h4>
            <p v-html="component.body.slice(0, 80)" />
          </div>
        </router-link>
      </div>
    </div>
  </main>
  <Skeletor v-else height="100vh" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';
import RenderComponent from '../components/RenderComponents.vue';
import { onEntryChange } from '../plugins/contentstack';
import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';
import { getBlogList, getPage } from '@/helper';
import { BlogPost, Page } from '@/typescript/pages';

export default defineComponent({
  components: {
    RenderComponent,
    Skeletor,
  },
  data() {
    return {
      banner: null as Page | null,
      archivedList: null as BlogPost[] | null,
      recentBlog: null as BlogPost[] | null,
    };
  },
  async created() {
    try {
      await this.getData();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async getData() {
      const archived = [] as BlogPost[];
      const recentPost = [] as BlogPost[];
      const data = await getPage(`${this.$route.fullPath}`);
      const list = await getBlogList();
      list.forEach((item) => {
        if (item.is_archived) {
          archived.push(item);
        } else {
          recentPost.push(item);
        }
      });
      this.banner = data;
      this.recentBlog = recentPost;
      this.archivedList = archived;
      this.$store.dispatch('setPage', data);
      this.$store.dispatch('setBlogpost', list);
      const element: any = document.getElementsByClassName('cslp-tooltip');
      element[0] ? (element[0].outerHTML = null) : '';
    },
    moment(param: string) {
      return moment(param).format('ddd, MMM D YYYY');
    },
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.VUE_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
        try {
          await this.getData();
        } catch (error) {
          console.error(error);
        }
      }
    });
  },
});
</script>
