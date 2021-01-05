<template>
  <div class="input-group">
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
      autocomplete="off"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @click="onClick"
      @keyup.enter.prevent="activateButtonClick"
      @keydown.down.prevent="onKeydownDown"
      @keydown.up.prevent="onKeydownUp"
      @keyup.esc="onKeyupEsc"
    />
    <button v-if="useSearchButton" ref="searchButton" class="search-button" @click="activateButtonClick">
      <i class="fas fa-search" v-if="useSearch"></i>
      <span v-else>Add</span>
    </button>
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
    },
    searchAll: {
      type: Function
    },
    useSearchButton: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classList() {
      return ['st-input', !this.useSearchButton && 'no-search-btn'];
    }
  },

  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.localValue = newVal;
      }
    },
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
    onChange(evt) {
      this.localValue = evt.target.value;
      this.$emit('change', this.localValue);
    },
    onBlur(e) {
      let inputGroupEl = document.getElementsByClassName('input-group')[0];
      inputGroupEl.classList.remove('focus-group');
      if (this.blur) this.blur(e);
    },
    onFocus() {
      let inputGroupEl = document.getElementsByClassName('input-group')[0];
      inputGroupEl.classList.add('focus-group');
      if (this.focus) this.focus();
    },
    onClick() {
      if (this.click) this.click();
    },
    onKeydownDown() {
      if (this.keydownDown) this.keydownDown();
    },
    onKeydownUp() {
      if (this.keydownUp) this.keydownUp();
    },
    onKeyupEsc() {
      if (this.keyupEsc) this.keyupEsc();
    },
    activateButtonClick(e) {
      if (!this.useSearchButton) return;
      this.$refs.searchButton.focus();
      if (this.searchAll) this.searchAll();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';

.input-group {
  width: 100%;
  border-radius: 0.25em;
  &:focus {
    outline: none;
  }
}
.st-input {
  height: 3em;
  width: 80%;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 85%;
  }
  @media (min-width: 992px) {
    width: 90%;
  }

  &.no-search-btn {
    width: 100%;
    border-right: 0.0625em solid $primary;
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
  }

  position: relative;
  border: 0.0625em solid $primary;
  border-radius: 0.25em;
  color: #fff;
  box-sizing: border-box;
  padding-left: 1em;
  font-size: 1em;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  margin-bottom: 0em !important;
  background: transparent;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
  transition: all 0.15s ease-in-out;

  &:focus {
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

button {
  width: 20%;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 15%;
  }
  @media (min-width: 992px) {
    width: 10%;
  }
  padding: 10px;
  background: transparent;
  color: #fff;
  border: 0.0625em solid $primary;
  border-radius: 0.25em;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  &:hover {
    background: rgba(0, 242, 195, 0.1);
    cursor: pointer;
  }
  &:focus {
    outline: none;
    background: rgba(0, 242, 195, 0.1);
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
  i {
    transition: all 0.3s ease;
  }
}

.focus-group {
  box-shadow: $primary 0px 0px 10px;

  button,
  .st-input {
    border-bottom-left-radius: 0;
    border-color: $primary !important;
    &:hover:not(.st-input) {
      background: rgba(0, 242, 195, 0.1);
    }
  }
  .st-input {
    border-bottom-left-radius: 0;
  }
  button {
    border-bottom-right-radius: 0;
  }
}
</style>
