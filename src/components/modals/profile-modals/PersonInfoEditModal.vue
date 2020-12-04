<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>Personal Edit</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <div class="row">
        <d-input class="name" inputLabel="Firstname" v-model="personalInfo.firstname">Firstname</d-input>
        <d-input class="name" inputLabel="Lastname" v-model="personalInfo.lastname">Lastname</d-input>
      </div>
      <d-input class="name" inputLabel="Description" v-model="personalInfo.information">Beskrivning</d-input>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" @click="closeModal(true)">Confirm</d-button>
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import model from '../../../services/model/models';
export default {
  name: 'personal-edit-modal',
  props: {
    close: {
      type: Function
    },
    model: {
      type: Object
    }
  },
  mounted() {
    this.personalInfo = { firstname: this.model.firstname, lastname: this.model.lastname, information: this.model.information };
  },
  data() {
    return {
      personalInfo: {}
    };
  },
  methods: {
    closeModal(val) {
      if (this.close) {
        this.close(val, this.personalInfo);
      }
    }
  }
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
}

.row {
  justify-content: space-between;
  .name {
    flex-basis: 48%;
  }
}

.sign-in-footer {
  margin: 60px 0px 30px;
  text-align: center;
  button {
    &:first-child {
      margin-right: 20px;
    }
  }
}
</style>