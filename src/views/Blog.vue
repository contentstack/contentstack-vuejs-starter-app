<template>
  <main v-if="banner">
    <BlogBanner :data="banner.page_components[0].hero_banner" />
    <div class="blog-container">
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
</template>

<script>
import moment from 'moment';
import Stack from '../plugins/contentstack';
import BlogBanner from '../components/BlogBanner';
export default {
  components: {
    BlogBanner
  },
  data() {
    return {
      banner: null,
      archivedList: null,
      recentBlog: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const archived = [];
      const recentPost = [];
      const data = await Stack.getEntryByUrl('page', `${this.$route.fullPath}`);
      const list = await Stack.getEntries('blog_post', [
        `author`,
        `related_post`
      ]);
      list.forEach(item => {
        if (item.is_archived) {
          archived.push(item);
        } else {
          recentPost.push(item);
        }
      });
      this.banner = data[0];
      this.recentBlog = recentPost;
      this.archivedList = archived;
      document.title = this.banner.title;
    },
    moment(param) {
      return moment(param).format('ddd, MMM D YYYY');
    }
  }
};
</script>
