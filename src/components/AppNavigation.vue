<template>
  <nav>
    <div class="left-nav col-4 col-md-4">
      <router-link to="/" class="logo"> &lt; DevQnect /> </router-link>
      <router-link to="/" class="d-block d-sm-none sub-logo"> &lt; DQ /> </router-link>
    </div>
    <div class="right-nav col-8 col-md-8">
      <ul>
        <li class="no-mobile-view">
          <router-link :class="classList" to="/about">About Us</router-link>
        </li>
        <li class="no-mobile-view auth-wrapper" v-if="isAuthenticated">
          <span class="authenticated"><i class="far fa-user-circle"></i>{{ user.firstname }}<i class="fas fa-caret-down"></i></span>
          <div class="profile-dropdown">
            <ul>
              <li><router-link :to="`profile/${user.id}`">Profile</router-link></li>
              <li><router-link to="">Account</router-link></li>
              <li>
                <d-button no-border @click="onShowLogoutModal">Logout</d-button>
              </li>
            </ul>
          </div>
        </li>
        <li class="no-mobile-view" v-else>
          <router-link class="signin" :class="classList" to="/authentication/login">Signin</router-link>
        </li>
        <li class="no-desktop-view">
          <i v-if="!isToggled" class="fas fa-bars" :class="{ 'sub-page': !isHomePage }" @click="toggle(true)"></i>
        </li>
      </ul>
    </div>

    <div :style="menuHeight" :class="[isToggled ? 'dropdown-wrapper-active' : 'dropdown-content-inactive']">
      <i v-if="isToggled" class="fas fa-times" @click="toggle"></i>

      <ul>
        <li @click="toggle">
          <router-link :class="classList" to="/services">Our Work</router-link>
        </li>
        <li @click="toggle">
          <router-link :class="classList" to="/about">About Us</router-link>
        </li>
        <li @click="toggle">
          <router-link :class="classList" to="/contact">Contact</router-link>
        </li>
      </ul>
    </div>
    <logout-modal v-if="showLogoutModal" :close="onCloseLogoutModal"></logout-modal>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { IS_AUTHENTICATED, LOGOUT } from '../store/actions/authentication-actions';
import { GET_USER } from '../store/actions/user-actions';
import LogoutModal from './modals/LogoutModal';
export default {
  name: 'app-navigation',
  data() {
    return {
      loaded: false,
      isToggled: false,
      showLogoutModal: false,
      screenHeight: 0
    };
  },
  components: {
    LogoutModal
  },
  mounted() {
    this.screenHeight = window.innerHeight;

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  watch: {
    screenHeight(val) {
      return val;
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: IS_AUTHENTICATED,
      user: GET_USER
    }),
    classList() {
      return ['app-navigation', 'app-nav-link'];
    },
    isHomePage() {
      return this.$route.path === '/' || this.$route.path == '/contact' || this.$route.path === '/about';
    },
    menuHeight() {
      if (this.isToggled) {
        return `height: ${this.screenHeight}px`;
      } else {
        return `height: 0px`;
      }
    }
  },
  methods: {
    ...mapActions({
      logout: LOGOUT
    }),
    toggle(bool) {
      this.isToggled = !this.isToggled;
    },
    onResize() {
      this.screenHeight = window.innerHeight;
    },
    onShowLogoutModal() {
      this.showLogoutModal = true;
    },
    onCloseLogoutModal(val) {
      if (!val) {
        this.showLogoutModal = false;
      } else {
        this.logout()
          .then(() => {
            this.showLogoutModal = false;
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            if (this.$route.path !== '/') {
              this.$router.push('/');
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
nav {
  width: 100%;
  display: flex;
  position: relative;
  z-index: 3;

  .fas {
    &:hover {
      cursor: pointer;
    }
  }
  .dropdown-wrapper-active {
    position: fixed;
    z-index: 7;
    padding: 30px;
    color: #000;
    background-color: #000;
    width: 100%;
    .fa-times {
      color: #fff;
      float: right;
      font-size: 30px;
    }
    ul {
      position: absolute;
      top: 30%;
      margin-top: -50px;
      margin-left: 30px;
      li {
        margin: 20px 0px;
        a {
          font-size: 24px;
          color: #fff;
        }
      }
    }
  }
  .dropdown-content-inactive {
    display: none;
    .sub-page {
      color: #000;
    }
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  a {
    &.app-nav-link {
      color: #fff;
      font-size: 14px;
      font-weight: 400;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -1px;
        left: 0px;
        background-color: #fff;
        transform: scale(0);
        visibility: hidden;
        transition: all 0.3s ease-in-out 0s;
      }
      &:hover {
        text-decoration: none;
        &::before {
          visibility: visible;
          transform: scale(1);
        }
      }
    }
  }
  .left-nav {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 100px;
    height: 110px;

    @media (max-width: 768px) {
      padding-left: 50px;
    }
    @media (max-width: 575px) {
      padding-left: 33px;
    }
    a {
      color: #fff;
      font-size: 20px;
      display: block;
      &.logo {
        @media (max-width: 576px) {
          display: none;
        }
      }

      &.sub-logo {
        @media (max-width: 450px) {
          font-size: 16px;
        }
      }
    }
  }
  .right-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
    @media (max-width: 768px) {
      padding-right: 40px;
    }
    @media (max-width: 576px) {
      padding-right: 28px;
    }

    .no-mobile-view {
      @media (max-width: 992px) {
        display: none;
      }
    }

    .no-desktop-view {
      @media (min-width: 993px) {
        display: none;
      }
      .sub-page {
        color: black;
      }
    }

    ul {
      display: flex;
      margin: 0;
      & > * {
        font-size: 14px;
      }
      li {
        margin-right: 30px;

        @media (max-width: 780px) {
          margin-right: 20px;
          a {
            font-size: 16px;
          }
        }
        @media (max-width: 576px) {
          margin-right: 10px;
          a {
            font-size: 14px;
          }
        }
        &.auth-wrapper {
          position: relative;
          &:hover {
            .profile-dropdown {
              display: block;
              opacity: 1;
              visibility: visible;
            }
            .fa-caret-down {
              transform: rotate(180deg);
            }
          }
          .authenticated {
            color: #fff;
            &:hover {
              cursor: pointer;
            }

            .fa-caret-down {
              font-size: 14px;
              margin-left: 5px;
              transition: transform 0.3s ease-in-out;
            }
            .fa-user-circle {
              margin-right: 5px;
            }
          }
          .profile-dropdown {
            top: 30px;
            transition: all 0.3s ease-in-out;
            visibility: hidden;
            opacity: 0;
            position: absolute;
            color: #000;
            background: #1f2251;
            box-shadow: 0 15px 35px rgba(50, 50, 93, 0.2), 0 5px 15px rgba(0, 0, 0, 0.17);

            &::before {
              display: inline-block;
              position: absolute;
              width: 0;
              height: 0;
              vertical-align: middle;
              content: '';
              top: -5px;
              left: 10px;
              right: auto;
              color: #1f2251;
              border-bottom: 0.4em solid;
              border-right: 0.4em solid transparent;
              border-left: 0.4em solid transparent;
            }

            ul {
              display: inline-block;
              li {
                & > * {
                  color: $white;
                }

                margin: 0;
                a,
                .d-button {
                  padding: 10px 35px;
                  display: block;
                  width: 100%;
                  transition: all 0.2s ease-in-out;
                  &:hover {
                    cursor: pointer;
                    background: #282c68;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
