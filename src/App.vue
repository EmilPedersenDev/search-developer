<template>
  <div id="app">
    <app-navigation></app-navigation>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import AppNavigation from './components/AppNavigation';
import { mapGetters } from 'vuex';
import { IS_AUTHENTICATED } from './store/actions/authentication-actions';
import { GET_USER } from './store/actions/user-actions';
export default {
  name: 'App',
  components: {
    AppNavigation
  },
  created() {
    if (this.isAuthenticated) {
      this.$store.dispatch(GET_USER);
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: IS_AUTHENTICATED
    })
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap');

body {
  background-image: url('https://demos.creative-tim.com/blk-design-system/assets/img/dots.png');
  background-size: contain;
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
