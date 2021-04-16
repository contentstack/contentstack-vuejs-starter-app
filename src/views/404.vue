<template>
  <div class="container">
    <div class="error-page">
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <router-link to="/">
        Navigate to home page
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
};
</script>
