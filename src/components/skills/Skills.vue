<template>
  <div class="skills-wrapper">
    <div class="skills-item" v-for="(skill, id) in selectedSkills" :key="id">
      <skill-item :skill="skill" :canRemove="canRemove" :removeSelectedSkill="removeSelectedSkill"></skill-item>
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
    removeSelectedSkill: {
      type: Function
    },
    selectedSkills: {
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