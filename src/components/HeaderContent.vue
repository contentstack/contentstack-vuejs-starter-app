<template>
  <header v-if="!!data" class="header">
    <div class="note-div" v-if="data.notification_bar.show_announcement">
      <span
        v-if="typeof data.notification_bar.announcement_text === 'string'"
        v-html="data.notification_bar.announcement_text"
      />
    </div>
    <div class="max-width header-div">
      <div class="wrapper-logo">
        <router-link
          aria-current="page"
          class="logo-tag"
          title="Contentstack"
          to="/"
        >
          <img
            class="logo"
            :src="data.logo.url"
            :alt="data.logo.title"
            :title="data.logo.title"
          />
        </router-link>
      </div>
      <input id="menu-btn" class="menu-btn" type="checkbox" /><label
        class="menu-icon"
        for="menu-btn"
        ><span class="navicon"
      /></label>
      <nav class="menu">
        <ul class="nav-ul header-ul">
          <li
            v-for="navItems in data.navigation_menu"
            :key="navItems.title"
            class="nav-li"
          >
            <router-link
              :to="navItems.page_reference[0].url"
              active-class="active"
            >
              {{ navItems.label }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="json-preview">
        <Tooltip content="JSON Preview" direction="top"> </Tooltip>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { onEntryChange } from '../plugins/contentstack';
import Tooltip from '../components/ToolTip.vue';
import { getAllEntries, getHeader } from '@/helper';
import { HeaderRes } from "@/typescript/response";

export default defineComponent({
  name: 'HeaderContent',
  components: {
    Tooltip,
  },
  data() {
    return {
      data: null as HeaderRes | null,
    };
  },
  async created() {
        try {
          this.data = await this.getData();
          this.$store.dispatch('setHeader', this.data);
        } catch (error) {
          console.error(error);
        }
  },
  methods: {
    async getData() {
      const response = await getHeader();
      const responsePages = await getAllEntries();
      const navHeaderList = response.navigation_menu;
      if (responsePages.length !== response.navigation_menu.length) {
        responsePages.forEach((entry) => {
          const hFound = response.navigation_menu.find(
            (navLink) => navLink.page_reference[0].title === entry.title
          );

          if (!hFound) {
            navHeaderList.push({
              label: entry.title,
              page_reference: [{ title: entry.title, url: entry.url }],
            });
          }
        });
      }
      response.navigation_menu = navHeaderList;
      return response;
    },
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.VUE_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
        this.data = await this.getData();
        this.$store.dispatch('setHeader', this.data);
      }
    });
  },
});
</script>
