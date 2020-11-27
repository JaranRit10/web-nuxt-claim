/**
 * Extending Axios Plugin
 *
 * see: https://axios.nuxtjs.org/extend.html
 *
 * @author C.Nuntawat
 */
import Vue from 'vue'

export default function ({ $axios, store, redirect, app }) {
  const loginPage = '/login'

  $axios.onRequest(config => {
    if (store.state.auth.accessToken) {
      config.headers.Authorization = `Bearer ${store.state.auth.accessToken}`
      config.headers['x-current-locale'] = `${store.state.i18n.locale}`
    }
    console.log('Making request to ' + config.url)

    if (process.client) {
      store.dispatch('layout/beginHttpReq')
    }
  })

  $axios.onResponse(response => {
    if (process.client) {
      store.dispatch('layout/endHttpReq')
    }
  })

  $axios.onError(error => {
    if (process.client) {
      store.dispatch('layout/endHttpReq')
    }

    let status = parseInt(error.response && error.response.status)
    let errorCode
    let errorMsg

    if (!status) {
      // client request fail
      status = 499
    }

    // ถ้า access_token หมดอายุตอนเปิดหน้าจอครั้งแรก จะไป refresh ที่ middleware/auth
    if (process.server && status === 401 && error.response.data && error.response.data.errCode === 'ACCESS_TOKEN_EXPIRED') {
      return {
        status,
        data: error.response.data
      }
    }

    if (status === 599) {
      // application error
      errorCode = error.response.data.errCode
      errorMsg = error.response.data.message
    }
    else if (status === 401 && error.response.data && error.response.data.errCode) {
      // invalid token
      const errCode = error.response.data.errCode

      if (errCode === 'ACCESS_TOKEN_EXPIRED' && !error.config.__isRetryRequest) {
        // refresh token and retry request
        error.config.__isRetryRequest = true
        console.log(`[401] ${errCode} >>>>> refresh token and retry request`)

        return $axios.post('/api/auth/token', { refreshToken: store.state.auth.refreshToken })
          .then(tokenRes => {
            console.log('refresh token status >>>>>', tokenRes.status)

            if (tokenRes.status === 200) {
              // refresh token สำเร็จ
              app.$auth.setToken(tokenRes.data)
              error.config.headers.Authorization = `Bearer ${tokenRes.data.accessToken}`
            }

            // เรียก request เดิมใหม่อีกครั้ง
            return $axios.request(error.config)
          })
      }

      errorCode = `ERROR_STATUS_${status}`
      errorMsg = errCode
    }
    else {
      // other error
      if (error.response && error.response.data && error.response.data.errCode) {
        errorCode = error.response.data.errCode
      }
      else {
        errorCode = `ERROR_STATUS_${status}`
      }

      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message
      }
      else {
        errorMsg = error.message
      }
    }

    // show error message
    if (process.client) {
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/3262
      const vm = new Vue()
      if (status === 401) {
        // session expire
        app.$auth.logout()
        vm.$bvModal.msgBoxOk('Session Expired !', {
          modalClass: 'modal-ok',
          okTitle: 'OK'
        }).then(ok => {
          redirect(loginPage)
        })
      }
      else {
        // request error
        if (errorCode != 'refresh_token_expired' && errorMsg != 'refresh_token_expired') {
          vm.$bvToast.toast(errorMsg, {
            title: errorCode,
            variant: 'danger',
            autoHideDelay: 3000
          })
        }
      }
    }

    // logging to console
    if (error.response && error.response.config) {
      console.warn(`*** FAIL RESPONSE "${error.response.config.url}" ***`, { errorCode, errorMsg })
    }
    else {
      console.warn('*** FAIL REQUEST ***', { errorCode, errorMsg })
    }

    // always return object
    return {
      status,
      data: false
    }
  })
}