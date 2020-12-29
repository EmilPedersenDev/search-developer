<template>
  <div :class="classList" v-if="isLoading"></div>
</template>

<script>
export default {
  name: 'd-spinner',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    buttonSpinner: {
      type: Boolean,
      default: false
    },
    largeSpinner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return ['d-spinner', this.buttonSpinner && 'button-spinner', this.largeSpinner && 'large-spinner'];
    }
  }
};
</script>

<style lang="scss" scoped>
.d-spinner {
  border: 2px solid #fff;
  border-top: 2px solid rgba(77, 72, 69, 0.24);
  border-right: 2px solid rgba(77, 72, 69, 0.24);

  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1s linear infinite;

  position: absolute;
  margin-left: -32px;
  margin-top: -64px;
  top: 50%;
  left: 50%;
  font-size: 50px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  &.button-spinner {
    width: 20px;
    height: 20px;
    margin: 0;
    top: 8px;
    right: 5px;
    left: initial;
  }

  &.large-spinner {
    @media (min-width: 768px) {
      margin-left: -70px;
      width: 150px;
      height: 150px;
    }
  }
}
</style>