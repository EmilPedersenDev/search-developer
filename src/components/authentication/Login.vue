<template>
  <div class="login-wrapper">
    <form @submit.prevent="submit" autocomplete="on">
      <div class="sign-in-header">
        <h1>Sign in With</h1>
        <div class="social-sign-ins">
          <d-button>
            <i class="fab fa-google"></i>
          </d-button>
          <d-button>
            <i class="fab fa-github"></i>
          </d-button>
        </div>
        <p>Or sign in with credentials</p>
      </div>
      <div class="sign-in-body">
        <d-input type="email" name="email" v-model="model.email" label="Email" autocomplete="email" required :invalid="$v.model.email.$error" :blur="$v.model.email.$touch">
          <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.email">Not a valid email</span>
          <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.required">Email is required</span>
        </d-input>
        <d-input
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
        <d-error :error="error"></d-error>
      </div>
      <div class="sign-in-footer">
        <d-button class="col-4 col-sm-3" secondary type="submit" :disabled="$v.$invalid">Sign in <d-spinner :isLoading="isLoading" buttonSpinner></d-spinner> </d-button>
      </div>
    </form>
    <transition name="modal-fade">
      <success-modal v-if="showSuccessModal" :close="closeConfirmModal" :message="loginSuccessMsg"></success-modal>
    </transition>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { LOGIN } from '../../store/actions/authentication-actions';
import { GET_USER } from '../../store/actions/user-actions';
import api from '../../api/index';
import SuccessModal from '../modals/SuccessModal.vue';

export default {
  name: '',
  components: {
    SuccessModal
  },
  data() {
    return {
      model: { email: '', password: '' },
      isLoading: false,
      showSuccessModal: false,
      loginSuccessMsg: 'Success!',
      error: {}
    };
  },
  validations: {
    model: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
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
      login: LOGIN
    }),
    submit() {
      this.isLoading = true;
      this.login(this.model)
        .then((user) => {
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
    closeConfirmModal(val) {
      this.showSuccessModal = false;
      this.model = {};
      this.$v.$reset();
      this.$router.push(`/profile/${this.user.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.login-wrapper {
  position: relative;
}

.sign-in-header {
  color: #fff;
  text-align: center;
  h1 {
    font-size: 30px;
  }
  p {
    color: #6c757d;
    font-weight: 300;
  }

  .social-sign-ins {
    margin: 20px 0px;
    .d-button {
      &:first-child {
        margin-right: 5px;
      }
      i {
        color: $secondary;
      }
    }
  }
}

.sign-in-body {
  padding: 0 40px;
  span {
    color: $secondary;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      text-decoration: none;
      color: #fff;
    }
  }
}

.sign-in-footer {
  margin: 60px 0px 30px;
  text-align: center;
}
</style>