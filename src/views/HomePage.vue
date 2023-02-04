<template>
  <div class="home-page" v-show="!loading">
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
  <div class="loading-wrapper" v-loading="loading" v-show="loading"></div>
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
import { getBlogs } from '@/services/blog';
import { computed, onMounted, onUnmounted } from '@vue/runtime-core';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { useStore } from 'vuex';
import { UPDATE_BLOGS_ACTION, UPDATE_CATEGORIES_ACTION } from '@/store';
import { ref, toRaw } from 'vue';
import moment from 'moment';
import { getCategories } from '@/services/category';
import { IBlog } from '@/types/Blog';

const store = useStore();
const loading = ref<boolean>(false);

let unsubscribe: any;

const getAllBlogs = async () => {
  try {
    const data = await getBlogs();
    const formatData = data.map((item: IBlog) => {
      return {
        ...item,
        createdDate: moment((item.createdDate as any).toDate()).format(
          'MMM DD, YYYY'
        )
      };
    });
    store.dispatch(UPDATE_BLOGS_ACTION, formatData);
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

const getData = async () => {
  loading.value = true;
  const promise1 = await getAllBlogs();
  const promise2 = await getAllCategories();
  Promise.all([promise1, promise2]).finally(() => {
    loading.value = false;
  });
};

const watchBlogsCollectionChange = async () => {
  const q = collection(db, 'blogs');
  unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      // if (change.type === 'added') {
      //   console.log('New blog: ', change.doc.data());
      // }
      // if (change.type === 'modified') {
      //   console.log('Modified blog: ', change.doc.data());
      // }
      // if (change.type === 'removed') {
      //   console.log('Removed blog: ', change.doc.data());
      // }
    });
  });
};

const blogsData = computed({
  get() {
    return store.getters.getBlogs;
  },
  set(value) {
    //
  }
});

onMounted(() => {
  getData();
  watchBlogsCollectionChange();
});

onUnmounted(() => {
  unsubscribe();
});
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
.loading-wrapper {
  @include desktop {
    height: calc(100vh - 240px);
  }
  @include tablet {
    height: calc(100vh - 320px);
  }
  @include mobile {
    height: calc(100vh - 320px);
  }
}
</style>
