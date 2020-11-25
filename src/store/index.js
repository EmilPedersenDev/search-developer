import Vue from 'vue';
import Vuex from 'vuex';

// modules
import authentication from './modules/authentication';
import user from './modules/user';
import skills from './modules/skills';
import { GET_SKILLS } from './actions/skills-actions';

export const LOAD_DEPENDENCIES = 'LOAD_DEPENDENCIES';
export const SET_DEPENDENCIES = 'SET_DEPENDENCIES';
export const IS_LOADED = 'IS_LOADED';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoaded: false
  },
  actions: {
    [LOAD_DEPENDENCIES]: ({ commit, dispatch }) => {
      let promises = [];

      promises.push(dispatch(GET_SKILLS));

      Promise.all(promises).finally(() => {
        commit(SET_DEPENDENCIES, true);
      });
    }
  },
  mutations: {
    [SET_DEPENDENCIES]: (state, payload) => {
      state.isLoaded = payload;
    }
  },
  getters: {
    [IS_LOADED]: (state) => {
      return state.isLoaded;
    }
  },
  modules: {
    authentication,
    user,
    skills
  }
});
