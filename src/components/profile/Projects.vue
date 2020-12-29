<template>
  <div class="projects">
    <div class="container">
      <div class="row">
        <div class="projects-wrapper">
          <div class="col-md-6">
            <h1 class="text-on-back">03</h1>
            <h2 class="text-on-front" style="">Projects</h2>
          </div>
          <div class="edit-button">
            <d-button edit no-border @click="openProjectEditModal(null)" v-if="isAuthenticated">Add Project</d-button>
          </div>

          <div class="projects-grid">
            <div class="project-card" v-for="(project, id) in projects" :key="id">
              <a :href="project.link" target="_blank">
                <div class="project-body">
                  <img :src="project.imgLink" alt="Project image background" />
                  <div class="card-overlay">
                    <div class="card-overlay-text">
                      <p>{{ project.description }}</p>
                      <d-button noBorder @click.prevent="goToLink(project.repoLink)">
                        <i class="fab fa-github"></i>
                      </d-button>
                    </div>
                  </div>
                </div>
                <div class="project-name">
                  <h1>{{ project.name }}</h1>
                  <div class="edit-project-wrapper">
                    <d-button noBorder @click.prevent="openProjectEditModal(project.id)"> <i class="fas fa-pen"></i> </d-button>
                    <span>|</span>
                    <d-button noBorder @click.prevent="openDeleteProjectModal(project.id)">
                      <i class="fas fa-trash"></i>
                    </d-button>
                  </div>
                </div>
              </a>
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
import { IS_AUTHENTICATED } from '../../store/actions/authentication-actions';
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
      isAuthenticated: IS_AUTHENTICATED,
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
      window.open(link, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors';
.projects {
  .container {
    .projects-wrapper {
      width: 100%;

      .text-on-front {
        position: absolute;
        font-size: 30px;
        bottom: 16%;
        @media (min-width: 768px) {
          font-size: 40px;
          left: 10%;
        }
        left: 11%;
      }

      .edit-button {
        margin: 0px 0px 30px;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        @media (min-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 400px;
        }
        gap: 20px;
        .project-card {
          width: 100%;
          height: 100%;
          transition: all 0.4s ease-in-out;

          .project-body {
            position: relative;
            height: 80%;

            img {
              object-fit: cover;
              max-height: 100%;
              height: 100%;
              width: 100%;
            }
            h1,
            span {
              position: absolute;
            }

            .card-overlay {
              position: absolute;
              top: 0;
              left: 0;
              background: linear-gradient(to bottom, transparent 0%, black 100%);
              opacity: 0;
              width: 100%;
              height: 100%;
              transition: all 0.4s ease-in-out;
              .card-overlay-text {
                position: absolute;
                bottom: 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                p {
                  margin: 0;
                  flex: 0 0 80%;
                  color: $white;
                }
                .button-wrapper {
                  position: relative;
                  flex: 0 0 20%;
                  align-self: flex-end;
                  text-align: right;
                  bottom: 0;
                }
              }
            }
          }

          .project-name {
            display: flex;
            margin-top: 5px;
            h1 {
              transition: all 0.3s ease-in-out;
              margin: 0;
            }
            .edit-project-wrapper {
              margin-left: auto;
              span,
              .d-button {
                @media (min-width: 768px) {
                  opacity: 0;
                }
              }
              span {
                transition: all 0.3s ease-in-out;
                margin: 0px 10px;
                font-size: 25px;
                font-weight: 200;
              }
              .d-button {
                &:first-child {
                  margin-right: 0;
                }
                &:last-child {
                  margin-right: 10px;
                  color: $error;
                  &:hover {
                    color: $error-hover;
                  }
                }
              }
            }
          }
          &:hover {
            cursor: pointer;
            .card-overlay {
              opacity: 1;
            }
            .project-name {
              h1 {
                color: $primary;
              }
              .d-button {
                opacity: 1;
              }
              span {
                opacity: 1;
              }
            }
          }
        }
      }

      button {
        position: relative;
      }
    }
  }
}
</style>