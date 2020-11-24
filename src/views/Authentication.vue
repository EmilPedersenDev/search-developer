<template>
  <div class="register container-fluid">
    <div class="wrapper">
      <div class="steps">
        <div class="step step-1" :class="{ active: activeStepId === 1 }">
          <router-link class="router-link" to="/authentication/login" @click.native="goToStep(1)">Login</router-link>
        </div>
        <div class="step step-2" :class="{ active: activeStepId === 2 }">
          <router-link class="router-link" to="/authentication/register" @click.native="goToStep(2)">Register</router-link>
        </div>
      </div>
      <div class="content-wrapper">
        <transition name="fade" mode="out-in">
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
      activeStepId: 1,
      model: model.registerModel
    };
  },
  components: {
    CreateAccount
  },

  methods: {
    submit() {},
    goToStep(stepIndex) {
      console.log('activated?????');
      this.activeStepId = stepIndex;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.register {
  position: relative;
  margin: 60px 0px;
  .wrapper {
    max-width: 600px;
    margin: 0 auto;
    background: #1f2251;
    color: #fff;
    border-radius: 0.2857rem;

    .content-wrapper {
      padding: 30px;
    }

    .steps {
      width: 100%;
      display: flex;

      .step {
        background: #282c68;
        &.active {
          background: #1f2251;
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