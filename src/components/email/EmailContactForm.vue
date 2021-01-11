<template>
  <div class="email-contact-form row">
    <div class="col-12 col-md-8 email-wrapper">
      <div class="email-contact-overlay" v-if="isLoading">
        <d-spinner :isLoading="isLoading" largeSpinner></d-spinner>
      </div>
      <div class="email-card" v-if="!isMessageSent">
        <div class="row">
          <h1>Contact {{ developer.firstname }}</h1>
        </div>
        <div class="row">
          <d-input
            class="name"
            id="firstname"
            label="Firstname"
            required
            v-model="model.firstname"
            :invalid="$v.model.firstname.$error"
            :blur="$v.model.firstname.$touch"
            :disabled="isAuthenticated"
          >
            <span class="input-error" slot="error" v-if="$v.model.firstname.$dirty && !$v.model.firstname.alphaLetterValidation">Firstname can only contain letters</span>
            <span class="input-error" slot="error" v-if="$v.model.firstname.$dirty && !$v.model.firstname.required">Firstname is required</span>
          </d-input>
          <d-input
            class="name"
            id="lastname"
            label="Lastname"
            required
            v-model="model.lastname"
            :invalid="$v.model.lastname.$error"
            :blur="$v.model.lastname.$touch"
            :disabled="isAuthenticated"
          >
            <span class="input-error" slot="error" v-if="$v.model.lastname.$dirty && !$v.model.lastname.alphaLetterValidation">Lastname can only contain letters</span>
            <span class="input-error" slot="error" v-if="$v.model.lastname.$dirty && !$v.model.lastname.required">Lastname is required</span>
          </d-input>
        </div>
        <div class="row">
          <d-input id="email" type="email" v-model="model.email" label="Email" required :disabled="isAuthenticated" :invalid="$v.model.email.$error" :blur="$v.model.email.$touch">
            <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.email">Not a valid email</span>
            <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.required">Email is required</span>
          </d-input>
        </div>
        <div class="row">
          <d-text-area label="Message" v-model="model.message" required :invalid="$v.model.message.$error" :blur="$v.model.message.$touch">
            <span class="input-error" slot="error" v-if="$v.model.message.$dirty && !$v.model.message.required">Message is required</span>
          </d-text-area>
        </div>
        <d-error :error="error"></d-error>
        <div class="row button-wrapper">
          <d-button class="col-5 col-sm-3" secondary @click="sendEmail" :disabled="$v.$invalid">Send Email</d-button>
        </div>
      </div>
      <transition name="modal-fade">
        <div class="email-sent" v-if="isMessageSent">
          <div class="row email-sent-wrapper">
            <div class="col-12 email-sent-card">
              <h1>Email has been sent to {{ developer.firstname }}!</h1>
              <img src="check.svg" alt="" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
import { IS_AUTHENTICATED } from '../../store/actions/authentication-actions';
import { GET_DEVELOPER } from '../../store/actions/developer-actions';
import alphaLetterValidation from '../../services/validations';

import api from '../../api/index';

export default {
  name: 'email-contact-form',
  data() {
    return {
      model: {
        firstname: '',
        lastname: '',
        email: '',
        message: ''
      },
      isMessageSent: false,
      error: {},
      isLoading: false
    };
  },
  beforeMount() {
    if (!this.isAuthenticated) return;

    if (Object.keys(this.user).length !== 0) {
      this.model = { firstname: this.user.firstname, lastname: this.user.lastname, email: this.user.email, message: '' };
    }
  },
  validations: {
    model: {
      firstname: {
        required,
        alphaLetterValidation
      },
      lastname: {
        required,
        alphaLetterValidation
      },
      email: {
        email,
        required
      },
      message: {
        required
      }
    }
  },
  computed: {
    ...mapGetters({
      user: GET_USER,
      isAuthenticated: IS_AUTHENTICATED,
      developer: GET_DEVELOPER
    })
  },
  methods: {
    sendEmail() {
      this.isLoading = true;
      let request = { ...this.model, developer: this.developer.firstname, developerEmail: this.developer.email };
      api
        .post('/email', request)
        .then((result) => {
          this.error = {};
          this.isMessageSent = true;
        })
        .catch((err) => {
          this.error = err.response.data;
          console.error(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  beforeDestroy() {
    this.isMessageSent = false;
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors';
.email-contact-form {
  margin-top: 30px;
  .email-wrapper {
    position: relative;
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.8);
    padding: 30px 20px;
    @media (min-width: 768px) {
      padding: 30px;
    }
    max-width: 700px;
    background: $contrast-background;
    border-radius: 5px;
    margin: 0 auto;

    .email-contact-overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(23, 25, 65, 0.9);
      z-index: 2;
    }

    .email-card {
      .row {
        justify-content: space-between;
        .name {
          flex-basis: 48%;
        }
      }

      .button-wrapper {
        margin-top: 10px;
      }
    }

    .email-sent {
      height: 150px;
      .email-sent-wrapper {
        height: 100%;
        .email-sent-card {
          text-align: center;
          h1 {
            @media (min-width: 768px) {
              font-size: 30px;
            }
            font-size: 20px;
          }
          img {
            height: 72px;
            @media (min-width: 768px) {
              margin-top: 25px;
            }
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>