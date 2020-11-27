<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('surveyor_fee_detail') }}</h1><span> {{ $t(`c.${mode}`) }}</span>
      </div>
      <div class="page__breadcrumb">
        <nuxt-link to="/">
          <i class="las la-home"></i> {{ $t('c.home') }}
        </nuxt-link> / {{ $t('surveyor_fee') }} / {{ $t('surveyor_fee_detail') }}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('survey-fee-information', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('survey_fee_information') }}
        </div>
        <div class="action">
          <button class="btn btn-secondary ml-2" @click="gotoBack()">
            <i class="las la-arrow-left"></i> {{ $t('c.back') }}
          </button>
          <button class="btn btn-success ml-2" @click="save()" v-show="!viewMode">
            <i class="las la-save"></i> {{ $t('c.save') }}
          </button>
          <!-- <button class="btn btn-danger ml-2" @click="deleteData()" v-if="mode == 'edit'">
              <i class="las la-md la-times"></i> {{ $t('c.delete') }}
            </button> -->
        </div>
      </div>
      <b-collapse visible id="survey-fee-information">
        <div class="card-body">
          <b-row class="mb-2">
            <b-col md="12">
              <b-row align-h="around" class="form-group">
                <b-col md="3">
                  <label class="required">{{ $t('surveyor_type') }}</label>
                  <treeselect v-model="form.surveyorType" :options="surveyorTypeList" :disabled="disableMode" :placeholder="$t('c.please_select')" />
                </b-col>
                <b-col md="3">
                  <label class="required">{{ $t('surveyor') }}</label>
                  <b-form-input v-model="form.surveyor" :disabled="disableMode" />
                </b-col>
                <b-col md="3">
                  <label class="required">{{ $t('calculate_date') }}</label>
                  <a-form-datepicker v-model="form.calculateDate" :disabled="disableMode" />
                </b-col>
              </b-row>
              <b-row align-h="around" class="form-group">
                <b-col md="3">
                  <label class="required">{{ $t('c.status') }}</label>
                  <treeselect v-model="form.status" :options="statusList" :disabled="disableMode" :placeholder="$t('c.please_select')" />
                </b-col>
                <b-col md="3">
                  <label class="required">{{ $t('remarks') }}</label>
                  <b-form-textarea v-model="form.remarks" rows="3" :disabled="disableMode" />
                </b-col>
                <b-col md="3"></b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <!-- Card Fee Summary -->
    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('fee-summary', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('fee_summary') }}
        </div>
      </div>
      <b-collapse visible id="fee-summary">
        <div class="card-body">
          <b-row align-h="center" class="mb-2">
            <b-col md="8">
              <a-table
                :id="$route.name"
                :datasource="datasourceSummary"
                :columns="columnsSummary"
                :paging="pagingSummary"
                @refresh="searchSummary"
                :isFilter="false"
                :isSort="false"
                :isPaging="false"
              >
                <template slot="tableBody">
                  <tr v-for="(v, index) in datasourceSummary.data" :key="index">
                    <td class="text-right">{{ v.mainFee | fmtNumber(2) }}</td>
                    <td class="text-right">{{ v.subFee | fmtNumber(2) }}</td>
                    <td class="text-right">{{ v.otherFee | fmtNumber(2) }}</td>
                    <td class="text-right">{{ v.totalFee | fmtNumber(2) }}</td>
                  </tr>
                </template>
              </a-table>
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <!-- Card Fee Details by Rules -->
    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('fee-details-by-rules', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('fee_details_by_rules') }}
        </div>
      </div>
      <b-collapse visible id="fee-details-by-rules">
        <div class="card-body">
          <b-row align-h="center" class="mb-2">
            <b-col md="12">
              <a-table
                class="my-table"
                :id="$route.name"
                :datasource="datasourceRules"
                :columns="columnsRules"
                :paging="pagingRules"
                @refresh="searchByRules"
                :isFilter="false"
                :isSort="false"
                :isPaging="false"
              >
                <template slot="tableBody">
                  <tr v-for="(v, index) in datasourceRules.data" :key="index">
                    <td>{{ v.surveyorType }}</td>
                    <td>{{ v.policyType }}</td>
                    <td>{{ v.claimCriteriaType }}</td>
                    <td>{{ v.motorMCType }}</td>
                    <td>{{ v.location }}</td>
                    <td class="text-center">{{ v.time }}</td>
                    <td>{{ v.vehicleType }}</td>
                    <td>{{ v.claimTimes }}</td>
                    <td>{{ v.expenseType }}</td>
                    <td>{{ v.distance }}</td>
                    <td>{{ v.feeRate }}</td>
                    <td class="text-right">{{ v.systemCalculationFee | fmtNumber(2) }}</td>
                    <td>
                      <div class="btn-action-group">
                        <button class="btn btn-sm btn-info" v-b-tooltip:page.top.hover="$t('c.view')" @click="ViewModelRule(v)">
                          <i class="las la-md la-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </a-table>
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <!-- Card Fee Details by Claim -->
    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('fee-details-by-claim', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('fee_details_by_claim') }}
        </div>
      </div>
      <b-collapse visible id="fee-details-by-claim">
        <div class="card-body">
          <b-row align-h="center" class="mb-2">
            <b-col md="12">
              <a-table
                :id="$route.name"
                :datasource="datasourceClaim"
                :columns="columnsClaim"
                :paging="pagingClaim"
                @refresh="searchByClaim"
                :isFilter="false"
                :isSort="false"
                :isPaging="false"
              >
                <template slot="tableBody">
                  <tr v-for="(v, index) in datasourceClaim.data" :key="index">
                    <td class="text-center">{{ v.claimNo }}</td>
                    <td>{{ v.policyType }}</td>
                    <td>{{ v.claimType }}</td>
                    <td>{{ v.province }}</td>
                    <td>{{ v.district }}</td>
                    <td class="text-center">{{ v.time }}</td>
                    <td>{{ v.vehicleType }}</td>
                    <td class="text-right">{{ v.claimTimes }}</td>
                    <td>{{ v.surveyorName }}</td>
                    <td class="text-right">{{ v.mainFee | fmtNumber(2) }}</td>
                    <td class="text-right">{{ v.subFee | fmtNumber(2) }}</td>
                    <td class="text-right">{{ v.otherFee | fmtNumber(2) }}</td>
                    <td class="text-right">{{ v.totalFee | fmtNumber(2) }}</td>
                    <td>
                      <div class="btn-action-group">
                        <button class="btn btn-sm btn-info" v-b-tooltip:page.top.hover="$t('c.view')" @click="ViewModelClaim(v)">
                          <i class="las la-md la-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </a-table>
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>

    <modal-by-rules :params="AddDataModelRules"></modal-by-rules>
    <modal-by-claim :params="AddDataModelClaim"></modal-by-claim>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import ModalByRules from '~/pages/surveyor-fee/surveyor-fee-list/ModalByRules'
