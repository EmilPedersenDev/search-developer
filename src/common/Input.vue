<template>
  <div :class="classlist">
    <input :type="type" :name="name" class="input-field" :placeholder="placeholder" :id="id" @input="onInput" @blur="onBlur" :autocomplete="autocomplete" :value="value" />
    <i class="fas fa-exclamation" v-if="invalid"></i>
    <label :for="id" class="input-label">
      {{ inputLabel }}
    </label>
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
    inputLabel: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String,
      default: 'text...'
    },
    id: {
      type: String,
      default: 'id'
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
    }
  },
  data() {
    return {
      localValue: this.value
    };
  },
  computed: {
    classlist() {
      return ['d-input', 'form-group', this.invalid && 'invalid', this.required && 'required'];
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
  margin-top: 10px;
  width: 100%;

  &.invalid {
    color: #fd5d93;
    i {
      font-size: 14px;
      position: absolute;
      top: 30px;
      right: 5px;
      transition: all 0.3s ease;
    }
    .input-error {
      display: block;
      font-size: 12px;
    }
  }

  &.required {
    .input-label {
      &::before {
        content: '*';
        color: $primary;
      }
    }
  }

  .input-field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 1px solid $white;
    outline: 0;
    font-size: 1rem;
    color: #fff;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .input-label {
      font-size: 14px;
      cursor: text;
      top: 30px;
    }
  }

  .input-field:-webkit-autofill,
  .input-field:-webkit-autofill:hover,
  .input-field:-webkit-autofill:focus,
  .input-field:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #1f2251 inset !important;
    -webkit-text-fill-color: #fff !important;
  }

  .input-label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 12px;
    font-weight: 300;
    color: $white;
  }

  .input-field:focus {
    ~ .input-label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 14px;
      color: $primary;
      font-weight: 700;
    }

    padding-bottom: 6px;
    font-weight: 700;
    border-width: 2px;
    border-image: linear-gradient(to right, $primary, $inputFocusEffect);
    border-image-slice: 1;
  }

  .input-field {
    &:required,
    &:invalid {
      box-shadow: none;
    }
  }
}
</style>