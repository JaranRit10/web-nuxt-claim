<template>
  <div>
    <HasPerm any="surveyor_menu">
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('surveyor') }}</h1> <span>{{ $t('c.list') }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home" /> {{ $t('c.home') }} / {{ $t('master_data') }} / {{ $t('surveyor') }}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="title" @click="toggleCollapse('search-criteria-surveyor', $event)" style="cursor: pointer;">
            <i class="las la-angle-up"></i> {{ $t('c.filter') }}
          </div>
          <div class="action">
            <button class="btn btn-primary ml-2" @click="search()">
              <i class="las la-search"></i> <span>{{ $t('c.search') }}</span>
            </button>
            <button class="btn btn-warning ml-2" @click="clearCriteria()">
              <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
            </button>
          </div>
        </div>

        <b-collapse visible id="search-criteria-surveyor">
          <div class="card-body">
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('survey_company_id') }}</label>
                <b-form-input v-model="criteria.companyCode" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('company_name') }}</label>
                <b-form-input v-model="criteria.companyName" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('insurance') }}</label>
                <b-form-input v-model="criteria.insurance" />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('company_address') }}</label>
                <b-form-input v-model="criteria.companyAddress" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('company_province') }}</label>
                <b-form-input v-model="criteria.companyProvince" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('contact_no') }}</label>
                <b-form-input v-model="criteria.contactNo" />
              </b-col>
            </b-row>
          </div>
        </b-collapse>
      </div>

      <div class="card">
        <div class="card-body">
          <a-table
            :id="$route.name"
            :datasource="datasource"
            :paging="paging"
            :columns="columns"
            @refresh="search"
          >
            <template slot="tableAction">
              <HasPerm any="surveyor_create">
                <button class="btn btn-success" @click="gotoCreate()">
                  <i class="las la-plus"></i> {{ $t('c.create') }}
                </button>
              </HasPerm>
              <HasPerm any="surveyor_delete">
                <button class="btn btn-danger ml-2" @click="deleteData()">
                  <i class="las la-times"></i> {{ $t('c.delete') }}
                </button>
              </HasPerm>
            </template>
            <template slot="tableBody">
              <tr v-for="(obj, index) in datasource.data" :key="index">
                <td class="text-center"><b-form-checkbox v-model="obj.checked"></b-form-checkbox></td>
                <td class="text-center">{{ obj.surveyCompanyId | emptyToDash }}</td>
                <td>{{ obj.companyName | emptyToDash }}</td>
                <td>{{ obj.companyNameEn | emptyToDash }}</td>
                <td>{{ obj.insurance | emptyToDash }}</td>
                <td>{{ obj.companyAddress }}</td>
                <td>{{ obj.companyProvince | emptyToDash }}</td>
                <td>{{ obj.contactNo | emptyToDash }}</td>
                <td>
                  <div class="btn-action-gl">
                    <HasPerm any="surveyor_view">
                      <button class="btn btn-sm btn-info" @click="gotoView(obj.surveyCompanyId)"
                              v-b-tooltip:page.bottom.hover="$t('c.view')"
                      ><i class="las la-md la-eye"></i></button>
                    </HasPerm>
                    <HasPerm any="surveyor_update">
                      <button class="btn btn-sm btn-warning" @click="gotoEdit(obj.surveyCompanyId)"
                              v-b-tooltip:page.bottom.hover="$t('c.edit')"
                      >
                        <i class="las la-pen"></i>
                      </button>
                    </HasPerm>
                    <HasPerm any="surveyor_delete">
                      <button class="btn btn-sm btn-danger" @click="deleteData(obj)"
                              v-b-tooltip:page.bottom.hover="$t('c.delete')"
                      >
                        <i class="las la-times"></i>
                      </button>
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
import _ from 'lodash'
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  name: 'SurveyorList',
  mixins: [CommonMixin],

  data () {
    return {
      criteria: {},
      datasource: {},
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
        { label: this.$t('survey_company_id'), field: 'surveyCompanyId', style: {width: '130px', minWidth: '130px' }},
        { label: this.$t('company_name'), field: 'companyName', style: { minWidth: '280px' }},
        { label: this.$t('company_name_en'), field: 'companyNameEN', style: { minWidth: '280px' }},
        { label: this.$t('insurance'), field: 'insurance', style: {width: '220px', minWidth: '220px' }},
        { label: this.$t('company_address'), field: 'companyAddress', style: { minWidth: '250px' }},
        { label: this.$t('company_province'), field: 'companyProvince', style: {width: '150px', minWidth: '150px' }},
        { label: this.$t('contact_no'), field: 'contactNo', style: {width: '150px', minWidth: '150px' }},
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { minWidth: '60px', width: '60px'}}
      ]
      return col
    }
  },
  activated () {
    this.search()
  },
  methods: {
    async search () {
      const criteria = { ...this.criteria, ...this.paging }
      const response = await this.$axios.$post('/api/surveyor/findByCriteria', criteria)
      if (response.data) {
        this.datasource = response
      }
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
            this.$axios.$post('/api/surveyor/delete', dataList).then(res => {
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
      this.$router.push({
        path: '/master-data/surveyor/create'
      })
    },
    gotoEdit (id) {
      this.$router.push({
        path: `/master-data/surveyor/edit/${id}`
      })
    },
    gotoView (id) {
      this.$router.push({ path: `/master-data/surveyor/view/${id}` })
    },
    clearCriteria () {
      this.criteria = {}
    }
  },
}
</script>