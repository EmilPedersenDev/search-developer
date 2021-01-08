<template>
  <div class="">
    <router-link to="/account" class="top-link">Back</router-link>

    <h4 class="account-sub-title">Change Email</h4>
    <div class="row">
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
      <d-error :error="error"></d-error>
    </div>
    <d-button class="col-12 col-sm-3" secondary @click="submit" :disabled="isDisabled">Confirm<d-spinner :isLoading="isLoading" buttonSpinner /></d-button>
    <transition name="modal-fade">
      <success-modal v-if="showSuccessModal" :close="closeConfirmModal"></success-modal>
    </transition>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { GET_USER, UPDATE_USER_EMAIL } from '../../store/actions/user-actions';
import SuccessModal from '../modals/SuccessModal.vue';
import accountMixins from '../../services/mixins/accountMixins';

export default {
  name: 'change-email',
  mixins: [accountMixins],
  components: {
    SuccessModal
  },
  data() {
    return {
      model: {
        email: ''
      }
    };
  },
  beforeMount() {
    this.originalModel = { email: this.user.email };
    this.model = { email: this.user.email };
  },
  validations: {
    model: {
      email: {
        email,
        required
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
      updateEmail: UPDATE_USER_EMAIL
    }),
    submit() {
      this.isLoading = true;
      let request = {
        model: this.model,
        id: this.user.id
      };
      this.updateEmail(request)
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
    }
  }
};
</script>

<style lang="scss" scoped>
.d-button {
  margin: 15px 0px 0px;
}
</style>