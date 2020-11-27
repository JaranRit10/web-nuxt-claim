<template>
  <div>
    <HasPerm any="errmsg_menu">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('error_message') }}</h1> <span>{{ $t('c.list') }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }}  / {{ $t('system_setup') }} / {{ $t('error_message') }}
        </div>
      </div>

      <!-- Search Criteria -->
      <div class="card">
        <div class="card-header" @click="toggleCollapse('search-criteria-error-message', $event)">
          <div class="title">
            <i class="las la-angle-up"></i> {{ $t('c.filter') }}
          </div>
          <div class="action">
            <button class="btn btn-primary ml-2" @click="search()"><i class="las la-search"></i> {{ $t('c.search') }}</button>
            <button class="btn btn-warning ml-2" @click="clearCriteria()"><i class="las la-undo-alt"></i> {{ $t('c.clear') }}</button>
          </div>
        </div>
        <b-collapse visible id="search-criteria-error-message">
          <div class="card-body">
            <b-row align-h="around">
              <b-col sm="3" class="form-group">
                <label>{{ $t('error_code') }}</label>
                <b-form-input v-model="criteria.errCode" />
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('error_name') }}</label>
                <b-form-input v-model="criteria.errName" />
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('c.status') }}</label>
                <treeselect v-model="criteria.status" :options="statusList" :placeholder="$t('c.all')" />
              </b-col>
            </b-row>
          </div>
        </b-collapse>
      </div><!-- /Search Criteria -->

      <!-- Search Result -->
      <div class="card">
        <div class="card-body">
          <a-table :id="$route.name"
                   :datasource="datasource"
                   :columns="columns"
                   :paging="paging"
                   @refresh="search"
          >
            <template slot="tableAction"></template>
            <template slot="tableBody">
              <tr v-for="obj in datasource.data" :key="obj.errorCode">
                <td class="text-left">{{ obj.errorCode }}</td>
                <td class="text-left">{{ obj.errorThName | emptyToDash }}</td>
                <td class="text-left">{{ obj.errorEnName | emptyToDash }}</td>
                <td class="text-center">{{ obj.status }} - {{ obj.statusName }}</td>
                <td class="text-center">{{ obj.updatedBy | emptyToDash }}</td>
                <td class="text-center">{{ obj.updatedDate | emptyToDash }}</td>
                <td>
                  <div class="btn-action-gl">
                    <HasPerm any="errmsg_view">
                      <button class="btn btn-sm btn-info" v-b-tooltip:page.bottom.hover.left="$t('c.view')" @click="gotoView(obj.errorCode)"><i class="las la-md la-eye" /></button>
                    </HasPerm>
                    <HasPerm any="errmsg_update">
                      <button class="btn btn-sm btn-warning" v-b-tooltip:page.bottom.hover.left="$t('c.edit')" @click="gotoEdit(obj.errorCode)"><i class="las la-md la-pen" /></button>
                    </HasPerm>
                  </div>
                </td>
              </tr>
            </template>
          </a-table>
        </div>
      </div><!-- /Search Result -->
    </HasPerm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'ErrorMessageList',

  mixins: [CommonMixin],

  async fetch () {
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
  },

  data () {
    return {
      criteria: {},
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      datasource: {},
      statusList: [],
    }
  },

  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),
    columns () {
      const col = [
        { label: this.$t('error_code'), field: 'errorCode', style: { 'width': '135px', 'min-width': '135px' } },
        { label: this.$t('error_name'), field: 'errorThName', style: { 'min-width': '300px' } },
        { label: this.$t('error_name_en'), field: 'errorEnName', style: { 'min-width': '300px' } },
        { label: this.$t('c.status'), field: 'status', style: { width: '90px', 'min-width': '90px' } },
        { label: this.$t('c.last_updated_by'), field: 'updatedBy', style: { width: '114px', 'min-width': '114px' } },
        { label: this.$t('c.last_updated_date'), field: 'updatedDate', style: { width: '140px', 'min-width': '140px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { width: '50px', 'min-width': '50px' } }
      ]
      return col
    },
  },

  activated () {
    this.search()
  },

  methods: {
    async search () {
      const criteria = { ...this.criteria, ...this.paging }
      const response = await this.$axios.$post('/api/errMsg/findByCriteria', criteria)
      if (response) {
        this.datasource = response
      }
    },

    clearCriteria () {
      this.criteria = {}
    },

    gotoView (errCode) {
      this.$router.push({ path: `/system-setup/error-message/view?id=${errCode}`})
    },

    gotoEdit (errCode) {
      this.$router.push({ path: `/system-setup/error-message/edit?id=${errCode}` })
    },

    deleteData (id) {
      let idList
      if (id) {
        idList = [id]
      }
      else {
        idList = this.getCheckedValue(this.datasource, 'errCode')
      }

      if (idList.length > 0) {
        this.msgBoxConfirm('delete').then(ok => {
          if (ok) {
            this.$axios.$post('/api/errMsg/delete', idList).then(res => {
              if (res == false) {
                this.toast('danger', res.errMsg)
              } else {
                this.toast('success', this.$t('c.success__delete'))
                this.search()
              }
            })
          }
        })
      }
      else {
        this.toast('warning', this.$t('c.err__delete_required_one'))
      }
    },
  }
}
</script>
