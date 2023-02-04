<template>
  <div :class="['badge']" :style="{ backgroundColor: badgeInfo.color }">
    <span>
      {{ badgeInfo.name }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineProps, withDefaults } from 'vue';
export default {
  name: 'badge'
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { ICategory } from '@/types/Category';
import { useStore } from 'vuex';

interface BadgeProps {
  type: number;
}
const props = withDefaults(defineProps<BadgeProps>(), {
  type: 1
});

const store = useStore();

const badgeInfo = computed({
  get() {
    const listCategories = store.getters.getCategories;
    const badge = listCategories.find(
      (item: ICategory) => item.id === props.type
    );

    return badge ? badge : { id: 0, color: '', name: '' };
  },
  set(val) {
    //
  }
});
</script>

<style scoped lang="scss">
@import '@/styles/_index';
.badge {
  padding: 6px 12px;
  color: $white;
  font-size: $small;
  font-weight: 500;
  text-transform: capitalize;
  width: max-content;
}
</style>
