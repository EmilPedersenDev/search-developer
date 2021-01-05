export default {
  data() {
    return {
      isLoading: false,
      showSuccessModal: false,
      error: {},
      originalModel: {}
    };
  },
  methods: {
    closeConfirmModal() {
      this.showSuccessModal = false;
      this.$v.$reset();
      this.$router.push('/account');
    }
  },
  computed: {
    hasExperienceChanged() {
      return JSON.stringify(this.model) !== JSON.stringify(this.originalModel);
    },
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
