<template>
  <nav>
    <div class="left-nav col-4 col-md-4">
      <router-link to="/" class="logo"> &lt; DevQnect /> </router-link>
      <router-link to="/" class="d-block d-sm-none sub-logo">
        &lt; DQ />
      </router-link>
    </div>
    <div class="right-nav col-8 col-md-8">
      <ul>
        <li class="no-mobile-view">
          <router-link :class="classList" to="/about">About Us</router-link>
        </li>
        <li class="no-mobile-view">
          <button
            type="button"
            class="btn btn-light"
            :class="classList"
            @click="signIn"
          >
            Sign in
          </button>
        </li>
        <li class="no-desktop-view">
          <i
            v-if="!isToggled"
            class="fas fa-bars"
            :class="{ 'sub-page': !isHomePage }"
            @click="toggle(true)"
          ></i>
        </li>
      </ul>
    </div>
    <div
      :style="menuHeight"
      :class="[
        isToggled ? 'dropdown-wrapper-active' : 'dropdown-content-inactive',
      ]"
    >
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
    <sign-in-modal
      v-if="showSignInModal"
      :close="onCloseSignInModal"
    ></sign-in-modal>
  </nav>
</template>

<script>
import SignInModal from "./modals/SignInModal";
export default {
  name: "app-navigation",
  data() {
    return {
      loaded: false,
      isToggled: false,
      screenHeight: 0,
      showSignInModal: false,
    };
  },
  components: {
    SignInModal,
  },
  mounted() {
    this.screenHeight = window.innerHeight;

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  watch: {
    screenHeight(val) {
      return val;
    },
  },
  computed: {
    classList() {
      return [
        "app-navigation",
        this.isHomePage && "start-site",
        !this.isHomePage && "sub-page-link",
      ];
    },
    isHomePage() {
      return (
        this.$route.path === "/" ||
        this.$route.path == "/contact" ||
        this.$route.path === "/about"
      );
    },
    menuHeight() {
      if (this.isToggled) {
        return `height: ${this.screenHeight}px`;
      } else {
        return `height: 0px`;
      }
    },
  },
  methods: {
    toggle(bool) {
      this.isToggled = !this.isToggled;
    },
    onResize() {
      this.screenHeight = window.innerHeight;
    },
    signIn() {
      this.showSignInModal = true;
    },
    onCloseSignInModal() {
      this.showSignInModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  display: flex;
  position: relative;
  z-index: 3;

  .fas {
    width: 20px;
    font-size: 30px;
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
          &.sub-page-link {
            color: #fff;
            &:hover {
              &::before {
                background-color: #fff;
              }
            }
          }
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
    color: #001e3c;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -1px;
      left: 0px;
      background-color: black;
      transform: scale(0);
      visibility: hidden;
      transition: all 0.3s ease-in-out 0s;
    }
    &.start-site {
      color: #fff;
      &:hover {
        &::before {
          background-color: #fff;
        }
      }
    }

    &.no-underline {
      &:hover {
        &::before {
          visibility: hidden;
        }
      }
    }

    &:hover {
      text-decoration: none;
      &::before {
        visibility: visible;
        transform: scale(1);
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
      }
    }
  }
}
</style>
