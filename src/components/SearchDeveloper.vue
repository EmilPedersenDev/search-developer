<template>
  <div class="search-wrapper">
    <h3>Search developer in <span></span></h3>
    <d-search-input placeholder="Search" v-model="query" :focus="activate" :blur="deActivate" @input="searchDeveloper"></d-search-input>
    <transition name="developer-search-dropdown-transition">
      <div v-if="displayDropdownActive" class="px-md-3 developer-search-dropdown-box">
        <ul>
          <li v-for="(developer, index) in filteredDevelopers" :key="index" @click.stop="addDeveloper(developer)" tabindex="0">
            <div class="developer-search-profile">
              <div class="profile-image col-2">
                <img :src="developer.profileImg" alt="" />
              </div>
              <div class="profile-name col-10">
                <p>{{ developer.firstName + ' ' + developer.lastName }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <d-table v-if="hasSelectedDeveloper" :developer="selectedDeveloper" />
  </div>
</template>

<script>
import _ from 'lodash';
import pointerMixin from '@/services/mixins/pointerMixin.js';
export default {
  name: 'search-developer',
  mixins: [pointerMixin],
  data() {
    return {
      query: '',
      active: false,
      selectedDeveloper: {},
      developers: [
        {
          userId: '1',
          profileImg: 'user.svg',
          firstName: 'Emil',
          lastName: 'Nilsson',
          language: ['JavaScript', 'Python', '.Net']
        },
        {
          userId: '1',
          profileImg: 'user.svg',
          firstName: 'Erik',
          lastName: 'Svensson',
          language: ['JavaScript', 'Html', 'Css']
        },
        {
          userId: '1',
          profileImg: 'user.svg',
          firstName: 'Eric',
          lastName: 'Svensson',
          language: ['C++', 'C#']
        },
        {
          userId: '1',
          profileImg: 'user.svg',
          firstName: 'Erip',
          lastName: 'Svensson',
          language: ['Wordpress', 'SQL']
        },
        {
          userId: '2',
          profileImg: 'user.svg',
          firstName: 'Sven',
          lastName: 'Nilsson',
          language: ['Python', 'Django', 'Flask']
        },
        {
          userId: '3',
          profileImg: 'user.svg',
          firstName: 'Nisse',
          lastName: 'Andersson',
          language: ['Java', 'Swift']
        }
      ],
      filteredDevelopers: []
    };
  },
  methods: {
    activate() {
      this.active = true;
    },
    deActivate() {
      this.active = false;
    },
    addDeveloper(developer) {
      this.selectedDeveloper = { ...developer };
    },
    searchDeveloper(query) {
      this.fetchDevelopers(query);
    },
    fetchDevelopers: _.debounce(function (query) {
      if (query.length > 2) {
        // Detta får bli ett api anrop så gförs filtreringen på backend istället.
        let filteredDevelopers = this.developers.filter((developer) => {
          for (let key in developer) {
            if (!['language', 'firstName', 'lastName'].some((item) => item === key)) continue;

            if (typeof developer[key] === 'object') {
              return developer[key].find((language) => {
                if (language.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                  return developer;
                }
              });
            }

            if (typeof developer[key] === 'string') {
              if (developer[key].toLowerCase().indexOf(query.toLowerCase()) > -1) {
                return developer;
              }
            }
          }
        });
        this.filteredDevelopers = filteredDevelopers.sort((a, b) => b.firstName - a.firstName);
      } else {
        console.log('Search query must be longer than 2 letters.');
      }
    })
  },
  computed: {
    displayDropdownActive() {
      return this.active && this.query.length > 2;
    },
    hasSelectedDeveloper() {
      return Object.keys(this.selectedDeveloper).length !== 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.search-wrapper {
  position: relative;
  h3 {
    text-align: left;
    margin-bottom: 30px;
    span {
      &::before {
        content: '';
        animation: wordSwapper infinite 20s;
        color: #00f2c3;
      }
    }
  }
  @media (min-width: 768px) {
    max-width: 500px;
    margin-bottom: 0px;
    padding-top: 80px;
  }
  margin: 0 auto 20px;
  max-width: 400px;
  width: 100%;

  .developer-search-dropdown-box {
    width: 100%;
    border: 1px solid $secondary;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    padding: 0 !important;
    position: absolute;
    z-index: 1001;
    background: $background;
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style-type: none;
        &.st_dropdown_item_highlight {
          background: rgba(225, 78, 202, 0.1);
          outline: none;
        }
        .developer-search-profile {
          display: flex;
          .profile-image {
            img {
              @media (min-width: 500px) {
                padding: 10px;
              }
              @media (max-width: 500px) {
                padding: 5px;
              }
              @media (max-width: 400px) {
                padding: 2px;
              }
              max-width: 100%;
              height: auto;
            }
          }
          .profile-name {
            display: flex;
            align-items: center;
            justify-content: center;
            p {
              margin: 0;
            }
          }
        }
        &:hover {
          background: rgba(225, 78, 202, 0.1);
          cursor: pointer;
        }
      }
    }
  }
}
</style>