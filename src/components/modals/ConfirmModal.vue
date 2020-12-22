<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>{{ message }}</h1>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(true)">Confirm <d-spinner :isLoading="isLoading" buttonSpinner></d-spinner> </d-button>
      <d-button class="col-4 col-sm-3" @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
import { DELETE_DEVELOPER_EXPERIENCE } from '../../store/actions/experience-actions';

export default {
  name: 'confirm-modal',
  props: {
    close: {
      type: Function
    },
    message: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapGetters({
      user: GET_USER
    })
  },
  methods: {
    ...mapActions({
      deleteExperience: DELETE_DEVELOPER_EXPERIENCE
    }),
    closeModal(val) {
      if (this.close) {
        if (val) {
          this.isLoading = true;
          let request = {
            userId: this.user.id,
            id: this.id
          };
          this.deleteExperience(request)
            .then(() => {
              this.isLoading = false;
              this.close();
            })
            .catch((err) => {
              this.isLoading = false;
              console.error(err);
            });
        } else {
          this.close(val);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';

h1 {
  padding: 10px 0px;
  font-size: 24px;
}
p {
  color: #6c757d;
  font-weight: 300;
}
</style>