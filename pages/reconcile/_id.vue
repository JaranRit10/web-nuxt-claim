<template>
  <div>
    <HasPerm any="reconcile_view">
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('reconcile') }}</h1> <span>{{ $t(`c.${mode}`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('reconcile') }}
        </div>
      </div>

      <!-- Search Result -->
      <div class="card">
        <div class="card-header">
          <div class="tab">
            <i class="las la-info-circle"></i> {{ $t('c.info') }}
          </div>
          <div class="action">
            <button class="btn btn-secondary ml-2" @click="goBack()">
              <i class="las la-arrow-left"></i> {{ $t('c.back') }}
            </button>
          </div>
        </div>
        <div class="card-body">
          <a-table
            :id="$route.name"
            :datasource="datasource"
            :columns="columns"
            :paging="paging"
            @refresh="search"
          >
            <template slot="tableAction"></template>
            <template slot="tableBody">
              <tr v-for="(obj, index) in datasource.data" :key="index">
                <td class="text-center">{{ obj.infFileDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.reconcileDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.lineNo | emptyToDash }}</td>
                <td class="text-center">{{ obj.statusName | emptyToDash }}</td>
                <td class="text-left">{{ obj.message | emptyToDash }}</td>
                <td class="text-center">{{ obj.fKpiApplicationDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.aKpiApplicationDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.fInsApplicationNo | emptyToDash }}</td>
                <td class="text-center">{{ obj.aInsApplicationNo | emptyToDash }}</td>
                <td class="text-center">{{ obj.fPolicyFlag | emptyToDash }}</td>
                <td class="text-center">{{ obj.aPolicyFlag | emptyToDash }}</td>
                <td class="text-left">{{ obj.fProjectName | emptyToDash }}</td>
                <td class="text-left">{{ obj.aProjectName | emptyToDash }}</td>
                <td class="text-center">{{ obj.fLoanAccountNo | emptyToDash }}</td>
                <td class="text-center">{{ obj.aLoanAccountNo | emptyToDash }}</td>
                <td class="text-center">{{ obj.fLoanEffectiveDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.aLoanEffectiveDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.fInsPolicyNo | emptyToDash }}</td>
                <td class="text-center">{{ obj.aInsPolicyNo | emptyToDash }}</td>
                <td class="text-center">{{ obj.fInsIdCard | emptyToDash }}</td>
                <td class="text-center">{{ obj.aInsIdCard | emptyToDash }}</td>
                <td class="text-center">{{ obj.fInsEffectiveDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.aInsEffectiveDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.fChannel | emptyToDash }}</td>
                <td class="text-center">{{ obj.fTransferAccountNo | emptyToDash }}</td>
                <td class="text-right">{{ obj.fTransferAmount || 0 | fmtNumber(2) }}</td>
                <td class="text-right">{{ obj.aTotalPremium || 0 | fmtNumber(2) }}</td>
              </tr>
            </template>
          </a-table>
        </div>
        <!-- /card-body -->
      </div>
    </HasPerm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'ReconcileDetail',
  mixins: [CommonMixin],

  async fetch () {
    // Not Now
  },
  asyncData (context) {
    const id = context.query.id
    const mode = context.params.id
    if (mode === 'create') {
      return {
        mode,
        id,
        disableMode: false,
        disableModeStatus: false,
        viewMode: false
      }
    } else if (mode === 'view') {
      return {
        mode,
        id,
        disableMode: true,
        disableModeStatus: true,
        viewMode: true
      }
    } else {
      return {
        mode,
        id,
        disableModeStatus: false,
        disableMode: true,
        viewMode: false
      }
    }
  },
  data () {
    return {
      criteria: {
        infId: this.id
      },
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
        { label: this.$t('inffile_date'), field: 'infFileDate', style: { 'min-width': '130px' }},
        { label: this.$t('reconcile_date'), field: 'reconcileDate', style: { 'min-width': '130px' }},
        { label: this.$t('line_no'), field: 'lineNo', style: { 'min-width': '100px' }},
        { label: this.$t('c.status'), field: 'status', style: { 'min-width': '80px' }},
        { label: this.$t('c.message'), field: 'message', style: { 'min-width': '150px' }},
        { label: this.$t('f_app_date'), field: 'fKpiApplicationDate', style: { 'min-width': '130px' }},
        { label: this.$t('a_app_date'), field: 'aKpiApplicationDate', style: { 'min-width': '130px' }},
        { label: this.$t('f_insapp_no'), field: 'fInsApplicationNo', style: { 'min-width': '120px' }},
        { label: this.$t('a_insapp_no'), field: 'aInsApplicationNo', style: { 'min-width': '100px' }},
        { label: this.$t('f_policy_flag'), field: 'fPolicyFlag', style: { 'min-width': '100px' }},
        { label: this.$t('a_policy_flag'), field: 'aPolicyFlag', style: { 'min-width': '100px' }},
        { label: this.$t('f_project_name'), field: 'fProjectName', style: { 'min-width': '120px' }},
        { label: this.$t('a_project_name'), field: 'aProjectName', style: { 'min-width': '100px' }},
        { label: this.$t('f_loan_accno'), field: 'fLoanAccountNo', style: { 'min-width': '100px' }},
        { label: this.$t('a_loan_accno'), field: 'aLoanAccountNo', style: { 'min-width': '100px' }},
        { label: this.$t('f_loan_effdate'), field: 'fLoanEffectiveDate', style: { 'min-width': '130px' }},
        { label: this.$t('a_loan_effdate'), field: 'aLoanEffectiveDate', style: { 'min-width': '130px' }},
        { label: this.$t('f_ins_policyno'), field: 'fInsPolicyNo', style: { 'min-width': '100px' }},
        { label: this.$t('a_ins_policyno'), field: 'aInsPolicyNo', style: { 'min-width': '100px' }},
        { label: this.$t('f_ins_idcard'), field: 'fInsIdCard', style: { 'min-width': '100px' }},
        { label: this.$t('a_ins_idcard'), field: 'aInsIdCard', style: { 'min-width': '100px' }},
        { label: this.$t('f_ins_effdate'), field: 'fInsEffectiveDate', style: { 'min-width': '130px' }},
        { label: this.$t('a_ins_effdate'), field: 'aInsEffectiveDate', style: { 'min-width': '130px' }},
        { label: this.$t('f_channel'), field: 'fChannel', style: { 'min-width': '100px' }},
        { label: this.$t('f_trans_accno'), field: 'fTransferAccountNo', style: { 'min-width': '100px' }},
        { label: this.$t('f_trans_amt'), field: 'fTransferAmount', style: { 'min-width': '100px' }},
        { label: this.$t('a_total_premium'), field: 'aTotalPremium', style: { 'min-width': '100px' }}
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
      criteria.infId = this.id
      console.log('criteria++++', criteria )
      const response = await this.$axios.$post('/api/reconcileApp/findById', criteria)
      if (response.data) {
        this.datasource = response
      }
    },
    clearCriteria () {
      this.criteria = {}
    },
    goBack () {
      if ( this.mode =='view' ) {
        this.skipValidateUnsaved = true
      }
      this.$router.back()
    },
  }
}
</script>