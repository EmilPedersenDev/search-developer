<template>
  <div class="profile-viewer">
    <div class="page-header">
      <img src="https://demos.creative-tim.com/blk-design-system/assets/img/path4.png" alt="" class="first-background-img" />
      <div class="container profile-header">
        <div class="row">
          <div class="col-md-6 col-lg-6 profile-info">
            <h1 class="text-on-back">01</h1>
            <h2 class="text-on-front">{{ model.firstname + ' ' + model.lastname }}</h2>
            <p class="user-info-text">
              {{ model.information }}
            </p>
            <div class="social-sign-ins">
              <d-button> <i class="fab fa-linkedin-in"></i> </d-button>
              <d-button>
                <i class="fab fa-github"></i>
              </d-button>
            </div>
            <d-button secondary edit no-border @click="openPersonalEditModal">Edit</d-button>
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
                <skills v-if="showSkills" :selectedSkills="selectedSkills" />
                <!-- <div class="card-body-table">
                  <d-table-new :itemKeys="experienceFields" :items="tableItems" :itemsHeaders="tableHeaders"></d-table-new>
                </div> -->
              </div>
              <d-button secondary edit no-border @click="openExperienceEditModal">Edit</d-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section id="projects">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-6">
            <img src="https://demos.creative-tim.com/blk-design-system/assets/img/denys.jpg" alt="" />
          </div>
          <div class="col-md-5">
            <h1 class="text-on-back">02</h1>
            <h2 class="text-on-front" style="top: 31%">Projects</h2>
            <p class="user-info-text">
              {{ user.description }} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum autem ipsa temporibus ullam architecto maxime quam eius laboriosam recusandae
              voluptate vero sequi vitae ratione, culpa deleniti. Perspiciatis cum enim dolores.
            </p>
            <d-button secondary>Check Projects</d-button>
            <d-button secondary edit no-border>Edit</d-button>
          </div>
        </div>
      </div>
    </section>
    <section id="contact">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-6">
            <h1 class="text-on-back">03</h1>
            <h2 class="text-on-front" style="top: 51%">Contact</h2>
            <d-button secondary edit no-border>Edit</d-button>
          </div>
          <div class="col-md-5"></div>
        </div>
      </div>
    </section>
    <!-- <transition name="personal-info-save" mode="out-in"> -->
    <section id="save-button" :class="{ 'save-button-visible': hasModelChanged }">
      <d-button secondary @click="submit">Save</d-button>
    </section>
    <!-- </transition> -->
    <personal-edit-modal v-if="showPersonalEditModal" :close="closePersonalEditModal" :model="model"></personal-edit-modal>
    <skill-edit-modal v-if="showSkillEditModal" :close="closeSkillEditModal"></skill-edit-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GET_USER, UPDATE_USER_INFORMATION } from '../../store/actions/user-actions';
import { GET_SKILLS, GET_SELECTED_SKILLS } from '../../store/actions/skills-actions';
import PersonalEditModal from '../modals/profile-modals/PersonInfoEditModal';
import SkillEditModal from '../modals/profile-modals/SkillEditModal';
import Skills from '../skills/Skills';
import api from '../../api/index';
import Button from '../../common/Button.vue';
export default {
  components: { Button, PersonalEditModal, SkillEditModal, Skills },
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
      experienceFields: [{ key: 'company' }, { key: 'title' }, { key: 'time' }],
      experienceItems: [{ company: 'Netflix', title: 'Frontend', time: '2019' }],
      showPersonalEditModal: false,
      showSkillEditModal: false,
      showSkills: false,
      showExperience: false,
      model: {},
      originalModel: {}
    };
  },

  beforeMount() {
    this.model = { ...this.user };
    this.originalModel = { ...this.model };
  },
  computed: {
    ...mapGetters({
      user: GET_USER,
      skills: GET_SKILLS,
      selectedSkills: GET_SELECTED_SKILLS
    }),
    isCurrentUser() {
      return this.user.id === this.id;
    },
    hasModelChanged() {
      return JSON.stringify(this.model) !== JSON.stringify(this.originalModel);
    }
  },
  methods: {
    ...mapActions({
      updateUser: UPDATE_USER_INFORMATION
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
      this.showSkillEditModal = true;
    },
    closePersonalEditModal(val, personalInfoModel) {
      if (val) {
        this.model = { ...this.model, firstname: personalInfoModel.firstname, lastname: personalInfoModel.lastname, information: personalInfoModel.information };
      }
      this.showPersonalEditModal = false;
    },
    closeSkillEditModal() {
      this.showSkillEditModal = false;
    },
    submit() {
      this.updateUser(this.model)
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.showPersonalEditModal = false;
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