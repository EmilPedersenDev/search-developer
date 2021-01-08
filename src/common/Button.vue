<template>
  <button :type="type" :class="classlist" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'd-button',
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: false
    },
    transition: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button',
      validator: function (type) {
        return ['submit', 'button', 'reset'].includes(type);
      }
    }
  },
  methods: {
    onClick(e) {
      if (this.type === 'submit' || this.type === 'reset') return;
      this.$emit('click', e);
    }
  },
  computed: {
    classlist() {
      return [
        'd-button',
        this.primary && 'primary',
        this.secondary && 'secondary',
        this.round && 'round',
        this.noBorder && 'no-border',
        this.edit && 'edit',
        this.transition && 'transition',
        this.error && 'error'
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.d-button {
  position: relative;
  border-radius: 0.4285rem;
  border: none;
  padding: 5px 10px;
  outline: none;
  transition: all 0.15s ease;
  &:disabled {
    background: gray !important;
    opacity: 0.3;
    color: white;
  }

  &.transition {
    &:hover {
      transform: translateY(-2px);
    }
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  &.primary {
    background: #e14eca;
    background-image: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca);
    background-size: 210% 210%;
    background-position: 100% 0;
    background-color: #e14eca;
    transition: all 0.15s ease;
    box-shadow: none;
    color: #fff;
    &:hover:not(:disabled) {
      cursor: pointer;
      transform: translateY(-2px);
    }
  }
  &.secondary {
    background: $primary;
    color: #000;
    &:hover:not(:disabled) {
      cursor: pointer;
      transform: translateY(-2px);
    }
  }
  &.round {
    background: transparent;
    border: 1px solid #e14eca;
    border-radius: 50%;
    color: $white;
    &:hover {
      cursor: pointer;
      transform: translateY(-2px);
    }
  }
  &.no-border {
    border: none;
    border-radius: 0;
    color: $primary;
    background: transparent;
    transition: all 0.3s ease-in-out;
    padding: 0;
    &:hover:not(:disabled) {
      cursor: pointer;
      color: $secondary;
      transform: none;
    }

    &.error {
      &:hover:not(:disabled) {
        cursor: pointer;
        color: $error;
        transform: none;
      }
    }
  }
  &.edit {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>