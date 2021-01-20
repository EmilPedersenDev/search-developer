<template>
  <div id="app">
    <app-navigation></app-navigation>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <transition name="modal-fade">
      <confirm-modal v-if="showLogoutModal" :close="closeLogoutConfirmModal" :message="logoutMessage" noOptions></confirm-modal>
    </transition>
  </div>
</template>

<script>
import AppNavigation from './components/AppNavigation';
import { mapGetters, mapMutations } from 'vuex';
import { IS_AUTHENTICATED, SHOW_LOGOUT_MODAL, SET_LOGOUT_CONFIRM_MODAL } from './store/actions/authentication-actions';
import { GET_USER } from './store/actions/user-actions';
import { GET_SKILLS } from './store/actions/skills-actions';
import { LOAD_DEPENDENCIES } from './store';
import confirmModal from './components/modals/ConfirmModal';
export default {
  name: 'App',
  components: {
    AppNavigation,
    confirmModal
  },
  data() {
    return {
      logoutMessage: 'Sorry, your session is up. Please login again.'
    };
  },
  created() {
    this.$store.dispatch(LOAD_DEPENDENCIES);

    if (this.isAuthenticated) {
      this.$store.dispatch(GET_USER);
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: IS_AUTHENTICATED,
      showLogoutModal: SHOW_LOGOUT_MODAL
    })
  },
  methods: {
    ...mapMutations({
      setLogoutConfirmModal: SET_LOGOUT_CONFIRM_MODAL
    }),
    closeLogoutConfirmModal() {
      this.setLogoutConfirmModal(false);
      this.$router.push('/authentication/login');
      console.log('test');
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap');

body {
  background-color: #171941;
}
#app {
  font-family: 'Cairo', sans-serif;
  height: 100%;
  width: 100%;
}

a {
  text-decoration: none;
}
</style>
