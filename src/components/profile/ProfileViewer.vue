<template>
  <div class="profile-viewer-container">
    <div class="loading-overlay" v-if="isDeveloperStateLoading">
      <div class="overlay-wrapper">
        <d-spinner :isLoading="isDeveloperStateLoading" largeSpinner></d-spinner>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="profile-viewer" v-if="!isDeveloperStateLoading">
        <div class="page-header">
          <img src="https://demos.creative-tim.com/blk-design-system/assets/img/path4.png" alt="" class="first-background-img" />
          <div class="container profile-header">
            <div class="row">
              <div class="col-md-6 col-lg-6 profile-info">
                <d-button class="edit-personal-btn" noBorder @click="openPersonalEditModal" v-if="isAuthenticatedUser"><i class="fas fa-pen"></i></d-button>
                <div class="header-text-wrapper">
                  <h1 class="text-on-back">01</h1>
                  <h2 class="text-on-front" :class="{ adjust: skills.length < 1 }">
                    {{ developer.firstname }} <span class="d-none d-md-inline"> {{ developer.lastname }} </span>
                  </h2>
                </div>
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
                    <d-button noBorder @click="openProfileImageEditModal" v-if="isAuthenticatedUser"><i class="fas fa-pen"></i></d-button>
                  </div>
                  <div class="card-body">
                    <skills :developerSkills="skills" />
                  </div>
                  <d-button class="edit-skills-btn" edit no-border @click="openSkillEditModal" v-if="isAuthenticatedUser">Edit Skills</d-button>
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
              <d-button class="table-edit-button" no-border @click="openExperienceEditModal(null)" v-if="isAuthenticatedUser">Add Experience</d-button>
              <experience-table :itemKeys="experienceFields" :mobileItemKeys="experienceMobileFields" :items="experiences" useToggle>
                <d-button slot="edit" slot-scope="{ item }" @click.stop="openExperienceEditModal(item.id)" noBorder v-if="isAuthenticatedUser"><i class="fas fa-pen"></i></d-button>
                <d-button class="delete-btn" slot="delete" slot-scope="{ item }" @click.stop="openDeleteExperienceModal(item.id)" noBorder v-if="isAuthenticatedUser"
                  ><i class="fas fa-trash"></i
                ></d-button>
                <span slot="description" slot-scope="{ item }">{{ item.description }}</span>
              </experience-table>
            </div>
          </div>
        </section>
        <section id="projects">
          <projects />
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
          <profile-image-edit-modal v-if="showProfileImageEditModal" :close="closeProfileImageEditModal"></profile-image-edit-modal>
        </transition>

        <transition name="modal-fade">
          <confirm-modal v-if="showDeleteExpModal" :isLoading="isLoading" :close="closeDeleteExperience" :message="deleteExperienceMessage"></confirm-modal>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
import { GET_DEVELOPER_SKILLS } from '../../store/actions/skills-actions';
import { GET_DEVELOPER_EXPERIENCE, DELETE_DEVELOPER_EXPERIENCE } from '../../store/actions/experience-actions';
import {
  GET_DEVELOPER,
  SET_DEVELOPER_PROFILE_IMAGE,
  GET_DEVELOPER_PROFILE_IMAGE,
  SET_DEVELOPER_STATE_LOADING,
  IS_DEVELOPER_STATE_LOADING
} from '../../store/actions/developer-actions';
import { IS_AUTHENTICATED, IS_AUTHENTICATED_USER } from '../../store/actions/authentication-actions';
import PersonalEditModal from '../modals/profile-modals/PersonInfoEditModal';
import SkillEditModal from '../modals/profile-modals/SkillEditModal';
import Projects from './Projects';
import ExperienceEditModal from '../modals/profile-modals/ExperienceEditModal';
import ProfileImageEditModal from '../modals/profile-modals/ProfileImageEditModal';
import ConfirmModal from '../modals/ConfirmModal';
import Skills from '../skills/Skills';
import api from '../../api/index';
import ExperienceTable from '../ExperienceTable';
export default {
  components: { PersonalEditModal, SkillEditModal, ExperienceEditModal, ConfirmModal, Skills, Projects, ProfileImageEditModal, ExperienceTable },
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
      experienceMobileFields: [
        { key: 'company', value: 'Company' },
        { key: 'title', value: 'Title' },
        { key: 'date', value: 'Date' },
        { key: 'description', value: 'Description' }
      ],
      experienceFieldsAuthenticated: [
        { key: 'edit', value: 'Edit' },
        { key: 'delete', value: 'Delete' }
      ],
      showPersonalEditModal: false,
      showSkillEditModal: false,
      showExperienceEditModal: false,
      showExperience: false,
      showProfileImageEditModal: false,
      showDeleteExpModal: false,
      model: {},
      originalDeveloper: {},
      experienceById: null,
      experienceByIdToDelete: null,
      deleteExperienceMessage: 'Are you sure you want to delete this experience?',
      isLoading: false
    };
  },

  watch: {
    id: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.setDeveloperStateLoading(true);
          this.getDeveloper(this.id).then(() => {
            if (this.isAuthenticated || this.user.id == this.id) {
              this.setExperienceFields();
            }
          });
        }
      }
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
      developer: GET_DEVELOPER,
      isAuthenticated: IS_AUTHENTICATED,
      isAuthenticatedUser: IS_AUTHENTICATED_USER,
      profileImage: GET_DEVELOPER_PROFILE_IMAGE,
      isDeveloperStateLoading: IS_DEVELOPER_STATE_LOADING
    }),
    isCurrentUser() {
      return this.user.id === this.id;
    },
    hasModelChanged() {
      return JSON.stringify(this.developer) !== JSON.stringify(this.tempDeveloper);
    },
    setProfileImage() {
      return `background-image: url(${this.profileImage ? this.profileImage : `male-avatar.svg`})`;
    }
  },
  methods: {
    ...mapActions({
      deleteExperience: DELETE_DEVELOPER_EXPERIENCE,
      getDeveloper: GET_DEVELOPER
    }),
    ...mapMutations({
      setDeveloperStateLoading: SET_DEVELOPER_STATE_LOADING
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
    openProfileImageEditModal() {
      this.showProfileImageEditModal = true;
    },
    openDeleteExperienceModal(val) {
      this.experienceByIdToDelete = val;
      this.showDeleteExpModal = true;
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
    closeProfileImageEditModal() {
      this.showProfileImageEditModal = false;
    },
    closeDeleteExperience(val) {
      if (!val) {
        this.showDeleteExpModal = false;
        return;
      }

      this.isLoading = true;
      let request = {
        userId: this.user.id,
        id: this.experienceByIdToDelete
      };
      this.deleteExperience(request)
        .then(() => {
          this.experienceByIdToDelete = null;
          this.isLoading = false;
          this.showDeleteExpModal = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.error(err);
        });
    },
    goToLink(link) {
      window.open(link, '_blank');
    },
    setExperienceFields() {
      this.experienceFields = [...this.experienceFields, ...this.experienceFieldsAuthenticated];
      this.experienceMobileFields = [...this.experienceMobileFields, ...this.experienceFieldsAuthenticated];
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/profile-viewer.scss';
</style>