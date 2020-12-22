<template>
  <div class="file-input col-5">
    <input type="file" id="file" class="file" @change="onChange" />
    <label for="file">Select file</label>
  </div>
</template>

<script>
export default {
  name: 'd-file-upload',
  methods: {
    onChange(e) {
      this.$emit('change', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.file-input {
  margin: 40px auto 0px;
  .file {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
  }

  input:hover + label {
    transform: translateY(-2px);
  }

  label {
    display: block;
    position: relative;
    padding: 5px 10px;
    border-radius: 25px;
    background: linear-gradient(40deg, #ff6ec4, #7873f5);
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s ease-out;
  }
}
</style>