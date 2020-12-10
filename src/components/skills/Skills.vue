<template>
  <div class="skills-wrapper">
    <div class="skills-item" v-for="(skill, id) in developerSkills" :key="id">
      <skill-item :skill="skill" :canRemove="canRemove" :removeDeveloperSkill="removeDeveloperSkill"></skill-item>
    </div>
  </div>
</template>

<script>
import SkillItem from './SkillItem';
export default {
  name: 'skills',
  props: {
    canRemove: {
      type: Boolean,
      default: false
    },
    removeDeveloperSkill: {
      type: Function
    },
    developerSkills: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    SkillItem
  }
};
</script>

<style lang="scss" scoped>
.skills-wrapper {
  display: flex;
  margin-top: 10px;
  .skills-item {
    margin-right: 5px;
  }
}
</style>