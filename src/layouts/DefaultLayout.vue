<template>
  <div class="default-layout">
    <component :is="getHeader"> </component>
    <div class="layout-container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
export default {
  name: 'default-layout'
};
</script>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import HeaderMobile from '@/components/HeaderMobile.vue';
import Footer from '@/components/Footer.vue';
import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
import { BreakPoint } from '@/contants';

const getHeader = shallowRef<any>();

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => [window.addEventListener('resize', handleResize)]);

const handleResize = () => {
  if (window.innerWidth >= BreakPoint.desktop) {
    getHeader.value = Header;
  } else {
    getHeader.value = HeaderMobile;
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
.layout-container {
  max-width: $container;
  padding: 0 $space-xxl;
  min-height: calc(100vh - $height-header);
  margin: 0 auto;
  @include tablet {
    padding: 0 $space-md;
  }
  @include mobile {
    padding: 0 $space-md;
  }
}
</style>
