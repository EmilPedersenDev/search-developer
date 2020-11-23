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
    third: {
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
    type: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    onClick(e) {
      if (this.type === 'submit') return;
      this.$emit('click', e);
    }
  },
  computed: {
    classlist() {
      return ['d-button', this.primary && 'primary', this.secondary && 'secondary', this.third && 'third', this.round && 'round', this.noBorder && 'no-border'];
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.d-button {
  border-radius: 0.4285rem;
  border: none;
  padding: 5px 10px;
  outline: none;
  transition: all 0.15s ease;
  &:disabled {
    background: gray !important;
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    opacity: 0.9;
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
  }
  &.secondary {
    background: $primary;
    color: #000;
  }
  &.round {
    background: transparent;
    border: 1px solid #e14eca;
  }
  &.no-border {
    border: none;
    border-radius: 0;
    color: $white;
    background: transparent;
    transition: none !important;
    padding: 0;
    &:hover {
      transform: translateY(0);
    }
  }
}
</style>