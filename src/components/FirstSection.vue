<template>
  <div class="grid-blog-items">
    <div v-for="(item, index) in listBlogs" :key="item.id" class="blog-item">
      <BlogCard
        :title="item.title"
        :type="item.type"
        :createdDate="item.createdDate"
        :readMinute="item.readMinute"
        :thumbUrl="item.thumbUrl"
        :shortDescription="item.shortDescription"
        :showShortDesc="!index"
        :content="item.content"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'first-section'
};
</script>

<script setup lang="ts">
import { BlogsDummy } from '@/dummies/blogs-dummy';
import BlogCard from '@/components/BlogCard.vue';
import { computed, ref, toRaw, watch, WritableComputedRef } from 'vue';
import { IBlog } from '@/types/Blog';
import { useStore } from 'vuex';

const store = useStore();

const listBlogs = ref<IBlog[]>([]);

const blogsState: WritableComputedRef<IBlog[]> = computed({
  get() {
    const list = store.getters.getBlogs;
    return list;
  },
  set(val) {
    //
  }
});

watch(blogsState, (newData) => {
  listBlogs.value = toRaw(blogsState.value).slice(0, 5);
});
</script>

<style scoped lang="scss">
@import '@/styles/_index';

.grid-blog-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: $space-sm;
  .blog-item {
    @include desktop {
      &:first-child {
        grid-column: 1 / 3;
        grid-row: 1 / 5;
      }
      &:nth-child(4) {
        grid-column: 3/4;
      }
    }
    @include tablet {
      &:first-child {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
      }
    }
  }
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $space-md;
  }
  @include mobile {
    grid-template-columns: 1fr;
    grid-gap: $space-xxl;
  }
}
</style>
