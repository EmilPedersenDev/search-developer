<template>
  <div class="">
    <router-link to="/account" class="top-link">Back</router-link>

    <h4 class="account-sub-title">Change Name</h4>
    <div class="name-wrapper">
      <d-input
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
import { GET_USER, UPDATE_USER_NAME } from '../../store/actions/user-actions';
import SuccessModal from '../modals/SuccessModal.vue';
import accountMixins from '../../services/mixins/accountMixins';

export default {
  name: 'change-name',
  mixins: [accountMixins],
  components: {
    SuccessModal
  },
  data() {
    return {
      model: {
        firstname: '',
        lastname: ''
      }
    };
  },
  beforeMount() {
    this.originalModel = { firstname: this.user.firstname, lastname: this.user.lastname };
    this.model = { firstname: this.user.firstname, lastname: this.user.lastname };
  },
  validations: {
    model: {
      firstname: {
        required
      },
      lastname: {
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
      updateName: UPDATE_USER_NAME
    }),
    submit() {
      this.isLoading = true;
      let request = {
        model: this.model,
        id: this.user.id
      };
      this.updateName(request)
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