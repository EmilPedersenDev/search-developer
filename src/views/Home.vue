<template>
  <div class="home">
    <div class="page-header">
      <img src="https://demos.creative-tim.com/blk-design-system/assets/img/path4.png" alt="" class="first-background-img" />
      <img src="https://demos.creative-tim.com/blk-design-system/assets/img/path5.png" alt="" class="second-background-img" />
      <div class="content-center">
        <div class="header-info row row-grid justify-content-between">
          <div class="col-md-6 header-info-search">
            <search-developer />
          </div>
          <div class="col-md-6 header-info-description">
            <landing-info-text />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchDeveloper from '../components/SearchDeveloper.vue';
import LandingInfoText from '../components/LandingInfoText.vue';

export default {
  name: 'Home',
  data() {
    return {};
  },
  mounted() {
    console.log('Mounted');
  },
  components: {
    SearchDeveloper,
    LandingInfoText
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/animations.scss';
.home {
  width: 100%;

  .page-header {
    min-height: 100vh;
    // max-height: 999px;
    padding: 0;
    color: #fff;
    @media (min-width: 768px) {
      position: absolute;
    }
    top: 0;
    overflow: hidden;
    width: inherit;

    .first-background-img {
      position: absolute;
      opacity: 0.02;
      max-width: 50%;
      width: 65%;
      right: 0;
      top: 20%;
    }

    .second-background-img {
      position: absolute;
      opacity: 0.01;
      max-width: 25%;
      width: 30%;
      top: 15%;
      left: 3%;
    }

    .content-center {
      @media (min-width: 768px) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: 0px;
      }
      margin-top: 20px;
      z-index: 2;
      text-align: center;
      color: #fff;
      padding: 0 15px;
      width: 100%;
      max-width: 1400px;
      .header-info {
        .header-info-search {
          position: relative;
        }
        .header-info-description {
          text-align: left;
          display: flex;
          justify-content: center;
          @media (max-width: 768px) {
            margin: 20px 0px 100px;
          }
        }
      }
    }
  }
}
</style>
