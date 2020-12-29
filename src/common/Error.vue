<template>
  <div class="error-container">
    <div class="error-wrapper">
      <p>{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    error: {
      type: Object
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
  }
}
</style>