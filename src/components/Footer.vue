<template>
  <footer>
    <div>
      © GoRead - Made by
      <router-link to="#">
        Louis-dev
      </router-link>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'Footer'
};
</script>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/styles/_index';
footer {
  height: 120px;
  background-color: $black-300;
  color: $white;
  display: grid;
  place-items: center;
  font-size: $nomal;
  color: $text-secondary;
  a {
    text-decoration: none;
    color: $white;
    margin-left: $space-xxxs;
  }
}
</style>
