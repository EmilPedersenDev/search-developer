<template>
  <div class="date-select">
    <d-date-picker-input
      :value="selectedDate"
      :click="toggle"
      :blur="hideView"
      :placeholder="placeholder"
      :setInnerWidth="setInnerWidth"
      :validation="validation"
    ></d-date-picker-input>
    <d-date-picker-view v-if="showView" :selectedDate="selectedDate" @select="onSelect" :dateInputInnerWidth="dateInputInnerWidth"></d-date-picker-view>
  </div>
</template>

<script>
export default {
  name: 'd-date-select',
  props: {
    value: {
      default: null
    },
    validation: {
      type: Object
    }
  },
  data() {
    return {
      showView: false,
      selectedDate: this.value,
      placeholder: 'Date',
      dateInputInnerWidth: 0
    };
  },
  components: {
    'd-date-picker-input': () => import('./DateSelectInput.vue'),
    'd-date-picker-view': () => import('./DateSelectView.vue')
  },
  methods: {
    toggle: function () {
      this.showView = !this.showView;
    },

    displayView: function () {
      this.showView = true;
    },
    hideView: function () {
      this.$emit('dateInputTouch');
      this.showView = false;
    },
    onSelect: function (evt) {
      this.selectedDate = evt;
      this.showView = false;
    },
    setInnerWidth(width) {
      this.dateInputInnerWidth = width;
    }
  },
  watch: {
    value: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.selectedDate = newVal;
      }
    },
    selectedDate: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.date-select {
  width: 100%;
  input {
    width: 100%;
  }
}
</style>