<template>
  <div class="email">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1 class="text-on-back">04</h1>
          <h2 class="text-on-front">Contact</h2>
        </div>
      </div>
      <email-contact-form />
    </div>
  </div>
</template>

<script>
import EmailContactForm from './EmailContactForm';
export default {
  name: 'email',
  components: {
    EmailContactForm
  }
};
</script>

<style lang="scss" scoped>
.text-on-front {
  position: absolute;
  font-size: 30px;
  bottom: 23%;
  @media (min-width: 768px) {
    font-size: 40px;
    left: 10%;
  }
  left: 11%;
}
</style>