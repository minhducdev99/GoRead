<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-change="handleUploadImage"
    :auto-upload="false"
    accept="image/*"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts">
export default {
  name: 'test-upload'
};
</script>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

import type { UploadProps } from 'element-plus';

const imageUrl = ref('');

const handleUploadImage = (e: any) => {
  imageUrl.value = URL.createObjectURL(e.raw);
  [emits('change', e.raw)];
};

const emits = defineEmits(['change']);
</script>

<style scoped>
.avatar-uploader {
  max-width: 500px;
  width: 100%;
}
.avatar-uploader .avatar {
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  max-width: 500px;
  width: 100%;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.el-upload {
  aspect-ratio: 5/3;
}
.el-upload img {
  width: 100%;
  height: 100%;
}
</style>
