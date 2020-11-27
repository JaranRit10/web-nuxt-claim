<template>
  <div>
    <HasPerm any="carbrand_menu">
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('car_brand') }}</h1> <span>{{ $t('c.list') }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home" /> {{ $t('c.home') }} / {{ $t('master_data') }} / {{ $t('car_brand') }}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="title" @click="toggleCollapse('search-criteria-car', $event)" style="cursor: pointer;">
            <i class="las la-angle-up"></i> {{ $t('c.filter') }}
          </div>
          <div class="action">
            <button class="btn btn-primary" @click="search()">
              <i class="las la-search"></i> <span>{{ $t('c.search') }}</span>
            </button>
            <button class="btn btn-warning ml-2" @click="clearCriteria()">
              <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
            </button>
          </div>
        </div>
        <b-collapse visible id="search-criteria-car">
          <div class="card-body">
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('brand_code') }}</label>
                <b-form-input v-model="criteria.brandCode"></b-form-input>
              </b-col>
              <b-col sm="3">
                <label>{{ $t('brand_name') }}</label>
                <b-form-input v-model="criteria.brandName"></b-form-input>
              </b-col>
              <b-col sm="3"></b-col>
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
              <HasPerm any="carbrand_create">
                <button class="btn btn-success mr-1" @click="gotoCreate()"><i class="las la-plus"></i> {{ $t('c.create') }}</button>
              </HasPerm>
              <HasPerm any="carbrand_delete">
                <button class="btn btn-danger mr-1" @click="deleteData()"><i class="las la-times"></i> {{ $t('c.delete') }}</button>
              </HasPerm>
            </template>
            <template slot="tableBody">
              <tr v-for="obj in datasource.data" :key="obj.userCode">
                <td class="text-center"><b-form-checkbox v-model="obj.checked"></b-form-checkbox></td>
                <td class="text-center">{{ obj.brandCode | emptyToDash }}</td>
                <td>{{ obj.brandName | emptyToDash }}</td>
                <td class="text-center">{{ obj.createBy | emptyToDash }}</td>
                <td class="text-center">{{ obj.createDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.updateBy | emptyToDash }}</td>
                <td class="text-center">{{ obj.updateDate | emptyToDash }}</td>
                <td>
                  <div class="btn-action-gl">
                    <HasPerm any="carbrand_view">
                      <button class="btn btn-sm btn-info" v-b-tooltip:page.bottom.hover="$t('c.view')" @click="gotoView(obj.brandCode)"><i class="las la-md la-eye" /></button>
                    </HasPerm>
                    <HasPerm any="carbrand_update">
                      <button class="btn btn-sm btn-warning" v-b-tooltip:page.bottom.hover="$t('c.edit')" @click="gotoEdit(obj.brandCode)"><i class="las la-md la-pen"></i></button>
                    </HasPerm>
                    <!-- <HasPerm any="user_resetPassword"> -->
                    <!-- <button class="btn btn-sm btn-danger" v-b-tooltip:page.bottom.hover="$t('c.reset_pwd')" @click="resetPwd(obj.brandCode)"><i class="las la-md la-wrench"></i></button> -->
                    <!-- </HasPerm> -->
                    <HasPerm any="carbrand_delete">
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
  name: 'CarBrandList',
  mixins: [CommonMixin],
  async fetch () {
    // this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    this.userTypeList = await this.$axios.$get('/api/dropdown/lov/USER_TYPE')
    // this.roleList = await this.$axios.$get('/api/dropdown/getRole')
  },

  data () {
    return {
      criteria: {},
      // statusList: [],
      datasource: {},
      // roleList: [],
      userTypeList: [],
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),
    columns () {
      const col = [ { label: 'CHECK_ALL', sortable: false, filterable: false, style: { 'width': '20px' } },
        { label: this.$t('brand_code'), field: 'brandCode', style: { minWidth: '90px', 'width': '90px' } },
        { label: this.$t('brand_name'), field: 'brandName', style: { minWidth: '251px' } },
        { label: this.$t('c.created_by'), field: 'createBy', style: { minWidth: '130px', 'width': '130px' } },
        { label: this.$t('c.created_date'), field: 'createDate', style: { minWidth: '190px', 'width': '190px' } },
        { label: this.$t('c.updated_by'), field: 'updateBy', style: { minWidth: '130px', 'width': '130px' } },
        { label: this.$t('c.updated_date'), field: 'updateDate', style: { minWidth: '190px', 'width': '190px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { minWidth: '90px', 'width': '90px' } }]
      return col
    },
  },
  activated () {
    this.search()
  },
  methods: {
    async search () {
      const criteria = { ...this.criteria, ...this.paging }
      const response = await this.$axios.$post('/api/carBrand/findByCriteria', criteria)
      if (response.data) {
        this.datasource = response
      }
    },
    gotoCreate () {
      this.$router.push({
        path: '/master-data/car-brand/create'
      })
    },
    gotoEdit (brandCode) {
      this.$router.push({
        path: `/master-data/car-brand/edit?id=${brandCode}`
      })
    },
    gotoView (brandCode) {
      this.$router.push({
        path: `/master-data/car-brand/view?id=${brandCode}`
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
            this.$axios.$post('/api/carBrand/delete', dataList).then(res => {
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
    },
  }
}
</script>
