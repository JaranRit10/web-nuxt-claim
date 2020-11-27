<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('daily_notification_report') }}</h1><span> {{ $t('c.list') }}</span>
      </div>
      <div class="page__breadcrumb">
        <nuxt-link to="/">
          <i class="las la-home"></i> {{ $t('c.home') }}
        </nuxt-link> / {{ $t('report') }} / {{ $t('daily_notification_report') }}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('reserve-date', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('c.filter') }}
        </div>
        <div class="action">
          <button class="btn btn-primary ml-2" @click="viewReport()">
            <i class="las la-search"></i> <span>{{ $t('c.view_report') }}</span>
          </button>
          <button class="btn btn-warning ml-2" @click="clear()">
            <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
          </button>
        </div>
      </div>
      <b-collapse visible id="reserve-date">
        <div class="card-body">
          <b-row class="mb-2">
            <b-col md="12">
              <form @submit.prevent :class="{ 'dirty' : $v.$dirty }">
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('notify_date_report') }}</label>
                    <a-form-datepicker v-model="criteria.notifyStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.notifyStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('notify_date_report_to') }}</label>
                    <a-form-datepicker v-model="criteria.notifyEndDate" />
                    <div class="invalid-feedback" v-show="!$v.criteria.notifyEndDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('appointment_date_report') }}</label>
                    <a-form-datepicker v-model="criteria.appointStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.appointStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('appointment_date_report_to') }}</label>
                    <a-form-datepicker v-model="criteria.appointEndDate" />
                    <div class="invalid-feedback" v-show="!$v.criteria.appointEndDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('assign_date_report') }}</label>
                    <a-form-datepicker v-model="criteria.assignStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.assignStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('assign_date_report_to') }}</label>
                    <a-form-datepicker v-model="criteria.assignEndDate" />
                    <div class="invalid-feedback" v-show="!$v.criteria.assignEndDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('accident_date_report') }}</label>
                    <a-form-datepicker v-model="criteria.accidentStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.accidentStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('accident_date_report_to') }}</label>
                    <a-form-datepicker v-model="criteria.accidentEndDate" />
                    <div class="invalid-feedback" v-show="!$v.criteria.accidentEndDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('notify_no_report') }}</label>
                    <b-form-input v-model="criteria.notifyNo" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.notifyNo.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('claim_no_report') }}</label>
                    <b-form-input v-model="criteria.claimNo" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.claimNo.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                </b-row>
              </form>
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { required } from 'vuelidate/lib/validators'
import CommonMixin from '~/assets/js/CommonMixin'
import APP from '~/assets/js/Constant'

const data =
  {
    reserveDate: '',
    toReserveDate: '15/11/2020',
    reportNotifyDate: '12/11/2020',
    toReportNotifyDate: '15/11/2020',
    accidentDate: '12/11/2020',
    toAccidentDate: '15/11/2020',
  }

export default {
  mixins: [CommonMixin],
  data () {
    return {
      criteria: {},
    }
  },
  validations: {
    criteria: {
      notifyStartDate: { required },
      notifyEndDate: { required },
      appointStartDate: { required },
      appointEndDate: { required },
      assignStartDate: { required },
      assignEndDate: { required },
      accidentStartDate: { required },
      accidentEndDate: { required },
      notifyNo: { required },
      claimNo: { required },
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.criteria = cloneDeep(data)
      console.log('criteria..', this.criteria)
    },
    viewReport () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return false
      }

      console.log('view report')
    },
    exportFile () {
      let reportTest = 'RPT001_KTC_PREMIUM_PAYMENT_REPORT.rptdesign'
      let params = []
      params[params.length] = `__format=${APP.FILE_TYPE_XLSX}`
      params[params.length] = `__report=${reportTest}`
      params[params.length] = `P_USER_ID=${this.user.userid}`
      params[params.length] = `P_LOCALE=${this.$i18n.locale}`
      params[params.length] = `P_NOTIFY_SD=${this.criteria.notifyStartDate == undefined?'':this.criteria.notifyStartDate}`
      params[params.length] = `P_NOTIFY_ED=${this.criteria.notifyEndDate == undefined?'':this.criteria.notifyEndDate}`
      params[params.length] = `P_APPOMINT_SD=${this.criteria.appointStartDate == undefined?'':this.criteria.appointStartDate}`
      params[params.length] = `P_APPOMINT_ED=${this.criteria.appointEndDate == undefined?'':this.criteria.appointEndDate}`
      params[params.length] = `P_ASSIGN_SD=${this.criteria.assignStartDate == undefined?'':this.criteria.assignStartDate}`
      params[params.length] = `P_ASSIGN_ED=${this.criteria.assignEndDate == undefined?'':this.criteria.assignEndDate}`
      params[params.length] = `P_ACCIDENT_SD=${this.criteria.accidentStartDate == undefined?'':this.criteria.accidentStartDate}`
      params[params.length] = `P_ACCIDENT_ED=${this.criteria.accidentEndDate == undefined?'':this.criteria.accidentEndDate}`
      params[params.length] = `P_NOTIFY_NO=${this.criteria.notifyNo == undefined?'':this.criteria.notifyNo}`
      params[params.length] = `P_CLAIM_NO=${this.criteria.claimNo == undefined?'':this.criteria.claimNo}`
      params = params.join('&')
      params = encodeURIComponent(params).replace(/[!'()]/g, escape).replace(/\*/g, '%2A')

      window.open(`/api/BirtReportServlet?${params}`)
    },
    clearCriteria () {
      this.criteria = {}
    }
  }
}
</script>
