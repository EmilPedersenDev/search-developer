import { GET_SKILLS, SET_SKILLS, SET_DEVELOPER_SKILLS, GET_DEVELOPER_SKILLS } from '../actions/skills-actions';
import api from '../../api/index';
const state = {
  skills: [],
  selectedSkills: []
};

const actions = {
  [GET_SKILLS]: ({ commit }) => {
    api.get('skills').then((result) => {
      commit(SET_SKILLS, result.data.skills);
    });
  },
  [SET_DEVELOPER_SKILLS]: ({ commit }, payload) => {
    return api.post(`developer/${payload.id}/skills`, payload.skills).then((result) => {
      commit(SET_DEVELOPER_SKILLS, result.data.skills);
    });
  }
};

const mutations = {
  [SET_SKILLS]: (state, payload) => {
    state.skills = payload;
  },
  [SET_DEVELOPER_SKILLS]: (state, payload) => {
    state.selectedSkills = payload;
  }
};

const getters = {
  [GET_SKILLS]: (state) => {
    return state.skills;
  },
  [GET_DEVELOPER_SKILLS]: (state) => {
    return state.selectedSkills;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
