<template>
  <div :class="classlist">
    <textarea name="description" id="description" cols="30" rows="3" :placeholder="label || placeholder" :value="value" @input="onInput" @blur="onBlur"></textarea>
    <label for="description"> {{ label }} </label>
    <slot name="error"></slot>
    <i class="fas fa-exclamation" v-if="invalid"></i>
    <i class="fas fa-check" v-if="required && !invalid && value !== ''"></i>
  </div>
</template>

<script>
export default {
  name: 'd-text-area',
  props: {
    value: {
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'text...'
    },
    input: {
      type: Function
    },
    blur: {
      type: Function
    },
    invalid: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localValue: this.value
    };
  },
  computed: {
    classlist() {
      return ['d-text-area', this.invalid && 'invalid', this.required && 'required'];
    }
  },
  watch: {
    localValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal);
      }
    }
  },
  methods: {
    onInput(evt) {
      this.localValue = evt.target.value;
      if (this.input) this.input();
    },
    onBlur() {
      if (this.blur) this.blur();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';

.d-text-area {
  width: 100%;
  position: relative;
  margin-top: 30px;
  textarea {
    position: relative;
    width: 100%;
    background: transparent;
    color: #fff;
    text-decoration: none;
    resize: none;
    border-radius: 0.4285rem;
    border: 0.5px solid rgba($color: #fff, $alpha: 1);
    padding: 10px 50px 10px 18px;
    color: #ffff;
    font-size: 14px;
    font-weight: normal;
    transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    overflow-y: auto;
    &::placeholder {
      color: hsla(0, 0%, 100%, 0.5);
      font-weight: normal;
    }
    &::-webkit-scrollbar {
      width: 6px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(23, 25, 65, 0.3);
      background-color: #282c68;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $primary;
    }
  }
  textarea:focus {
    font-weight: normal;
    border-color: $primary;
    outline: none;
    ~ label {
      color: $primary;
    }
  }
  &.required {
    color: $primary;
    i {
      font-size: 14px;
      position: absolute;
      top: 30px;
      right: 10px;
      transition: all 0.3s ease;
    }
    label {
      &::before {
        content: '*';
        color: $primary;
      }
    }
  }

  &.invalid {
    color: #fd5d93;
    border-color: $error;
    outline: none;
    i {
      font-size: 14px;
      position: absolute;
      top: 30px;
      right: 10px;
      transition: all 0.3s ease;
    }

    .input-error {
      display: block;
      font-size: 12px;
      text-align: left;
      color: $error;
    }

    & textarea {
      border-color: $error;
      &:focus {
        ~ label {
          color: $error !important;
        }
      }
    }
  }

  label {
    position: absolute;
    top: -20%;
    display: block;
    transition: 0.2s;
    font-size: 12px;
    font-weight: 300;
    color: $white;
  }
}
</style>