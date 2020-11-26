<template>
  <table>
    <thead>
      <tr>
        <th v-for="(header, id) in itemsHeaders" :key="id">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, id) in items" :key="id">
        <td>
          <div class="column-wrapper">
            <p v-for="(fields, id) in itemKeys" :key="id">{{ item[fields.key] }}</p>
          </div>
        </td>
      </tr>
    </tbody>
    <tbody></tbody>
  </table>
</template>

<script>
export default {
  name: 'd-table-new',
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      }
    },
    itemsHeaders: {
      type: Array,
      default: () => {
        return [];
      }
    },
    itemKeys: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  tr {
    border-bottom: 0.0625rem solid $primary;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: rgba(0, 242, 195, 0.1);
      cursor: pointer;
    }
  }
  th {
    width: 100%;
  }
  .column-wrapper {
    display: flex;
    flex-wrap: wrap;
    p {
      &:first-child {
        flex: 0 0 100%;
      }
      margin: 0;
      flex: 0 0 50%;
    }
  }
}
</style>