<template>
  <div class="app" :class="{ 'show-sidebar not-collapsed': !sideBarMini,'show-sidebar collapsed': sideBarMini }">
    <div class="app__container">
      <div class="app__header">
        <AppHeader />
      </div>
      <b-container fluid class="app__body" id="page">
        <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
      </b-container>
      <div class="app__footer">
        <AppFooter />
      </div>
      <!-- loading spinner -->
      <div class="loader" :class="{ 'show': showLoading }">
        <div class="ball-pulse-sync">
          <div /><div /><div />
        </div>
      </div>
    </div>
    <div class="app__sidebar">
      <AppSidebar />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppHeader from '~/components/layouts/AppHeader.vue'
import AppSidebar from '~/components/layouts/AppSidebar.vue'
import AppFooter from '~/components/layouts/AppFooter.vue'

export default {
  middleware: ['auth'],
  components: {
    AppHeader,
    AppSidebar,
    AppFooter
  },
  fetch ({ store, params }) {
    store.dispatch('layout/showSidebar', true)
    this.toggleSidebar()
  },
  computed: {
    ...mapState({
      showSidebar: state => state.layout.showSidebar,
      showLoading: state => state.layout.showLoading,
      sideBarMini: state => state.layout.sideBarMini
    })
  },
  mounted () {
    this.$nextTick(function () {
      this.onResize()
    })
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    ...mapActions({
      toggleSidebar: 'layout/toggleSidebar',
      mouseOverSidebar: 'layout/mouseOverSidebar',
      mouseLeaveSidebar: 'layout/mouseLeaveSidebar'
    }),
    onResize () {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

      if (this.showSidebar && width < 768) {
        this.toggleSidebar()
      }
      else if (!this.showSidebar && width >= 768) {
        this.toggleSidebar()
      }

      this.$root.$emit('app::resize')
    }
  },
}
</script>

<style>
.app {
 /* padding-left: 0px; */
  display: flex;
  width: 100%;
}
.app__container {
  flex: 1;
  order: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.app__header {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  flex: 0;
  box-shadow: inset 8px 0 8px -8px rgba(0,0,0,.25);
}
.app__body {
  width: auto;
  margin-top: 2.88rem;
  /* margin-top: 4em; */
  margin-right: 0em;
  padding-bottom: 3em;
  flex: 1;
  background: #f8f7f7;
  /* box-shadow: inset 8px 0 8px -8px rgba(0,0,0,.25); */
}
.app__footer {
  position: fixed;
  z-index: 990;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  flex: 0;
  box-shadow: inset 8px 0 8px -8px rgba(0,0,0,.25);
}
.app__sidebar {
  z-index: 998;
  position: fixed;
  flex: 0 0 auto;
  width: 0px;
  /* width: 250px; */
  order: 1;
  transition: all 0.3s ease-in-out;
}

.app.show-sidebar.collapsed .app__sidebar .sidebar__header {
  padding: 0 0 0 0.5rem;
}
.app.show-sidebar.not-collapsed .app__sidebar {
  width: 250px;
  -webkit-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
}
.app.show-sidebar.collapsed .app__sidebar {
  width: 50px;
  -webkit-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
}
.app.show-sidebar.not-collapsed .app__header {
  padding-left: 250px;
  -webkit-transition: padding-left 0.3s ease-in-out;
  transition: padding-left 0.3s ease-in-out;
}
.app.show-sidebar.collapsed .app__header {
  padding-left: 50px;
  -webkit-transition: padding-left 0.3s ease-in-out;
  transition: padding-left 0.3s ease-in-out;
}
.app.show-sidebar.not-collapsed .app__body, .app.show-sidebar.not-collapsed .app__footer {
  margin-left: 250px;
  -webkit-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
}
.app.show-sidebar.collapsed .app__body, .app.show-sidebar.collapsed .app__footer {
  margin-left: 50px;
  -webkit-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
}
/* .app.show-sidebar.not-collapsed .app__footer {
  margin-left: 250px;
  -webkit-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
}
.app.show-sidebar.collapsed .app__footer {
  margin-left: 50px;
  -webkit-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
} */

.loader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
  background: rgba(0, 0, 0, 0.2);
}
.loader.show {
  display: block;
}

.app.show-sidebar.collapsed .app__sidebar {
  width: 50px !important;
}

.app.show-sidebar.collapsed .app__sidebar .menu a span,
.app.show-sidebar.collapsed .app__sidebar .menu span,
.app.show-sidebar.collapsed .app__sidebar .menu > i,
.app.show-sidebar.collapsed .app__sidebar .sidebar .list-group-item span,
.app.show-sidebar.collapsed .app__sidebar .sidebar .list-group.sidebar-mini-active > .list-group-item span {
  display: none;
}

.app.show-sidebar.collapsed .sidebar .list-group-item a,
.app.show-sidebar.collapsed .sidebar .list-group.sidebar-mini-active > .list-group-item a {
  padding-left: 22px;
}

.app.show-sidebar.collapsed .menu:hover a span,
.app.show-sidebar.collapsed .menu:hover span,
.app.show-sidebar.collapsed .menu:hover > .collapse,
.app.show-sidebar.collapsed .collapse .list-group.sidebar-mini-active:hover .list-group-item a span {
  display: inline;
  padding-left: 15px;
}

.menu.active, .menu.not-collapsed {
  height: 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
}

.app.show-sidebar.collapsed .menu:hover,
.app.show-sidebar.collapsed .list-group.sidebar-mini-active:hover {
  width: 250px;
}

.app.show-sidebar.collapsed .sidebar .sidebar__menu .list-group.sidebar-mini-active:hover {
  left: 5px;
  background: #ebeef5;
  box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
}

/* .app.show-sidebar.collapsed .app__sidebar:hover,
.app.show-sidebar.collapsed .app__sidebar:hover .menu a span,
.app.show-sidebar.collapsed .app__sidebar:hover .menu.collapsed span,
.app.show-sidebar.collapsed .app__sidebar:hover .menu.not-collapsed span,
.app.show-sidebar.collapsed .app__sidebar:hover .collapse.show .list-group.sidebar-mini-active a span {
  width: 250px !important;
  z-index: 998;
  display: inline;
} */

.app.show-sidebar.not-collapsed > .app__sidebar > .menu > a > span,
.app.show-sidebar.not-collapsed > .app__sidebar > .menu > span,
.app.show-sidebar.not-collapsed > .app__sidebar > .menu > .las.la-angle-left,
.app.show-sidebar.not-collapsed > .app__sidebar > span,
.app.show-sidebar.not-collapsed > .app__sidebar > .sidebar > .sidebar__header > b {
  opacity: 1;
  transition: opacity 1s ease-in;
}

/* .app.show-sidebar.collapsed .sidebar .list-group.sidebar-mini-active > .list-group-item:hover span,
.app.show-sidebar.collapsed .sidebar .list-group-item:hover span {
  display: inline;
} */

/* .app.show-sidebar.collapsed .sidebar .list-group.sidebar-mini-active > .list-group-item:hover,
.app.show-sidebar.collapsed .sidebar .list-group-item:hover {
  width: 250px;
  background: #ebeef5;
  box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
} */


.loader.show > div {
  position: relative;
  top: 45%;
  width: 100%;
  text-align: center;
}
.loader.show > div > div {
  background-color: #40C0F0;
}

/* @media only screen and (min-width: 768px) {
  .app.show-sidebar {
    padding-left: 250px;
    transition: all 0.3s ease-in-out;
  }
} */
</style>
