<template>
  <div class="filter-wrapper">
    <div class="search-input">
      <el-input
        v-model="inputSearch"
        class="w-50 m-2"
        size="large"
        placeholder="Search..."
        :suffix-icon="Search"
        @keyup.enter="
          router.push(inputSearch ? `/blogs?search=${inputSearch}` : '/')
        "
      />
    </div>
    <Button type="link" :to="inputSearch ? `/blogs?search=${inputSearch}` : '/'"
      >Search</Button
    >
  </div>
</template>

<script lang="ts">
export default {
  name: 'header-filter'
};
</script>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch } from 'vue';
import Button from '@/components/Button.vue';
import { Search } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const inputSearch = ref('');

watch(route, () => {
  if (!route.query.search) {
    inputSearch.value = '';
  }
});
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
