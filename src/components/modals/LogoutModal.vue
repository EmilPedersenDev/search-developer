<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>Do you want to logout?</h1>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
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

h1 {
  padding: 10px 0px;
  font-size: 30px;
}
p {
  color: #6c757d;
  font-weight: 300;
}
</style>