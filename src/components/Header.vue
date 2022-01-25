<template>
  <header v-if="data" class="header">
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
      <div className="json-preview">
        <Tooltip content="JSON Preview" direction="top"> </Tooltip>
      </div>
    </div>
  </header>
</template>

<script>
import Stack from '../plugins/contentstack';
import { onEntryChange } from '../plugins/contentstack';
import Tooltip from '../components/Tooltip';

export default {
  name: 'Header',
  components: {
    Tooltip
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
      let response = await Stack.getEntries({
        contentTypeUid: 'header',
        referenceFieldPath: `navigation_menu.page_reference`,
        jsonRtePath: ['notification_bar.announcement_text']
      });
      this.data = response[0];
      this.$store.dispatch('setHeader', response[0]);
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
