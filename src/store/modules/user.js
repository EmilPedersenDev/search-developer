import { SET_USER, GET_USER, UPDATE_USER_INFORMATION } from '../actions/user-actions';
import { GET_DEVELOPER } from '../actions/developer-actions';
import jwtDecode from 'vue-jwt-decode';
import api from '../../api/index';
const state = {
  user: {}
};

const actions = {
  [GET_USER]: ({ commit, getters, dispatch }) => {
    let token = localStorage.getItem('jwt');
    let decodedToken = jwtDecode.decode(token);
    api.get(`user/${decodedToken.id}`).then((result) => {
      commit(SET_USER, result.data.user);
      dispatch(GET_DEVELOPER, decodedToken.id);
    });
  },
  [UPDATE_USER_INFORMATION]: ({ commit }, user) => {
    api.put(`user/${user.id}/personal-information`, user).then((result) => {
      commit(SET_USER, result.data.user);
    });
  }
};

const mutations = {
  [SET_USER]: (state, payload) => {
    state.user = payload;
  }
};

const getters = {
  [GET_USER]: (state) => {
    return state.user;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
