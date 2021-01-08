<template>
  <d-modal :onClose="close">
    <div slot="modal-header" class="modal-custom-header">
      <h1>Edit Profile Image</h1>
    </div>
    <div slot="modal-body" class="modal-custom-body">
      <div class="image-wrapper">
        <div class="profile-image" :style="profileImageDisplay" v-if="!isLoading"></div>
      </div>
      <d-file-upload @change="onFileChange" />
      <d-spinner :isLoading="isLoading"></d-spinner>
      <p style="color: red" v-if="imageSizeError.hasError">{{ imageSizeError.message }}</p>
      <d-error :error="error"></d-error>
    </div>
    <div slot="modal-footer" class="modal-custom-footer">
      <d-button class="col-4 col-sm-3" secondary @click="closeModal(true)" :disabled="isDisabled">Confirm <d-spinner :isLoading="isAsyncLoading" buttonSpinner /> </d-button>
      <d-button class="col-4 col-sm-3" transition @click="closeModal(false)">Cancel</d-button>
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
      isAsyncLoading: false,
      imageSizeError: {
        message: '',
        hasError: false
      },
      maxSize: 1024 * 1024,
      error: {}
    };
  },
  beforeMount() {
    this.localProfileImage = JSON.parse(JSON.stringify(this.profileImage));
  },
  computed: {
    ...mapGetters({
      user: GET_USER,
      profileImage: GET_DEVELOPER_PROFILE_IMAGE
    }),
    profileImageDisplay() {
      return `background-image: url(${this.localProfileImage ? this.localProfileImage : 'male-avatar.svg'})`;
    },
    hasImageChanged() {
      return JSON.stringify(this.profileImage) !== JSON.stringify(this.localProfileImage);
    },
    isDisabled() {
      if (!this.hasImageChanged) {
        return true;
      } else if (this.imageSizeError.hasError) {
        return true;
      } else {
        return false;
      }
    }
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
          this.imageSizeError.message = 'The file is too big, cannot exceed 1MB';
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
          this.isAsyncLoading = true;
          let formData = new FormData();
          formData.append('file', this.file);

          let request = {
            id: this.user.id,
            formData: formData
          };
          this.setProfileImage(request)
            .then(() => {
              this.error = {};
              this.close();
            })
            .catch((err) => {
              this.error = err.response.data;
              console.error(err);
            })
            .finally(() => {
              this.isAsyncLoading = false;
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
  width: 200px;
  margin: 0 auto;
  .profile-image {
    border: 2px solid #344675;
    border-radius: 50%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
}
</style>