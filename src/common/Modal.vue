<template>
  <div class="modal-custom" @click.prevent="handleClickOutside">
    <div class="modal-card" @click.stop>
      <div class="modal-content-custom"><i class="fas fa-times" @click="onClose"></i> <slot /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd-modal',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function
    }
  },
  methods: {
    handleClickOutside() {
      if (this.isLoading) return;
      if (this.onClose) {
        this.onClose();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.modal-custom {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 9998;
  transition: opacity 2s linear;
  .modal-card {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1f2251;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.2), 0 5px 15px rgba(0, 0, 0, 0.17);
    border-radius: 0.2857rem;
    max-width: 500px;
    padding: 24px;

    .modal-content-custom {
      position: relative;
      width: 100%;
      .fa-times {
        display: block;
        color: #fff;
        text-align: right;
        opacity: 0.7;
        font-size: 24px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>