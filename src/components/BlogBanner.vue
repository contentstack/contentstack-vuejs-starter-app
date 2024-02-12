<template v-if="data">
  <div>
    <ClientOnly>
      <Devtools />
    </ClientOnly>
    <div class="blog-page-banner" :style="{ background: `${data.bg_color}` }">
      <div class="blog-page-content">
        <h1 class="hero-title">
          {{ data.banner_title }}
        </h1>
        <p class="hero-description">
          {{ data.banner_description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import Devtools from './DevTools.vue';
import {HeroBanner} from '../typescript/components'

export default defineComponent({
  props:{
    data:{
      required: true,
      type: Object as PropType<HeroBanner>
    }
  },
  components: { Devtools }
});
</script>
