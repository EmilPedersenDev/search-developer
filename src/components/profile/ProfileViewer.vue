<template>
  <div class="profile-viewer">
    <div class="page-header">
      <img src="https://demos.creative-tim.com/blk-design-system/assets/img/path4.png" alt="" class="first-background-img" />
      <div class="container profile-header">
        <div class="row">
          <div class="col-md-6 col-lg-6 profile-info">
            <d-button class="edit-personal-btn" noBorder @click="openPersonalEditModal" v-if="isAuthenticated"><i class="fas fa-pen"></i></d-button>
            <h1 class="text-on-back">01</h1>
            <h2 class="text-on-front">{{ developer.firstname + ' ' + developer.lastname }}</h2>
            <p class="user-info-text">
              {{ developer.information }}
            </p>
            <div class="social-sign-ins">
              <d-button class="linked-in" round @click="goToLink(developer.socialLink.linkedIn)"> <i class="fab fa-linkedin-in"></i> </d-button>
              <d-button class="github" round @click="goToLink(developer.socialLink.github)">
                <i class="fab fa-github"></i>
              </d-button>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 profile-card">
            <div class="card">
              <div class="card-img-header">
                <div class="profile-image" :style="setProfileImage"></div>
                <d-button noBorder @click="openProfileImageEditModal"><i class="fas fa-pen"></i></d-button>
              </div>
              <div class="card-body">
                <h2>Skills</h2>
                <skills :developerSkills="skills" />
              </div>
              <d-button class="edit-skills-btn" edit no-border @click="openSkillEditModal" v-if="isAuthenticated">Edit Skills</d-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section id="experience">
      <div class="container">
        <div class="col-md-6">
          <h1 class="text-on-back">02</h1>
          <h2 class="text-on-front" style="">Experience</h2>
        </div>
        <div class="card-body-table">
          <d-button class="table-edit-button" no-border @click="openExperienceEditModal(null)" v-if="isAuthenticated">Add Experience</d-button>
          <d-table-new :itemKeys="experienceFields" :items="experiences" useToggle>
            <d-button slot="edit" slot-scope="{ item }" @click.stop="openExperienceEditModal(item.id)" noBorder v-if="isAuthenticated"><i class="fas fa-pen"></i></d-button>
            <d-button class="delete-btn" slot="delete" slot-scope="{ item }" @click.stop="openConfirmModal(item.id)" noBorder v-if="isAuthenticated"
              ><i class="fas fa-trash"></i
            ></d-button>
            <span slot="description" slot-scope="{ item }">{{ item.description }}</span>
          </d-table-new>
        </div>
      </div>
    </section>
    <section id="projects">
      <projects :selectedProjects="projects">
        <d-button slot="edit" edit no-border @click="openProjectEditModal" v-if="isAuthenticated">Add Project</d-button>
      </projects>
    </section>
    <transition name="modal-fade">
      <personal-edit-modal v-if="showPersonalEditModal" :close="closePersonalEditModal"></personal-edit-modal>
    </transition>

    <transition name="modal-fade">
      <skill-edit-modal v-if="showSkillEditModal" :close="closeSkillEditModal"></skill-edit-modal>
    </transition>

    <transition name="modal-fade">
      <experience-edit-modal v-if="showExperienceEditModal" :close="closeExperienceEditModal" :id="experienceById"></experience-edit-modal>
    </transition>

    <transition name="modal-fade">
      <project-edit-modal v-if="showProjectsEditModal" :close="closeProjectEditModal"></project-edit-modal>
    </transition>

    <transition name="modal-fade">
      <profile-image-edit-modal v-if="showProfileImageEditModal" :close="closeProfileImageEditModal"></profile-image-edit-modal>
    </transition>
    <transition name="modal-fade">
      <confirm-modal v-if="showConfirmModal" :close="closeConfirmModal" :message="deleteExperienceMessage" :id="experienceByIdToDelete"></confirm-modal>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
