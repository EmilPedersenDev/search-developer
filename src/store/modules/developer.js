import DeveloperBase from '../../services/model/developerBase.js';
import { GET_DEVELOPER, SET_DEVELOPER } from '../actions/developer-actions';
import { SET_DEVELOPER_SKILLS } from '../actions/skills-actions';
import { SET_DEVELOPER_EXPERIENCE } from '../actions/experience-actions';
import { SET_DEVELOPER_PROJECT } from '../actions/project-actions';
import api from '../../api/index';

const state = {
  developer: {}
};

const actions = {
  [GET_DEVELOPER]: ({ commit }, id) => {
    api.get(`developer/${id}`).then((result) => {
      commit(SET_DEVELOPER, result.data.developer);
      commit(SET_DEVELOPER_SKILLS, result.data.developer.skills);
      commit(SET_DEVELOPER_EXPERIENCE, result.data.developer.experience);
      commit(SET_DEVELOPER_PROJECT, result.data.developer.projects);
    });
  },
  [SET_DEVELOPER]: ({ commit }, developer) => {
    api.put(`developer/${developer.id}`, developer).then((result) => {
      commit(SET_DEVELOPER, result.data.updatedDeveloper);
    });
  }
};

const mutations = {
  [SET_DEVELOPER]: (state, payload) => {
    state.developer = new DeveloperBase(payload.id, payload.firstname, payload.lastname, payload.information, payload.socialLink);
  }
};

const getters = {
  [GET_DEVELOPER]: (state) => {
    return state.developer;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
