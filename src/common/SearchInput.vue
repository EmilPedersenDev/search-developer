<template>
  <div class="input-group">
    <span>
      <i class="fas fa-search" v-if="useSearch"></i>
    </span>
    <input
      :id="id"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :class="classList"
      :disabled="disabled"
      :tabindex="tabindex"
      :aria-required="required"
      :aria-invalid="invalid"
      :aria-errormessage="id + '-error'"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @click="onClick"
      @keydown.down.prevent="onKeydownDown"
      @keydown.up.prevent="onKeydownUp"
      @keyup.esc="onKeyupEsc"
    />
  </div>
</template>

<script>
export default {
  name: 'search-input',

  data: function () {
    return {
      localValue: this.value
    };
  },

  props: {
    id: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text',
      validator: function (type) {
        return ['text', 'number', 'date', 'tel', 'password'].includes(type);
      }
    },
    placeholder: {
      type: String
    },
    value: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: String,
      default: '0'
    },
    useSearch: {
      type: Boolean,
      default: false
    },

    invalid: {
      type: Boolean,
      default: false
    },
    blur: {
      type: Function
    },
    focus: {
      type: Function
    },
    click: {
      type: Function
    },
    input: {
      type: Function
    },
    keydownDown: {
      type: Function
    },
    keydownUp: {
      type: Function
    },
    keyupEsc: {
      type: Function
    }
  },

  computed: {
    classList: function () {
      return ['st-input'];
    }
  },

  watch: {
    value: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.localValue = newVal;
      }
    },
    localValue: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal);
      }
    }
  },

  methods: {
    onInput: function (evt) {
      this.localValue = evt.target.value;
      if (this.input) this.input();
    },
    onChange: function (evt) {
      this.localValue = evt.target.value;
      this.$emit('change', this.localValue);
    },
    onBlur: function () {
      let inputGroupEl = document.getElementsByClassName('input-group')[0];
      inputGroupEl.classList.remove('focus-group');
      if (this.blur) this.blur();
    },
    onFocus: function () {
      let inputGroupEl = document.getElementsByClassName('input-group')[0];
      inputGroupEl.classList.add('focus-group');
      if (this.focus) this.focus();
    },
    onClick: function () {
      if (this.click) this.click();
    },
    onKeydownDown: function () {
      if (this.keydownDown) this.keydownDown();
    },
    onKeydownUp: function () {
      if (this.keydownUp) this.keydownUp();
    },
    onKeyupEsc: function () {
      if (this.keyupEsc) this.keyupEsc();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';

.input-group {
  width: 100%;
}
.st-input {
  height: 3em;
  width: 100%;
  position: relative;
  border: 0.0625em solid $primary;
  border-radius: 0.25em;
  color: #fff;
  box-sizing: border-box;
  padding-left: 45px;
  font-size: 1em;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  margin-bottom: 0em !important;
  background: transparent;
  transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &:focus {
    border-color: $primary;
    outline: none;
  }

  &.invalid {
    border-color: red;
    border-width: 0.125em;
    color: red;
  }

  &::placeholder {
    opacity: 0.6;
  }
}

span {
  position: absolute;
  top: 50%;
  @media (min-width: 768px) {
    left: 3%;
  }
  left: 5%;
  transform: translateY(-50%);
}

.focus-group {
  .st-input {
    border-bottom-left-radius: 0;
    border-color: $secondary !important;
    &:hover:not(.st-input) {
      background: $secondary;
    }
  }
}
</style>
