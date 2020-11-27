/**
 * Authentication NuxtJS Plugin
 *
 * Use for login/logout user to website
 *
 * @author C.Nuntawat
 */
export default ({ $axios, store, app, req }, inject) => {
  console.log('inject $auth ...')

  const LOGIN_URL = '/api/auth/login'
  const GET_USER_URL = '/api/auth/getUser'
  const REFRESH_TOKEN_URL = '/api/auth/token'

  inject('auth', {

    async login (username, password) {
      // call login service
      const response = await $axios.post(LOGIN_URL, { username, password })
      if (!response.data) return

      const user = response.data
      const token = user.token

      // call vuex
      store.commit('auth/login', { user, token })

      return true
    },

    logout () {
      // call vuex
      store.commit('auth/logout')

      return true
    },

    getUser () {
      return $axios.get(GET_USER_URL)
    },

    refreshToken () {
      return $axios.post(REFRESH_TOKEN_URL, { refreshToken: store.state.auth.refreshToken })
    },

    setToken (token) {
      store.commit('auth/setToken', token)
    },

    async getLoggedInUser () {
      let loggedInUser = false

      // process server only
      if (process.server) {
        // ตรวจสอบว่ามี cookie: access_token หรือไม่
        // - มี : เรียก api getUser เพื่อ initial ค่า user เข้า store/auth
        // - ไม่มี : redirect to login page
        const accessToken = app.$util.getCookie('access_token', req.headers.cookie)
        const refreshToken = app.$util.getCookie('refresh_token', req.headers.cookie)

        if (accessToken) {
          console.log('[plugins/auth] found access_token then getUser')

          // commit token to store
          this.setToken({ accessToken, refreshToken })

          // getUser
          let response = await this.getUser()

          if (response.status === 401 && response.data.errCode === 'ACCESS_TOKEN_EXPIRED') {
            // access_token หมดอายุ ต้องสั่ง refresh token และเรียก getUser ใหม่อีกครั้ง
            const tokenRes = await this.refreshToken()

            if (tokenRes.status === 200) {
              // refresh token สำเร็จ
              this.setToken(tokenRes.data)

              // เรียก getUser ใหม่อีกครั้ง
              response = await this.getUser()
            }
          }
          console.log('[plugins/auth] getUser response >>>>>', response.status)

          if (response.status == 200) {
            // found logged in user
            let userPerms = {}
            if (response.data.permList) {
              for (const perm of response.data.permList) {
                userPerms[perm] = 1
              }
            }
            loggedInUser = {
              userid: response.data.userCode,
              username: response.data.firstName,
              perms: userPerms
            }

            // call vuex
            store.commit('auth/setUser', loggedInUser)
          }
        }
      }

      return loggedInUser
    },

  })
}