<template>
  <main>
    <BlogBanner v-if="banner" :data="banner.page_components[0].hero_banner" />
    <div class="blog-container">
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
      data: null,
      banner: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    moment(param) {
      return moment(param).format('ddd, MMM D YYYY');
    },
    async getData() {
      try {
        const banner = await Stack.getEntryByUrl('page', `/blog`);
        const data = await Stack.getEntryByUrl(
          'blog_post',
          `${this.$route.fullPath}`,
          [`related_post`, `author`]
        );
        this.data = data[0];
        this.banner = banner[0];
        document.title = this.data.title;
      } catch (e) {
        return false;
      }
    }
  }
};
</script>
