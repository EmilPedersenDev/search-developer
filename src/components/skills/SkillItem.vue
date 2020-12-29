<template>
  <div class="skill-box">
    <p>{{ skill.name }}</p>
    <span v-if="canRemove" @click="onRemoveDeveloperSkills(skill.id)">X</span>
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
  position: relative;

  span {
    position: absolute;
    background-color: #fff;
    color: #000;
    border-radius: 50%;
    font-size: 12px;
    top: -10px;
    right: -8px;
    padding: 0px 5px;
    font-weight: 900;
    transition: all 0.15s ease;
    &:hover {
      background-color: rgb(128, 117, 104);
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>