<template>
  <div class="multiselect" @keydown="arrowDown">
    <d-search-input
      placeholder="Search"
      v-model="query"
      :focus="activate"
      useSearch
      :searchAll="onSearchAllDevelopers"
      :blur="deActivate"
      @input="updateSearch"
      :id="id"
      :useSearchButton="useSearchButton"
      ref="searchInput"
    ></d-search-input>
    <transition name="developer-search-dropdown-transition">
      <div v-if="displayDropdownActive" class="px-md-3 developer-search-dropdown-box">
        <ul class="dropdown-content-container" :class="dropdownSize" ref="dropdownContent">
          <li v-for="(item, index) in filteredItems" :key="index" @click.stop="onSelectItem(item)" @keyup.enter.stop="onSelectItem(item)" tabindex="0">
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
    },
    id: {
      type: String,
      default: 'searchInput'
    },
    searchAllDevelopers: {
      type: Function
    },
    useSearchButton: {
      type: Boolean,
      default: true
    },
    lengthToDisplayDropdown: {
      type: Number
    },
    dropdownSize: {
      type: String,
      default: 'sm'
    }
  },
  methods: {
    activate() {
      this.active = true;
    },
    deActivate(e) {
      if (!e.relatedTarget || !e.relatedTarget.parentElement.classList.contains('dropdown-content-container')) {
        this.active = false;
      }
    },
    updateSearch(value) {
      if (!value) return;
      this.$emit('input', value);
    },
    onSearchAllDevelopers() {
      this.searchAllDevelopers();
    },
    onSelectItem(item) {
      if (this.selectItem) {
        this.selectItem(item);
        this.active = false;
      }
    },
    arrowDown(e) {
      switch (e.keyCode) {
        case 38:
          e.preventDefault();
          if (e.target.previousElementSibling) e.target.previousElementSibling.focus();
          else this.$refs.searchInput.$el.firstChild.focus();
          break;
        case 40:
          e.preventDefault();
          if (e.target.id === this.id) this.$refs.dropdownContent.firstChild.focus();
          else if (e.target.nextElementSibling) e.target.nextElementSibling.focus();
          break;
      }
    }
  },
  computed: {
    displayDropdownActive() {
      return this.active && this.query.length >= this.lengthToDisplayDropdown;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.developer-search-dropdown-box {
  width: 100%;
  border: 1px solid $primary !important;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  padding: 0 !important;
  position: absolute;
  z-index: 1001;
  background: $background;

  ul {
    padding: 0;
    margin: 0;
    overflow-y: auto;
    &.sm {
      max-height: 100px;
    }
    &.large {
      max-height: 200px;
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
    li {
      list-style-type: none;
      transition: all 0.15s ease-in-out;

      &:hover {
        background: rgba(0, 242, 195, 0.1);
        cursor: pointer;
      }
      &:focus {
        outline: none;
        background: rgba(0, 242, 195, 0.1);
        box-shadow: $primary 0px 0px 10px;

        cursor: pointer;
      }
    }
  }
}
</style>