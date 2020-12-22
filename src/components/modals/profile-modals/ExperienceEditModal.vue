<template>
  <d-modal :onClose="close" hasValidation>
    <div slot="modal-header" class="modal-custom-header">
      <h1>{{ id ? 'Edit Experience' : 'Add Experience' }}</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <div class="row">
        <d-input class="col-8" required label="Company" v-model="experience.company" :invalid="$v.experience.company.$error" :blur="$v.experience.company.$touch">
          <span class="input-error" slot="error" v-if="$v.experience.company.$dirty && !$v.experience.company.alphaLetterValidation">Company can only contain letters</span>
          <span class="input-error" slot="error" v-if="$v.experience.company.$dirty && !$v.experience.company.required">Company is required</span>
        </d-input>
        <d-date-select class="col-4" v-model="experience.date" :validation="$v.experience.date" v-on:dateInputTouch="$v.experience.date.$touch"></d-date-select>
      </div>
      <div class="row">
        <d-input label="Title" required v-model="experience.title" :invalid="$v.experience.title.$error" :blur="$v.experience.title.$touch">
          <span class="input-error" slot="error" v-if="$v.experience.title.$dirty && !$v.experience.title.alphaLetterValidation">Title can only contain letters</span>
          <span class="input-error" slot="error" v-if="$v.experience.title.$dirty && !$v.experience.title.required">Title is required</span>
        </d-input>
      </div>
      <div class="row">
        <d-text-area label="Description" v-model="experience.description"> </d-text-area>
      </div>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(true)" :disabled="isDisabled">Confirm</d-button>
      <d-button class="col-4 col-sm-3" @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { SET_DEVELOPER_EXPERIENCE, GET_DEVELOPER_EXPERIENCE_BY_ID } from '@/store/actions/experience-actions.js';
import { GET_USER } from '@/store/actions/user-actions.js';
import { required } from 'vuelidate/lib/validators';
import alphaLetterValidation from '../../../services/validations';
export default {
  name: 'experience-edit-modal',
  props: {
    close: {
      type: Function
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      experience: {
        company: '',
        title: '',
        date: '',
        description: ''
      },
      originalExperience: {}
    };
  },
  beforeMount() {
    if (!this.id) return;

    this.originalExperience = this.developerExperienceById(this.id);

    if (Object.keys(this.originalExperience).length !== 0) {
      this.experience = JSON.parse(JSON.stringify(this.originalExperience));
    }
  },
  validations: {
    experience: {
      company: {
        required,
        alphaLetterValidation
      },
      title: {
        required,
        alphaLetterValidation
      },
      date: {
        required
      }
    }
  },
  computed: {
    ...mapGetters({
      user: GET_USER,
      developerExperienceById: GET_DEVELOPER_EXPERIENCE_BY_ID
    }),
    isDisabled() {
      if (this.$v.$invalid) {
        return true;
      } else if (!this.hasExperienceChanged && this.id) {
        return true;
      } else {
        return false;
      }
    },
    hasExperienceChanged() {
      return JSON.stringify(this.experience) !== JSON.stringify(this.originalExperience);
    }
  },
  methods: {
    ...mapActions({
      setDeveloperExperience: SET_DEVELOPER_EXPERIENCE
    }),
    closeModal(val) {
      if (this.close) {
        if (val) {
          let experienceDate = new Date(this.experience.date.toString());
          this.experience.date = experienceDate;

          let request = {
            id: this.user.id,
            experience: this.experience
          };

          this.setDeveloperExperience(request).then(() => {
            this.close();
          });
        } else {
          this.close();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
select {
  height: 40px;
  align-self: center;
}

textarea {
  width: 100%;
  background: transparent;
  color: #fff;
}

.date-select {
  padding-right: 0px !important;
}
</style>