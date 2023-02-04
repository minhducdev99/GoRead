<template>
  <div class="admin-categories" v-loading="loading">
    <h1>Admin Categories Page</h1>
    <el-button class="btn-add" :icon="Plus" type="primary" plain
      >Add Category</el-button
    >
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column fixed="" type="index" width="80" label="#" />
      <el-table-column prop="id" label="ID" width="200" />
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="color" label="Color" width="200" />
      <el-table-column fixed="right" width="90">
        <template #default>
          <el-button type="primary" :icon="Edit" size="small" circle />
          <el-button type="danger" :icon="Delete" size="small" circle />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getCategories } from '@/services/category';
import { useStore } from 'vuex';
import { UPDATE_CATEGORIES_ACTION } from '@/store';
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
export default {
  name: 'Admin-categories-page'
};
</script>

<script lang="ts" setup>
const store = useStore();
const loading = ref<boolean>(false);

const getData = async () => {
  loading.value = true;
  const data = await getCategories();
  loading.value = false;
  store.dispatch(UPDATE_CATEGORIES_ACTION, data);
};

const tableData = computed({
  get() {
    return store.getters.getCategories;
  },
  set(value) {
    //
  }
});

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
@import '@/styles/_overide';
.admin-categories {
  padding: $space-md $space-xxl;
  h1 {
    margin-bottom: $space-md;
  }
  .btn-add {
    margin-bottom: $space-sm;
  }
}
</style>
