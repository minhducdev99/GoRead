<template>
  <div class="home-page">
    <h1>Welcome to GoRead</h1>
    <section class="trending-now">
      <TrendingCarousel />
    </section>
    <section class="section-first">
      <FirstSection />
    </section>
    <section class="section-second">
      <JoinGoReadSection />
    </section>
    <section class="section-third">
      <LatestPostSection />
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage'
};
</script>

<script lang="ts" setup>
import TrendingCarousel from '@/components/TrendingCarousel.vue';
import BlogCard from '@/components/BlogCard.vue';
import { Category } from '@/enums/category';
import FirstSection from '@/components/FirstSection.vue';
import JoinGoReadSection from '@/components/JoinGoreadSection.vue';
import LatestPostSection from '@/components/LatestPostSection.vue';
</script>

<style scoped lang="scss">
@import '@/styles/_index';
.home-page {
  padding: 60px 0;
  @include tablet {
    padding: 30px 0;
  }
  @include mobile {
    padding: 30px 0;
  }
  h1 {
    color: $text-primary;
    font-size: 56px;
    line-height: 1.2;
    font-weight: 500;
  }
  .trending-now {
    margin: $space-lg 0 60px 0;
  }
  .section {
    &-first {
      display: block;
      width: 100%;
    }
    &-second {
      padding: 60px 0;
    }
    &-third {
      padding: 60px 0;
    }
  }
}
</style>
