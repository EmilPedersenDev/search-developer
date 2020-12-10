<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>Personal Edit</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <div class="row">
        <d-input class="name" inputLabel="Firstname" v-model="developer.firstname">Firstname</d-input>
        <d-input class="name" inputLabel="Lastname" v-model="developer.lastname">Lastname</d-input>
      </div>
      <d-input inputLabel="LinkedIn" v-model="developer.socialLink.linkedIn">LinkedIn</d-input>
      <d-input inputLabel="Github" v-model="developer.socialLink.github">Github</d-input>
      <d-input class="name" inputLabel="Description" v-model="developer.information">Beskrivning</d-input>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" @click="closeModal(true)">Save</d-button>
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import { GET_DEVELOPER, SET_DEVELOPER } from '@/store/actions/developer-actions.js';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'personal-edit-modal',
  props: {
    close: {
      type: Function
    }
  },
  beforeMount() {
    this.developer = JSON.parse(JSON.stringify(this.getDeveloper));
  },
  data() {
    return {
      developer: {}
    };
  },
  methods: {
    ...mapActions({
      updateDeveloper: SET_DEVELOPER
    }),
    closeModal(val) {
      if (this.close) {
        if (val) {
          this.updateDeveloper(this.developer)
            .then(() => {
              this.close();
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          this.close();
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getDeveloper: GET_DEVELOPER
    })
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