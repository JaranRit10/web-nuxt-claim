const proxyConfig = () => {
  if (process.env.NODE_ENV === 'asp') {
    return {
      '/api/': 'http://192.168.23.201:30001',
    }
  }
  else if (process.env.NODE_ENV === 'kpi') {
    return {
      '/pbermofficeweb/api/': { target: 'http://localhost:8183', pathRewrite: { '^/pbermofficeweb/': '' } },
    }
  }
  else {
    return {
      '/api/': 'http://localhost:8080',
    }
  }
}

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'CLAIM-Middleware',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'loaders.css/loaders.min.css',
    'dual-listbox-vue/dist/dual-listbox.css',
    'vue-select/dist/vue-select.css',
    '@riophae/vue-treeselect/dist/vue-treeselect.css',
    'flag-icon-css/css/flag-icon.min.css',
    'handsontable/dist/handsontable.full.min.css',
    '~/static/vendor/line-awesome/css/line-awesome.min.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/main.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/aspiron.js',
    '~/plugins/util.js',
    '~/plugins/auth.js',
    '~/plugins/axios.js',
    '~/plugins/vuelidate.js',
    '~/plugins/dual-listbox-vue.js',
    '~/plugins/vue-select.js',
    '~/plugins/vue-treeselect.js',
    '~/plugins/vue-handsontable.js',
    '~/plugins/vue-chartjs.js',
    { src: '~/plugins/ckeditor4-vue.js', ssr: false },
    '~/plugins/element-ui.js'
  ],
  /*
   ** Router
   */
  router: {
    // middleware: ['logging']
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Nuxt.js modules configuration
   */
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    config: {
      // https://bootstrap-vue.org/docs/reference/settings#default-bootstrapvue-configuration
    }
  },
  // https://medium.com/@ale_colombo/a-simple-multilanguage-site-with-nuxt-js-and-nuxt-i18n-43cce9f9f0fe
  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js'
      },
      {
        name: 'ไทย',
        code: 'th',
        iso: 'th-TH',
        file: 'th-TH.js'
      }
    ],
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'static/lang/',
    defaultLocale: 'en',
    // defaultLocale: 'th',
    vueI18n: {
      fallbackLocale: 'en'
      // fallbackLocale: 'th'
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en'
    },
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
      syncMessages: false,
      syncRouteParams: false
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: proxyConfig(),
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {}
  }
}
