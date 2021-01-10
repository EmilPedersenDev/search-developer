import {
  GET_DEVELOPER_PROJECT,
  SET_DEVELOPER_PROJECT,
  DELETE_DEVELOPER_PROJECT,
  GET_DEVELOPER_PROJECT_BY_ID,
  UPDATE_DEVELOPER_PROJECT
} from '../actions/project-actions';
import api from '../../api/index';
const state = {
  selectedProjects: []
};

const actions = {
  [SET_DEVELOPER_PROJECT]: ({ commit }, payload) => {
    return api.post(`developer/${payload.id}/project`, payload.project).then((result) => {
      commit(SET_DEVELOPER_PROJECT, result.data.project);
    });
  },
  [UPDATE_DEVELOPER_PROJECT]: ({ commit }, payload) => {
    return api.put(`developer/${payload.id}/project`, payload.project).then((result) => {
      commit(SET_DEVELOPER_PROJECT, result.data.project);
    });
  },
  [DELETE_DEVELOPER_PROJECT]: ({ commit }, payload) => {
    return api.delete(`developer/${payload.userId}/project/${payload.id}`).then((result) => {
      commit(SET_DEVELOPER_PROJECT, result.data.project);
    });
  }
};

const mutations = {
  [SET_DEVELOPER_PROJECT]: (state, payload) => {
    state.selectedProjects = payload;
  }
};

const getters = {
  [GET_DEVELOPER_PROJECT]: (state) => {
    return state.selectedProjects;
  },
  [GET_DEVELOPER_PROJECT_BY_ID]: (state) => (id) => {
    return state.selectedProjects.find((project) => project.id === id);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
