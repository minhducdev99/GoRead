<template>
  <el-dialog
    v-model="visibleDialog"
    title="Add Blog Dialog"
    @close="handleClose"
    fullscreen
  >
    <template #default>
      <div
        style="height: 100vh;"
        v-loading="loadingData"
        v-if="loadingData"
      ></div>
      <el-form
        label-position="top"
        :model="formValues"
        :rules="rules"
        ref="ruleFormRef"
        v-loading="loading"
        v-else
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="formValues.title" />
        </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-select-v2
            v-model="formValues.category"
            :options="categoryOptions"
            style="width: 100%;"
          />
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
        <el-form-item label="Content" required style="width: 100%;">
          <div style="height: 500px; width: 100%;">
            <quill-editor
              theme="snow"
              toolbar="full"
              contentType="html"
              v-model:content="formValues.content"
            ></quill-editor>
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer" style="margin-top: 50px;">
        <el-button
          type="primary"
          @click="handleSubmit(ruleFormRef)"
          :disabled="
            !ruleFormRef || !thumbnail || loading || !formValues.content
          "
          >Submit</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import UploadImage from '@/components/UploadImage.vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

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
  toRaw,
  onMounted
} from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import {
  uploadFile,
  getImageUrl,
  IBlogPayload,
  addBlog
} from '@/services/blog';
import { getCategories } from '@/services/category';
import { ISelectOption } from '@/types/SelectOption';
import { ICategory } from '@/types/Category';
import { serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const props = withDefaults(defineProps<AddBlogDialogProps>(), {
  visible: false
});
const emits = defineEmits(['close', 'reloadData']);

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
  shortDesc: '',
  category: '',
  content: ''
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
  ],
  category: [
    {
      required: true,
      message: 'Please select this field',
      trigger: 'change'
    }
  ]
});

const thumbnail = ref<File | null>(null);
const loading = ref<boolean>(false);
const loadingData = ref<boolean>(true);
const categoryOptions = ref<ISelectOption<number>[]>();

const handleChangeFile = (file: File) => {
  //   console.log('file', file);
  thumbnail.value = file;
};

const handleClose = () => [emits('close')];
const reloadData = () => [emits('reloadData')];

const loadCategories = async () => {
  try {
    loadingData.value = true;
    const data = await getCategories();
    const formatData = data.map((item: ICategory) => {
      return {
        label: item.name,
        value: item.id
      } as ISelectOption<number>;
    });
    categoryOptions.value = formatData;
  } catch (error) {
    console.log(error);
  } finally {
    loadingData.value = false;
  }
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  //   console.log(toRaw(formValues));
  //   console.log(thumbnail.value);

  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid && thumbnail) {
      try {
        // console.log('submit!', toRaw(formValues), thumbnail.value);
        loading.value = true;
        await uploadFile(thumbnail.value as File);

        const { title, category, content, minute, shortDesc } = formValues;
        const payload: IBlogPayload = {
          _idDoc: '',
          id: uuidv4(),
          title: title,
          type: +category,
          createdDate: serverTimestamp(),
          readMinute: +minute,
          thumbUrl: thumbnail.value?.name || '',
          shortDescription: shortDesc,
          content
        };

        // console.log(payload);
        await addBlog(payload);
        handleClose();
        reloadData();
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

onMounted(() => {
  loadCategories();
});
</script>

<style lang="scss">
@import '@/styles/_index';

@include mobile {
  :deep .ql-container {
    height: 430px;
  }
}

:deep .ql-snow .ql-editor img {
  object-fit: contain;
  height: auto;
}
</style>
