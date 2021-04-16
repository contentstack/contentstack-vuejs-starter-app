<template>
  <footer v-if="data">
    <div class="max-width footer-div">
      <div class="col-quarter">
        <router-link aria-current="page" class="logo-tag" to="/">
          <img
            :src="data.logo.url"
            :alt="data.logo.title"
            :title="data.logo.title"
            class="logo footer-logo"
          />
        </router-link>
      </div>
      <div class="col-half">
        <nav>
          <ul class="nav-ul">
            <li
              v-for="index in data.navigation.link"
              :key="index"
              class="footer-nav-li"
            >
              <router-link aria-current="page" :to="index.href">
                {{ index.title }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-quarter social-link">
        <div class="social-nav">
          <router-link
            v-for="socialLinks in data.social.social_share"
            :key="socialLinks"
            :to="socialLinks.link.href"
            :title="socialLinks.link.title"
            class="footer-social-links"
          >
            <img :src="socialLinks.icon.url" :alt="socialLinks.link.title" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p v-html="data.copyright" />
    </div>
  </footer>
</template>

<script>
import Stack from '../plugins/contentstack';

export default {
  name: 'Footer',
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
      let response = await Stack.getEntries('footer');
      this.data = response[0];
    }
  }
};
</script>

<style></style>
