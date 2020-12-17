<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>Add Projects</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <div class="image-wrapper">
        <img :src="localProfileImage" alt="" v-if="!isLoading" />
      </div>
      <input type="file" @change="onFileChange" />
      <d-spinner :isLoading="isLoading"></d-spinner>
      <p style="color: red" v-if="imageSizeError.hasError">{{ imageSizeError.message }}</p>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" @click="closeModal(true)" :disabled="imageSizeError.hasError">Confirm</d-button>
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(false)">Cancel</d-button>
    </div>
  </d-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { GET_DEVELOPER_PROFILE_IMAGE, SET_DEVELOPER_PROFILE_IMAGE } from '@/store/actions/developer-actions.js';
import { GET_USER } from '@/store/actions/user-actions.js';
import { required } from 'vuelidate/lib/validators';
import alphaLetterValidation from '../../../services/validations';
export default {
  name: 'profile-image-edit-modal',
  props: {
    close: {
      type: Function
    }
  },
  data() {
    return {
      localProfileImage: '',
      isLoading: false,
      imageSizeError: {
        message: '',
        hasError: false
      },
      maxSize: 1024 * 1024
    };
  },
  beforeMount() {
    this.localProfileImage = JSON.parse(JSON.stringify(this.profileImage));
  },
  computed: {
    ...mapGetters({
      user: GET_USER,
      profileImage: GET_DEVELOPER_PROFILE_IMAGE
    })
  },
  methods: {
    ...mapActions({
      setProfileImage: SET_DEVELOPER_PROFILE_IMAGE
    }),
    onFileChange(e) {
      let files = e.target.files;
      this.imageSizeError.message = '';
      this.imageSizeError.hasError = false;

      if (files && files[0]) {
        this.isLoading = true;
        this.file = files[0];

        if (this.file.size > this.maxSize) {
          this.imageSizeError.message = 'Filen är för stor, får inte överstiga 1MB';
          this.imageSizeError.hasError = true;
        }

        let reader = new FileReader();

        reader.onload = (e) => {
          this.localProfileImage = e.target.result;
          this.isLoading = false;
        };

        reader.readAsDataURL(files[0]);
      }
    },

    closeModal(val) {
      if (this.close) {
        if (val) {
          let formData = new FormData();
          formData.append('file', this.file);

          let request = {
            id: this.user.id,
            formData: formData
          };
          this.setProfileImage(request)
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
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';

.image-wrapper {
  height: 200px;
  max-height: 200px;
  img {
    height: 100%;
    border-radius: 50%;
  }
}
</style>