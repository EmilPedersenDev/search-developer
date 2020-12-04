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
      <skills canRemove :removeSelectedSkill="removeSkill" :selectedSkills="tempSelectedSkills" />
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" @click="closeModal(true)" :disabled="!hasSkillsChanged">Confirm</d-button>
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { SET_SELECTED_SKILLS, GET_SELECTED_SKILLS } from '@/store/actions/skills-actions.js';
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
  mounted() {
    this.originalSelectedSkills = [...this.selectedSkills];
    this.tempSelectedSkills = [...this.selectedSkills];
  },
  data() {
    return {
      filteredSkills: [],
      tempSelectedSkills: [],
      originalSelectedSkills: []
    };
  },
  computed: {
    ...mapGetters({
      selectedSkills: GET_SELECTED_SKILLS
    }),
    hasSkillsChanged() {
      return JSON.stringify(this.tempSelectedSkills) !== JSON.stringify(this.originalSelectedSkills);
    }
  },
  methods: {
    ...mapMutations({
      setSelectedSkills: SET_SELECTED_SKILLS
    }),
    searchSkills(query) {
      if (query.length > 2) {
        api
          .get(`skills/search/?query=${encodeURIComponent(query)}`)
          .then((result) => {
            let filteredSkills = result.data.skill;
            this.filteredSkills = filteredSkills.sort((a, b) => b.name - a.name);
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    },
    addSkill(skill) {
      let isSkillExisting = this.tempSelectedSkills.find((item) => item.name === skill.name);
      if (!isSkillExisting) {
        this.tempSelectedSkills.push(skill);
      }
    },
    removeSkill(id) {
      let updatedSkills = this.tempSelectedSkills.filter((skill) => skill.id !== id);
      this.tempSelectedSkills = updatedSkills;
    },
    closeModal(val) {
      if (this.close) {
        if (val) {
          this.setSelectedSkills(this.tempSelectedSkills);
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