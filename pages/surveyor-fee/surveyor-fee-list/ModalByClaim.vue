<template>
  <b-modal
    style="min-width: 800px"
    id="modal-by-claim"
    ref="modal"
    headerClass="p-2"
    :header-bg-variant="'info'"
    :header-text-variant="'light'"
    size="xl"
    @show="Opened"
    @hidden="closed"
    @ok="handleOk"
    :no-close-on-backdrop="true"
  >
    <template v-slot:modal-header="{ close }">
      <h4 class="title pt-2">
        {{ params.title }}
      </h4>
      <div class="text-right pt-2 pr-3">
        <button @click="close()" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span class="text-light" aria-hidden="true">&times;</span>
        </button>
      </div>
    </template>

    <!-- body -->
    <div>
      <b-row class="mb-4">
        <b-col>
          <a-table
            :id="$route.name"
            :datasource="datasourceClaim"
            :columns="columnsClaim"
            :paging="pagingClaim"
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
              </tr>
            </template>
          </a-table>
        </b-col>
      </b-row>
      <!--  -->
      <b-row>
        <b-col>
          <a-table
            :id="$route.name"
            :datasource="datasourceRules"
            :columns="columnsRules"
            :paging="pagingRules"
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
              </tr>
            </template>
          </a-table>
        </b-col>
      </b-row>
    </div>

    <template v-slot:modal-footer="{ close }">
      <button class="btn btn-success" @click="handleOk()">
        {{ $t("c.ok") }}
      </button>
      <button class="btn btn-default" @click="close()">
        {{ $t("c.cancel") }}
      </button>
    </template>

  </b-modal>
</template>

<script>
import { cloneDeep } from 'lodash'
import CommonMixin from '~/assets/js/CommonMixin'
import App from '~/assets/js/Constant'

export default {
  mixins: [CommonMixin],
  props: ['params'],
  data () {
    return {
      data: {},
      error: {},
      datasourceRules: {},
      datasourceClaim: {},
      pagingRules: {},
      pagingClaim: {},
      APP: App,
    }
  },
  computed: {
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
      ]
      return col
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.pagingRules = cloneDeep(this.APP.paging)
      this.pagingClaim = cloneDeep(this.APP.paging)
    })
  },
  methods: {
    Opened () {
      this.$nextTick(() => {
        this.search()
      })

    },
    closed () {
      // this.data = {}
    },
    search () {
      this.datasourceRules = cloneDeep(this.params.rules) || {}
      this.datasourceClaim = cloneDeep(this.params.claim) || {}
      // console.log('params rule..', this.params.rules)
      // console.log('params claim..', this.params.claim)
    },

    handleOk (bvModalEvt) {
      this.params.onConfirm({success: true})
      this.$bvModal.hide('modal-by-claim')
      this.toast('success', this.$t('c.success__save'))
    },
  }
}
</script>
