<template>
  <el-dialog
    v-model="visibleDialog"
    :title="props.title"
    @close="handleClose"
    align-center
  >
    <span>Open the dialog from the center from the screen</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'confirm-dialog'
};
</script>

<script lang="ts" setup>
interface ConfimDialogProps {
  visible: boolean;
  title: string;
}
import { computed, ref, withDefaults, defineProps, defineEmits } from 'vue';

const props = withDefaults(defineProps<ConfimDialogProps>(), {
  visible: false,
  title: 'Confirm Dialog'
});
const emits = defineEmits(['confirm', 'close']);

const visibleDialog = computed({
  get() {
    return props.visible;
  },
  set(val) {
    //
  }
});

const visible = ref(false);

const handleConfirm = () => {
  [emits('confirm')];
};

const handleClose = () => [emits('close')];
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
</style>
