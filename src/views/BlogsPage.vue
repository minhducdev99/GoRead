<template>
  <div class="blogs-page" v-if="!id">
    <div>
      <!-- <h1>List blogs page</h1> -->
      <div class="filter-categories" v-if="listCategories">
        <Button
          v-for="item in listCategories"
          :key="item.id"
          type="link"
          :to="`/blogs?categoryId=${item.id}`"
          className="btn-category"
          :bgColor="categoryActive == item.id ? 'black' : 'primary'"
        >
          {{ item.name }}
        </Button>
      </div>
      <div class="loading-wrapper" v-loading="loading" v-if="loading"></div>
      <div v-else>
        <div class="list-blogs" v-if="listBlogs && listBlogs.length">
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
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import Button from '@/components/Button.vue';
import BlogCard from '@/components/BlogCard.vue';
import { ICategory } from '@/types/Category';
import { computed, onMounted, ref, watch } from 'vue';
import { getCategories } from '@/services/category';
import {
  getBlogsByCategory,
  getBlogsByTitle,
  getImageUrl
} from '@/services/blog';
import moment from 'moment';
import { IBlog } from '@/types/Blog';
import { useStore } from 'vuex';
import { UPDATE_CATEGORIES_ACTION } from '@/store';
export default {
  name: 'blogs-page'
};
</script>

<script lang="ts" setup>
const route = useRoute();
const store = useStore();
// const listCategories = ref<ICategory[] | null>(null);
const listBlogs = ref<IBlog[] | null>(null);
const loading = ref<boolean>(false);

const id = computed({
  get() {
    return route.params.id;
  },
  set(val) {
    //
  }
});

const search = computed({
  get() {
    return route.query.search;
  },
  set(val) {
    //
  }
});

const categoryActive = computed({
  get() {
    return route.query.categoryId;
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

const getAllCategories = async () => {
  try {
    const data = await getCategories();
    store.dispatch(UPDATE_CATEGORIES_ACTION, data);
  } catch (error) {
    console.log(error);
  }
};

const filterBlogsByCategory = async () => {
  try {
    const data = await getBlogsByCategory(Number(categoryActive.value));
    const formatData = await Promise.all(
      data.map(async (item) => {
        return {
          ...item,
          thumbUrl: await getImageUrl((item.thumbUrl as string) || ''),
          createdDate: moment((item.createdDate as any).toDate()).format(
            'DD/MM/YYYY - HH:mm:ss'
          )
        } as IBlog;
      })
    );
    // console.log(formatData);
    listBlogs.value = formatData;
  } catch (error) {
    console.log(error);
  }
};

const filterBlogsByTitle = async () => {
  try {
    const data = await getBlogsByTitle(search.value as string);
    const formatData = await Promise.all(
      data.map(async (item) => {
        return {
          ...item,
          thumbUrl: await getImageUrl((item.thumbUrl as string) || ''),
          createdDate: moment((item.createdDate as any).toDate()).format(
            'DD/MM/YYYY - HH:mm:ss'
          )
        } as IBlog;
      })
    );
    listBlogs.value = formatData;
  } catch (error) {
    console.log(error);
  }
};

const getData = async () => {
  try {
    loading.value = true;
    await getAllCategories();
    categoryActive.value
      ? await filterBlogsByCategory()
      : await filterBlogsByTitle();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

watch(route, () => {
  if (!id.value) {
    getData();
  }
});

onMounted(() => {
  if (!id.value) {
    getData();
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
.loading-wrapper {
  min-height: calc(100vh - 550px);
}
.blogs-page {
  padding: $space-xxxxl 0 200px 0;
  .filter-categories {
    display: flex;
    flex-wrap: wrap;
    margin: $space-xxl 0 100px 0;
    gap: $space-xs;
  }
  .list-blogs {
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
