<template>
  <div class="">
    <router-link to="/account" class="top-link">Back</router-link>

    <h4 class="account-sub-title">Change Password</h4>
    <div class="password-wrapper">
      <d-input
        type="password"
        name="password"
        v-model="model.password"
        label="New password"
        autocomplete="new-password"
        required
        :invalid="$v.model.password.$error"
        :blur="$v.model.password.$touch"
      >
        <span class="input-error" slot="error" v-if="$v.model.password.$dirty && !$v.model.password.required">Password required</span>
        <span class="input-error" slot="error" v-if="$v.model.password.$dirty && !$v.model.password.minLength">Password need to contain 8 characters</span>
      </d-input>
      <d-input
        type="password"
        name="password"
        v-model="model.confirmPassword"
        label="Confirm new password"
        autocomplete="new-password"
        required
        :invalid="$v.model.confirmPassword.$error"
        :blur="$v.model.confirmPassword.$touch"
      >
        <span class="input-error" slot="error" v-if="$v.model.confirmPassword.$dirty && !$v.model.confirmPassword.sameAsPassword">Password differs</span>
      </d-input>
    </div>
    <d-button class="col-12 col-sm-3" secondary @click="submit" :disabled="$v.$invalid">Confirm<d-spinner :isLoading="isLoading" buttonSpinner /></d-button>
    <transition name="modal-fade">
      <success-modal v-if="showSuccessModal" :close="closeConfirmPassword" :message="message"></success-modal>
    </transition>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { GET_USER, UPDATE_USER_PASSWORD } from '../../store/actions/user-actions';
import { LOGOUT } from '../../store/actions/authentication-actions';

import SuccessModal from '../modals/SuccessModal.vue';
import accountMixins from '../../services/mixins/accountMixins';

export default {
  name: 'change-password',
  mixins: [accountMixins],
  components: {
    SuccessModal
  },
  data() {
    return {
      model: {
        password: '',
        confirmPassword: ''
      },
      message: 'Password successfully updated. Please login to verify your password.'
    };
  },
  validations: {
    model: {
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    ...mapGetters({
      user: GET_USER
    })
  },
  methods: {
    ...mapActions({
      updatePassword: UPDATE_USER_PASSWORD,
      logout: LOGOUT
    }),
    submit() {
      this.isLoading = true;
      let request = {
        model: this.model,
        id: this.user.id
      };
      this.updatePassword(request)
        .then(() => {
          this.error = {};
          this.showSuccessModal = true;
        })
        .catch((err) => {
          this.error = err.response.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    closeConfirmPassword() {
      this.logout()
        .then(() => {
          this.showSuccessModal = false;
          this.$v.$reset();
          this.$router.push('/authentication/login');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.d-button {
  margin: 15px 0px 0px;
}
</style>