<template>
  <div class="sidebar text-dark">
    <!-- Sidebar Header -->
    <div class="sidebar__header navbar-dark">
      <div class="navbar-brand">
        <img v-if="!showSidebar && sideBarMini" style="max-width: 28px; height: auto; padding-left: 0.3rem" src="~/assets/img/mini-logo.png" />
        <img src="~/assets/img/kpi-logo.png" class="d-inline-block align-top" v-if="!sideBarMini">
      </div>
    </div>

    <!-- Sidebar Menu -->
    <div class="sidebar__menu" style="padding:0px 0px 3rem 0px">
      <div class="menu">
        <nuxt-link to="/" @click.native="menuClick($event, $t('c.home'))">
          <i class="las la-md la-home"></i> <span>{{ $t('c.home') }}</span>
        </nuxt-link>
      </div>

      <div class="menu">
        <nuxt-link to="/claim-inquiry" @click.native="menuClick($event, $t('claim_inquiry'))">
          <i class="las la-edit"></i> <span>{{ $t('claim_inquiry') }}</span>
        </nuxt-link>
      </div>

      <!-- Interace Log  -->
      <div class="menu" :class="[activeMenu === 'interace-log' ? 'active' : '']" v-b-toggle.menu-interace-log>
        <div>
          <i class="las la-md la-file-download"></i> <span> {{ $t('inteface_log') }} </span>
        </div>
        <i class="las la-angle-left"></i>
      </div>
      <b-collapse id="menu-interace-log" accordion="menu">
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/interace-log/interace-log-with-coreiia" @click.native="menuClick($event, 'inteace-log', 'Interface with Core-IIA')">
              <i :class="[activeSubMenu === 'Interface with Core-IIA' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('interface_with_coreIIA') }}</span>
            </nuxt-link>
          </div>
        </div>
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/interace-log/interace-log-eclaim" @click.native="menuClick($event, 'interace-log', 'Interface with EMCS')">
              <i :class="[activeSubMenu === 'Interface with EMCS' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('interface_with_emcs') }}</span>
            </nuxt-link>
          </div>
        </div>
      </b-collapse>
      <!-- Menu Sureveyor Fee -->
      <div class="menu" :class="{ 'active' : activeMenu === 'surveyor-fee' }" v-b-toggle.menu-surveyor-fee>
        <div>
          <i class="las la-md la-briefcase"></i> <span> {{ $t('surveyor_fee') }} </span>
        </div>
        <i class="las la-angle-left"></i>
      </div>
      <b-collapse id="menu-surveyor-fee" accordion="menu">
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/surveyor-fee/surveyor-fee-config" @click.native="menuClick($event, 'surveyor-fee', 'Surveyor Fee Config')">
              <i :class="[activeSubMenu === 'Surveyor Fee Config' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('surveyor_fee_config') }}</span>
            </nuxt-link>
          </div>
        </div>
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/surveyor-fee/surveyor-fee-list" @click.native="menuClick($event, 'Surveyor Fee Result')">
              <i :class="[activeMenu === 'Surveyor Fee Result' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('surveyor_fee_list') }}</span>
            </nuxt-link>
          </div>
        </div>
      </b-collapse>
      <!-- Menu Report -->
      <div class="menu" :class="[activeMenu === 'report' ? 'active' : '']" v-b-toggle.menu-report>
        <div>
          <i class="las la-md la-file-alt"></i> <span> {{ $t('report_menu') }} </span>
        </div>
        <i class="las la-angle-left"></i>
      </div>
      <b-collapse id="menu-report" accordion="menu">
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/report/daily-notification-report" @click.native="menuClick($event, 'report', 'Notification')">
              <i :class="[activeSubMenu === 'Notification' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('daily_notification_report') }}</span>
            </nuxt-link>
          </div>
        </div>
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/report/daily-notification-reject-on-eclaim" @click.native="menuClick($event, 'report', 'Notification reject on Eclaim')">
              <i :class="[activeSubMenu === 'Notification reject on Eclaim' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('daily_notification_reject_on_eclaim') }}</span>
            </nuxt-link>
          </div>
        </div>
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/report/daily-reserve" @click.native="menuClick($event, 'report', 'reserve')">
              <i :class="[activeSubMenu === 'reserve' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('daily_reserve') }}</span>
            </nuxt-link>
          </div>
        </div>
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/report/daily-exception-report" @click.native="menuClick($event, 'report', 'Exception report')">
              <i :class="[activeSubMenu === 'Exception report' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('daily_exception_report') }}</span>
            </nuxt-link>
          </div>
        </div>
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/report/report-notification-on-processing" @click.native="menuClick($event, 'report', 'Notification on Processing')">
              <i :class="[activeSubMenu === 'Notification on Processing' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('report_notification_on_processing') }}</span>
            </nuxt-link>
          </div>
        </div>
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/report/surveyor-fee" @click.native="menuClick($event, 'report', 'Surveyor Fee')">
              <i :class="[activeSubMenu === 'Surveyor Fee' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('surveyor_fee_report') }}</span>
            </nuxt-link>
          </div>
        </div>
        <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
          <div class="list-group-item">
            <nuxt-link to="/report/surveyor-fee-without-policy" @click.native="menuClick($event, 'report', 'Surveyor Fee without Policy')">
              <i :class="[activeSubMenu === 'Surveyor Fee without Policy' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('surveyor_fee_without_policy') }}</span>
            </nuxt-link>
          </div>
        </div>
      </b-collapse>

      <!-- Master Data -->
      <HasPerm any="masterdata_menu" class="main_memu">
        <div class="menu" :class="[activeMenu === 'master-data' ? 'active' : '']" v-b-toggle.menu-master-data>
          <div>
            <i class="las la-database"></i> <span>{{ $t('master_data') }}</span>
          </div>
          <i class="las la-angle-left"></i>
        </div>
        <b-collapse id="menu-master-data" accordion="menu">
          <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
            <HasPerm any="carbrand_menu">
              <div class="list-group-item">
                <nuxt-link to="/master-data/car-brand" @click.native="menuClick($event, 'master-data', 'Car Brand')">
                  <i :class="[activeSubMenu === 'Car Brand' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('car_brand') }}</span>
                </nuxt-link>
              </div>
            </HasPerm>
            <div class="list-group-item">
              <nuxt-link to="/master-data/surveyor" @click.native="menuClick($event, 'master-data', 'Surveyor')">
                <i :class="[activeSubMenu === 'Surveyor' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('surveyor') }}</span>
              </nuxt-link>
            </div>
            <div class="list-group-item">
              <nuxt-link to="/master-data/staff" @click.native="menuClick($event, 'master-data', 'Staff')">
                <i :class="[activeSubMenu === 'Staff' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('staff') }}</span>
              </nuxt-link>
            </div>
            <div class="list-group-item">
              <nuxt-link to="/master-data/kpi-partner" @click.native="menuClick($event, 'master-data', 'Kpi Partner')">
                <i :class="[activeSubMenu === 'Kpi Partner' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('kpi_partner') }}</span>
              </nuxt-link>
            </div>
            <div class="list-group-item">
              <nuxt-link to="/master-data/lov" @click.native="menuClick($event, 'master-data', 'List of Value')">
                <i :class="[activeSubMenu === 'List of Value' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('lov') }}</span>
              </nuxt-link>
            </div>
          </div>
        </b-collapse>
      </HasPerm>

      <!-- Menu System Setup -->
      <HasPerm any="setting_menu" class="main_memu">
        <div class="menu" :class="[activeMenu === 'system-setup' ? 'active' : '']" v-b-toggle.menu-system-setup>
          <div>
            <i class="las la-md la-cog"></i> <span>{{ $t('system_setup') }}</span>
          </div>
          <i class="las la-angle-left"></i>
        </div>
        <b-collapse id="menu-system-setup" accordion="menu">
          <div class="list-group" :class="[sideBarMini ? 'sidebar-mini-active' : 'sidebar-mini-inactive']">
            <HasPerm any="user_menu">
              <div class="list-group-item">
                <nuxt-link to="/system-setup/user" @click.native="menuClick($event, 'system-setup', 'User Management')">
                  <i :class="[activeSubMenu === 'User Management' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('user_manage') }}</span>
                </nuxt-link>
              </div>
            </HasPerm>
            <HasPerm any="role_menu">
              <div class="list-group-item">
                <nuxt-link to="/system-setup/role" @click.native="menuClick($event, 'system-setup', 'Role Management')">
                  <i :class="[activeSubMenu === 'Role Management' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t(`role_manage`) }}</span>
                </nuxt-link>
              </div>
            </HasPerm>
            <HasPerm any="errmsg_menu">
              <div class="list-group-item">
                <nuxt-link to="/system-setup/error-message" @click.native="menuClick($event, 'system-setup', 'Error Message')">
                  <i :class="[activeSubMenu === 'Error Message' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('error_message') }}</span>
                </nuxt-link>
              </div>
            </HasPerm>
            <HasPerm any="schedulerjob_menu">
              <div class="list-group-item">
                <nuxt-link to="/system-setup/scheduler-job" @click.native="menuClick($event, 'system-setup', 'Scheduler Job')">
                  <i :class="[activeSubMenu === 'Scheduler Job' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('scheduler_job') }}</span>
                </nuxt-link>
              </div>
            </HasPerm>
            <HasPerm any="joblog_menu">
              <div class="list-group-item">
                <nuxt-link to="/system-setup/job-log" @click.native="menuClick($event, 'system-setup', 'Job Log')">
                  <i :class="[activeSubMenu === 'Job Log' ? 'las la-chevron-circle-right' : 'las la-circle']"></i> <span>{{ $t('job_log') }}</span>
                </nuxt-link>
              </div>
            </HasPerm>
          </div>
        </b-collapse>
      </HasPerm>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      activeMenu: '',
      activeSubMenu: ''
    }
  },
  computed: {
    ...mapState({
      showSidebar: state => state.layout.showSidebar,
      sideBarMini: state => state.layout.sideBarMini
    })
  },
  mounted () {
    // auto expand sidebar
    const currentPath = this.$route.fullPath
    document.querySelectorAll('.sidebar a').forEach((el) => {
      const href = el.getAttribute('href')
      if (href != '/' && currentPath.startsWith(href)) {
        let currentPathList = currentPath.split('/')
        el.parentElement.classList.add('active')
        console.log(currentPathList)
        this.activeMenu = currentPathList[1]
        this.activeSubMenu = el.getElementsByTagName('span')[0].innerHTML
        if (el.parentElement.classList.contains('list-group-item')) {
          if (el.parentElement.parentElement.parentElement.parentElement.getAttribute('id') == null) {
            this.$root.$emit('bv::toggle::collapse', el.parentElement.parentElement.parentElement.getAttribute('id'))
          } else {
            this.$root.$emit('bv::toggle::collapse', el.parentElement.parentElement.parentElement.parentElement.getAttribute('id'))
          }
        }
      } else if (href == '/' && currentPath == href) {
        el.parentElement.classList.add('active')
      }
    })
  },
  methods: {
    menuClick (event, menu, subMenu) {
      let currentMenu = menu
      let currentSubMenu = subMenu
      // remove other active

      if (this.activeMenu != currentMenu) {
        this.activeMenu = menu
        document.querySelectorAll('.sidebar .menu.active').forEach((el) => {
          el.classList.remove('active')
        })
      }
      if (this.activeSubMenu != currentSubMenu) {
        this.activeSubMenu = subMenu
        document.querySelectorAll('.sidebar .list-group-item.active').forEach((el) => {
          el.classList.remove('active')
        })
      }

      // add self active
      if (event.target.classList.contains('menu') || event.target.classList.contains('list-group-item') || event.target.classList.contains('nuxt-link-active')) {
        event.target.parentElement.classList.add('active')
      }
      else {
        event.target.parentElement.parentElement.classList.add('active')
      }

      // when click single menu then collapse other
      if (!event.target.parentElement.classList.contains('list-group-item') && !event.target.parentElement.parentElement.classList.contains('list-group-item')) {
        document.querySelectorAll('.sidebar .menu.not-collapsed').forEach((el) => {
          // b-collapse collapse
          if (el.nextElementSibling) {
            this.$root.$emit('bv::toggle::collapse', el.nextElementSibling.getAttribute('id'))
          } else {
            this.$root.$emit('bv::toggle::collapse', el.attributes[4].value)
          }
        })
      }
    },
  }
}
</script>

