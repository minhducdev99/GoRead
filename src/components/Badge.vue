<template>
  <div :class="['badge', badgeName]">
    <span>
      {{ badgeName }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineProps, WritableComputedRef } from 'vue';
export default {
  name: 'badge'
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { Category } from '@/enums/category';

const props = defineProps<{ type: Category }>();

const badgeName: WritableComputedRef<string> = computed({
  get() {
    let name = '';
    switch (props.type) {
      case Category.TRAVEL:
        name = 'travel';
        break;
      case Category.PHOTO:
        name = 'photo';
        break;
      case Category.BUSINESS:
        name = 'business';
        break;
      case Category.TECH:
        name = 'tech';
        break;
      default:
        break;
    }
    return name;
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
  &.travel {
    background-color: #4fd196;
  }
  &.photo {
    background-color: #fd6537;
  }
  &.business {
    background-color: #2c5cdd;
  }
  &.tech {
    background-color: #6d3fd6;
  }
}
</style>
