<template>
  <form @submit.prevent="submit">
    <h1>Create Account</h1>
    <div class="name-wrapper">
      <d-input class="name firstName" inputLabel="firstname"></d-input>
      <d-input class="name lastName" inputLabel="lastname"></d-input>
    </div>
    <div class="email-wrapper">
      <d-input inputLabel="email"></d-input>
      <d-input inputLabel="confirm email"></d-input>
    </div>
    <div class="password-wrapper">
      <d-input inputLabel="password"></d-input>
      <d-input inputLabel="confirm password"></d-input>
    </div>
    <div class="button-wrapper">
      <d-button type="submit" primary>Submit</d-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "create-account",
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.name-wrapper {
  display: flex;
  justify-content: space-between;
  .name {
    flex-basis: 48%;
  }
}
.button-wrapper {
  margin-top: 40px;
  text-align: right;
  .d-button {
  }
}
</style>