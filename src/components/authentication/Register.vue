<template>
  <div>
    <form @submit.prevent="submit" autocomplete="on">
      <h1>Create Account</h1>
      <div class="name-wrapper">
        <d-input
          id="given-name"
          name="given-name"
          class="name firstName"
          v-model="model.firstname"
          label="First name"
          autocomplete="given-name"
          required
          :invalid="$v.model.firstname.$error"
          :blur="$v.model.firstname.$touch"
        >
          <span class="input-error" slot="error" v-if="$v.model.firstname.$dirty && !$v.model.firstname.required">First name required</span>
        </d-input>
        <d-input
          id="family-name"
          name="family-name"
          class="name lastName"
          v-model="model.lastname"
          label="Last name"
          autocomplete="family-name"
          required
          :invalid="$v.model.lastname.$error"
          :blur="$v.model.lastname.$touch"
        >
          <span class="input-error" slot="error" v-if="$v.model.lastname.$dirty && !$v.model.lastname.required">Last name required</span></d-input
        >
      </div>
      <div class="email-wrapper">
        <d-input
          id="email"
          type="email"
          name="email"
          v-model="model.email"
          label="Email"
          autocomplete="email"
          required
          :invalid="$v.model.email.$error"
          :blur="$v.model.email.$touch"
        >
          <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.email">Not a valid email</span>
          <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.required">Email is required</span>
        </d-input>
      </div>
      <div class="password-wrapper">
        <d-input
          id="password"
          type="password"
          name="password"
          v-model="model.password"
          label="Password"
          autocomplete="new-password"
          required
          :invalid="$v.model.password.$error"
          :blur="$v.model.password.$touch"
        >
          <span class="input-error" slot="error" v-if="$v.model.password.$dirty && !$v.model.password.required">Password required</span>
          <span class="input-error" slot="error" v-if="$v.model.password.$dirty && !$v.model.password.minLength">Password need to contain 8 characters</span>
        </d-input>
        <d-input
          id="confirmPassword"
          type="password"
          name="password"
          v-model="model.confirmPassword"
          label="Confirm password"
          autocomplete="new-password"
          required
          :invalid="$v.model.confirmPassword.$error"
          :blur="$v.model.confirmPassword.$touch"
        >
          <span class="input-error" slot="error" v-if="$v.model.confirmPassword.$dirty && !$v.model.confirmPassword.sameAsPassword">Password differs</span>
        </d-input>
      </div>
      <d-error :error="error"></d-error>
      <div class="button-wrapper">
        <d-button type="submit" class="col-4 col-sm-3" secondary :disabled="$v.$invalid">Submit<d-spinner :isLoading="isLoading" buttonSpinner /></d-button>
      </div>
    </form>
    <transition name="modal-fade">
      <success-modal v-if="showSuccessModal" :close="closeConfirmModal" :message="accountSuccessMsg"></success-modal>
    </transition>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import api from '../../api/index';
import SuccessModal from '../modals/SuccessModal.vue';

export default {
  name: 'register',
  components: {
    SuccessModal
  },
  data() {
    return {
      model: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      showSuccessModal: false,
      isLoading: false,
      error: {},
      accountSuccessMsg: 'Your account was successfully created. You are now redirected to login.'
    };
  },
  validations: {
    model: {
      firstname: {
        required
      },
      lastname: {
        required
      },
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },

  methods: {
    submit() {
      this.isLoading = true;
      api
        .post('auth/signup', this.model)
        .then((result) => {
          this.error = {};
          this.showSuccessModal = true;
        })
        .catch((err) => {
          this.error = err.response.data;
          console.error(err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    closeConfirmModal(val) {
      this.showSuccessModal = false;
      this.model = {};
      this.$v.$reset();
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  padding: 0 40px;
}
h1 {
  text-align: center;
}

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
.button-wrapper {
  margin-top: 40px;
  text-align: right;
}
</style>