<template>
  <div class="d-input form-group">
    <input
      type="input"
      class="input-field"
      :placeholder="placeholder"
      :id="id"
      @input="onInput"
      autocomplete="off"
    />
    <label :for="id" class="input-label">
      {{ inputLabel }}
    </label>
  </div>
</template>

<script>
export default {
  name: "d-input",
  props: {
    value: {
      default: null,
    },
    inputLabel: {
      type: String,
      default: "Label",
    },
    placeholder: {
      type: String,
      default: "text...",
    },
    id: {
      type: String,
      default: "id",
    },
    input: {
      type: Function,
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  watch: {
    localValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit("input", newVal);
      }
    },
  },
  methods: {
    onInput(evt) {
      this.localValue = evt.target.value;
      if (this.input) this.input();
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;
.d-input {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 100%;

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
    border-image: linear-gradient(to right, $primary, $secondary);
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