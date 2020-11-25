import { GET_SKILLS, SET_SKILLS } from '../actions/skills-actions';
import api from '../../api/index';
const state = {
  skills: []
};

const actions = {
  [GET_SKILLS]: ({ commit }) => {
    api.get('skills').then((result) => {
      commit(SET_SKILLS, result.data);
    });
  }
};

const mutations = {
  [SET_SKILLS]: (state, payload) => {
    state.skills = payload.skills;
  }
};

const getters = {
  [GET_SKILLS]: (state) => {
    return state.skills;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
