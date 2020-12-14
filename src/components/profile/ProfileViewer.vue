<template>
  <div class="profile-viewer">
    <div class="page-header">
      <img src="https://demos.creative-tim.com/blk-design-system/assets/img/path4.png" alt="" class="first-background-img" />
      <div class="container profile-header">
        <div class="row">
          <div class="col-md-6 col-lg-6 profile-info">
            <h1 class="text-on-back">01</h1>
            <h2 class="text-on-front">{{ developer.firstname + ' ' + developer.lastname }}</h2>
            <p class="user-info-text">
              {{ developer.information }}
            </p>
            <div class="social-sign-ins">
              <d-button> <i class="fab fa-linkedin-in"></i> </d-button>
              <d-button>
                <i class="fab fa-github"></i>
              </d-button>
            </div>
            <d-button secondary edit no-border @click="openPersonalEditModal" v-if="isAuthenticated">Edit</d-button>
          </div>
          <div class="col-md-6 col-lg-4 profile-card">
            <div class="card">
              <div class="card-img-header">
                <img src="user.svg" alt="" />
              </div>
              <div class="card-body">
                <div class="card-body-action">
                  <d-button secondary @click="showExperienceView">Experience</d-button>
                  <d-button secondary @click="showSkillsView">Skills</d-button>
                </div>
                <skills v-if="showSkills" :developerSkills="skills" />
                <div class="card-body-table">
                  <d-table-new v-if="showExperience && experiences.length > 0" :itemKeys="experienceFields" :items="experiences" :itemsHeaders="tableHeaders">
                    <span slot="date" slot-scope="{ item }" @click="onDeleteExperience(item)">X</span>
                  </d-table-new>
                </div>
              </div>
              <d-button secondary edit no-border @click="openExperienceEditModal" v-if="isAuthenticated">{{ showExperience ? 'Add Experience' : 'Add Skills' }}</d-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section id="projects">
      <projects :selectedProjects="projects">
        <d-button slot="edit" secondary edit no-border @click="openProjectEditModal" v-if="isAuthenticated">Edit</d-button>
      </projects>
    </section>
    <!-- <section id="contact">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-6">
            <h1 class="text-on-back">03</h1>
            <h2 class="text-on-front" style="top: 51%">Contact</h2>
          </div>
          <div class="col-md-5"></div>
        </div>
      </div>
    </section> -->
    <!-- <transition name="personal-info-save" mode="out-in"> -->
    <!-- <section id="save-button" :class="{ 'save-button-visible': hasModelChanged }">
      <d-button secondary @click="submit">Save</d-button>
    </section> -->
    <!-- </transition> -->
    <personal-edit-modal v-if="showPersonalEditModal" :close="closePersonalEditModal"></personal-edit-modal>
    <skill-edit-modal v-if="showSkillEditModal" :close="closeSkillEditModal"></skill-edit-modal>
    <experience-edit-modal v-if="showExperienceEditModal" :close="closeExperienceEditModal"></experience-edit-modal>
    <project-edit-modal v-if="showProjectsEditModal" :close="closeProjectEditModal"></project-edit-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
import { GET_DEVELOPER_SKILLS } from '../../store/actions/skills-actions';
import { GET_DEVELOPER_EXPERIENCE, DELETE_DEVELOPER_EXPERIENCE } from '../../store/actions/experience-actions';
import { GET_DEVELOPER_PROJECT } from '../../store/actions/project-actions';
import { GET_DEVELOPER } from '../../store/actions/developer-actions';
import { IS_AUTHENTICATED } from '../../store/actions/authentication-actions';
import PersonalEditModal from '../modals/profile-modals/PersonInfoEditModal';
import SkillEditModal from '../modals/profile-modals/SkillEditModal';
import Projects from './Projects';
import ExperienceEditModal from '../modals/profile-modals/ExperienceEditModal';
import ProjectEditModal from '../modals/profile-modals/ProjectEditModal';
import Skills from '../skills/Skills';
import api from '../../api/index';
import Button from '../../common/Button.vue';
export default {
  components: { Button, PersonalEditModal, SkillEditModal, ExperienceEditModal, Skills, Projects, ProjectEditModal },
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
      tableHeaders: [],
      experienceHeaders: ['Experience'],
      experienceFields: [{ key: 'company' }, { key: 'title' }, { key: 'date' }],
      showPersonalEditModal: false,
      showSkillEditModal: false,
      showExperienceEditModal: false,
      showSkills: false,
      showExperience: false,
      showProjectsEditModal: false,
      model: {},
      originalDeveloper: {}
    };
  },

  created() {
    if (!this.isAuthenticated) {
      this.getDeveloper(this.id);
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
      isAuthenticated: IS_AUTHENTICATED
    }),
    isCurrentUser() {
      return this.user.id === this.id;
    },
    hasModelChanged() {
      return JSON.stringify(this.developer) !== JSON.stringify(this.tempDeveloper);
    }
  },
  methods: {
    ...mapActions({
      deleteExperience: DELETE_DEVELOPER_EXPERIENCE,
      getDeveloper: GET_DEVELOPER
    }),
    addSkill(skill) {
      console.log('add skill');
      api.put(`user/${this.user.id}`, { ...this.user, skillId: skill.id }).then((result) => {
        console.log(result.data);
      });
    },
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
      this.tableHeaders = this.experienceHeaders;
    },
    openPersonalEditModal() {
      this.showPersonalEditModal = true;
    },
    openExperienceEditModal() {
      if (this.showExperience) {
        this.showExperienceEditModal = true;
      } else {
        this.showSkillEditModal = true;
      }
    },
    openProjectEditModal() {
      this.showProjectsEditModal = true;
    },
    closePersonalEditModal(val, personalInfoModel) {
      this.showPersonalEditModal = false;
    },
    closeSkillEditModal() {
      this.showSkillEditModal = false;
    },
    closeExperienceEditModal() {
      this.showExperienceEditModal = false;
    },
    closeProjectEditModal() {
      this.showProjectsEditModal = false;
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

.profile-header {
  padding-top: 15vh;
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
  top: 27%;
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
    &:first-child {
      margin-right: 10px;
    }
  }
}

.profile-card {
  margin: 0 auto !important;
  .card {
    width: 100%;
    height: 400px;
    border: 2px solid #344675;
    border-radius: 5px;
    background: transparent;
    .card-img-header {
      margin: -100px auto 20px auto;
      text-align: center;
      padding: 20px;
      width: 100%;
      img {
        height: auto;
        max-width: 150px;
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
  }
}

#projects,
#contact {
  margin-bottom: 200px;
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