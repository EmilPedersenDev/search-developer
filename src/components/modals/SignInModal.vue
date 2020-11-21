<template>
  <d-modal :onClose="close">
    <div class="sign-in-header">
      <h1>Sign in With</h1>
      <div class="social-sign-ins">
        <d-button>
          <i class="fab fa-google"></i>
        </d-button>
        <d-button>
          <i class="fab fa-github"></i>
        </d-button>
      </div>
      <p>Or sign in with credentials</p>
    </div>
    <div class="sign-in-body">
      <d-input inputLabel="Email" />
      <d-input inputLabel="Password" />
      <span @click="toRegister">Create Account</span>
    </div>
    <div class="sign-in-footer">
      <d-button class="col-4 col-sm-3" primary>Sign in</d-button>
    </div>
  </d-modal>
</template>

<script>
export default {
  name: 'sign-in-modal',
  props: {
    close: {
      type: Function
    }
  },
  data() {
    return {};
  },
  methods: {
    toRegister() {
      if (this.$route.path === '/authentication/register') {
        this.close();
      } else {
        this.$router.push('/authentication/register').then(() => {
          this.close();
        });
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.sign-in-header {
  color: #fff;
  text-align: center;
  h1 {
    padding: 10px 0px;
    font-size: 30px;
  }
  p {
    color: #6c757d;
    font-weight: 300;
  }

  .social-sign-ins {
    margin: 20px 0px;
    .d-button {
      &:first-child {
        margin-right: 5px;
      }
      i {
        color: $secondary;
      }
    }
  }
}

.sign-in-body {
  padding: 0 40px;
  span {
    color: $secondary;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      text-decoration: none;
      color: #fff;
    }
  }
}

.sign-in-footer {
  margin: 60px 0px 30px;
  text-align: center;
}
</style>