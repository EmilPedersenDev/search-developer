export default {
  methods: {},
  computed: {
    isDisabled() {
      if (this.$v.$invalid) {
        return true;
      } else if (!this.hasExperienceChanged) {
        return true;
      } else {
        return false;
      }
    }
  }
};
