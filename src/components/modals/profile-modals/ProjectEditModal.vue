<template>
  <d-modal :onClose="close" hasValidation>
    <div slot="modal-header" class="modal-custom-header">
      <h1>{{ id ? 'Edit Project' : 'Add Project' }}</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <d-input id="name" label="Name" required v-model="project.name" :invalid="$v.project.name.$error" :blur="$v.project.name.$touch">
        <span class="input-error" slot="error" v-if="$v.project.name.$dirty && !$v.project.name.alphaLetterValidation">Name can only contain letters</span>
        <span class="input-error" slot="error" v-if="$v.project.name.$dirty && !$v.project.name.required">Name is required</span>
      </d-input>
      <d-input id="projectLink" label="Project link" required v-model="project.link" :invalid="$v.project.link.$error" :blur="$v.project.link.$touch">
        <span class="input-error" slot="error" v-if="$v.project.link.$dirty && !$v.project.link.required">Link is required</span>
      </d-input>
      <d-input id="repoLink" label="Repo link" required v-model="project.repoLink" :invalid="$v.project.repoLink.$error" :blur="$v.project.repoLink.$touch">
        <span class="input-error" slot="error" v-if="$v.project.repoLink.$dirty && !$v.project.repoLink.required">Repo link is required</span>
      </d-input>
      <d-input id="description" label="Description" required v-model="project.description" :invalid="$v.project.description.$error" :blur="$v.project.description.$touch">
        <span class="input-error" slot="error" v-if="$v.project.description.$dirty && !$v.project.description.required">Description is required</span>
      </d-input>
      <d-error :error="error"></d-error>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(true)" :disabled="isDisabled">Confirm<d-spinner :isLoading="isLoading" buttonSpinner /></d-button>
      <d-button class="col-4 col-sm-3" @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { SET_DEVELOPER_PROJECT, GET_DEVELOPER_PROJECT_BY_ID, UPDATE_DEVELOPER_PROJECT } from '@/store/actions/project-actions.js';
import { GET_USER } from '@/store/actions/user-actions.js';
import { required } from 'vuelidate/lib/validators';
import alphaLetterValidation from '../../../services/validations';
export default {
  name: 'project-edit-modal',
  props: {
    close: {
      type: Function
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      project: {
        name: '',
        link: '',
        repoLink: '',
        description: ''
      },
      originalProject: {},
      isLoading: false,
      error: {}
    };
  },
  beforeMount() {
    if (!this.id) return;

    this.originalProject = this.developerProjectById(this.id);

    if (Object.keys(this.originalProject).length !== 0) {
      this.project = JSON.parse(JSON.stringify(this.originalProject));
    }
  },
  validations: {
    project: {
      name: {
        required,
        alphaLetterValidation
      },
      link: {
        required
      },
      repoLink: {
        required
      },
      description: {
        required
      }
    }
  },
  computed: {
    ...mapGetters({
      user: GET_USER,
      developerProjectById: GET_DEVELOPER_PROJECT_BY_ID
    }),
    hasProjectChanged() {
      return JSON.stringify(this.project) !== JSON.stringify(this.originalProject);
    },
    isDisabled() {
      if (this.$v.$invalid) {
        return true;
      } else if (!this.hasProjectChanged && this.id) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions({
      createDeveloperProjects: SET_DEVELOPER_PROJECT,
      updateDeveloperProjects: UPDATE_DEVELOPER_PROJECT
    }),

    closeModal(val) {
      if (!this.close) return;

      if (!val) {
        this.close();
        return;
      }

      let request = {
        id: this.user.id,
        project: this.project
      };
      if (!this.id) {
        this.isLoading = true;
        this.createDeveloperProjects(request)
          .then(() => {
            this.error = {};
            this.close();
          })
          .catch((err) => {
            this.error = err.response.data;
            console.error(err);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.isLoading = true;

        this.updateDeveloperProjects(request)
          .then(() => {
            this.error = {};
            this.close();
          })
          .catch((err) => {
            this.error = err.response.data;
            console.error(err);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }
  }
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
}
.dropdown-skill-item {
  text-align: left;
  p {
    margin: 0;
    padding: 5px 5px 5px 15px;
  }
}
.row {
  justify-content: space-between;
  .name {
    flex-basis: 48%;
  }
}

.sign-in-footer {
  margin: 60px 0px 30px;
  text-align: center;
  button {
    &:first-child {
      margin-right: 20px;
    }
  }
}
</style>