<template>
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
</template>

<script>
export default {
  name: "landing-info-text",
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
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
</style>