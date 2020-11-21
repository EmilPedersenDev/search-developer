export default {
  data() {
    return {
      pointer: 0,
      isTouched: false,
    };
  },
  watch: {
    filteredDevelopers() {
      this.pointerAdjust();
    },
  },
  methods: {
    itemHighlight(index) {
      return {
        st_dropdown_item_highlight: index === this.pointer && this.isTouched,
      };
    },
    addPointerElement() {
      if (this.filteredDevelopers.length > 0) {
        this.addItem(this.filteredDevelopers[this.pointer]);
      }
      this.pointerReset();
    },

    pointerForward() {
      if (this.pointer < this.filteredDevelopers.length - 1) {
        this.pointer++;
      }
    },
    pointerBackward() {
      if (this.pointer > 0) {
        this.pointer--;
      }
    },
    pointerReset() {
      this.pointer = 0;
    },
    pointerAdjust() {
      if (this.pointer >= this.filteredDevelopers.length - 1) {
        this.pointer = this.filteredDevelopers.length
          ? this.filteredDevelopers.length - 1
          : 0;
      }
    },
    pointerSet(index) {
      console.log("Pointer set");
      this.pointer = index;
    },
  },
};
