<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>Add Skills</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <multi-select :filteredItems="filteredSkills" @input="searchSkills" :selectItem="addSkill">
        <template slot="dropdown-content" slot-scope="{ item }">
          <div class="dropdown-skill-item">
            <p>{{ item.name }}</p>
          </div>
        </template>
      </multi-select>
      <skills canRemove :removeDeveloperSkill="removeSkill" :developerSkills="tempDeveloperSkills" />
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(true)" :disabled="!this.hasSkillsChanged">Confirm</d-button>
      <d-button class="col-4 col-sm-3" @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { SET_DEVELOPER_SKILLS, GET_DEVELOPER_SKILLS } from '@/store/actions/skills-actions.js';
import { GET_DEVELOPER } from '@/store/actions/developer-actions.js';
import Skills from '@/components/skills/Skills.vue';
import MultiSelect from '@/components/search/MultiSelect.vue';
import api from '@/api/index';
export default {
  name: 'skill-edit-modal',
  props: {
    close: {
      type: Function
    }
  },
  components: {
    Skills,
    MultiSelect
  },
  beforeMount() {
    this.originalDeveloperSkills = [...this.developerSkills];
    this.tempDeveloperSkills = [...this.developerSkills];
  },
  data() {
    return {
      filteredSkills: [],
      tempDeveloperSkills: [],
      originalDeveloperSkills: []
    };
  },
  computed: {
    ...mapGetters({
      developerSkills: GET_DEVELOPER_SKILLS,
      developer: GET_DEVELOPER
    }),
    hasSkillsChanged() {
      return JSON.stringify(this.tempDeveloperSkills) !== JSON.stringify(this.originalDeveloperSkills);
    }
  },
  methods: {
    ...mapActions({
      setDeveloperSkills: SET_DEVELOPER_SKILLS
    }),
    searchSkills(query) {
      if (query.length > 2) {
        api
          .get(`skills/search/?query=${encodeURIComponent(query)}`)
          .then((result) => {
            let filteredSkills = result.data.skills;
            this.filteredSkills = filteredSkills.sort((a, b) => b.name - a.name);
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    },
    addSkill(skill) {
      let isSkillExisting = this.tempDeveloperSkills.find((item) => item.name === skill.name);
      if (!isSkillExisting) {
        this.tempDeveloperSkills.push(skill);
      }
    },
    removeSkill(id) {
      let updatedSkills = this.tempDeveloperSkills.filter((skill) => skill.id !== id);
      this.tempDeveloperSkills = updatedSkills;
    },
    closeModal(val) {
      if (this.close) {
        if (val) {
          let request = {
            id: this.developer.id,
            skills: this.tempDeveloperSkills
          };
          this.setDeveloperSkills(request).then(() => {
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