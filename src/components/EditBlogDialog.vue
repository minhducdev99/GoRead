<template>
  <el-dialog
    v-model="visibleDialog"
    title="Edit Blog Dialog"
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
        <el-form-item label="Old thumbnail">
          <div class="preview-old-thumbnail">
            <img :src="oldThumbnailUrl" alt="" />
          </div>
        </el-form-item>
        <el-form-item label="New thumbnail">
          <UploadImage @change="handleChangeFile" />
        </el-form-item>
        <el-form-item label="Content" required style="width: 100%;">
          <div style="height: 500px;">
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
          :disabled="!ruleFormRef || loading || !formValues.content"
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
  name: 'edit-blog-dialog'
};
</script>

<script lang="ts" setup>
interface EditBlogDialogProps {
  visible: boolean;
  data: IBlog;
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
  onMounted,
  watch
} from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import {
  uploadFile,
  getImageUrl,
  IBlogPayload,
  addBlog,
  deleteFile,
  updateBlog
} from '@/services/blog';
import { getCategories } from '@/services/category';
import { ISelectOption } from '@/types/SelectOption';
import { ICategory } from '@/types/Category';
import { serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { IBlog } from '@/types/Blog';

const props = withDefaults(defineProps<EditBlogDialogProps>(), {
  visible: false,
  data: {
    _idDoc: '',
    id: '',
    title: '',
    type: 0,
    createdDate: '',
    readMinute: 3,
    thumbUrl: '',
    shortDescription: '',
    content: ''
  } as any
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
const oldThumbnailUrl = ref<string>('');
const loading = ref<boolean>(false);
const loadingData = ref<boolean>(true);
const categoryOptions = ref<ISelectOption<number>[]>();

const initForm = () => {
  if (props.data) {
    const {
      title,
      content,
      readMinute,
      shortDescription,
      type,
      thumbUrl
    } = props.data;
    formValues.title = title;
    formValues.minute = readMinute.toString();
    formValues.content = content;
    formValues.shortDesc = shortDescription;
    formValues.category = type as any;
    formValues.content = content;
    oldThumbnailUrl.value = thumbUrl;
  }
};

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
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid && thumbnail) {
      // console.log('submit!', toRaw(formValues), thumbnail.value);
      try {
        loading.value = true;
        if (thumbnail.value) {
          // Delete old thumb on storage
          const startSubstringIndex = oldThumbnailUrl.value.indexOf('o/');
          const endSubstringIndex = oldThumbnailUrl.value.indexOf('?alt');
          const fileName = oldThumbnailUrl.value.slice(
            startSubstringIndex + 2,
            endSubstringIndex
          );
          await deleteFile(fileName);

          // Upload new file
          await uploadFile(thumbnail.value as File);

          // Edit Blog
          const { title, category, content, minute, shortDesc } = formValues;
          const payload: IBlogPayload = {
            _idDoc: props.data._idDoc,
            id: props.data.id,
            title: title,
            type: +category,
            createdDate: serverTimestamp(),
            readMinute: +minute,
            thumbUrl: thumbnail.value?.name || '',
            shortDescription: shortDesc,
            content
          };
          await updateBlog(payload);
          handleClose();
          reloadData();
        } else {
          const { title, category, content, minute, shortDesc } = formValues;
          const startSubstringIndex = oldThumbnailUrl.value.indexOf('o/');
          const endSubstringIndex = oldThumbnailUrl.value.indexOf('?alt');
          const fileName = oldThumbnailUrl.value.slice(
            startSubstringIndex + 2,
            endSubstringIndex
          );
          const payload = {
            _idDoc: props.data._idDoc,
            id: props.data.id,
            title: title,
            type: +category,
            createdDate: serverTimestamp(),
            readMinute: +minute,
            thumbUrl: fileName,
            shortDescription: shortDesc,
            content
          };
          await updateBlog(payload);
          handleClose();
          reloadData();
        }
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

onMounted(async () => {
  await loadCategories();
  initForm();
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
.preview-old-thumbnail {
  max-width: 500px;
  aspect-ratio: 5/3;
  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
}
</style>

<style>
.el-loading-mask {
  height: calc(100% + 100px);
}
</style>
