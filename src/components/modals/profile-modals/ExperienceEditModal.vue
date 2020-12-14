<template>
  <d-modal :onClose="close" hasValidation>
    <div slot="modal-header" class="modal-custom-header">
      <h1>Add Experience</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <div class="row">
        <d-input
          class="col-8"
          style="margin-right: 20px"
          required
          inputLabel="Company"
          v-model="experience.company"
          :invalid="$v.experience.company.$error"
          :blur="$v.experience.company.$touch"
        >
          <span class="input-error" slot="error" v-if="$v.experience.company.$dirty && !$v.experience.company.alphaLetterValidation">Company can only contain letters</span>
          <span class="input-error" slot="error" v-if="$v.experience.company.$dirty && !$v.experience.company.required">Company is required</span>
        </d-input>
        <select class="col-3" v-model="experience.date">
          <option>2020</option>
          <option>2019</option>
          <option>2018</option>
        </select>
      </div>
      <div class="row">
        <d-input inputLabel="Title" required v-model="experience.title" :invalid="$v.experience.title.$error" :blur="$v.experience.title.$touch">
          <span class="input-error" slot="error" v-if="$v.experience.title.$dirty && !$v.experience.title.alphaLetterValidation">Title can only contain letters</span>
          <span class="input-error" slot="error" v-if="$v.experience.title.$dirty && !$v.experience.title.required">Title is required</span>
        </d-input>
      </div>
      <div class="row">
        <textarea
          id="description"
          placeholder="Description..."
          cols="30"
          rows="3"
          v-model="experience.description"
          class="required"
          :class="{ invalid: $v.experience.description.$error }"
          @blur="$v.experience.description.$touch"
        >
        </textarea>
        <span class="input-error" slot="error" v-if="$v.experience.description.$dirty && !$v.experience.description.required">Title is required</span>
      </div>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" @click="closeModal(true)" :disabled="$v.$invalid">Confirm</d-button>
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { SET_DEVELOPER_EXPERIENCE } from '@/store/actions/experience-actions.js';
import { GET_USER } from '@/store/actions/user-actions.js';
import { required } from 'vuelidate/lib/validators';
import alphaLetterValidation from '../../../services/validations';
export default {
  name: 'experience-edit-modal',
  props: {
    close: {
      type: Function
    }
  },
  data() {
    return {
      experience: {
        company: '',
        title: '',
        date: '',
        description: ''
      }
    };
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
      description: {
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
      setDeveloperExperience: SET_DEVELOPER_EXPERIENCE
    }),
    closeModal(val) {
      if (this.close) {
        if (val) {
          let experienceDate = new Date(this.experience.date);
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
</style>