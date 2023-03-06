<template>
  <div class="header-mobile-wrapper">
    <header class="header">
      <div class="header-left">
        <Button type="link" bgColor="none" to="/">
          <div class="logo">
            <img src="@/assets/logo.svg" alt="" />
          </div>
        </Button>
      </div>
      <div class="header-right">
        <span @click="handleExpandMenu">
          <i class="fa-solid fa-bars"></i>
        </span>
      </div>
    </header>
    <el-collapse accordion @change="handleExpandMenu" v-model="activeNames">
      <el-collapse-item name="1">
        <ul class="menu-list">
          <li class="filter">
            <HeaderFilter />
          </li>

          <li
            v-for="(menu, index) in menuData"
            :key="index"
            :class="menu.subMenu ? 'submenu' : 'menu-item'"
          >
            <router-link :to="menu.to" v-if="!menu.subMenu">
              {{ menu.title }}
            </router-link>
            <el-collapse v-else>
              <el-collapse-item :title="menu.title">
                <ul class="submenu-list">
                  <li
                    class="submenu-item"
                    v-for="(subMenuItem, i) in menu.subMenu"
                    :key="i"
                  >
                    <router-link :to="subMenuItem.to">
                      {{ subMenuItem.title }}
                    </router-link>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
export default {
  name: 'header-mobile'
};
</script>

<script lang="ts" setup>
import Button from '@/components/Button.vue';
import HeaderFilter from '@/components/HeaderFilter.vue';
import { computed, ref, watch, WritableComputedRef } from 'vue';
import { Menu } from '@/contants/menu';
import { useStore } from 'vuex';
import { IMenu } from '@/types/Menu';
import { ICategory } from '@/types/Category';
import { useRoute } from 'vue-router';

const store = useStore();
const menuData = ref<IMenu[]>(Menu);
const route = useRoute();
const activeNames = ref<string[]>(['']);

const handleExpandMenu = () => {
  const collapseHeader: any = document.querySelector(
    '.el-collapse-item__header'
  );
  collapseHeader.click();
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

watch(route, () => {
  activeNames.value = [''];
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
.header {
  padding: $space-lg $space-sm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgb(11 22 44 / 5%);
  .logo {
    display: flex;
    align-items: center;
  }
  &-right {
    color: $text-primary;
    span {
      font-size: 30px;
    }
  }
}

.menu-list {
  padding: $space-lg;
  list-style: none;
  a {
    color: $text-primary;
    text-decoration: none;
    font-size: $medium;
    font-weight: 500;
  }
  .menu-item {
    height: 48px;
    display: flex;
    align-items: center;
  }
  .filter {
    padding-bottom: $space-md;
  }
  .submenu-list {
    background-color: #81818b33;
    padding: $space-sm $space-md;
    list-style: none;
    .submenu-item {
      padding: $space-xxxs 0;
    }
  }
}
</style>
