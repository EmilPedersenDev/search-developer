<template>
  <d-modal :onClose="close">
    <div class="sign-in-header">
      <h1>Do you want to logout?</h1>
    </div>
    <div class="sign-in-footer">
      <d-button class="col-4 col-sm-3" @click="closeModal(true)">Confirm</d-button>
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
export default {
  name: 'logout-modal',
  props: {
    close: {
      type: Function
    }
  },
  methods: {
    closeModal(val) {
      if (this.close) {
        this.close(val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.sign-in-header {
  color: #fff;
  text-align: center;
  h1 {
    padding: 10px 0px;
    font-size: 30px;
  }
  p {
    color: #6c757d;
    font-weight: 300;
  }
}

.sign-in-footer {
  margin: 60px 0px 30px;
  text-align: center;
  button {
    &:first-child {
      margin-right: 20px;
    }
  }
}
</style>