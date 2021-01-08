<template>
  <div class="account container">
    <div class="account-wrapper">
      <div class="row">
        <h1 class="col-12 col-md-8 col-lg-6" style="margin: 0px auto 20px">Account</h1>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6 account-form-wrapper">
          <div class="account-info" v-if="$route.name === 'account'">
            <h1>User</h1>
            <div class="name-wrapper">
              <d-input id="firstname" class="name firstName" disabled v-model="user.firstname" label="First name" />
              <d-input class="name lastName" disabled v-model="user.lastname" label="Last name" />
            </div>
            <div class="email-wrapper">
              <d-input id="email" v-model="user.email" disabled label="Email"> </d-input>
            </div>
          </div>
          <router-view v-else></router-view>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6 button-cta-wrapper">
          <router-link to="/account/change-name">
            <d-button primary>Change Name</d-button>
          </router-link>
          <router-link to="/account/change-email">
            <d-button primary>Change Email</d-button>
          </router-link>
          <router-link to="/account/change-password">
            <d-button primary>Change Password</d-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_USER } from '../store/actions/user-actions';
export default {
  name: 'account',
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      user: GET_USER
    })
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';

.account {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 768px) {
    padding-top: 100px;
  }
  .account-wrapper {
    width: 100%;
  }
}

.account-form-wrapper {
  background: $contrast-background;
  border-radius: 8px;
  padding: 30px 30px 40px;
  margin: 0 auto;
  .name-wrapper {
    display: block;
    @media (min-width: 768px) {
      display: flex;
    }
    justify-content: space-between;
    .name {
      flex-basis: 48%;
    }
  }
}

.button-cta-wrapper {
  margin: 15px auto 0px;
  display: block;
  @media (min-width: 768px) {
    display: flex;
  }
  justify-content: space-evenly;
  .d-button {
    display: block;
    width: 100%;
    margin: 10px 0px;
    @media (min-width: 768px) {
      width: auto;
      margin: 0px;
    }
  }
}
</style>