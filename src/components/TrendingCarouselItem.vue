<template>
  <router-link :class="['trending-carousel-item', className]" :to="to">
    <div class="thumbnail">
      <img class="thumbnail-img" :src="thumbUrl" alt="" />
    </div>
    <div class="trending-content">
      <h6>{{ title }}</h6>
      <div class="read-time">
        <el-icon><Clock /></el-icon>
        <span>{{ `${readMinute} min read` }}</span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineProps } from 'vue';
export default {
  name: 'trending-carousel-item'
};
</script>

<script setup lang="ts">
import { withDefaults } from 'vue';
import { ITrendingCarouselItem as TrendingCarouselItem } from '@/types/TrendingCarouselItem';
import { Clock } from '@element-plus/icons-vue';

interface TrendingCarouselItemProps {
  thumbUrl: string;
  title: string;
  readMinute: number;
  className?: string;
  to?: string;
}

const props = withDefaults(defineProps<TrendingCarouselItemProps>(), {
  thumbUrl:
    'https://i.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc',
  title: 'Essential Photography: Embrace Backlight',
  readMinute: 5,
  className: '',
  to: '/'
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
.trending-carousel-item {
  width: 100%;
  padding: $space-xs;
  display: flex;
  align-items: center;
  text-decoration: none;
  .thumbnail {
    width: 112px;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .trending-content {
    flex: 1;
    padding-left: $space-xs;
    h6 {
      margin-bottom: 10px;
      color: $text-primary;
      font-size: $medium;
      font-weight: 500;
      max-width: 120px;
      @include ellipsis-text(4);
    }
    .read-time {
      display: flex;
      span {
        color: $text-secondary;
        font-size: $small;
        font-weight: 500;
        display: flex;
        align-items: center;
        margin-left: $space-xxxs;
      }
    }
  }
}
</style>
