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
            <slot name="edit"></slot>
          </div>

          <div class="projects-grid">
            <div class="project-card" v-for="(project, id) in selectedProjects" :key="id">
              <div class="project-body">
                <img :src="project.imgLink" alt="" />
                <div class="card-overlay">
                  <d-button class="delete-project" @click="onDeleteProject(project)"> X </d-button>

                  <div class="card-overlay-text">
                    <p>{{ project.description }}</p>
                    <div class="button-wrapper">
                      <d-button noBorder>
                        <i class="fab fa-github"></i>
                      </d-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="project-name">
                <h1>{{ project.name }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
import { DELETE_DEVELOPER_PROJECT } from '../../store/actions/project-actions';
export default {
  name: 'projects',
  props: {
    selectedProjects: {
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      user: GET_USER
    })
  },
  methods: {
    ...mapActions({
      deleteProject: DELETE_DEVELOPER_PROJECT
    }),
    onDeleteProject(project) {
      let request = {
        userId: this.user.id,
        id: project.id
      };

      this.deleteProject(request).catch((err) => {
        console.error(err);
      });
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
      .text-on-back {
        position: relative;
        font-size: 140px;
        line-height: 1.4em;
        margin-bottom: 15px;
        color: hsla(0, 0%, 100%, 0.2) !important;
        font-weight: 900;
      }
      .text-on-front {
        position: absolute;
        font-size: 40px;
        bottom: 16%;
        left: 10%;
      }

      .edit-button {
        margin: 0px 0px 30px;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        @media (min-width: 576px) {
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
              .delete-project {
                position: absolute;
                top: 3%;
                right: 2%;
                color: $error;
                padding: 0px 6px;
                font-size: 13px;
                font-weight: 900;
                border-radius: 50%;

                &:hover {
                  color: $error-hover;
                }
              }
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
            height: 20%;
            h1 {
              transition: all 0.3s ease-in-out;
              margin: 0;
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