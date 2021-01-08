<template>
  <div class="skills-wrapper">
    <h2 v-if="!modalView">Skills</h2>
    <div class="skills-item-wrapper">
      <div class="skills-item" v-for="(skill, id) in developerSkills" :key="id">
        <skill-item :skill="skill" :canRemove="canRemove" :removeDeveloperSkill="removeDeveloperSkill"></skill-item>
      </div>
    </div>
    <div class="no-skills-wrapper" v-if="developerSkills.length < 1 && !modalView">
      <img src="blank-canvas.svg" alt="" />
      <h6>Nothing added so far</h6>
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
    },
    modalView: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SkillItem
  }
};
</script>

<style lang="scss" scoped>
.skills-wrapper {
  margin-top: 15px;

  h2 {
    margin: 0;
  }
  .skills-item-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .skills-item {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .no-skills-wrapper {
    width: 100%;
    text-align: center;

    img {
      max-height: 100px;
    }
  }
}
</style>