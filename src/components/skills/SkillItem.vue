<template>
  <div class="skill-box">
    <p>{{ skill.name }}</p>
    <p v-if="canRemove" class="remove-skill" @click="onRemoveDeveloperSkills(skill.id)">X</p>
  </div>
</template>

<script>
export default {
  name: 'skill-item',
  props: {
    skill: {
      type: Object
    },
    removeItem: {
      type: Function
    },
    canRemove: {
      type: Boolean,
      default: false
    },
    removeDeveloperSkill: {
      type: Function
    }
  },
  methods: {
    onRemoveDeveloperSkills(id) {
      if (this.removeDeveloperSkill) {
        this.removeDeveloperSkill(id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.skill-box {
  border: 1px solid #000;
  border-radius: 2px;
  background: $secondary;
  padding: 5px;
  display: flex;
  p {
    margin: 0;
    &.remove-skill {
      margin-left: 5px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>