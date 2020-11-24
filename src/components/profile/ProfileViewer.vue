<template>
  <div class="">View profile</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
export default {
  name: 'profile-viewer',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  created() {
    if (!this.isCurrentUser) {
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      user: GET_USER
    }),
    isCurrentUser() {
      return this.user.id === this.id;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>