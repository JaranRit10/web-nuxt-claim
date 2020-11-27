<template>
  <div>
    <HasPerm any="role_menu,role_view">
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('role_manage') }}</h1><span> {{ $t(`c.list`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }}  / {{ $t('system_setup') }} / {{ $t('role_manage') }}
        </div>
      </div>

      <div class="card">
        <div class="card-header" @click="toggleCollapse('search-criteria-role', $event)">
          <div class="title">
            <i class="las la-angle-up" style="cursor: pointer;"></i> {{ $t('c.filter') }}
          </div>
          <div class="action">
            <button class="btn btn-primary ml-2" @click="search()">
              <i class="las la-search"></i> <span>{{ $t('c.search') }}</span>
            </button>
            <button class="btn btn-warning ml-2" @click="clear()">
              <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
            </button>
          </div>
        </div>

        <b-collapse visible id="search-criteria-role">
          <div class="card-body">
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('role_code') }}</label>
                <b-form-input v-model="criteria.roleCode" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('role_name') }}</label>
                <b-form-input v-model="criteria.roleName" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('role_group') }}</label>
                <treeselect v-model="criteria.roleGroupId" :options="roleGroupList" :placeholder="$t('c.all')" />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('c.status') }}</label>
                <treeselect v-model="criteria.status" :options="statusList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('user_code') }}</label>
                <b-form-input v-model="criteria.userCode" />
              </b-col>
              <b-col sm="3"></b-col>
            </b-row>
          </div>
        </b-collapse>
      </div>

      <div class="card">
        <div class="card-body">
          <a-table :id="$route.name"
                   :datasource="datasource"
                   :columns="columns"
                   :paging="paging"
                   @refresh="search"
          >
            <template slot="tableAction">
              <HasPerm any="role_create">
                <button class="btn btn-success mr-1" @click="gotoCreate()"><i class="las la-plus"></i> {{ $t('c.create') }}</button>
              </HasPerm>
              <HasPerm any="role_delete">
                <button class="btn btn-danger mr-1" @click="deleteRole()"><i class="las la-times"></i> {{ $t('c.delete') }}</button>
              </HasPerm>
            </template>

            <template slot="tableBody">
              <tr v-for="v in datasource.data" :key="v.id">
                <td class="text-center"><b-form-checkbox v-model="v.checked" /></td>
                <td class="text-left">{{ v.roleCode }}</td>
                <td class="text-left">{{ v.roleName | emptyToDash }}</td>
                <td class="text-center">{{ v.status }} - {{ v.statusName }}</td>
                <td class="text-center">{{ v.updatedBy | emptyToDash }}</td>
                <td class="text-center">{{ v.updatedDate | emptyToDash }}</td>
                <td>
                  <div class="btn-action-gl">
                    <HasPerm any="role_view">
                      <button class="btn btn-sm btn-info" @click="gotoView(v)" v-b-tooltip:page.bottom.hover="$t('c.view')"><i class="las la-md la-eye"></i></button>
                    </HasPerm>
                    <HasPerm any="role_update">
                      <button class="btn btn-sm btn-warning" @click="gotoEdit(v)" v-b-tooltip:page.bottom.hover="$t('c.edit')"><i class="las la-md la-pen"></i></button>
                    </HasPerm>
                    <HasPerm any="role_delete">
                      <button class="btn btn-sm btn-danger" @click="deleteRole(v)" v-b-tooltip:page.bottom.hover="$t('c.delete')"><i class="las la-md la-times"></i></button>
                    </HasPerm>
                  </div>
                </td>
              </tr>
            </template>
          </a-table>
        </div>
      </div>
    </HasPerm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'RoleList',
  mixins: [CommonMixin],

  async fetch () {
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    this.roleGroupList = await this.$axios.$get('/api/dropdown/getRoleGroup')
  },

  data () {
    return {
      criteria: {},
      statusList: [],
      roleGroupList: [],
      datasource: { data: [], total: 0 },
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
      const col = [
        { label: 'CHECK_ALL', sortable: false, filterable: false, style: { 'width': '20px' } },
        { label: this.$t('role_code'), field: 'roleCode', style: { minWidth: '200px' } },
        { label: this.$t('role_name'), field: 'roleName', style: { minWidth: '200px' } },
        { label: this.$t('c.status'), field: 'status', style: { 'width': '80px', minWidth: '90px' } },
        { label: this.$t('c.last_updated_by'), field: 'updatedBy', style: { 'width': '120px', minWidth: '120px' } },
        { label: this.$t('c.last_updated_date'), field: 'updatedDate', style: { 'width': '130px', minWidth: '130px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { width: '50px', minWidth: '50px' } }
      ]
      return col
    }
  },
  activated () {
    this.search()
  },
  methods: {
    async search () {
      let criteria = { ...this.criteria, ...this.paging }
      this.datasource = await this.$axios.$post('/api/roles/findByCriteria', criteria)
    },
    clear () {
      this.criteria = {}
    },
    deleteRole (v) {
      let arr = []
      if (!v) {
        arr = this.datasource.data.filter(v => v.checked == true)
      } else {
        arr.push(v)
      }
      if (arr.length > 0) {
        this.msgBoxConfirm('delete').then(ok => {
          if (ok) {
            this.$axios.$post('/api/roles/delete', arr).then(res => {
              this.toast('success', this.$t('c.success__delete'))
              this.search()
            })
          }
        })
      } else {
        this.toast('warning', this.$t('c.err__delete_required_one'))
      }
    },
    gotoCreate () {
      this.$router.push({ path: '/system-setup/role/create' })
    },
    gotoEdit (v) {
      this.$router.push({ path: `/system-setup/role/edit?id=${v.roleId}` })
    },
    gotoView (v) {
      this.$router.push({ path: `/system-setup/role/view?id=${v.roleId}` })
    }
  }
}
</script>