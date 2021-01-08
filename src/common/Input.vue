<template>
  <div :class="classlist">
    <input
      :type="type"
      :name="name"
      class="input-field"
      :readonly="readonly"
      :placeholder="label || placeholder"
      :id="id"
      @input="onInput"
      @blur="onBlur"
      :autocomplete="autocomplete"
      :value="value"
      :disabled="disabled"
    />
    <i class="fas fa-exclamation" v-if="invalid"></i>
    <i class="fas fa-check" v-if="required && !invalid && value !== ''"></i>
    <label :for="id" class="input-label"> {{ label }} </label>

    <slot name="error"></slot>
  </div>
</template>

<script>
export default {
  name: 'd-input',
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
    id: {
      type: String,
      default: ''
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
    type: {
      type: String,
      default: 'input'
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    name: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localValue: this.value
    };
  },
  computed: {
    classlist() {
      return ['d-input', this.invalid && 'invalid', this.required && 'required'];
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
.d-input {
  position: relative;
  padding: 15px 0 0;
  margin-top: 20px;
  width: 100%;
  input {
    position: relative;
    width: inherit;
    background: transparent;
    text-decoration: none;
    border: 0.5px solid rgba($color: #fff, $alpha: 1);
    border-radius: 0.4285rem;
    font-size: 14px;
    font-weight: normal;
    padding: 10px 25px 10px 18px;
    color: #ffff;
    transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    &::placeholder {
      color: hsla(0, 0%, 100%, 0.5);
      font-weight: normal;
    }
  }
  input:focus {
    font-weight: normal;
    border-color: $primary;
    outline: none;
    ~ label {
      color: $primary !important;
    }
  }

  &.invalid {
    color: #fd5d93 !important;
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

    & input {
      border-color: $error;
      &:focus {
        ~ label {
          color: $error !important;
        }
      }
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
    .input-label {
      &::before {
        content: '*';
        color: $primary;
      }
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #1f2251 inset !important;
    -webkit-text-fill-color: #fff !important;
  }

  label {
    position: absolute;
    top: -10%;
    display: block;
    transition: 0.2s;
    font-size: 12px;
    font-weight: 300;
    color: $white;
  }

  .input-field {
    &:required,
    &:invalid {
      box-shadow: none;
    }
  }
}
</style>