<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>{{ message }}</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <div class="welcome-wrapper">
        <img src="check.svg" alt="" />
      </div>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" secondary @click="closeModal">Ok!</d-button>
    </div>
  </d-modal>
</template>

<script>
export default {
  name: 'success-modal',
  props: {
    close: {
      type: Function
    },
    message: {
      type: String,
      default: 'Success!'
    }
  },

  methods: {
    closeModal(val) {
      if (!this.close) return;

      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';

h1 {
  padding: 10px 0px;
  font-size: 24px;
}
p {
  color: #6c757d;
  font-weight: 300;
}

.welcome-wrapper {
  img {
    height: 72px;
  }
}
</style>