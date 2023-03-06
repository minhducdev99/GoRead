<template>
  <div class="admin-categories" v-loading="loading">
    <h1>Admin Categories Page</h1>
    <el-button
      class="btn-add"
      :icon="Plus"
      type="primary"
      plain
      @click="visibleAddCategoryDialog = true"
      >Add Category</el-button
    >
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column fixed type="index" width="80" label="#" />
      <el-table-column prop="id" label="ID" width="200" />
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="color" label="Color" width="200">
        <template v-slot="{ row }">
          <div class="view-color" :style="{ backgroundColor: row.color }"></div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="90">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            size="small"
            circle
            @click="handleShowEditCategoryDialog(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            circle
            @click="handleShowConfirmDialog(row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
  <AddCategoryDialog
    :visible="visibleAddCategoryDialog"
    @close="visibleAddCategoryDialog = false"
    @reloadData="getData"
    v-if="visibleAddCategoryDialog"
  />
  <EditCategoryDialog
    :visible="visibleEditCategoryDialog"
    :data="editCategoryProps"
    @close="visibleEditCategoryDialog = false"
    @reloadData="getData"
    v-if="visibleEditCategoryDialog"
  />
  <ConfirmDialog
    title="Are you sure you want to delete?"
    buttonType="danger"
    buttonText="Delete"
    :visible="visibleConfirmDialog"
    :size="500"
    @close="visibleConfirmDialog = false"
    @confirm="handleDeleteCategory"
  />
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue';
import { deleteCategory, getCategories } from '@/services/category';
import { useStore } from 'vuex';
import { UPDATE_CATEGORIES_ACTION } from '@/store';
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import AddCategoryDialog from '@/components/AddCategoryDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { ICategory } from '@/types/Category';
import EditCategoryDialog from '@/components/EditCategoryDialog.vue';
export default {
  name: 'Admin-categories-page'
};
</script>

<script lang="ts" setup>
const store = useStore();
const loading = ref<boolean>(false);
const visibleAddCategoryDialog = ref<boolean>(false);
const visibleConfirmDialog = ref<boolean>(false);
const categoryDelete = ref<ICategory | null>(null);
const visibleEditCategoryDialog = ref<boolean>(false);
const editCategoryProps = ref<ICategory | null>(null);

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

const handleShowConfirmDialog = (category: ICategory) => {
  categoryDelete.value = category;
  visibleConfirmDialog.value = true;
};

const handleShowEditCategoryDialog = (category: ICategory) => {
  editCategoryProps.value = category;
  visibleEditCategoryDialog.value = true;
};

const handleDeleteCategory = async () => {
  try {
    visibleConfirmDialog.value = false;
    if (categoryDelete.value?._idDoc) {
      loading.value = true;
      await deleteCategory(categoryDelete.value._idDoc);

      const listCategories = store.getters.getCategories;
      const newList = listCategories.filter(
        (item: ICategory) => item._idDoc !== categoryDelete.value?._idDoc
      );
      store.dispatch(UPDATE_CATEGORIES_ACTION, newList);
      categoryDelete.value = null;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
@import '@/styles/_overide';
.admin-categories {
  padding: $space-md $space-xxl;
  @include mobile {
    padding: $space-md $space-sm;
    :deep .cell {
      font-size: $small !important;
    }
  }
  h1 {
    margin-bottom: $space-md;
  }
  .btn-add {
    margin-bottom: $space-sm;
  }
  .view-color {
    width: 35px;
    height: 35px;
  }
}
</style>
