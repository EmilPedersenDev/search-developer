import DeveloperBase from '../../services/model/developerBase.js';
import {
  GET_DEVELOPER,
  SET_DEVELOPER,
  SET_DEVELOPER_PROFILE_IMAGE,
  GET_DEVELOPER_PROFILE_IMAGE,
  SET_DEVELOPER_STATE_LOADING,
  IS_DEVELOPER_STATE_LOADING
} from '../actions/developer-actions';
import { SET_DEVELOPER_SKILLS } from '../actions/skills-actions';
import { SET_DEVELOPER_EXPERIENCE } from '../actions/experience-actions';
import { SET_DEVELOPER_PROJECT } from '../actions/project-actions';
import api from '../../api/index';

const state = {
  developer: {},
  profileImage: '',
  developerStateLoading: true
};

const actions = {
  [GET_DEVELOPER]: ({ commit, dispatch }, id) => {
    return api.get(`developer/${id}`).then((result) => {
      commit(SET_DEVELOPER, result.data.developer);
      commit(SET_DEVELOPER_SKILLS, result.data.developer.skills);
      commit(SET_DEVELOPER_EXPERIENCE, result.data.developer.experience);
      commit(SET_DEVELOPER_PROJECT, result.data.developer.projects);
      return dispatch(GET_DEVELOPER_PROFILE_IMAGE, id)
        .catch((err) => {
          commit(SET_DEVELOPER_PROFILE_IMAGE);
          throw new Error(err);
        })
        .finally(() => {
          commit(SET_DEVELOPER_STATE_LOADING, false);
        });
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
    return api.get(`developer/profile-image/${id}`).then((result) => {
      commit(SET_DEVELOPER_PROFILE_IMAGE, result.data);
    });
  }
};

const mutations = {
  [SET_DEVELOPER]: (state, payload) => {
    state.developer = new DeveloperBase(payload.id, payload.firstname, payload.lastname, payload.information, payload.socialLink);
  },
  [SET_DEVELOPER_PROFILE_IMAGE]: (state, payload) => {
    if (!payload) {
      state.profileImage = '';
      return;
    }
    let base64Image = `data:${payload.type};base64,${payload.image}`;
    state.profileImage = base64Image;
  },
  [SET_DEVELOPER_STATE_LOADING]: (state, payload) => {
    state.developerStateLoading = payload;
  }
};

const getters = {
  [GET_DEVELOPER]: (state) => {
    return state.developer;
  },
  [GET_DEVELOPER_PROFILE_IMAGE]: (state) => {
    return state.profileImage;
  },
  [IS_DEVELOPER_STATE_LOADING]: (state) => {
    return state.developerStateLoading;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
