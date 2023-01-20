<template>
  <div class="trending-now-wrapper">
    <div class="trending-info">
      <h5>Trending Now</h5>
    </div>
    <div class="trending-carousel">
      <el-carousel indicator-position="none">
        <el-carousel-item
          v-for="(carouselList, index) in carousels"
          :key="index"
        >
          <div class="trending-list">
            <TrendingCarouselItem
              v-for="item in carouselList"
              :key="item"
              :thumbUrl="item.thumbUrl"
              :title="item.title"
              :readMinute="item.readMinute"
              :className="item.className"
              :to="item.to"
            />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineProps, toRaw, watch, WritableComputedRef } from 'vue';
export default {
  name: 'trending-carousel'
};
</script>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount, onUnmounted } from 'vue';
import TrendingCarouselItem from '@/components/TrendingCarouselItem.vue';
import { ITrendingCarouselItem } from '@/types/TrendingCarouselItem';
import { chunks } from '@/utils/chunks';
import { trendingCarouselData } from '@/dummies/trending-carousel-dummy';
import { useStore } from 'vuex';
import { IBlog } from '@/types/Blog';
const store = useStore();

let carousels = ref<ITrendingCarouselItem[][]>([]);

onBeforeMount(() => {
  //
});

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => [window.addEventListener('resize', handleResize)]);

const blogsData: WritableComputedRef<IBlog[]> = computed({
  get() {
    return store.getters.getBlogs;
  },
  set(val) {
    //
  }
});

const handleResize = () => {
  if (blogsData.value && toRaw(blogsData.value.length)) {
    const carouselData = toRaw(blogsData.value);
    if (screen.width >= 750 && screen.width <= 1000) {
      carousels.value = [...chunks(carouselData, 2)];
    } else if (screen.width < 750) {
      carousels.value = [...chunks(carouselData, 1)];
    } else {
      carousels.value = [...chunks(carouselData, 3)];
    }
  }
};

watch(blogsData, (newData) => {
  handleResize();
});
</script>

<style scoped lang="scss">
@import '@/styles/_index';
.trending-now-wrapper {
  width: 100%;
  height: 130px;
  border: 1px solid $grey-300;
  background-color: $grey-100;
  display: flex;
  .trending-info {
    width: 200px;
    padding: 16px 30px 16px 40px;
    display: flex;
    align-items: center;
    h5 {
      font-size: $large;
      font-weight: 600;
      line-height: 1.25;
    }
    @media screen and (max-width: 768px) {
      width: 80px;
      padding: 12px;
      h5 {
        font-size: 16px;
      }
    }
  }
  .trending-carousel {
    flex: 1;
    .trending-list {
      min-width: 100%;
      width: 100%;
      height: 100%;
      display: flex;
      @media screen and (max-width: 1000px) {
        a {
          min-width: 50%;
        }
      }
      @media screen and (max-width: 650px) {
        a {
          min-width: 100%;
        }
      }
    }
  }
}
.el-carousel {
  height: 100%;
}
</style>
