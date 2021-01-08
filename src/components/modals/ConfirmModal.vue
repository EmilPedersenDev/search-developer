<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>{{ message }}</h1>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(true)"
        >{{ noOptions ? 'Ok' : 'Confirm' }} <d-spinner :isLoading="isLoading" buttonSpinner></d-spinner>
      </d-button>
      <d-button v-if="!noOptions" class="col-4 col-sm-3" @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
export default {
  name: 'confirm-modal',
  props: {
    close: {
      type: Function
    },
    message: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    noOptions: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    closeModal(val) {
      if (!this.close) return;

      if (val) {
        this.close(val);
        return;
      }

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
</style>