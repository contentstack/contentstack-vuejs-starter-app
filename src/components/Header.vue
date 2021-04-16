<template>
  <header v-if="data" class="header">
    <div class="note-div" v-html="data.notification_bar.announcement_text" />
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
            <router-link :to="navItems.page_reference[0].url">
              {{ navItems.page_reference[0].title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import Stack from '../plugins/contentstack';

export default {
  name: 'Header',
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
      let response = await Stack.getEntries(
        'header',
        `navigation_menu.page_reference`
      );
      this.data = response[0];
    }
  }
};
</script>

<style></style>
