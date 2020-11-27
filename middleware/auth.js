/**
 * Authentication NuxtJS Middleware
 *
 * Use for login/logout user to website
 *
 * @author C.Nuntawat
 */
export default async function ({ app, store, redirect }) {

  const LOGIN_PAGE = '/login'

  // TODO: Navigation Guards by user permission
  // ...
  // ...

  // First open from browser (or web crawler)
  if (process.server) {
    console.log('[middleware/auth] process server')
    // redirect(LOGIN_PAGE)
    // หา loggedInUser จาก server เพื่อ initial ค่าใน store
    const loggedInUser = await app.$auth.getLoggedInUser()

    if (loggedInUser) {
      // ok
    }
    else {
      // not logged in
      console.log('[middleware/auth] not found loggedInUser then goto Login')
      redirect(LOGIN_PAGE)
    }
  }

  // Route change by NUXT
  if (process.client) {
    console.log('[middleware/auth] process client')

    if (store.state.auth.loggedIn) {
      // ok
    }
    else {
      // not logged in
      console.log('[middleware/auth] not found state.auth.loggedIn then goto Login')
      redirect(LOGIN_PAGE)
    }
  }

}
