<template>
  <div class="table-custom-container">
    <div class="desktop-table">
      <table>
        <thead>
          <tr>
            <th v-for="(header, i) in itemKeys" :key="i">
              {{ header.value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, i) in items">
            <tr :key="i" v-if="items.length > 0" @click="toggleRow(i, item.id)" :class="{ 'opened-row-parent': openRows.includes(i) }">
              <td v-for="(header, i) in itemKeys" :key="i">
                <p v-if="item[header.key]">{{ item[header.key] }}</p>
                <slot :name="header.key" :item="item" v-else></slot>
              </td>
            </tr>
            <tr :key="'a' + i" v-if="useToggle && openRows.includes(i)" @click="toggleRow(i, item.id)" class="opened-row-child">
              <td colspan="5">
                <p>
                  <strong> Description: </strong>

                  <slot name="description" :item="item" :index="i"></slot>
                </p>
              </td>
            </tr>
          </template>
          <template v-if="items.length < 1">
            <tr>
              <td colspan="5">
                <img class="empty-img" src="work-remote.svg" alt="" />
                <h4>Nothing to show here</h4>
              </td>
            </tr>
          </template>
        </tbody>
        <tbody></tbody>
      </table>
    </div>
    <div class="mobile-table">
      <div class="mobile-item" v-for="(item, i) in items" :key="i">
        <div class="row" v-for="(header, i) in mobileItemKeys" :key="i">
          <div class="col-5">
            <h6>{{ header.value }}</h6>
          </div>
          <div class="col-7">
            <p v-if="item[header.key]">{{ item[header.key] }}</p>
            <slot :name="header.key" :item="item" v-else></slot>
          </div>
        </div>
      </div>
      <div class="row empty-wrapper" v-if="items.length < 1">
        <div class="col-12">
          <img class="empty-img" src="work-remote.svg" alt="" />
          <h1>Looks pretty empty</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'experience-table',
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      }
    },
    itemKeys: {
      type: Array
    },
    mobileItemKeys: {
      type: Array
    },
    useToggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      openRows: []
    };
  },
  methods: {
    toggleRow(itemIndex, itemId) {
      if (!this.useToggle) return;

      const index = this.openRows.indexOf(itemIndex);

      if (index > -1) {
        this.openRows.splice(index, 1);
      } else {
        this.openRows.push(itemIndex);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.table-custom-container {
  margin-top: 20px;
  .desktop-table {
    display: none;
    @media (min-width: 768px) {
      display: table;
      width: 100%;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
      border-radius: 5px;

      tr {
        border-bottom: 0.0625rem solid $primary;
        transition: all 0.3s ease-in-out;
      }

      th,
      td {
        padding: 12px 7px;
        color: $white;
        text-align: center;
        width: 10%;
      }

      th {
        width: 25%;
        &:first-child {
          width: 40%;
        }
        &:nth-child(2) {
          width: 40%;
        }
      }

      td {
      }

      tbody {
        tr {
          &:hover {
            background: rgba(0, 242, 195, 0.1);
            cursor: pointer;
          }
          &:last-child {
            border: none;
          }
          &.opened-row-parent {
            border: 0.0625rem solid $primary;
            border-bottom: none;
            background: rgba(0, 242, 195, 0.1);
          }
          &.opened-row-child {
            border: 0.0625rem solid $primary;
            border-top: none;
            background: rgba(0, 242, 195, 0.1);
          }
        }
      }
    }
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mobile-table {
    display: block;

    @media (min-width: 768px) {
      display: none;
    }

    .row {
      margin: 5px 0px;
    }

    .mobile-item {
      background: #1f2251;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
      padding: 15px 0px;
      border-radius: 0.2857rem;
      margin-bottom: 10px;
      h6 {
        color: $white;
        font-weight: bold;
      }
    }
  }
}
h4 {
  margin-top: 10px;
}
.empty-img {
  height: 100px;
}
.empty-wrapper {
  text-align: center;
}
</style>