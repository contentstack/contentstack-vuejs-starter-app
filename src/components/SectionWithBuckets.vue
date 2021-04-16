<template>
  <div class="member-main-section">
    <div v-if="data" class="member-head">
      <h2>{{ data.title_h2 }}</h2>
      <p>{{ data.description }}</p>
    </div>
    <div v-if="data" class="member-section">
      <div v-for="index in data.buckets" :key="index" class="content-section">
        <img :src="index.icon.url" :alt="index.icon.title" />
        <h3>{{ index.title_h3 }}</h3>
        <p v-html="index.description" />
        <router-link :to="index.call_to_action.href">
          {{ index.call_to_action.title }}--&gt;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data']
};
</script>
