export default {
  namespaced: true,
  state: {
    isLoading: false,
    apps: []
  },
  getters: {
    microApps: state => {
      return state.apps
    }
  },
  mutations: {
    loadingToggle: (state, loading) => {
      state.isLoading = loading
      console.log("loadingToggle~~~~~~~~~~~~~~~~~~",loading)
    },
    setApps (state, apps) {
      state.apps = apps
    }
  }
}
