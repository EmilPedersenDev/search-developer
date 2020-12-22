<template>
  <div class="date-select-input" @click="onClick" @blur="onBlur">
    <d-input id="date-input" :value="value | dateFormat" :readonly="true" :placeholder="placeholder" :blur="onBlur" label="Date" :invalid="validation.$error" required>
      <span class="input-error" slot="error" v-if="validation.$dirty && !validation.required">Date is required</span>
    </d-input>
  </div>
</template>

<script>
import moment from 'moment';
moment.locale('sv');

export default {
  name: 'd-date-picker-input',
  props: {
    click: {
      type: Function
    },
    blur: {
      type: Function
    },
    value: {
      default: null
    },
    placeholder: {
      type: String,
      default: 'Date..'
    },
    setInnerWidth: {
      type: Function
    },
    validation: {
      type: Object
    }
  },

  mounted() {
    let dateInputEl = document.getElementById('date-input');

    if (this.setInnerWidth) {
      this.setInnerWidth(dateInputEl.offsetWidth);
    }

    window.addEventListener('resize', this.onResize);
  },

  filters: {
    dateFormat: function (value) {
      if (value instanceof Date) {
        return moment(value, 'ddd, DD MMM YYYY HH:mm:ss ZZ').format('D MMMM, YYYY');
      } else {
        return value;
      }
    }
  },
  methods: {
    onClick: function () {
      if (this.click) this.click();
    },
    onBlur: function () {
      if (this.blur) {
        this.blur();
      }
    },
    onResize() {
      let dateInputEl = document.getElementById('date-input');

      if (this.setInnerWidth) {
        this.setInnerWidth(dateInputEl.offsetWidth);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.date-select-input {
  width: 100%;
}
</style>
