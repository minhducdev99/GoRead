<template>
  <el-dialog
    v-model="visibleDialog"
    title="Add Blog Dialog"
    @close="handleClose"
    fullscreen
  >
    <template #default>
      <el-form
        label-position="top"
        :model="formValues"
        :rules="rules"
        ref="ruleFormRef"
        v-loading="loading"
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="formValues.title" />
        </el-form-item>
        <el-form-item label="Minute" prop="minute">
          <el-input type="number" v-model="formValues.minute" />
        </el-form-item>
        <el-form-item label="Short description" prop="shortDesc">
          <el-input type="textarea" v-model="formValues.shortDesc" />
        </el-form-item>
        <el-form-item label="Thumbnail" required>
          <UploadImage @change="handleChangeFile" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmit(ruleFormRef)"
          :disabled="!ruleFormRef || !thumbnail || loading"
          >Submit</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import UploadImage from '@/components/UploadImage.vue';
export default {
  name: 'add-blog-dialog'
};
</script>

<script lang="ts" setup>
interface AddBlogDialogProps {
  visible: boolean;
}
import {
  ref,
  toRefs,
  withDefaults,
  defineProps,
  defineEmits,
  computed,
  reactive,
  toRaw
} from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { uploadFile } from '@/services/blog';

const props = withDefaults(defineProps<AddBlogDialogProps>(), {
  visible: false
});

const visibleDialog = computed({
  get() {
    return props.visible;
  },
  set(val) {
    //
  }
});

const formValues = reactive({
  title: '',
  minute: '',
  shortDesc: ''
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  title: [
    { required: true, message: 'Please input this field', trigger: 'blur' }
  ],
  minute: [
    { required: true, message: 'Please input this field', trigger: 'blur' }
  ],
  shortDesc: [
    { required: true, message: 'Please input this field', trigger: 'blur' }
  ]
});

const thumbnail = ref<File | null>(null);
const loading = ref<boolean>(false);

const emits = defineEmits(['close']);

const handleChangeFile = (file: File) => {
  //   console.log('file', file);
  thumbnail.value = file;
};

const handleClose = () => [emits('close')];

const handleSubmit = async (formEl: FormInstance | undefined) => {
  //   console.log(toRaw(formValues));
  //   console.log(thumbnail.value);

  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid && thumbnail) {
      try {
        // console.log('submit!', toRaw(formValues), thumbnail.value);
        loading.value = true;
        const response = await uploadFile(thumbnail.value as File);
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
</style>
