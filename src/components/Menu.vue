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
        v-for="(menu, index) in menuData"
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
import { computed, ref, watch, WritableComputedRef } from 'vue';
import { Menu } from '@/contants/menu';
import { useStore } from 'vuex';
import { ICategory } from '@/types/Category';
import { IMenu } from '@/types/Menu';

const store = useStore();
const activeIndex = ref('1');
const menuData = ref<IMenu[]>(Menu);
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const listCategories: WritableComputedRef<ICategory[]> = computed({
  get() {
    return store.getters.getCategories;
  },
  set(val) {
    //
  }
});

watch(listCategories, () => {
  // set menu categories
  if (listCategories.value.length > 0) {
    const menuCategory = menuData.value.find(
      (item) => item.title === 'Catetogries'
    );
    const subMenuCategories: IMenu[] = listCategories.value.map(
      (item: ICategory) => {
        return {
          title: item.name,
          to: `/blogs?categoryId=${item.id}`
        };
      }
    );
    if (menuCategory) {
      menuCategory.subMenu = subMenuCategories;
      // console.log(menuCategory);
      const indexMenuCategory = menuData.value.findIndex(
        (item) => item.title === 'Catetogries'
      );
      menuData.value[indexMenuCategory] = menuCategory;
      // console.log(menuData.value);
    }
  }
});
</script>

<style scoped lang="scss">
@import '@/styles/_index';
.menu {
  a {
    text-decoration: none;
  }
}
</style>
