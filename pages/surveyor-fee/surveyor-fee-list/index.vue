<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('surveyor_fee_list') }} <span>{{ $t('c.list') }}</span></h1>
      </div>
      <div class="page__breadcrumb">
        <nuxt-link to="/">
          <i class="las la-md la-home"></i> {{ $t('c.home') }}
        </nuxt-link> / {{ $t('surveyor_fee') }} / {{ $t('surveyor_fee_list') }}
      </div>
    </div>

    <!--Card Criteria -->
    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('search-criteria', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('c.filter') }}
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
      <b-collapse visible id="search-criteria">
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('surveyor_type') }}</label>
              <treeselect v-model="criteria.surveyorType" :options="surveyorTypeList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('surveyor') }}</label>
              <treeselect v-model="criteria.surveyor" :options="surveyorList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('calculate_date_from') }}</label>
              <a-form-datepicker v-model="criteria.calculateDateFrom" />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('calculate_date_to') }}</label>
              <a-form-datepicker v-model="criteria.CalculateDateTo" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('c.status') }}</label>
              <treeselect v-model="criteria.status" :options="statusList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3"></b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>

    <!--Card Detail -->
    <div class="card">
      <div class="card-body">
        <a-table
          :id="$route.name"
          :datasource="datasource"
          :columns="columns"
          :paging="paging"
          @refresh="search"
        >
          <template slot="tableAction">
            <button class="btn btn-success" @click="gotoConfirm()">
              <i class="las la-check"></i> {{ $t('c.confirm') }}
            </button>
          </template>
          <template slot="tableBody">
            <tr v-for="(v, index) in datasource.data" :key="index">
              <td class="text-center">
                <b-form-checkbox v-model="v.checked" />
              </td>
              <td>{{ v.surveyorType }}</td>
              <td>{{ v.surveyor }}</td>
              <td class="text-center">{{ v.calculateDate }}</td>
              <td class="text-right">{{ v.mainFee | fmtNumber(2) }}</td>
              <td class="text-right">{{ v.subFee | fmtNumber(2) }}</td>
              <td class="text-right">{{ v.otherFee | fmtNumber(2) }}</td>
              <td class="text-right">{{ v.totalFee | fmtNumber(2) }}</td>
              <td>{{ v.remarks }}</td>
              <td>{{ v.status }}</td>
              <td>
                <div class="btn-action-gl">
                  <button class="btn btn-sm btn-info" v-b-tooltip:page.top.hover="$t('c.view')" @click="gotoView(v.surveyorId)">
                    <i class="las la-md la-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-warning" v-b-tooltip:page.top.hover="$t('c.edit')" @click="gotoEdit(v.surveyorId)" :disabled="v.totalFee === 'Settle1'">
                    <i class="las la-md la-pen"></i>
                  </button>
                  <button class="btn btn-sm btn-success" v-b-tooltip:page.top.hover="$t('c.confirm')" @click="gotoConfirm(v.surveyorId)" :disabled="v.status === 'Settle1'">
                    <i class="las la-md la-check"></i>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'
import simulateData from '~/pages/surveyor-fee/surveyor-fee-list/simulateData/data.json'

export default {
  name: 'SurveyorFeeList',
  mixins: [CommonMixin],

  async fetch () {},

  data () {
    return {
      criteria: {},
      surveyorTypeList: [],
      surveyorList: [],
      statusList: [],
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      datasource: {}
    }
  },

  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),

    columns () {
      const col = [
        { label: 'CHECK_ALL', sortable: false, filterable: false, style: { 'min-width': '20px' } },
        { label: this.$t('surveyor_type'), field: 'surveyorType', style: { 'min-width': '180px' } },
        { label: this.$t('surveyor'), field: 'surveyor', style: { 'min-width': '130px' } },
        { label: this.$t('calculate_date'), field: 'calculateDate', style: { 'min-width': '130px' } },
        { label: this.$t('main_fee'), field: 'mainFee', style: { 'min-width': '120px' } },
        { label: this.$t('sub_fee'), field: 'subFee', style: { 'min-width': '120px' } },
        { label: this.$t('other_fee'), field: 'otherFee', style: { 'min-width': '120px' } },
        { label: this.$t('total_fee'), field: 'totalFee', style: { 'min-width': '120px' } },
        { label: this.$t('remarks'), field: 'remarks', style: { 'min-width': '250px' } },
        { label: this.$t('c.status'), field: 'status', style: { 'min-width': '80px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { 'min-width': '90px', 'width': '90px' } }
      ]
      return col
    }
  },

  activated () {
    this.search()
  },

  methods: {
    async search () {
      // const criteria = {...this.criteria, ...this.paging}
      this.datasource = await simulateData
      // this.datasource = await this.$axios.$post('/api/surveyor-fee-list/findByCriteria', criteria)
    },
    clear () {
      this.criteria = {}
    },
    gotoCreate () {
      this.$router.push({
        path: '/surveyor-fee/surveyor-fee-list/create'
      })
    },
    gotoView (id) {
      this.$router.push({
        path: `/surveyor-fee/surveyor-fee-list/view?id=${id}`
      })
    },
    gotoEdit (id) {
      this.$router.push({
        path: `/surveyor-fee/surveyor-fee-list/edit?id=${id}`
      })
    },
    gotoConfirm () {
      this.msgBoxConfirm('save').then(ok => {
        if (ok) {
          this.toast('success', this.$t('c.success__save'))
        }
      })
    },
  },
}
</script>
