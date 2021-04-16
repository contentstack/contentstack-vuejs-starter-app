<template>
  <div class="hero-banner" :style="{ background: `${data.bg_color}` }">
    <div :class="[title === 'about-content' ? title : 'home-content']">
      <h1 class="hero-title">
        {{ data.banner_title }}
      </h1>
      <p
        :class="[
          'hero-description',
          title === 'about-content' ? 'about-desc' : ''
        ]"
      >
        {{ data.banner_description }}
      </p>
      <template v-if="title === 'home-content'">
        <router-link aria-current="page" class="btn tertiary-btn" to="/">
          Read more
        </router-link>
      </template>
    </div>
    <img :src="data.banner_image.url" :alt="data.banner_image.title" />
  </div>
</template>

<script>
export default {
  props: ['data', 'title']
};
</script>
