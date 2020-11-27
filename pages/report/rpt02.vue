<template>
  <div>
    <HasPerm any="report02_export">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('report') }}</h1> <span>{{ $t('daily_policy') }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }}  / {{ $t('report') }} / {{ $t('daily_policy') }}
        </div>
      </div>
      <!-- Search Criteria -->
      <div class="card">
        <div class="card-header">
          <div class="title">
            <i class="las la-angle-up" @click="toggleCollapse('search-criteria-report', $event)" style="cursor: pointer;"></i> {{ $t('c.filter') }}
          </div>
          <div class="action">
            <button class="btn btn-primary ml-2" @click="exportFile()">
              <i class="las la-search"></i> <span>{{ $t('view_report') }}</span>
            </button>
            <button class="btn btn-warning ml-2" @click="clearCriteria()">
              <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
            </button>
          </div>
        </div>
        <b-collapse visible id="search-criteria-report">
          <div class="card-body">
            <b-row align-h="around">
              <b-col sm="3" class="form-group">
                <label>{{ $t('payment_from_date') }}</label>
                <a-form-datepicker id="pStartDate" v-model="criteria.paymentStartDate" />
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('payment_to_date') }}</label>
                <a-form-datepicker id="pEndDate" v-model="criteria.paymentEndDate" />
              </b-col>
            </b-row>
            <b-row align-h="around">
              <b-col sm="3" class="form-group">
                <label>{{ $t('noti_from_date') }}</label>
                <a-form-datepicker id="nStartDate" v-model="criteria.notifyStartDate"></a-form-datepicker>
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('noti_to_date') }}</label>
                <a-form-datepicker id="nEndDate" v-model="criteria.notifyEndDate"></a-form-datepicker>
              </b-col>
            </b-row>
            <b-row align-h="around">
              <b-col sm="3" class="form-group">
                <label>{{ $t('effect_from_date') }}</label>
                <a-form-datepicker id="effStartDate" v-model="criteria.effectiveStartDate"></a-form-datepicker>
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('effect_to_date') }}</label>
                <a-form-datepicker id="effEndDate" v-model="criteria.effectiveEndDate"></a-form-datepicker>
              </b-col>
            </b-row>
          </div>
        </b-collapse>
      </div>
    </Hasperm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'
import APP from '~/assets/js/Constant'
export default {
  name: 'ReportDailyIssuePolicy',

  mixins: [CommonMixin],

  data () {
    return {
      criteria: {},
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale,
      user: state => state.auth.user
    }),
  },
  methods: {
    // async exportFile () {
    //   this.criteria.rptCode = APP.RPT01_CODE
    //   this.criteria.rptName = APP.RPT01_CODE
    //   this.criteria.format = APP.FILE_TYPE_XLSX
    //   this.criteria.reportDesignCode = APP.RPT03_DESIGN
    //   const data = await this.$axios.$post('/api/report/generate', this.criteria)
    //   if (data != false || !data.errCode) {
    //     let iframe = document.createElement('iframe')
    //     iframe.style.display = 'none'
    //     document.body.appendChild(iframe)
    //     iframe.contentWindow.document.write(data)
    //   }
    // },
    exportFile () {
      let reportTest = 'RPT002_KTC_DAILY_ISSUED_POLICY_REPORT.rptdesign'

      let params = []
      params[params.length] = `__format=${APP.FILE_TYPE_XLSX}`
      params[params.length] = `__report=${reportTest}`
      params[params.length] = `P_USER_ID=${this.user.userid}`
      params[params.length] = `P_LOCALE=${this.$i18n.locale}`
      params[params.length] = `P_PAYMENT_SD=${this.criteria.paymentStartDate == undefined?'':this.criteria.paymentStartDate}`
      params[params.length] = `P_PAYMENT_ED=${this.criteria.paymentEndDate == undefined?'':this.criteria.paymentEndDate}`
      params[params.length] = `P_NOTIFY_SD=${this.criteria.notifyStartDate == undefined?'':this.criteria.notifyStartDate}`
      params[params.length] = `P_NOTIFY_ED=${this.criteria.notifyEndDate == undefined?'':this.criteria.notifyEndDate}`
      params[params.length] = `P_EFFECTIVE_SD=${this.criteria.effectiveStartDate == undefined?'':this.criteria.effectiveStartDate}`
      params[params.length] = `P_EFFECTIVE_ED=${this.criteria.effectiveEndDate == undefined?'':this.criteria.effectiveEndDate}`
      params = params.join('&')
      params = encodeURIComponent(params).replace(/[!'()]/g, escape).replace(/\*/g, '%2A')

      window.open(`/api/BirtReportServlet?${params}`)
    },
    clearCriteria () {
      this.criteria = {}
    }
  },
}
</script>
