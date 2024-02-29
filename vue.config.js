const { defineConfig } = require('@vue/cli-service')

// Map envs with VUE_APP_ prefix only if CONTENTSTACK_ variable is undefined for launch integration
(function () {
  if (typeof process.env.VUE_APP_CONTENTSTACK_API_KEY === 'undefined') {
    process.env.VUE_APP_CONTENTSTACK_API_KEY = process.env.CONTENTSTACK_API_KEY;
  }
  if (typeof process.env.VUE_APP_CONTENTSTACK_API_HOST === 'undefined') {
    process.env.VUE_APP_CONTENTSTACK_API_HOST = process.env.CONTENTSTACK_API_HOST;
  }
  if (typeof process.env.VUE_APP_CONTENTSTACK_DELIVERY_TOKEN === 'undefined') {
    process.env.VUE_APP_CONTENTSTACK_DELIVERY_TOKEN = process.env.CONTENTSTACK_DELIVERY_TOKEN;
  }
  if (typeof process.env.VUE_APP_CONTENTSTACK_ENVIRONMENT === 'undefined') {
    process.env.VUE_APP_CONTENTSTACK_ENVIRONMENT = process.env.CONTENTSTACK_ENVIRONMENT;
  }
  if (typeof process.env.VUE_APP_CONTENTSTACK_CDN === 'undefined') {
    process.env.VUE_APP_CONTENTSTACK_CDN = process.env.CONTENTSTACK_CDN;
  }
})();

module.exports = defineConfig({
  transpileDependencies: true
})
