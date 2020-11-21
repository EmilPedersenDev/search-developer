import { LOGIN, SET_TOKEN, IS_AUTHENTICATED, LOGOUT } from '../actions/authentication-actions';
import { SET_ACCOUNT } from '../actions/account-actions';
import api from '../../api/index';
const state = {
  token: localStorage.getItem('jwt') || ''
};

const actions = {
  [LOGIN]: ({ commit }, loginModel) => {
    return api.post('auth/signin', loginModel).then((result) => {
      commit(SET_ACCOUNT, result.data);
      commit(SET_TOKEN, result.data);
      return result.data;
    });
  },
  [LOGOUT]: async ({ commit }) => {
    await localStorage.removeItem('jwt');
  }
};

const mutations = {
  [SET_TOKEN]: async (state, payload) => {
    await localStorage.setItem('jwt', payload.accessToken);
    state.token = payload.accessToken;
  }
};

const getters = {
  [IS_AUTHENTICATED]: (state) => {
    return !!state.token;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
