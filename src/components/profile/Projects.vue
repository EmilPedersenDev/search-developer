<template>
  <div class="projects">
    <img src="https://demos.creative-tim.com/blk-design-system/assets/img/path3.png" alt="" class="third-background-img" />
    <div class="container">
      <div class="row">
        <div class="projects-wrapper">
          <div class="col-md-6">
            <h1 class="text-on-back">03</h1>
            <h2 class="text-on-front">Projects</h2>
          </div>
          <div class="edit-button">
            <d-button edit no-border @click="openProjectEditModal(null)" v-if="isAuthenticatedUser">Add Project</d-button>
          </div>

          <div class="projects-grid" v-if="projects.length > 0">
            <div class="project-card" v-for="(project, id) in projects" :key="id">
              <div class="project-card-inner">
                <div class="flip-card-front">
                  <h1>{{ project.name }}</h1>
                </div>
                <div class="flip-card-back">
                  <div class="card-back-header">
                    <d-button noBorder @click.prevent="openProjectEditModal(project.id)" v-if="isAuthenticatedUser"> <i class="fas fa-pen"></i> </d-button>
                    <span class="seperator" v-if="isAuthenticatedUser">|</span>
                    <d-button noBorder error @click.prevent="openDeleteProjectModal(project.id)" v-if="isAuthenticatedUser">
                      <i class="fas fa-trash"></i>
                    </d-button>
                  </div>

                  <div class="card-back-body">
                    <div class="inner-body-wrapper">
                      <h1 class="d-md-none" style="text-align: center">{{ project.name }}</h1>
                      <p class="d-none d-sm-flex">{{ project.description }}</p>
                    </div>
                  </div>

                  <div class="card-back-footer">
                    <a :href="project.link" target="_blank">
                      <d-button noBorder>Go to Demo </d-button>
                    </a>

                    <d-button class="repo-btn" noBorder @click.prevent="goToLink(project.repoLink)">
                      <i class="fab fa-github"></i>
                    </d-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row empty-wrapper" v-else>
            <div class="col-12">
              <img src="empty-box.svg" alt="" />
              <h1>Looks pretty empty</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="modal-fade">
      <project-edit-modal v-if="showProjectsEditModal" :close="closeProjectEditModal" :id="projectById"></project-edit-modal>
    </transition>
    <transition name="modal-fade">
      <confirm-modal v-if="showDeleteProjectModal" :isLoading="isLoading" :close="closeDeleteProject" :message="deleteProjectMessage"></confirm-modal>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
import { DELETE_DEVELOPER_PROJECT, GET_DEVELOPER_PROJECT } from '../../store/actions/project-actions';
import { IS_AUTHENTICATED_USER } from '../../store/actions/authentication-actions';
import ConfirmModal from '../modals/ConfirmModal';
import ProjectEditModal from '../modals/profile-modals/ProjectEditModal';

export default {
  name: 'projects',
  props: {
    openEditModal: {
      type: Function
    },
    openDeleteModal: {
      type: Function
    }
  },
  components: {
    ConfirmModal,
    ProjectEditModal
  },
  data() {
    return {
      deleteProjectMessage: 'Are you sure you want to delete this project?',
      isLoading: false,
      showDeleteProjectModal: false,
      showProjectsEditModal: false,
      projectToDeleteById: null,
      projectById: null
    };
  },
  computed: {
    ...mapGetters({
      user: GET_USER,
      isAuthenticatedUser: IS_AUTHENTICATED_USER,
      projects: GET_DEVELOPER_PROJECT
    })
  },
  methods: {
    ...mapActions({
      deleteProject: DELETE_DEVELOPER_PROJECT
    }),
    openProjectEditModal(id) {
      this.projectById = id;
      this.showProjectsEditModal = true;
    },
    closeProjectEditModal() {
      this.projectById = null;
      this.showProjectsEditModal = false;
    },
    openDeleteProjectModal(id) {
      this.showDeleteProjectModal = true;
      this.projectToDeleteById = id;
    },
    closeDeleteProject(val) {
      if (!val) {
        this.showDeleteProjectModal = false;
        return;
      }
      this.isLoading = true;
      let request = {
        userId: this.user.id,
        id: this.projectToDeleteById
      };

      this.deleteProject(request)
        .then(() => {
          this.projectToDeleteById = null;
          this.showDeleteProjectModal = false;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.error(err);
        });
    },

    goToLink(link) {
      if (!link) return;
      window.open(link, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/projects';
</style>