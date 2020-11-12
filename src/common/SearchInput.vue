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
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @click="onClick"
      @keydown.down.prevent="onKeydownDown"
      @keydown.up.prevent="onKeydownUp"
      @keyup.esc="onKeyupEsc"
    />
    <button class="search-button">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "search-input",

  data: function () {
    return {
      localValue: this.value,
    };
  },

  props: {
    id: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
      validator: function (type) {
        return ["text", "number", "date", "tel", "password"].includes(type);
      },
    },
    placeholder: {
      type: String,
    },
    value: {
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: String,
      default: "0",
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    blur: {
      type: Function,
    },
    focus: {
      type: Function,
    },
    click: {
      type: Function,
    },
    input: {
      type: Function,
    },
    keydownDown: {
      type: Function,
    },
    keydownUp: {
      type: Function,
    },
    keyupEsc: {
      type: Function,
    },
  },

  computed: {
    classList: function () {
      return ["st-input"];
    },
  },

  watch: {
    value: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.localValue = newVal;
      }
    },
    localValue: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit("input", newVal);
      }
    },
  },

  methods: {
    onInput: function (evt) {
      this.localValue = evt.target.value;
      if (this.input) this.input();
    },
    onChange: function (evt) {
      this.localValue = evt.target.value;
      this.$emit("change", this.localValue);
    },
    onBlur: function () {
      let inputGroupEl = document.getElementsByClassName("input-group")[0];
      inputGroupEl.classList.remove("focus-group");
      if (this.blur) this.blur();
    },
    onFocus: function () {
      let inputGroupEl = document.getElementsByClassName("input-group")[0];
      inputGroupEl.classList.add("focus-group");
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
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: #11998e;
$secondary: #38ef7d;

.input-group {
  width: 100%;
}
.st-input {
  height: 3em;
  width: 90%;

  border: 0.0625em solid #00f2c3;
  border-radius: 0.25em;
  color: #fff;
  // width: 100%;
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
  transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;

  &:focus {
    border-color: #00f2c3;
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
  width: 10%;
  padding: 10px;
  background: transparent;
  color: #fff;
  border: 0.0625em solid #00f2c3;
  border-radius: 0.25em;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  &:hover {
    background: #00f2c3;
    cursor: pointer;
  }
}

.focus-group {
  .st-input,
  button {
    border-color: #e14eca !important;
    &:hover:not(.st-input) {
      background: #e14eca;
    }
  }
}
</style>
