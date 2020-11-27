/**
 * Utility NuxtJS Plugin
 *
 * Common utility function
 *
 * @author C.Nuntawat
 */
class Util {

  // https://www.w3schools.com/js/js_cookies.asp
  getCookie (cname, documentCookie) {
    const name = cname + '='
    const decodedCookie = decodeURIComponent(documentCookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  setCookie (cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    const expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }

  // https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie
  removeCookie (cookieName) {
    document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/'
  }

  // https://www.samanthaming.com/tidbits/33-how-to-compare-2-objects/
  compareObject (obj1, obj2) {
    return Object.entries(obj1).toString() === Object.entries(obj2).toString()
  }

  cloneObject (obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}

export default (context, inject) => {
  console.log('inject $util ...')
  inject('util', new Util())
}
