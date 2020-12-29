<template>
  <table>
    <thead>
      <tr>
        <th v-for="(header, i) in developerHeaders" :key="i">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(developer, i) in developers" @click="goToProfile(developer.id)" :key="i">
        <td><img src="male-avatar.svg" alt="" /></td>
        <td>{{ developer.firstname + ' ' + developer.lastname }}</td>
        <td>{{ languages(developer) }}</td>
      </tr>
    </tbody>
  </table>
</template>	

<script>
export default {
  name: 'd-table',
  props: {
    developerHeaders: {
      type: Array,
      default: () => {
        return ['Profile', 'Name', 'Skills'];
      }
    },
    developers: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    goToProfile(id) {
      this.$router.push(`/profile/${id}`);
    },
    languages(developer) {
      return developer.skills.reduce((acc, skill, index) => {
        if (developer.skills.length - 1 === index) {
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
  margin-top: 30px;
  width: 100%;

  th,
  td {
    text-align: center;
  }
  tr {
    width: inherit;
    border-bottom: 0.0625rem solid $primary;
    transition: all 0.3s ease-in-out;
    td {
      width: 45%;
      text-align: center;
      &:first-child {
        width: 10%;
        padding: 10px;
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

  thead {
    tr {
      &:hover {
        background: transparent;
        cursor: default;
      }
      th {
        padding-bottom: 10px;
        font-size: 14px;
      }
    }
  }

  tbody {
    tr {
      &:last-child {
        border: none;
      }
    }
  }
}
</style> 