<template>
  <div class="section-card">
    <div class="card-content">
      <div>
        <h2>Join GoRead+</h2>
        <p class="join-goread-desc">
          Discover the benefits of becoming an exclusive member.
        </p>
      </div>
      <div class="buttons-group">
        <Button type="link" to="/">
          Join us
        </Button>
        <Button type="link" bgColor="black" to="/">
          Contact us
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'join-goRead-section'
};
</script>

<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<style scoped lang="scss">
@import '@/styles/_index';

.section-card {
  padding: 50px;
  border: 1px solid $grey-300;
  background-color: $grey-100;
  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $space-md;
    @include tablet {
      flex-direction: column;
      align-items: flex-start;
      gap: $space-xl;
    }
    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: $space-sm;
    }
    h2 {
      font-size: $very-large;
      color: $text-primary;
      font-weight: 500;
      line-height: 1.4;
      max-width: 500px;
      @include tablet {
        font-size: $large;
      }
      @include mobile {
        font-size: $large;
      }
    }
    .join-goread-desc {
      color: $text-secondary;
      font-size: 20px;
      margin: $space-xs 0;
      @include desktop {
        line-height: $space-xxl;
      }
      @include tablet {
        font-size: $nomal;
      }
      @include mobile {
        font-size: $nomal;
      }
    }
    .buttons-group {
      display: flex;
      gap: $space-sm;
    }
  }
}
</style>
