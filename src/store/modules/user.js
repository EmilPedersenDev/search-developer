import { SET_USER, GET_USER } from '../actions/user-actions';
import jwtDecode from 'vue-jwt-decode';
import api from '../../api/index';
const state = {
  user: {}
};

const actions = {
  [GET_USER]: ({ commit }) => {
    let token = localStorage.getItem('jwt');
    let decodedToken = jwtDecode.decode(token);
    api.get(`user/${decodedToken.id}`).then((result) => {
      commit(SET_USER, result.data);
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
