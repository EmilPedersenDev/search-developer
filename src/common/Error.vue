<template>
  <div class="error-container" v-if="Object.keys(error).length !== 0">
    <div class="error-wrapper" :class="{ noBackground: noBackground }">
      <p>{{ error.message }} <i class="fas fa-exclamation"></i></p>
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
    margin: 20px 0px;
    background: transparent;
    border: 1px solid $error;
    border-radius: 5px;
    p {
      padding: 5px 10px;
      color: $error;
      .fas {
        float: right;
        padding-top: 3px;
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
        color: $error-hover;
        .fas {
          display: none;
        }
      }
    }
  }
}
</style>