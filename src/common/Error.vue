<template>
  <div class="error-container" v-if="Object.keys(error).length !== 0">
    <div class="error-wrapper" :class="{ noBackground: noBackground }">
      <p><i class="fas fa-exclamation-triangle"></i>{{ error.message }}</p>
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
    margin: 8px 0px;
    background: transparent;
    text-align: left;

    p {
      color: $error;
      .fas {
        padding-top: 3px;
        margin-right: 8px;
      }
    }

    &.noBackground {
      background: transparent;
      text-align: left;
      font-weight: 200;
      border: none;
      margin: 0;
      margin-top: 5px;
      p {
        padding: 0px;
        color: $error;
      }
    }
  }
}
</style>