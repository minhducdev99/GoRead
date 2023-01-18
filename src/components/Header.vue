<template>
  <div class="header-wrapper">
    <header class="header">
      <div class="header-left">
        <Button type="link" bgColor="none" to="/">
          <div class="logo">
            <img src="@/assets/logo.svg" alt="" />
          </div>
        </Button>
      </div>
      <div class="header-right">
        <div class="menu-wrapper">
          <Menu />
        </div>
        <div class="header-filter">
          <HeaderFilter />
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
export default {
  name: 'header-component'
};
</script>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import Menu from '@/components/Menu.vue';
import HeaderFilter from '@/components/HeaderFilter.vue';
import Button from '@/components/Button.vue';
</script>

<style scoped lang="scss">
@import '@/styles/_index';
.header-wrapper {
  box-shadow: 0 2px 12px 0 rgb(11 22 44 / 5%);
  height: $height-header;
  padding: 32px $space-xxl;
  // @include tablet {
  //   display: none;
  // }
  // @include mobile {
  //   display: none;
  // }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: $container;
    margin: 0 auto;
    &-left {
      .logo {
        width: 115px;
        display: inline-block;
        img {
          width: 100%;
        }
      }
    }
    &-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
