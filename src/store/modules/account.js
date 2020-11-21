import { SET_ACCOUNT, GET_ACCOUNT } from '../actions/account-actions';
import jwtDecode from 'vue-jwt-decode';
import api from '../../api/index';
const state = {
  account: {}
};

const actions = {
  [GET_ACCOUNT]: ({ commit }) => {
    let token = localStorage.getItem('jwt');
    let decodedToken = jwtDecode.decode(token);
    api.get(`user/${decodedToken.id}`).then((result) => {
      commit(SET_ACCOUNT, result.data);
    });
  }
};

const mutations = {
  [SET_ACCOUNT]: (state, payload) => {
    state.account = payload;
  }
};

const getters = {
  [GET_ACCOUNT]: (state) => {
    return state.account;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
