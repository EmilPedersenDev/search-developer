<template>
  <div class="multiselect">
    <d-search-input placeholder="Search" v-model="query" :focus="activate" useSearch :blur="deActivate" @input="updateSearch"></d-search-input>
    <transition name="developer-search-dropdown-transition">
      <div v-if="displayDropdownActive" class="px-md-3 developer-search-dropdown-box">
        <ul>
          <li v-for="(item, index) in filteredItems" :key="index" @click.stop="onSelectItem(item)" tabindex="0">
            <div class="dropdown-content-wrapper">
              <slot name="dropdown-content" :item="item"></slot>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'multi-select',
  data() {
    return {
      query: '',
      active: false,
      selectedDeveloper: {}
    };
  },
  props: {
    filteredItems: {
      type: Array,
      require: true
    },
    selectItem: {
      type: Function
    }
  },
  methods: {
    activate() {
      this.active = true;
    },
    deActivate() {
      this.active = false;
    },
    updateSearch(value) {
      if (!value) return;
      this.$emit('input', value);
    },
    onSelectItem(item) {
      if (this.selectItem) {
        this.selectItem(item);
      }
    }
  },
  computed: {
    displayDropdownActive() {
      return this.active && this.query.length > 2;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.developer-search-dropdown-box {
  width: 100%;
  border: 1px solid $secondary;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  padding: 0 !important;
  position: absolute;
  z-index: 1001;
  background: $background;
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style-type: none;
      &.st_dropdown_item_highlight {
        background: rgba(225, 78, 202, 0.1);
        outline: none;
      }

      &:hover {
        background: rgba(225, 78, 202, 0.1);
        cursor: pointer;
      }
    }
  }
}
</style>