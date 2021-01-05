<template>
  <nav>
    <div class="left-nav col-4 col-md-6">
      <router-link to="/" class="logo"> <img src="@/assets/DevQnectLogo.png" alt="" /> </router-link>
      <router-link to="/" class="d-block d-sm-none sub-logo"><img src="@/assets/DevMobile.png" alt="" /> </router-link>
    </div>
    <div class="right-nav col-8 col-md-6">
      <ul>
        <li class="no-mobile-view auth-wrapper" v-if="isAuthenticated">
          <span class="authenticated"><i class="far fa-user-circle"></i>{{ user.firstname }}<i class="fas fa-caret-down"></i></span>
          <div class="profile-dropdown">
            <ul>
              <li><router-link :to="`/profile/${user.id}`">Profile</router-link></li>
              <li><router-link to="/account">Account</router-link></li>
              <li>
                <d-button no-border @click="onShowLogoutModal">Logout</d-button>
              </li>
            </ul>
          </div>
        </li>
        <li class="no-mobile-view" v-else>
          <router-link class="signin" :class="classList" to="/authentication/login"><i class="far fa-user-circle"></i>Signin</router-link>
        </li>
        <li class="no-desktop-view">
          <i :class="{ active: !isToggled }" class="fas fa-bars" @click="toggle"></i>
        </li>
      </ul>
      <div class="mobile-nav-overlay" v-if="isToggled" @click="toggle"></div>
      <div class="no-desktop-view mobile-sliding-in-menu" :class="{ active: isToggled }">
        <i class="fas fa-times" @click="toggle"></i>
        <ul>
          <li class="mobile-account" v-if="isAuthenticated">
            <p class="user-name-mobile">
              {{ user.firstname }}<i class="fas fa-plus" :class="{ active: !isMobileAccountToggled }" @click="toggleMobileAccount"></i
              ><i class="fas fa-minus" :class="{ active: isMobileAccountToggled }" @click="toggleMobileAccount"></i>
            </p>

            <ul :class="{ active: isMobileAccountToggled }">
              <li @click="toggle"><router-link :class="classList" :to="`/profile/${user.id}`">Profile</router-link></li>
              <li @click="toggle"><router-link :class="classList" to="/account">Account</router-link></li>
              <li @click="toggle">
                <d-button no-border class="sign-out-mobile app-nav-link" @click="onShowLogoutModal">Logout</d-button>
              </li>
            </ul>
          </li>
          <li @click="toggle"><router-link to="/" :class="classList">Home</router-link></li>
          <li @click="toggle" v-if="!isAuthenticated"><router-link :class="classList" to="/authentication/login">Signin</router-link></li>
        </ul>
      </div>
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
      screenHeight: 0,
      isMobileAccountToggled: false
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
    toggle() {
      this.isToggled = !this.isToggled;
      this.isMobileAccountToggled = false;
    },
    toggleMobileAccount() {
      this.isMobileAccountToggled = !this.isMobileAccountToggled;
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
  height: 10vh;

  .fas {
    &:hover {
      cursor: pointer;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  a,
  .sign-out-mobile {
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
        color: #fff !important;

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

    @media (max-width: 768px) {
      padding-left: 50px;
    }
    @media (max-width: 575px) {
      padding-left: 15px;
    }
    a {
      color: #fff;
      font-size: 20px;
      display: block;
      &.logo {
        @media (max-width: 576px) {
          display: none;
        }
        img {
          width: 200px;
        }
      }

      &.sub-logo {
        @media (max-width: 450px) {
          font-size: 16px;
        }
        img {
          width: 100px;
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

    .signin {
      .far {
        margin-right: 5px;
      }
    }

    .no-desktop-view {
      @media (min-width: 993px) {
        display: none;
      }
      .sub-page {
        color: black;
      }
      .fa-bars {
        transition: all 0.5s ease-in-out;
        opacity: 0;
        font-size: 18px;
        &.active {
          opacity: 1;
          color: #fff;
        }
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

    .mobile-nav-overlay {
      position: fixed;
      height: 100vh;
      width: 50%;
      @media (min-width: 768px) {
        width: 70%;
      }
      top: 0;
      left: 0;
    }

    .mobile-sliding-in-menu {
      position: fixed;
      height: 100vh;
      width: 50%;

      @media (min-width: 768px) {
        width: 30%;
      }
      top: 0;
      right: -50%;
      background-color: $contrast-background;

      color: #fff;
      border-left: 1px solid #000;
      transition: all 0.5s ease-in-out;
      &.active {
        right: 0;
      }

      i {
        text-align: right;
        display: block;
        padding: 20px 20px 0px;
        color: #fff;
        font-size: 18px;
      }
      ul {
        display: block;
        text-align: center;
        li {
          margin: 15px 0px;
          &.mobile-account {
            i {
              display: inline;
              padding: 0px 0px 0px 8px;
              &.fa-plus,
              &.fa-minus {
                font-size: 14px;
                display: none;
                &.active {
                  display: inline;
                }
              }
            }
            ul {
              margin: 0 auto;
              width: 80%;
              background: #272b68;
              visibility: hidden;
              height: 0px;
              transition: all 0.3s ease-in-out;
              border-radius: 8px;
              li {
                transition: all 0.3s ease-in-out;
                visibility: hidden;
                margin: 0px;
                a,
                button {
                  transition: all 0.1s ease-in;
                  visibility: hidden;
                }
                .sign-out-mobile {
                  padding-bottom: 2px;
                }
              }

              &.active {
                visibility: visible;
                height: 110px;
                margin-top: 10px;
                li {
                  visibility: visible;
                  padding: 7px;
                  height: 33.3333%;
                  a,
                  button {
                    visibility: visible;
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
