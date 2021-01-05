<template>
  <div class="register container-fluid">
    <div class="wrapper">
      <div class="steps">
        <div class="step step-1" :class="{ active: $route.name === 'login' }">
          <router-link class="router-link" to="/authentication/login">Login</router-link>
        </div>
        <div class="step step-2" :class="{ active: $route.name === 'register' }">
          <router-link class="router-link" to="/authentication/register">Register</router-link>
        </div>
      </div>
      <div class="content-wrapper">
        <transition name="fade-fast" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import CreateAccount from '../components/CreateAccount';
import model from '../services/model/models.js';

export default {
  name: '',
  data() {
    return {
      model: model.registerModel
    };
  },
  components: {
    CreateAccount
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.register {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .wrapper {
    width: 100%;
    @media (min-width: 768px) {
      max-width: 600px;
      width: 600px;
    }
    background: $contrast-background;
    color: #fff;
    border-radius: 0.2857rem;

    .content-wrapper {
      padding: 30px 0px;
      @media (min-width: 768px) {
        padding: 30px;
      }
    }

    .steps {
      width: 100%;
      display: flex;

      .step {
        background: #282c68;
        &.active {
          background: $contrast-background;
        }
      }
      .step-1,
      .step-2 {
        flex: 1 1 50%;
        text-align: center;
        padding: 10px;
      }

      .step-1 {
        border-bottom-right-radius: 10px;
      }
      .step-2 {
        border-bottom-left-radius: 10px;
      }
    }
  }
}
</style>