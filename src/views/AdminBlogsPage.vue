<template>
  <div class="admin-blogs" v-loading="loading">
    <h1>Blogs</h1>
    <el-button
      class="btn-add"
      :icon="Plus"
      type="primary"
      plain
      @click="visibleAddBlogDialog = true"
      >Add blog</el-button
    >
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column fixed type="index" width="80" label="#" />
      <el-table-column prop="id" label="ID" width="150" />
      <el-table-column prop="title" label="Title" width="120" />
      <el-table-column
        prop="readMinute"
        label="Read minute"
        width="120"
        center
      />
      <el-table-column
        prop="shortDescription"
        label="Short description"
        width="600"
      />
      <el-table-column prop="type" label="Type" width="120" />
      <el-table-column prop="thumbUrl" label="Thumbnail" width="150">
        <template v-slot="{ row }">
          <el-image
            style="width: 130px; height: 80px;"
            :src="row.thumbUrl"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createdDate" label="Created at" width="100" />
      <el-table-column fixed="right" width="90">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            size="small"
            circle
            @click="handleShowEditBlogDialog(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            circle
            @click="handleShowConfirmDialog(row._idDoc)"
          />
        </template>
      </el-table-column>
    </el-table>
    <AddBlogDialog
      :visible="visibleAddBlogDialog"
      @close="visibleAddBlogDialog = false"
      @reloadData="getData"
      v-if="visibleAddBlogDialog"
    />
    <ConfirmDialog
      title="Are you sure you want to delete?"
      :visible="visibleConfirmDialog"
      @close="visibleConfirmDialog = false"
      @confirm="handleDeleteBlog"
    />
    <EditBlogDialog
      :visible="visibleEditBlogDialog"
      @close="visibleEditBlogDialog = false"
      @reloadData="getData"
      v-if="visibleEditBlogDialog"
      :data="editBlogProps"
    />
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, ref, toRaw, watch } from 'vue';
import { deleteBlog, getBlogs, getImageUrl } from '@/services/blog';
import moment from 'moment';
import { useStore } from 'vuex';
import { UPDATE_BLOGS_ACTION } from '@/store';
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import AddBlogDialog from '@/components/AddBlogDialog.vue';
import EditBlogDialog from '@/components/EditBlogDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { IBlog } from '@/types/Blog';
export default {
  name: 'Admin-blogs-page'
};
</script>

<script lang="ts" setup>
const store = useStore();
const loading = ref<boolean>(false);
const visibleAddBlogDialog = ref<boolean>(false);
const visibleConfirmDialog = ref<boolean>(false);
const visibleEditBlogDialog = ref<boolean>(false);
const editBlogProps = ref<IBlog | null>(null);
const idBlogDelete = ref<string | null>(null);

const getData = async () => {
  loading.value = true;
  const data = await getBlogs();

  const formatData = await Promise.all(
    data.map(async (item) => {
      return {
        ...item,
        thumbUrl: item.thumbUrl.includes('https://')
          ? item.thumbUrl
          : await getImageUrl((item.thumbUrl as string) || ''),
        createdDate: moment((item.createdDate as any).toDate()).format(
          'DD/MM/YYYY HH:mm:ss'
        )
      };
    })
  );

  loading.value = false;
  store.dispatch(UPDATE_BLOGS_ACTION, formatData);
};

const tableData = computed({
  get() {
    return store.getters.getBlogs;
  },
  set(value) {
    //
  }
});

const handleShowConfirmDialog = (_idDoc: string) => {
  // console.log(id);
  idBlogDelete.value = _idDoc;
  visibleConfirmDialog.value = true;
};

const handleDeleteBlog = async () => {
  // console.log(idBlogDelete.value);
  try {
    visibleConfirmDialog.value = false;
    loading.value = true;
    await deleteBlog(idBlogDelete.value || '');
    const listBlogs = store.getters.getBlogs;
    const newList = listBlogs.filter(
      (item: IBlog) => item._idDoc !== idBlogDelete.value
    );
    store.dispatch(UPDATE_BLOGS_ACTION, newList);
    idBlogDelete.value = null;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleShowEditBlogDialog = (blog: IBlog) => {
  // console.log(toRaw(blog));
  editBlogProps.value = toRaw(blog);
  visibleEditBlogDialog.value = true;
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
@import '@/styles/_overide';
.admin-blogs {
  padding: $space-md $space-xxl;
  h1 {
    margin-bottom: $space-md;
  }
  .btn-add {
    margin-bottom: $space-sm;
  }
}
</style>