<style>
  .app__sidebar {
    background-color: #f1f0eb;
    min-height: 100vh;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 14px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  .app__sidebar .list-group-item a {
    padding-left: 45px;
    font-size: 13px;
    font-weight: 500;

    font-size: 13px;
    font-weight: 500;

    font-size: 13px;
    font-weight: 500;
  }
  .sidebar {
    display: none;
    height: 100vh;
    /* background-color: #f9fafc; */
    /* border-right: 1px solid #ddd; */
  }
  .app.show-sidebar .sidebar {
    display: flex;
    flex-direction: column;
  }
  .sidebar__header {
    z-index: 998;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    padding: 0 1rem;
    background-color: #71cff3;

    position: fixed;
    left: 0;
    right: 0;
  }
  .sidebar__menu {
    margin-top: 2.87rem;
  }

  .sidebar .menu {
    /* padding: 10px 10px 10px 15px; */
    background-color: inherit;
    cursor: pointer;
    border: 0;
    position: relative;
    align-items: center !important;
    justify-content: space-between !important;
    display: flex !important;
    white-space: nowrap;
    overflow: hidden;
  }
  .sidebar .menu:focus {
    outline: none;
  }
  .sidebar .list-group-item {
    /* padding: 8px 10px; */
    background-color: inherit;
    cursor: pointer;
    border: 0;
  }
  .sidebar .list-group {
    border-radius: 0;
  }
  .sidebar .list-group .list-group-item {
    padding: 0px;
    background-color: #e6e8e9;
  }
  .app__sidebar a {
    padding: 10px 10px 10px 20px;
    color: #2c2a2a;
    text-decoration: none;
  }

  .menu > div {
    padding: 10px 10px 10px 20px;
  }

  .sidebar .menu .las {
    margin-right: 4px;
  }
  .sidebar .list-group-item .las {
    margin-right: 5px;
  }
  .sidebar .menu:hover,
  .sidebar .menu:hover a {
    color: #1365b6;
    background-color: #e6e8e9;
  }

  /* .app.show-sidebar.collapsed .sidebar,
  .app.show-sidebar.collapsed .sidebar .sidebar__menu,
  .app.show-sidebar.collapsed .sidebar .sidebar__menu .menu,
  .app.show-sidebar.collapsed .sidebar .sidebar__menu .list-group.sidebar-mini-active {
    position: relative;
  } */
  /* .app.show-sidebar.collapsed .sidebar .sidebar__menu {
    position: relative;
  } */
  .app.show-sidebar.collapsed .sidebar .sidebar__menu .menu:hover,
  .app.show-sidebar.collapsed .sidebar .sidebar__menu .list-group.sidebar-mini-active:hover {
    /* color: #1365b6;
    background-color: #e6e8e9; */
    position: absolute;
    z-index: 997;
    /* margin-top: 0; */
    /* top: inherit; */
  }
  .app.show-sidebar.collapsed .sidebar .sidebar__menu .menu:hover + .menu,
  .app.show-sidebar.collapsed .sidebar .sidebar__menu .menu:hover + .collapse,
  .app.show-sidebar.collapsed .sidebar .sidebar__menu .menu:hover + .collapse + .menu,
  /* .app.show-sidebar.collapsed .sidebar .sidebar__menu .list-group.sidebar-mini-active:hover + .list-group.sidebar-mini-active, */
  .app.show-sidebar.collapsed .sidebar .sidebar__menu .collapse:hover + .menu,
  .app.show-sidebar.collapsed .sidebar .sidebar__menu .menu:hover + .collapse + div .menu,
  .app.show-sidebar.collapsed .sidebar .sidebar__menu div.main_memu:hover + div.main_memu {
    margin-top: 41px;
    color: red !important;
    /* position: fixed; */
  }
  /* .app.show-sidebar.collapsed .app__sidebar .menu:hover + .menu,
  .app.show-sidebar.collapsed .app__sidebar .menu:hover + .menu.collapsed,
  .app.show-sidebar.collapsed .app__sidebar .menu:hover + .collapse,
  .app.show-sidebar.collapsed .app__sidebar .collapse:hover + .menu,
  .app.show-sidebar.collapsed .app__sidebar .menu.collapsed:hover + .menu.collapsed {
    margin-top: 41px;
  } */
  /* .menu:hover {
  height: 40px;
  background: #ebeef5;
  box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
} */

.menu.active, .menu.not-collapsed {
    height: 40px;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    background-color: #e6e8e9;

}

  .sidebar .menu.not-collapsed.active,
  .sidebar .menu.active,
  .sidebar .menu.active:hover,
  .sidebar .menu.active:hover a {
    color: #1365b6;
    background-color: #d8d9da;
    /* background-color: #e6e8e9; */
    box-shadow: inset 4px 0px 0px #0747a6;
  }
  .sidebar .collapse .list-group-item.active,
  .sidebar .collapse .list-group-item.active a,
  .sidebar .collapse .list-group-item:hover a,
  .sidebar .collapse .list-group-item:hover {
    color: #1365b6;
  }
  .sidebar .collapse .list-group-item.active {
    margin-top: 0px;
  }

  .sidebar .menu.not-collapsed .la-angle-left:before {
    content: "\f107"; /* la-angle-down */
  }

  .sidebar .menu > a {
    width: 100%;
  }

  .sidebar .list-group-item > a {
    display: inline-block;
    width: 100%;
  }
  /* .la-md {
    font-size: 1.2em;
    line-height: .75em;
    vertical-align: -.06em;
  } */
  .sidebar .las {
    font-size: 1.2em;
  }
  .sidebar .las.la-circle,
  .sidebar .las.la-angle-left {
    font-size: 1em;
  }
</style>
