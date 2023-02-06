<template>
  <div
    class="loading-wrapper"
    v-if="loading || !blogDetail"
    v-loading="loading"
  ></div>
  <div class="blog-detail" v-else>
    <h1>{{ blogDetail.title }}</h1>
    <div class="time-info">
      <div class="badge-wrapper">
        <Badge :type="blogDetail.type" />
      </div>
      <div class="created-date">
        <i class="fa-regular fa-calendar"></i>
        <span>
          Sep 17, 2022
        </span>
      </div>
      <div class="vertical"></div>
      <div class="minute">
        <i class="fa-regular fa-clock"></i>
        <span>4 min read</span>
      </div>
    </div>
    <div class="blog-detail-content">
      <p><span v-html="blogDetail.content"></span></p>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { IBlog } from '@/types/Blog';
import { onMounted, ref } from 'vue';
import { getBlogById } from '@/services/blog';
import { useStore } from 'vuex';
import { getCategories } from '@/services/category';
import { UPDATE_CATEGORIES_ACTION } from '@/store';
import Badge from '@/components/Badge.vue';
export default {
  name: 'blog-detail'
};
</script>

<script lang="ts" setup>
const route = useRoute();
const store = useStore();
const _idDoc = route.params.id;
const blogDetail = ref<IBlog | null>(null);
const loading = ref<boolean>(false);

const getBlogDetail = async () => {
  try {
    const res = await getBlogById(_idDoc as string);
    if (res) {
      blogDetail.value = res;
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllCategories = async () => {
  try {
    const data = await getCategories();
    store.dispatch(UPDATE_CATEGORIES_ACTION, data);
  } catch (error) {
    console.log(error);
  }
};

const loadData = async () => {
  loading.value = true;
  const promise1 = await getBlogDetail();
  const promise2 = await getAllCategories();
  Promise.all([promise1, promise2]).finally(() => {
    loading.value = false;
  });
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
.loading-wrapper {
  min-height: calc(100vh - 240px);
}
.blog-detail {
  padding: $space-xxxxl 0;
  h1 {
    font-size: 60px;
    font-weight: 600;
  }
  .time-info {
    color: $text-secondary;
    font-size: $small;
    display: flex;
    align-items: center;
    margin: $space-xl 0;
    font-weight: 500;
    .badge-wrapper {
      margin-right: $space-xs;
    }
    .vertical {
      margin: 0 $space-xs;
      width: 1px;
      height: 12px;
      background-color: $text-secondary;
    }
    .created-date,
    .minute {
      display: flex;
      align-items: center;
      svg {
        margin-right: 6px;
        margin-top: -2px;
      }
    }
  }
  &-content {
    width: 100%;
  }
}
</style>

<style>
img {
  width: 100% !important;
}
</style>
