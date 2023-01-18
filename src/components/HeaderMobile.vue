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
    <el-collapse>
      <el-collapse-item>
        <ul class="menu-list">
          <li class="filter">
            <HeaderFilter />
          </li>

          <li
            v-for="(menu, index) in Menu"
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
import { ref } from 'vue';
import { Menu } from '@/contants/menu';

const handleExpandMenu = () => {
  const collapseHeader: any = document.querySelector(
    '.el-collapse-item__header'
  );
  collapseHeader.click();
};
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
