<template>
  <div class="projects">
    <div class="container">
      <div class="row">
        <div class="projects-wrapper">
          <div class="col-md-6">
            <h1 class="text-on-back">02</h1>
            <h2 class="text-on-front" style="">Projects</h2>
          </div>
          <div class="projects-grid">
            <div class="project-card" v-for="(project, id) in selectedProjects" :key="id" @mouseover="showDeleteBtn(id)" @mouseout="hideDeleteButton(id)">
              <span :id="id" @click="onDeleteProject(project)">X</span>
              <h1>{{ project.name }}</h1>
              <img src="https://demos.creative-tim.com/blk-design-system/assets/img/denys.jpg" alt="" />
            </div>
          </div>
          <slot name="edit"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { GET_USER } from '../../store/actions/user-actions';
import { DELETE_DEVELOPER_PROJECT } from '../../store/actions/project-actions';
export default {
  name: 'projects',
  props: {
    selectedProjects: {
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      user: GET_USER
    })
  },
  methods: {
    ...mapActions({
      deleteProject: DELETE_DEVELOPER_PROJECT
    }),
    showDeleteBtn(id) {
      let projectToDeleteDiv = document.getElementById(id);
      projectToDeleteDiv.style.opacity = '1';
    },
    hideDeleteButton(id) {
      let projectToDeleteDiv = document.getElementById(id);
      projectToDeleteDiv.style.opacity = '0';
    },
    onDeleteProject(project) {
      let request = {
        userId: this.user.id,
        id: project.id
      };

      this.deleteProject(request).catch((err) => {
        console.error(err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.projects {
  .container {
    .projects-wrapper {
      width: 100%;
      .text-on-back {
        position: relative;
        font-size: 140px;
        line-height: 1.4em;
        margin-bottom: 15px;
        color: hsla(0, 0%, 100%, 0.2) !important;
        font-weight: 900;
      }
      .text-on-front {
        position: absolute;
        font-size: 40px;
        bottom: 16%;
        left: 10%;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        .project-card {
          position: relative;
          img {
            height: auto;
            width: 100%;
          }
          h1,
          span {
            position: absolute;
          }

          span {
            top: 3%;
            right: 3%;
            transition: all 0.3s ease;
            color: red;
            background: #fff;
            padding: 0px 5px;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
          }
        }
      }

      button {
        position: relative;
      }
    }
  }
}
</style>