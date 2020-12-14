<template>
  <table>
    <tbody>
      <tr @click="goToProfile">
        <td><img src="user.svg" alt="" /></td>
        <td>{{ developer.firstname + ' ' + developer.lastname }}</td>
        <td>{{ languages }}</td>
      </tr>
    </tbody>
  </table>
</template>	

<script>
export default {
  name: 'd-table',
  props: {
    developer: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    goToProfile() {
      this.$router.push(`/profile/${this.developer.id}`);
    }
  },
  computed: {
    languages() {
      return this.developer.skills.reduce((acc, skill, index) => {
        if (this.developer.skills.length - 1 === index) {
          acc += `${skill.name}`;
        } else {
          acc += `${skill.name}, `;
        }
        return acc;
      }, '');
    }
  }
};
</script>	

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
table {
  margin-top: 20px;
  width: 100%;
  tr {
    width: inherit;
    border: 0.0625rem solid $primary;
    border-right: none;
    border-left: none;
    transition: all 0.3s ease-in-out;
    td {
      &:first-child {
        width: 40px;
        padding: 5px;
        img {
          height: auto;
          max-width: 100%;
        }
      }
    }
    &:hover {
      background: rgba(0, 242, 195, 0.1);
      cursor: pointer;
    }
  }
}
</style> 