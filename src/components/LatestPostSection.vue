<template>
  <div class="latest-post">
    <div class="latest-post-sidebar">
      <h2>Latest Post</h2>
      <Button
        v-for="(item, index) in CATEGORIES"
        :key="index"
        class="btn-category"
      >
        {{ item.name }}
      </Button>
    </div>
    <div class="latest-post-list">
      <BlogCard
        v-for="(item, index) in listBlogs"
        :key="index"
        :title="item.title"
        :type="item.type"
        :createdDate="item.createdDate"
        :readMinute="item.readMinute"
        :thumbUrl="item.thumbUrl"
        :shortDescription="item.shortDescription"
        :showShortDesc="true"
        :content="item.content"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Category } from '@/enums/category';
import { computed, onMounted } from 'vue';
import Button from '@/components/Button.vue';
import BlogCard from '@/components/BlogCard.vue';
import { CATEGORIES } from '@/contants/categories';
import { BlogsDummy } from '@/dummies/blogs-dummy';
export default {
  name: 'latest-post-section'
};
</script>

<script lang="ts" setup>
const listBlogs = computed({
  get() {
    return BlogsDummy;
  },
  set(val) {
    //
  }
});

console.log(listBlogs.value);
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
.latest-post {
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-template-rows: auto;
  @include mobile {
    grid-template-columns: 1fr;
  }
  &-sidebar {
    h2 {
      font-size: $very-large;
      color: $text-primary;
      font-weight: 500;
      line-height: 1.4;
      max-width: 500px;
      margin-bottom: $space-xl;
      @include tablet {
        font-size: $large;
      }
      @include mobile {
        font-size: $large;
      }
    }
    .btn-category {
      margin-bottom: $space-md;
    }
  }
  &-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: $space-md;
    @include tablet {
      grid-template-columns: 1fr 1fr;
    }
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
}
</style>
