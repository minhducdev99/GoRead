<template>
  <div class="menu">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :ellipsis="false"
      text-color="#040404"
      active-text-color="#040404"
    >
      <el-menu-item
        v-for="(menu, index) in Menu"
        :key="index"
        :index="`${index + 1}`"
      >
        <router-link :to="menu.to" v-if="!menu.subMenu">
          {{ menu.title }}
        </router-link>
        <el-sub-menu v-else :index="`${index + 1}`">
          <template #title>{{ menu.title }}</template>
          <el-menu-item
            v-for="(subMenuItem, i) in menu.subMenu"
            :key="i"
            :index="`${index + 1}-${i + 1}`"
          >
            <router-link :to="subMenuItem.to">{{
              subMenuItem.title
            }}</router-link>
          </el-menu-item>
        </el-sub-menu>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: 'menu-component'
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { Menu } from '@/contants/menu';

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped lang="scss">
@import '@/styles/_index';
.menu {
  a {
    text-decoration: none;
  }
}
</style>
