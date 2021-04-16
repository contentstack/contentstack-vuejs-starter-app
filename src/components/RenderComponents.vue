<template>
  <main v-if="components">
    <template v-for="(component, index) in components">
      <HeroBanner
        v-if="component.hero_banner && page === 'Home'"
        :key="index"
        title="home-content"
        :data="component.hero_banner"
      />
      <HeroBanner
        v-if="component.hero_banner && page === 'About Us'"
        :key="index"
        title="about-content"
        :data="component.hero_banner"
      />
      <Section
        v-if="component.section"
        :key="index"
        :data="component.section"
      />
      <BlogSection
        v-if="component.from_blog"
        :key="index"
        :data="component.from_blog"
      />
      <SectionWithCards
        v-if="component.section_with_cards"
        :key="index"
        :data="component.section_with_cards"
      />
      <SectionWithBuckets
        v-if="component.section_with_buckets && page === 'Home'"
        :key="index"
        :data="component.section_with_buckets"
      />
      <AboutSectionBucket
        v-if="component.section_with_buckets && page === 'About Us'"
        :key="index"
        :data="component.section_with_buckets"
      />
      <TeamSection
        v-if="component.our_team"
        :key="index"
        :data="component.our_team"
      />
      <SectionWithEmbedObject
        v-if="component.section_with_html_code && page === 'Contact Us'"
        :key="index"
        :data="component.section_with_html_code"
      />
    </template>
  </main>
</template>

<script>
import HeroBanner from '../components/HeroBanner';
import Section from '../components/Section';
import SectionWithCards from '../components/SectionWithCards';
import TeamSection from '../components/TeamSection';
import SectionWithEmbedObject from '../components/SectionWithEmbedObject';
import SectionWithBuckets from '../components/SectionWithBuckets';
import AboutSectionBucket from '../components/AboutSectionBucket';
import BlogSection from '../components/BlogSection';
export default {
  components: {
    HeroBanner,
    Section,
    SectionWithBuckets,
    AboutSectionBucket,
    SectionWithCards,
    TeamSection,
    BlogSection,
    SectionWithEmbedObject
  },
  props: ['components', 'page']
};
</script>
