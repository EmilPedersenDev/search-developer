import {
  SET_DEVELOPER_EXPERIENCE,
  GET_DEVELOPER_EXPERIENCE,
  DELETE_DEVELOPER_EXPERIENCE,
  GET_DEVELOPER_EXPERIENCE_BY_ID,
  UPDATE_DEVELOPER_EXPERIENCE
} from '../actions/experience-actions';
import api from '../../api/index';
const state = {
  selectedExperiences: []
};

const actions = {
  [SET_DEVELOPER_EXPERIENCE]: ({ commit }, payload) => {
    api.post(`developer/${payload.id}/experience`, payload.experience).then((result) => {
      commit(SET_DEVELOPER_EXPERIENCE, result.data.experiences);
    });
  },
  [UPDATE_DEVELOPER_EXPERIENCE]: ({ commit }, payload) => {
    api.put(`developer/${payload.id}/experience`, payload.experience).then((result) => {
      commit(SET_DEVELOPER_EXPERIENCE, result.data.experiences);
    });
  },
  [DELETE_DEVELOPER_EXPERIENCE]: ({ commit }, payload) => {
    api.delete(`developer/${payload.userId}/experience/${payload.id}`).then((result) => {
      commit(SET_DEVELOPER_EXPERIENCE, result.data.experiences);
    });
  }
};

const mutations = {
  [SET_DEVELOPER_EXPERIENCE]: (state, payload) => {
    let developerExperience = payload.map((experience) => {
      experience.date = new Date(experience.date).getFullYear();
      return experience;
    });
    state.selectedExperiences = developerExperience;
  }
};

const getters = {
  [GET_DEVELOPER_EXPERIENCE]: (state) => {
    return state.selectedExperiences;
  },
  [GET_DEVELOPER_EXPERIENCE_BY_ID]: (state) => (id) => {
    return state.selectedExperiences.find((experience) => experience.id === id);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
