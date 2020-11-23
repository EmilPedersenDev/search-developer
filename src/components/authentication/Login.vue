<template>
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
      <d-input type="email" name="email" v-model="model.email" inputLabel="Email" autocomplete="email" required :invalid="$v.model.email.$error" :blur="$v.model.email.$touch">
        <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.email">Not a valid email</span>
        <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.required">Email is required</span>
      </d-input>
      <d-input
        type="password"
        name="password"
        v-model="model.password"
        inputLabel="Password"
        autocomplete="new-password"
        required
        :invalid="$v.model.password.$error"
        :blur="$v.model.password.$touch"
      >
        <span class="input-error" slot="error" v-if="$v.model.password.$dirty && !$v.model.password.required">Password required</span>
        <span class="input-error" slot="error" v-if="$v.model.password.$dirty && !$v.model.password.minLength">Password need to contain 8 characters</span>
      </d-input>
    </div>
    <div class="sign-in-footer">
      <d-button class="col-4 col-sm-3" primary type="submit" :disabled="$v.$invalid">Sign in</d-button>
    </div>
  </form>
</template>

<script>
import models from '../../services/model/models';
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { LOGIN } from '../../store/actions/authentication-actions';
import api from '../../api/index';
export default {
  name: '',
  data() {
    return {
      model: models.loginModel
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
  methods: {
    ...mapActions({
      login: LOGIN
    }),
    submit() {
      this.login(this.model)
        .then((result) => {
          this.$router.push('/profile');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.sign-in-header {
  color: #fff;
  text-align: center;
  h1 {
    padding: 10px 0px;
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