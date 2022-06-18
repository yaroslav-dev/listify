const namespaced = true;

const state = {
  id: null,
  name: null,
  email: null,
  photo: null,
}

const mutations = {
  SET_USER_DATA: (state, payload) => {
    state.id = payload.id;
    state.name = payload.name;
    state.email = payload.email;
    state.photo = payload.photo;
  }
}

const actions = {
  setUserData(context, userData) {
    context.commit('SET_USER_DATA', userData)
  },

}

const getters = {
  getUserId: s => s.id,
  getUserName: s => s.name,
  getUserEmail: s => s.email,
  getUserPhoto: s => s.photo,
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}