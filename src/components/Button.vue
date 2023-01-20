<template>
  <button
    v-if="type !== 'link'"
    :type="type"
    :class="[className, bgColor]"
    @click="handleClick"
    :style="width ? `width: ${width}` : ''"
  >
    <slot />
  </button>
  <router-link v-else :to="to" :class="[className, bgColor]">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineProps } from 'vue';
export default {
  name: 'button-component'
};
</script>

<script setup lang="ts">
import { toRefs, withDefaults, defineEmits } from 'vue';

interface ButtonProps {
  type?: 'button' | 'submit' | 'link';
  bgColor?: 'primary' | 'black' | 'none';
  className?: string;
  to?: string;
  width?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  bgColor: 'primary',
  className: '',
  to: '/'
});

const emits = defineEmits(['click']);

const handleClick = () => [emits('click')];
</script>

<style lang="scss" scoped>
@import '@/styles/_index';
button,
a {
  width: 128px;
  height: 50px;
  border: none;
  background-color: $primary-color;
  color: $white;
  font-size: $nomal;
  padding: 14px 0;
  letter-spacing: 2px;
  font-weight: 600;
  transition: transform 400ms ease, -webkit-transform 400ms ease;
  box-sizing: border-box;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
}
.black {
  background-color: $text-primary;
}
.none {
  background-color: transparent;
}
</style>
