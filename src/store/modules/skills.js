import { GET_SKILLS, SET_SKILLS, SET_SELECTED_SKILLS, GET_SELECTED_SKILLS } from '../actions/skills-actions';
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
  }
};

const mutations = {
  [SET_SKILLS]: (state, payload) => {
    state.skills = payload;
  },
  [SET_SELECTED_SKILLS]: (state, payload) => {
    state.selectedSkills = payload;
  }
};

const getters = {
  [GET_SKILLS]: (state) => {
    return state.skills;
  },
  [GET_SELECTED_SKILLS]: (state) => {
    return state.selectedSkills;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
