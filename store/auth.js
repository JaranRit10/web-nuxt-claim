export const state = () => ({
  // TODO: initial from localStorage ?
  loggedIn: false,
  user: {},
  accessToken: '',
  refreshToken: '',
})

export const getters = {
  userPerms (state) {
    if (state.user.perms) {
      return state.user.perms
    }
    else {
      return []
    }
  }
}

export const mutations = {
  login (state, { user, token }) {
    // save to vuex
    state.loggedIn = true
    state.user = user

    // save to local storage
    localStorage.setItem('access_token', token.accessToken)
    localStorage.setItem('refresh_token', token.refreshToken)

    // save to cookie
    this.$util.setCookie('access_token', token.accessToken)
    this.$util.setCookie('refresh_token', token.refreshToken)
  },

  logout (state) {
    // remove from vuex
    state.loggedIn = false
    state.user = {}

    if (process.client) {
      // remove from local storage
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      // remove from cookie
      this.$util.removeCookie('access_token')
      this.$util.removeCookie('refresh_token')
    }
  },

  setUser (state, user) {
    // save to vuex
    state.loggedIn = true
    state.user = user
  },

  setToken (state, { accessToken, refreshToken }) {
    // save to vuex
    state.accessToken = accessToken
    state.refreshToken = refreshToken
  },
}
