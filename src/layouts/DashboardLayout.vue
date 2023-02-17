<template>
  <div class="layout-container">
    <header class="header">
      <div class="header-left">
        <Button type="link" to="/admin" bgColor="none">
          <div class="logo">
            <img src="@/assets/logo.svg" alt="" />
          </div>
        </Button>
      </div>
      <div class="header-right">
        <div class="header-actions">
          <i class="fa-solid fa-user"></i>
          <el-dropdown trigger="click">
            <div class="user-profile">
              <span class="username">{{ username }}</span>
              <i class="fa-solid fa-caret-down"></i>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div class="user-action-item" @click="handleSetting">
                    <i class="fa-solid fa-gear"></i>
                    <span>Settings</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div
                    class="user-action-item"
                    @click="visibleConfirmDialog = true"
                  >
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div @click="openSidebar = true">
            <i class="fa-solid fa-bars bar-icon"></i>
          </div>
        </div>
      </div>
    </header>
    <div class="layout-body">
      <div class="menu-wrapper" :class="openSidebar ? 'open' : ''">
        <div class="close-sidebar">
          <div class="close-sidebar-logo">
            <img src="@/assets/logo.svg" alt="" />
          </div>
          <div class="close-sidebar-icon" @click="openSidebar = false">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
        <el-menu
          active-text-color="#E81E60"
          background-color="#1F2937"
          class="menu-sidebar"
          text-color="#fff"
        >
          <el-menu-item index="1">
            <router-link to="/admin/blogs">
              Blogs
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/admin/categories">
              Categories
            </router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="layout-body-content">
        <slot />
      </div>
    </div>
  </div>
  <ConfirmDialog
    title="Do you want to logout?"
    buttonType="danger"
    buttonText="Logout"
    :size="500"
    :visible="visibleConfirmDialog"
    @close="visibleConfirmDialog = false"
    @confirm="handleLogout"
  />
</template>

<script lang="ts">
import Button from '@/components/Button.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { computed, ref } from '@vue/runtime-core';
import { getUsername } from '@/helper';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
export default {
  name: 'dashboard-layout'
};
</script>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const openSidebar = ref(false);
const visibleConfirmDialog = ref(false);
const username = computed({
  get() {
    return getUsername();
  },
  set(val) {
    //
  }
});

watch(route, () => {
  openSidebar.value = false;
});

const handleSetting = () => {
  console.log('setting');
};

const handleLogout = () => {
  localStorage.removeItem('userInfo');
  router.push('/login');
};
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
$height-header: 60px;
$width-sidebar: 250px;

.header {
  width: 100%;
  height: $height-header;
  background-color: #1f2937;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space-md;
  &-left {
    .logo {
      width: 120px;
      img {
        width: 100%;
        height: 100%;
        background-color: $white;
      }
    }
  }
  &-right {
    .header-actions {
      color: $white;
      display: flex;
      align-items: center;
      .user-profile {
        font-size: $medium;
        color: $white;
        cursor: pointer;
        display: flex;
        .username {
          margin: 0 $space-xxs 0 $space-xs;
          @include mobile {
            @include ellipsis-text(1);
          }
        }
      }
      .bar-icon {
        margin-left: $space-md;
        cursor: pointer;
        @include desktop {
          display: none;
        }
      }
    }
  }
}
.user-action-item {
  display: flex;
  align-items: center;
  gap: $space-xxs;
  font-size: $nomal;
  font-family: 'Inter Tight', sans-serif;
  min-width: 130px;
  padding: $space-xxxs 0;
}
.layout-body {
  display: flex;
  .menu-wrapper {
    width: $width-sidebar;
    height: calc(100vh - $height-header);
    .menu-sidebar {
      a {
        color: $white;
        font-size: $nomal;
        width: 100%;
      }
      .el-menu-item:has(.router-link-active) {
        background-color: $primary-color !important;
      }
      .el-menu-item:hover {
        opacity: 1 !important;
        a:not(.router-link-active) {
          opacity: 0.5;
        }
      }
    }

    @include tablet {
      position: fixed;
      z-index: 100;
      width: 100%;
      height: 100vh;
      transform: translateX(-100%);
      inset: 0;
      transition: transform 0.25s linear;
      &.open {
        transform: translateX(0);
      }
    }
    @include mobile {
      position: fixed;
      z-index: 100;
      width: 100%;
      height: 100vh;
      transform: translateX(-100%);
      inset: 0;
      transition: transform 0.25s linear;
      &.open {
        transform: translateX(0);
      }
    }

    .close-sidebar {
      @include desktop {
        display: none;
      }
      width: 100%;
      height: 60px;
      background-color: $white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 $space-lg;
      &-icon {
        font-size: 20px;
      }
      &-logo {
        width: 80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  &-content {
    width: 100%;
    overflow: auto;
    max-height: calc(100vh - $height-header);
    @include desktop {
      width: calc(100% - $width-sidebar);
    }
  }
}
</style>
