<template>
  <div class="home">
    <div class="page-header">
      <img
        src="https://demos.creative-tim.com/blk-design-system/assets/img/path4.png"
        alt=""
        class="first-background-img"
      />
      <img
        src="https://demos.creative-tim.com/blk-design-system/assets/img/path5.png"
        alt=""
        class="second-background-img"
      />
      <div class="content-center">
        <div class="header-info row row-grid justify-content-between">
          <div class="col-md-6 header-info-search">
            <div class="px-md-3 search-wrapper">
              <h3>Search developer in <span></span></h3>
              <d-search-input
                placeholder="Search"
                v-model="test"
              ></d-search-input>
            </div>
          </div>
          <div class="col-md-6 header-info-description">
            <div class="px-md-5">
              <hr class="line-success" />
              <h3>Qnect</h3>
              <p>
                Qnect with developers all over the world. DevQnect enables us to
                collaborate with competent professionals in respective field.
              </p>
              <ul class="list-unstyled mt-5">
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div class="icon icon-success mb-2">
                      <i class="fas fa-hands-helping"></i>
                    </div>
                    <div class="ml-3">
                      <h6>Seek help for your next project</h6>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div class="icon icon-success mb-2">
                      <i class="fas fa-lightbulb"></i>
                    </div>
                    <div class="ml-3">
                      <h6>Get career inspiration</h6>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div class="icon icon-success mb-2">
                      <i class="fas fa-users"></i>
                    </div>
                    <div class="ml-3">
                      <h6>Experienced developers for your scope</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      test: "",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/animations.scss";
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
          .search-wrapper {
            h3 {
              text-align: left;
              margin-bottom: 30px;
              span {
                &::before {
                  content: "";
                  animation: wordSwapper infinite 20s;
                  color: #00f2c3;
                }
              }
            }
            @media (min-width: 768px) {
              position: absolute;
              top: 30%;
              left: 50%;
              transform: translate(-50%, -30%);
              max-width: 500px;
              margin-bottom: 0px;
            }
            margin: 0 auto 20px;
            max-width: 400px;
            width: 100%;
          }
        }
        .header-info-description {
          text-align: left;
          display: flex;
          justify-content: center;
          @media (max-width: 768px) {
            margin-top: 20px;
          }
          .px-md-5 {
            max-width: 400px;
            @media (min-width: 768px) {
              margin-left: auto;
              margin-right: 10px;
            }
          }
          h3 {
            margin-bottom: 30px;
          }
          hr {
            &.line-success {
              background-color: #00f2c3;
              width: 10%;
              height: 1px;
              border-radius: 3px;
              margin-left: 0;
            }
          }
          i {
            color: #00f2c3;
          }
        }
      }
    }
  }
}
</style>
