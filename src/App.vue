<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import BlankLayout from '@/layouts/BlankLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import DashBoardLayout from '@/layouts/DashboardLayout.vue';
export default defineComponent({
  name: 'App',
  components: {
    BlankLayout,
    DefaultLayout,
    DashBoardLayout
  },
  setup() {
    const route = useRoute();
    let layout = ref<string>('');

    watch(route, (newValue, oldValue) => {
      // console.log(newValue.meta.layout);
      window.scrollTo({
        top: 0
      });
      // set layout by route meta
      if (newValue.meta.layout !== undefined) {
        layout.value = newValue.meta.layout as string;
      } else {
        layout.value = 'DefaultLayout';
      }
      console.log(layout.value);
    });

    return {
      layout
    };
  }
});
</script>

<style lang="scss">
@import '@/styles/_index';
#app {
  font-family: 'Inter Tight', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
