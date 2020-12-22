<template>
  <div class="st-date-picker-view">
    <div class="date-picker-box" @mousedown.prevent :style="setWidth">
      <ul>
        <li v-for="(year, index) in generateYears" v-bind:key="index" @click="select(year)">{{ year }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
moment.locale('sv');

export default {
  name: 'd-date-picker-view',
  data() {
    return {
      currentlySelectedDate: null
    };
  },
  props: {
    selectedDate: {
      default: null
    },
    dateInputInnerWidth: {
      type: Number,
      default: 0
    }
  },
  methods: {
    select: function (date) {
      this.$emit('select', date);
    }
  },
  created() {
    if (this.selectedDate) {
      this.currentlySelectedDate = this.selectedDate;
    } else {
      this.currentlySelectedDate = new Date();
    }
  },
  computed: {
    getYear: function () {
      return typeof this.currentlySelectedDate === 'number' ? this.currentlySelectedDate : this.currentlySelectedDate.getFullYear();
    },
    generateYears() {
      var max = new Date().getFullYear();
      var min = max - 70;
      var years = [];

      for (var i = max; i >= min; i--) {
        years.push(i);
      }
      return years;
    },
    setWidth() {
      return `width: ${this.dateInputInnerWidth}px`;
    }
  },
  filters: {
    dateNumberFilter: function (value) {
      if (!value) return '';
      return moment(value, 'ddd, DD MMM YYYY HH:mm:ss ZZ').format('d');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.st-date-picker-view {
  width: 100%;
  position: absolute;
  z-index: 100;
  max-height: 200px;

  .date-picker-box {
    background-color: $background;
    max-height: inherit;

    ul {
      max-height: inherit;
      overflow-y: scroll;
      li {
        width: 100%;
        &:hover {
          background: #282c68;
          cursor: pointer;
        }
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
  }
}
</style>
