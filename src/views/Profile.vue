<template>
  <div class="profile container-fluid">
    <h1>Profile</h1>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>