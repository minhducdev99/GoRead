<template>
  <div class="latest-post">
    <div class="latest-post-sidebar">
      <h2>Latest Post</h2>
      <Button
        v-for="item in listCategories"
        :key="item.id"
        class="btn-category"
        type="link"
        :to="`/blogs?categoryId=${item.id}`"
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
        :to="`/blogs/${item._idDoc}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Category } from '@/enums/category';
import {
  computed,
  onMounted,
  ref,
  toRaw,
  watch,
  WritableComputedRef
} from 'vue';
import Button from '@/components/Button.vue';
import BlogCard from '@/components/BlogCard.vue';
import { CATEGORIES } from '@/contants/categories';
import { BlogsDummy } from '@/dummies/blogs-dummy';
import { useStore } from 'vuex';
import { IBlog } from '@/types/Blog';
export default {
  name: 'latest-post-section'
};
</script>

<script lang="ts" setup>
const store = useStore();

const listBlogs = ref<IBlog[]>([]);

const blogsState: WritableComputedRef<IBlog[]> = computed({
  get() {
    const list = store.getters.getBlogs.slice(0, 12);
    return list;
  },
  set(val) {
    //
  }
});

const listCategories = computed({
  get() {
    return store.getters.getCategories;
  },
  set(val) {
    //
  }
});

watch(blogsState, (newData) => {
  listBlogs.value = toRaw(blogsState.value);
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
.latest-post {
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-template-rows: auto;
  place-content: space-between;
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
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: $space-md;
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
}
</style>
