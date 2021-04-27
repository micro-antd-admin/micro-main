export default {
  namespaced: true,
  state: {
    apps: []
  },
  getters: {
    
  },
  mutations: {
    setApps (state, apps) {
      state.apps = apps
    }
  }
}
