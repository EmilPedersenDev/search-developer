<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>Add Projects</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <d-input inputLabel="Name" v-model="project.name">Name</d-input>
      <d-input inputLabel="Link" v-model="project.link">Link</d-input>
      <d-input inputLabel="Repo" v-model="project.repoLink">Repo</d-input>
      <d-input inputLabel="Description" v-model="project.description">Description</d-input>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" @click="closeModal(true)">Confirm</d-button>
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { SET_DEVELOPER_PROJECT } from '@/store/actions/project-actions.js';
import { GET_USER } from '@/store/actions/user-actions.js';
export default {
  name: 'project-edit-modal',
  props: {
    close: {
      type: Function
    }
  },
  data() {
    return {
      project: {
        name: '',
        link: '',
        repoLink: '',
        description: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      user: GET_USER
    })
  },
  methods: {
    ...mapActions({
      setDeveloperProjects: SET_DEVELOPER_PROJECT
    }),

    closeModal(val) {
      if (this.close) {
        if (val) {
          let request = {
            id: this.user.id,
            project: this.project
          };
          this.setDeveloperProjects(request).then(() => {
            this.close();
          });
        }
        this.close();
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