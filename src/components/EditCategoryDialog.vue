<template>
  <el-dialog
    v-model="visibleDialog"
    title="Add Category Dialog"
    @close="handleClose"
  >
    <template #default>
      <el-form
        label-position="top"
        :model="formValues"
        :rules="rules"
        ref="ruleFormRef"
        v-loading="loading"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="formValues.name" />
        </el-form-item>
        <el-form-item label="Color" prop="color">
          <el-input v-model="formValues.color" type="color" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer" style="margin-top: 50px;">
        <el-button
          type="primary"
          @click="handleSubmit(ruleFormRef)"
          :disabled="loading"
          >Submit</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  computed,
  reactive,
  ref,
  withDefaults,
  defineProps,
  defineEmits,
  toRaw,
  WritableComputedRef,
  onMounted
} from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { useStore } from 'vuex';
import { ICategory } from '@/types/Category';
import { addCategory, updateCategory } from '@/services/category';
export default {
  name: 'edit-category-dialog'
};
</script>

<script lang="ts" setup>
interface CategoryDialogProps {
  visible: boolean;
  data: ICategory;
}

const props = withDefaults(defineProps<CategoryDialogProps>(), {
  visible: false,
  data: {
    id: 0,
    name: '',
    color: ''
  } as any
});
const emits = defineEmits(['close', 'reloadData']);

const store = useStore();
const visibleDialog = computed({
  get() {
    return props.visible;
  },
  set(val) {
    //
  }
});

const loading = ref<boolean>(false);

const formValues = reactive({
  name: '',
  color: ''
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input this field', trigger: 'blur' }
  ],
  color: [{ required: true, message: 'Please choose color', trigger: 'blur' }]
});

const handleClose = () => [emits('close')];
const reloadData = () => [emits('reloadData')];

const initForm = () => {
  if (props.data) {
    const { name, color } = props.data;
    formValues.name = name;
    formValues.color = color;
  }
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      //   console.log(toRaw(props.data));
      try {
        loading.value = true;
        const { _idDoc, id } = props.data;
        const { name, color } = formValues;
        const payload: ICategory = {
          _idDoc,
          id,
          name,
          color
        };
        await updateCategory(payload);
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
  initForm();
});
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
</style>
