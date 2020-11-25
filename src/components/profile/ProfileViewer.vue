<template>
  <div class="profile-viewer">
    <h1>View profile</h1>
    <ul>
      <li>{{ user.firstname }}</li>
      <li>{{ user.lastname }}</li>
      <li>{{ user.email }}</li>
      <li v-for="(skill, id) in user.skills" :key="id">
        {{ skill.name }}
      </li>
    </ul>
    <ul v-for="(skill, id) in skills" :key="id">
      <li @click="addSkill(skill)">{{ skill.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
import { GET_SKILLS } from '../../store/actions/skills-actions';
import api from '../../api/index';
export default {
  name: 'profile-viewer',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  created() {
    // if (!this.isCurrentUser) {
    // }
  },
  mounted() {
    api.get('users').then((result) => {
      console.log(result.data);
    });
  },
  methods: {
    addSkill(skill) {
      console.log('add skill');
      api.put(`user/${this.user.id}`, { ...this.user, skillId: skill.id }).then((result) => {
        console.log(result.data);
      });
    }
  },
  computed: {
    ...mapGetters({
      user: GET_USER,
      skills: GET_SKILLS
    }),
    isCurrentUser() {
      return this.user.id === this.id;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>