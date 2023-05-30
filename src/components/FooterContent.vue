<template>
  <footer v-if="!!data">
    <div class="max-width footer-div">
      <div class="col-quarter">
        <router-link aria-current="page" class="logo-tag" to="/">
          <img
            v-if="data.logo"
            :src="data.logo.url"
            :alt="data.logo.title"
            :title="data.logo.title"
            class="logo footer-logo"
          />
        </router-link>
      </div>
      <div class="col-half">
        <nav>
          <ul class="nav-ul" v-if="data.navigation">
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
          <div class="social-nav" v-if="data.social">
            <a
              v-for="socialLinks in data.social.social_share"
              :key="socialLinks"
              :href="socialLinks.link.href"
              :title="socialLinks.link.title"
              class="footer-social-links"
            >
              <img :src="socialLinks.icon.url" :alt="socialLinks.link.title" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p v-if="typeof data.copyright === 'string'" v-html="data.copyright" />
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { onEntryChange } from '../plugins/contentstack';
import { getAllEntries, getFooter } from '../helper';

export default defineComponent({
  name: 'FooterContent',
  data() {
    return {
      data: {},
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
      const response = await getFooter();
      const responsePages = await getAllEntries();
      const navFooterList = response.navigation.link;
      if (responsePages.length !== response.navigation.link.length) {
        responsePages.forEach((entry) => {
          const fFound = response.navigation.link.find(
            (link) => link.title === entry.title
          );
          if (!fFound) {
            navFooterList.push({ title: entry.title, href: entry.url });
          }
        });
      }
      response.navigation.link = navFooterList;
      this.data = response;
      this.$store.dispatch('setFooter', response);
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
