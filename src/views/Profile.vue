<template>
  <div class="profile">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'profile'
};
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  height: 100%;
}
</style>