import DeveloperBase from '../../services/model/developerBase.js';
import { GET_DEVELOPER, SET_DEVELOPER, SET_DEVELOPER_PROFILE_IMAGE, GET_DEVELOPER_PROFILE_IMAGE } from '../actions/developer-actions';
import { SET_DEVELOPER_SKILLS } from '../actions/skills-actions';
import { SET_DEVELOPER_EXPERIENCE } from '../actions/experience-actions';
import { SET_DEVELOPER_PROJECT } from '../actions/project-actions';
import api from '../../api/index';

const state = {
  developer: {},
  profileImage: ''
};

const actions = {
  [GET_DEVELOPER]: ({ commit, dispatch }, id) => {
    api.get(`developer/${id}`).then((result) => {
      commit(SET_DEVELOPER, result.data.developer);
      commit(SET_DEVELOPER_SKILLS, result.data.developer.skills);
      commit(SET_DEVELOPER_EXPERIENCE, result.data.developer.experience);
      commit(SET_DEVELOPER_PROJECT, result.data.developer.projects);
      dispatch(GET_DEVELOPER_PROFILE_IMAGE, id);
    });
  },
  [SET_DEVELOPER]: ({ commit }, developer) => {
    api.put(`developer/${developer.id}`, developer).then((result) => {
      commit(SET_DEVELOPER, result.data.updatedDeveloper);
    });
  },
  [SET_DEVELOPER_PROFILE_IMAGE]: ({ commit }, payload) => {
    return api
      .post(`developer/profile-image/${payload.id}`, payload.formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((result) => {
        commit(SET_DEVELOPER_PROFILE_IMAGE, result.data);
      });
  },
  [GET_DEVELOPER_PROFILE_IMAGE]: ({ commit }, id) => {
    api.get(`developer/profile-image/${id}`).then((result) => {
      commit(SET_DEVELOPER_PROFILE_IMAGE, result.data);
    });
  }
};

const mutations = {
  [SET_DEVELOPER]: (state, payload) => {
    state.developer = new DeveloperBase(payload.id, payload.firstname, payload.lastname, payload.information, payload.socialLink);
  },
  [SET_DEVELOPER_PROFILE_IMAGE]: (state, payload) => {
    if (Object.keys(payload).length === 0) return;
    let base64Image = `data:${payload.type};base64,${payload.image}`;
    state.profileImage = base64Image;
  }
};

const getters = {
  [GET_DEVELOPER]: (state) => {
    return state.developer;
  },
  [GET_DEVELOPER_PROFILE_IMAGE]: (state) => {
    return state.profileImage;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
