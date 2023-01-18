<template>
  <div class="filter-wrapper">
    <div class="search-input">
      <el-input
        v-model="inputSearch"
        class="w-50 m-2"
        size="large"
        placeholder="Search..."
        :suffix-icon="Search"
      />
    </div>
    <Button type="button" @click="onClickButton">Search</Button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'header-filter'
};
</script>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import Button from '@/components/Button.vue';
import { Search } from '@element-plus/icons-vue';

const inputSearch = ref('');

const onClickButton = () => {
  console.log('click !!!');
};
</script>

<style scoped lang="scss">
@import '@/styles/_index';
.filter-wrapper {
  display: flex;
  .search-input {
    margin-right: $space-xs;
    .el-input {
      @include desktop {
        width: 256px;
      }
      @include tablet {
        width: 256px;
      }
      height: 48px;
    }
  }
}
</style>