import ModalByClaim from '~/pages/surveyor-fee/surveyor-fee-list/ModalByClaim'
import CommonMixin from '~/assets/js/CommonMixin'
import App from '~/assets/js/Constant'
import id00001 from '~/pages/surveyor-fee/surveyor-fee-list/simulateData/id00001'
import id00002 from '~/pages/surveyor-fee/surveyor-fee-list/simulateData/id00002'
import id00003 from '~/pages/surveyor-fee/surveyor-fee-list/simulateData/id00003'
import surveyorType from '~/pages/surveyor-fee/surveyor-fee-list/simulateData/surveyorType'
import statusList from '~/pages/surveyor-fee/surveyor-fee-list/simulateData/statusList'
import feeDetailsByRules from '~/pages/surveyor-fee/surveyor-fee-list/simulateData/feeDetailsByRules'
import feeDetailsByClaim from '~/pages/surveyor-fee/surveyor-fee-list/simulateData/feeDetailsByClaim'

export default {
  name: 'SurveyorFeeListDetail',
  components: {
    ModalByRules,
    ModalByClaim,
  },
  mixins: [CommonMixin],
  async fetch () {
    this.surveyorTypeList = await surveyorType
    this.statusList = await statusList
  },
  async asyncData (context) {
    const mode = context.params.id
    const id = context.query.id

    let form
    if (id) {
      if (id === '00001') {
        form = await id00001.data[0]
      }
      if (id === '00002') {
        form = await id00002.data[0]
      }
      if (id === '00003') {
        form = await id00003.data[0]
      }
    }
    if (mode === 'view') {
      return {
        mode,
        id,
        form: await form,
        disableMode: true,
        viewMode: true
      }
    } else if (mode === 'edit') {
      return {
        mode,
        id,
        form: await form,
        disableMode: false,
        viewMode: false
      }
    } else {
      return {
        mode,
        id,
        form: await form,
        disableMode: false,
        viewMode: false
      }
    }
  },
  data () {
    return {
      // mode: {},
      form: {},
      surveyorTypeList: [],
      policyTypeList: [],
      claimTypeList: [],
      statusList: [],
      datasourceSummary: {},
      datasourceRules: {},
      datasourceClaim: {},
      pagingSummary: {},
      pagingRules: {},
      pagingClaim: {},
      APP: App,
      AddDataModelRules: {},
      AddDataModelClaim: {},
    }
  },
  computed: {
    columnsSummary () {
      const col = [
        { label: this.$t('main_fee'), field: 'mainFee' },
        { label: this.$t('sub_fee'), field: 'subFee' },
        { label: this.$t('other_fee'), field: 'otherFee' },
        { label: this.$t('total_fee'), field: 'totalFee' },
      ]
      return col
    },
    columnsRules () {
      const col = [
        { label: this.$t('surveyor_type'), field: 'surveyorType', style: { minWidth: '150px' } },
        { label: this.$t('policy_type'), field: 'policyType', style: { minWidth: '100px' } },
        { label: this.$t('claim_criteria_type'), field: 'claimCriteriaType', style: { minWidth: '120px' } },
        { label: this.$t('motor_MC_type'), field: 'motorMCType', style: { minWidth: '100px' } },
        { label: this.$t('location'), field: 'location', style: { minWidth: '120px' } },
        { label: this.$t('time', {label: ''}), field: 'time', style: { minWidth: '100px' } },
        { label: this.$t('vehicle_type'), field: 'vehicleType', style: { minWidth: '100px' } },
        { label: this.$t('list_claim_times'), field: 'claimTimes', style: { minWidth: '100px' } },
        { label: this.$t('expense_type'), field: 'expenseType', style: { minWidth: '100px' } },
        { label: this.$t('distance'), field: 'distance', style: { minWidth: '100px' } },
        { label: this.$t('fee_rate'), field: 'feeRate', style: { minWidth: '110px' } },
        { label: this.$t('system_calculation_fee'), field: 'systemCalculationFee', style: { minWidth: '100px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { minWidth: '60px' } }
      ]
      return col
    },
    columnsClaim () {
      const col = [
        { label: this.$t('claim_no'), field: 'claimNo', style: { minWidth: '150px' } },
        { label: this.$t('policy_type'), field: 'policyType', style: { minWidth: '100px' } },
        { label: this.$t('claim_type'), field: 'claimType', style: { minWidth: '120px' } },
        { label: this.$t('province'), field: 'province', style: { minWidth: '100px' } },
        { label: this.$t('district'), field: 'district', style: { minWidth: '100px' } },
        { label: this.$t('time', {label: ''}), field: 'time', style: { minWidth: '100px' } },
        { label: this.$t('vehicle_type'), field: 'vehicleType', style: { minWidth: '100px' } },
        { label: this.$t('list_claim_times'), field: 'claimTimes', style: { minWidth: '80px' } },
        { label: this.$t('surveyor_name'), field: 'surveyorName', style: { minWidth: '120px' } },
        { label: this.$t('main_fee'), field: 'mainFee', style: { minWidth: '100px' } },
        { label: this.$t('sub_fee'), field: 'subFee', style: { minWidth: '100px' } },
        { label: this.$t('other_fee'), field: 'otherFee', style: { minWidth: '100px' } },
        { label: this.$t('total_fee'), field: 'totalFee', style: { minWidth: '100px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { minWidth: '60px' } }
      ]
      return col
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.pagingSummary = cloneDeep(this.APP.paging)
      this.pagingRules = cloneDeep(this.APP.paging)
      this.pagingClaim = cloneDeep(this.APP.paging)

      this.searchSummary()
      this.searchByRules()
      this.searchByClaim()
    })
  },
  methods: {
    save () {
      if (this.mode == this.APP.MODE_CREATE) {
        this.toast('success', this.$t('c.success__save'))
      } else {
        this.toast('success', this.$t('c.success__update'))
      }
    },
    deleteData () {
      this.toast('success', this.$t('c.success__delete'))
    },
    gotoBack () {
      this.$router.push('/surveyor-fee/surveyor-fee-list')
    },
    async searchSummary () {
      if (this.id === '00001') {
        this.datasourceSummary = await cloneDeep(id00001)
      } else if (this.id === '00002') {
        this.datasourceSummary = await cloneDeep(id00002)
      } else if (this.id === '00003') {
        this.datasourceSummary = await cloneDeep(id00003)
      }
    },
    async searchByRules () {
      this.datasourceRules = await feeDetailsByRules
    },
    async searchByClaim () {
      this.datasourceClaim = await feeDetailsByClaim
    },
    ViewModelRule (v) {
      this.$bvModal.show('modal-by-rules')
      this.$set(this.AddDataModelRules, 'rules', { 'data': { 'data': v } })
      this.$set(this.AddDataModelRules, 'claim', cloneDeep(this.datasourceClaim))
      this.$set(this.AddDataModelRules, 'title', this.$t('popup_summary_by_rules'))
      this.$set(this.AddDataModelRules, 'onConfirm', (result) => {
        if (result.success) {
          console.log('result', result.success)
        }
      })
    },
    ViewModelClaim (v) {
      this.$bvModal.show('modal-by-claim')
      this.$set(this.AddDataModelClaim, 'claim', { 'data': { 'data': v } })
      this.$set(this.AddDataModelClaim, 'rules', cloneDeep(this.datasourceRules))
      this.$set(this.AddDataModelClaim, 'title', this.$t('popup_summary_by_claim'))
      this.$set(this.AddDataModelClaim, 'onConfirm', (result) => {
        if (result.success) {
          console.log('result', result.success)
        }
      })
    }
  },
}
</script>
