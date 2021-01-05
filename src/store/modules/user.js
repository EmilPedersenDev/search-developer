import { SET_USER, GET_USER, UPDATE_USER_NAME, SET_USER_NAME, SET_USER_EMAIL, UPDATE_USER_EMAIL, UPDATE_USER_PASSWORD } from '../actions/user-actions';
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
      // dispatch(GET_DEVELOPER, decodedToken.id);
    });
  },
  [UPDATE_USER_NAME]: ({ commit }, user) => {
    return api.put(`user/${user.id}/name`, user.model).then((result) => {
      commit(SET_USER_NAME, result.data.user);
    });
  },
  [UPDATE_USER_EMAIL]: ({ commit }, user) => {
    return api.put(`user/${user.id}/email`, user.model).then((result) => {
      commit(SET_USER_EMAIL, result.data.user);
    });
  },
  [UPDATE_USER_PASSWORD]: ({ commit }, user) => {
    return api.put(`user/${user.id}/password`, user.model).then((result) => {
      return result;
    });
  }
};

const mutations = {
  [SET_USER]: (state, payload) => {
    state.user = payload;
  },
  [SET_USER_NAME]: (state, payload) => {
    if (Object.keys(payload).length === 0) return;
    state.user.firstname = payload.firstname;
    state.user.lastname = payload.lastname;
  },
  [SET_USER_EMAIL]: (state, payload) => {
    if (Object.keys(payload).length === 0) return;
    state.user.email = payload.email;
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