import { GET_DEVELOPER_SKILLS } from '../../store/actions/skills-actions';
import { GET_DEVELOPER_EXPERIENCE, DELETE_DEVELOPER_EXPERIENCE } from '../../store/actions/experience-actions';
import { GET_DEVELOPER_PROJECT } from '../../store/actions/project-actions';
import { GET_DEVELOPER, SET_DEVELOPER_PROFILE_IMAGE, GET_DEVELOPER_PROFILE_IMAGE } from '../../store/actions/developer-actions';
import { IS_AUTHENTICATED } from '../../store/actions/authentication-actions';
import PersonalEditModal from '../modals/profile-modals/PersonInfoEditModal';
import SkillEditModal from '../modals/profile-modals/SkillEditModal';
import Projects from './Projects';
import ExperienceEditModal from '../modals/profile-modals/ExperienceEditModal';
import ProjectEditModal from '../modals/profile-modals/ProjectEditModal';
import ProfileImageEditModal from '../modals/profile-modals/ProfileImageEditModal';
import ConfirmModal from '../modals/ConfirmModal';
import Skills from '../skills/Skills';
import api from '../../api/index';
import Button from '../../common/Button.vue';
export default {
  components: { Button, PersonalEditModal, SkillEditModal, ExperienceEditModal, ConfirmModal, Skills, Projects, ProjectEditModal, ProfileImageEditModal },
  name: 'profile-viewer',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableItems: [],
      experienceFields: [
        { key: 'company', value: 'Company' },
        { key: 'title', value: 'Title' },
        { key: 'date', value: 'Date' }
      ],
      experienceFieldsAuthenticated: [
        { key: 'edit', value: 'Edit' },
        { key: 'delete', value: 'Delete' }
      ],
      showPersonalEditModal: false,
      showSkillEditModal: false,
      showExperienceEditModal: false,
      showExperience: false,
      showProjectsEditModal: false,
      showProfileImageEditModal: false,
      showConfirmModal: false,
      model: {},
      originalDeveloper: {},
      experienceById: null,
      experienceByIdToDelete: null,
      deleteExperienceMessage: 'Are you sure you want to delete this experience?'
    };
  },

  created() {
    if (!this.isAuthenticated) {
      this.getDeveloper(this.id);
    } else {
      this.setExperienceFields();
    }
  },

  beforeMount() {
    this.showExperience = true;
  },
  computed: {
    ...mapGetters({
      user: GET_USER,
      skills: GET_DEVELOPER_SKILLS,
      experiences: GET_DEVELOPER_EXPERIENCE,
      projects: GET_DEVELOPER_PROJECT,
      developer: GET_DEVELOPER,
      isAuthenticated: IS_AUTHENTICATED,
      profileImage: GET_DEVELOPER_PROFILE_IMAGE
    }),
    isCurrentUser() {
      return this.user.id === this.id;
    },
    hasModelChanged() {
      return JSON.stringify(this.developer) !== JSON.stringify(this.tempDeveloper);
    },
    setProfileImage() {
      return `background-image: url(${this.profileImage ? this.profileImage : '@/assets/male-avatar.svg'})`;
    }
  },
  methods: {
    ...mapActions({
      deleteExperience: DELETE_DEVELOPER_EXPERIENCE,
      getDeveloper: GET_DEVELOPER
    }),
    showExperienceView() {
      this.showSkills = false;
      this.showExperience = true;
    },
    showSkillsView() {
      this.showExperience = false;
      this.showSkills = true;
    },
    setExperience() {
      this.tableItems = this.experienceItems;
    },
    openPersonalEditModal(id) {
      this.showPersonalEditModal = true;
    },
    openExperienceEditModal(id) {
      this.experienceById = id;
      this.showExperienceEditModal = true;
    },
    openSkillEditModal() {
      this.showSkillEditModal = true;
    },
    openProjectEditModal() {
      this.showProjectsEditModal = true;
    },
    openProfileImageEditModal() {
      this.showProfileImageEditModal = true;
    },
    openConfirmModal(val) {
      this.experienceByIdToDelete = val;
      this.showConfirmModal = true;
    },
    closePersonalEditModal(val, personalInfoModel) {
      this.showPersonalEditModal = false;
    },
    closeSkillEditModal() {
      this.showSkillEditModal = false;
    },
    closeExperienceEditModal() {
      this.experienceById = null;
      this.showExperienceEditModal = false;
    },
    closeProjectEditModal() {
      this.showProjectsEditModal = false;
    },
    closeProfileImageEditModal() {
      this.showProfileImageEditModal = false;
    },
    closeConfirmModal() {
      this.experienceByIdToDelete = null;
      this.showConfirmModal = false;
    },
    goToLink(link) {
      window.open(link, '_blank');
    },
    setExperienceFields() {
      this.experienceFields = [...this.experienceFields, ...this.experienceFieldsAuthenticated];
    },
    onDeleteExperience(item) {
      let request = {
        userId: this.user.id,
        id: item.id
      };

      this.deleteExperience(request).catch((err) => {
        console.error(err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.profile-viewer {
  width: 100%;
  height: 100%;
  position: relative;
}

.page-header {
  position: relative;
}
.first-background-img {
  position: absolute;
  opacity: 0.02;
  max-width: 65%;
  width: 65%;
  right: 3%;
  top: 20%;
}

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
}

.profile-header {
  @media (min-width: 768px) {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
  }
  .profile-info {
    position: relative;
    @media (max-width: 768px) {
      margin-bottom: 150px;
    }
    .edit-personal-btn {
      position: absolute;
      top: 8%;
      z-index: 9999;
    }
    .text-on-front {
      @media (min-width: 768px) {
        top: 27%;
        left: 10%;
      }
      top: 51%;
      left: 10%;
    }
    .user-info-text {
      margin-top: -30px;
      color: hsla(0, 0%, 100%, 0.7) !important;
      max-width: 450px;
      line-height: 1.8;
      font-size: 16px;
    }

    .social-sign-ins {
      button {
        &.linked-in {
          background-color: #0e76a8;
          border-color: #0e76a8;
        }
        &.github {
          background-color: #fff;
          border-color: #fff;
          color: #000;
        }
        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}

.profile-card {
  margin-left: auto;
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
  .card {
    width: 100%;
    height: 400px;
    border: 2px solid #344675;
    border-radius: 5px;
    background: transparent;
    .card-img-header {
      position: relative;
      margin: -100px auto 20px auto;
      text-align: center;
      padding: 20px;
      height: 200px;
      max-height: 200px;
      width: 200px;
      .profile-image {
        border-radius: 50%;
        border: 2px solid #344675;
        background-color: #171941;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
      }
      // img {
      //   height: auto;
      //   width: 200px;
      //   border-radius: 50%;
      //   box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
      // }
      .d-button {
        position: absolute;
        top: 10%;
        left: 10%;
      }
    }
    .card-body {
      .card-body-action {
        display: flex;
        justify-content: space-around;
        button {
          flex: 0 0 20%;
        }
      }
    }

    .edit-skills-btn {
      right: 3%;
      bottom: 1%;
    }
  }
}

#experience {
  .text-on-front {
    bottom: 16%;
    left: 10%;
  }
  .delete-btn {
    color: $error;
    &:hover {
      color: $error-hover;
    }
  }
}
#experience,
#projects,
#contact {
  @media (min-width: 768px) {
    margin-bottom: 200px;
  }
  margin-bottom: 50px;
}

.table-edit-button {
  margin-bottom: 8px;
}

#save-button {
  position: fixed;
  text-align: right;
  background: #fff;
  bottom: 0;
  height: 0px;
  transition: all 0.6s ease;
  width: 100%;

  visibility: hidden;

  &.save-button-visible {
    height: 60px;
    visibility: visible;
  }
  .d-button {
    margin-right: 20px;
    margin-top: 12px;
  }
}
</style>