<template>
  <router-link v-if="!showShortDesc" class="blog-card" :to="to">
    <div class="thumbnail">
      <img :src="thumbUrl" alt="" />
      <div class="badge-category">
        <Badge :type="type" />
      </div>
    </div>
    <h4>{{ title }}</h4>
    <div class="time-info">
      <div class="created-date">
        <el-icon><Calendar /></el-icon>
        <span>{{ createdDate }}</span>
      </div>
      <div class="vertical"></div>
      <div class="time-read">
        <el-icon><Clock /></el-icon>
        <span>{{ `${readMinute} min read` }}</span>
      </div>
    </div>
  </router-link>
  <router-link v-if="showShortDesc" class="blog-card show-short" :to="to">
    <div class="thumbnail">
      <img :src="thumbUrl" alt="" />
      <div class="badge-category">
        <Badge :type="type" />
      </div>
    </div>
    <div class="time-info">
      <div class="created-date">
        <el-icon><Calendar /></el-icon>
        <span>{{ createdDate }}</span>
      </div>
      <div class="vertical"></div>
      <div class="time-read">
        <el-icon><Clock /></el-icon>
        <span>{{ `${readMinute} min read` }}</span>
      </div>
    </div>
    <h4>{{ title }}</h4>
    <p class="short-desc">
      {{ shortDescription }}
    </p>
  </router-link>
</template>

<script lang="ts">
export default {
  name: 'blog-card'
};
</script>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { IBlog } from '@/types/Blog';
import { Category } from '@/enums/category';
import { Calendar } from '@element-plus/icons-vue';
import { Clock } from '@element-plus/icons-vue';
import Badge from '@/components/Badge.vue';

interface BlogCardProps {
  title: string;
  type: Category;
  createdDate: string;
  thumbUrl: string;
  shortDescription: string;
  content: string;
  showShortDesc?: boolean;
  readMinute?: number;
  className?: string;
  to?: string;
}

const props = withDefaults(defineProps<BlogCardProps>(), {
  title: 'Title',
  type: Category.TRAVEL,
  createdDate: 'Sep 17,2022',
  readMinute: 5,
  thumbUrl: '',
  shortDescription: '',
  content: '',
  className: '',
  showShortDesc: false,
  to: '#'
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
.blog-card {
  width: 100%;
  text-decoration: none;
  display: block;
  @include desktop {
    min-height: 350px;
  }

  .thumbnail {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      aspect-ratio: 4 / 3;
    }
    .badge-category {
      position: absolute;
      bottom: $space-xxs;
      left: $space-xxs;
    }
  }
  h4 {
    font-size: $large;
    color: $text-primary;
    font-weight: 500;
    margin: $space-xs 0;
    @include ellipsis-text(3);
  }
  .time-info {
    display: flex;
    gap: $space-xxs;
    align-items: center;
    color: $text-secondary;
    font-size: $small;
    .created-date,
    .time-read {
      display: flex;
      align-items: center;
      gap: $space-xxxs;
    }
    .vertical {
      width: 1px;
      height: 12px;
      background-color: $text-secondary;
    }
  }

  &.show-short {
    @include tablet {
      h4 {
        font-size: $very-large;
        line-height: 1.4;
      }
    }
    .time-info {
      margin-top: $space-sm;
    }
    .short-desc {
      color: $text-secondary;
      font-weight: 400;
      font-size: $medium;
      line-height: 26px;
      @include ellipsis-text(3);
    }
  }
}
</style>
