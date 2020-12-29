<template>
  <div class="error-container" v-if="Object.keys(error).length !== 0">
    <div class="error-wrapper" :class="{ noBackground: noBackground }">
      <p>{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd-error',
  props: {
    error: {
      type: Object
    },
    noBackground: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors';
.error-container {
  width: 100%;
  .error-wrapper {
    background: $error;
    border-radius: 5px;
    p {
      padding: 5px 10px;
    }

    &.noBackground {
      background: transparent;
      text-align: left;
      font-weight: 200;
      p {
        padding-left: 0px;
        color: $error-hover;
      }
    }
  }
}
</style>