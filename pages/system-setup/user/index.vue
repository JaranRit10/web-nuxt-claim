<template>
  <div>
    <HasPerm any="user_menu,user_view">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('user_manage') }}</h1><span> {{ $t('c.list') }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('system_setup') }} / {{ $t('user_manage') }}
        </div>
      </div>

      <!-- Search Criteria -->
      <div class="card">
        <div class="card-header" @click="toggleCollapse('search-criteria-user', $event)">
          <div class="title">
            <i class="las la-angle-up" style="cursor: pointer;"></i> {{ $t('c.filter') }}
          </div>
          <div class="action">
            <button class="btn btn-primary ml-2" @click="search()"><i class="las la-search"></i> {{ $t('c.search') }}</button>
            <button class="btn btn-warning ml-2" @click="clearCriteria()"><i class="las la-undo-alt"></i> {{ $t('c.clear') }}</button>
          </div>
        </div>
        <b-collapse visible id="search-criteria-user">
          <div class="card-body">
            <b-row align-h="around">
              <b-col sm="3" class="form-group">
                <label>{{ $t('user_code') }}</label>
                <b-form-input v-model="criteria.userCode"></b-form-input>
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('user_name') }}</label>
                <b-form-input v-model="criteria.userName"></b-form-input>
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('user_type') }}</label>
                <treeselect v-model="criteria.userType" :options="userTypeList" :placeholder="$t('c.all')" />
              </b-col>
            </b-row>
            <b-row align-h="around">
              <b-col sm="3" class="form-group">
                <label>{{ $t('user_role') }}</label>
                <treeselect v-model="criteria.roleId" :options="roleList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('c.status') }}</label>
                <treeselect v-model="criteria.status" :options="statusList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3" class="form-group"></b-col>
            </b-row>
          </div>
        </b-collapse>
      </div>

      <!-- Search Result -->
      <div class="card">
        <div class="card-body">

          <a-table :id="$route.name"
                   :datasource="datasource"
                   :columns="columns"
                   :paging="paging"
                   @refresh="search"
          >
            <template slot="tableAction">
              <HasPerm any="user_view,user_create">
                <button class="btn btn-success mr-1" @click="gotoCreate()"><i class="las la-plus"></i> {{ $t('c.create') }}</button>
              </HasPerm>
              <HasPerm any="user_delete">
                <button class="btn btn-danger mr-1" @click="deleteData()"><i class="las la-times"></i> {{ $t('c.delete') }}</button>
              </HasPerm>
            </template>
            <template slot="tableBody">
              <tr v-for="obj in datasource.data" :key="obj.userCode">
                <td class="text-center"><b-form-checkbox v-model="obj.checked"></b-form-checkbox></td>
                <td class="text-left">{{ obj.userCode | emptyToDash }}</td>
                <td class="text-left">{{ obj.firstName | emptyToDash }} {{ obj.lastName | emptyToDash }}</td>
                <td class="text-left">{{ obj.firstNameEn | emptyToDash }} {{ obj.lastNameEn | emptyToDash }}</td>
                <td class="text-center">{{ obj.userTypeName | emptyToDash }}</td>
                <td class="text-center">{{ obj.status }} - {{ obj.statusName }}</td>
                <td class="text-center">{{ obj.updatedBy | emptyToDash }}</td>
                <td class="text-center">{{ obj.updatedDate | emptyToDash }}</td>
                <td>
                  <div class="btn-action-gl">
                    <HasPerm any="user_view">
                      <button class="btn btn-sm btn-info" v-b-tooltip:page.bottom.hover="$t('c.view')" @click="gotoView(obj.userCode)"><i class="las la-md la-eye" /></button>
                    </HasPerm>
                    <HasPerm any="user_view,user_update">
                      <button class="btn btn-sm btn-warning" v-b-tooltip:page.bottom.hover="$t('c.edit')" @click="gotoEdit(obj.userCode)"><i class="las la-md la-pen"></i></button>
                    </HasPerm>
                    <HasPerm any="user_resetpassword">
                      <button class="btn btn-sm btn-danger" v-b-tooltip:page.bottom.hover="$t('c.reset_pwd')" @click="resetPwd(obj.userCode)"><i class="las la-md la-wrench"></i></button>
                    </HasPerm>
                    <HasPerm any="user_delete">
                      <button class="btn btn-sm btn-danger" v-b-tooltip:page.bottom.hover="$t('c.delete')" @click="deleteData(obj)"><i class="las la-md la-times"></i></button>
                    </HasPerm>
                  </div>
                </td>
              </tr>
            </template>
          </a-table>

        </div><!-- /card-body -->
      </div>
    </HasPerm>
  </div>
</template>

<script>

import _ from 'lodash'
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'UserList',

  mixins: [CommonMixin],

  async fetch () {
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    this.userTypeList = await this.$axios.$get('/api/dropdown/lov/USER_TYPE')
    this.roleList = await this.$axios.$get('/api/dropdown/getRole')
  },

  data () {
    return {
      criteria: { },
      statusList: [],
      datasource: {},
      roleList: [],
      userTypeList: [],
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      }
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),
    columns () {
      const col = [ { label: 'CHECK_ALL', sortable: false, filterable: false, style: { 'width': '20px' } },
        { label: this.$t('user_code'), field: 'userCode', style: { 'width': '90px', minWidth: '90px' } },
        { label: this.$t('user_name'), field: 'firstName', style: { minWidth: '250px' } },
        { label: this.$t('user_name_en'), field: 'firstNameEn', style: { minWidth: '250px' } },
        { label: this.$t('user_type'), field: 'userType', style: { 'width': '90px', minWidth: '90px' } },
        { label: this.$t('c.status'), field: 'status', style: { width: '80px', minWidth: '80px' } },
        { label: this.$t('c.updated_by'), field: 'updatedBy', style: { width: '90px', minWidth: '90px' } },
        { label: this.$t('c.updated_date'), field: 'updatedDate', style: { width: '140px', minWidth: '140px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { width: '60px', minWidth: '60px' } }]
      return col
    },
  },
  activated () {
    this.search()
  },
  methods: {
    async search () {
      const criteria = { ...this.criteria, ...this.paging }
      const response = await this.$axios.$post('/api/users/findByCriteria', criteria)
      if (response.data) {
        this.datasource = response
      }
    },
    gotoCreate () {
      this.$router.push({
        path: '/system-setup/user/create'
      })
    },
    gotoEdit (userCode) {
      this.$router.push({
        path: `/system-setup/user/edit?id=${userCode}`
      })
    },
    gotoView (userCode) {
      this.$router.push({
        path: `/system-setup/user/view?id=${userCode}`
      })
    },
    resetPwd (userCode) {
      this.msgBoxConfirm(this.$t('c.confirm__reset_pwd')).then(async (ok) => {
        if (ok) {
          try {
            await this.$axios.$get(`/api/users/resetPassword/${userCode}`).then((res) => {
              if (res) {
                this.toast('success', this.$t('c.success__reset_pwd'))
              }
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    deleteData (obj) {
      let dataList = []
      if (obj) {
        dataList = [obj]
      } else {
        dataList = _.filter(this.datasource.data, { checked: true })
      }
      if (_.size(dataList) > 0) {
        this.msgBoxConfirm('delete').then(ok => {
          if (ok) {
            this.$axios.$post('/api/users/delete', dataList).then(res => {
              this.toast('success', this.$t('c.success__delete'))
              this.search()
            })
          }
        })
      } else {
        this.toast('warning', this.$t('c.err__delete_required_one'))
      }
    },
    clearCriteria () {
      this.criteria = {}
    }
  }
}
</script>
