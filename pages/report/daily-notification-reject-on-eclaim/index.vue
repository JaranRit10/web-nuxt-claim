<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('daily_notification_reject_on_eclaim') }}</h1><span> {{ $t('c.list') }}</span>
      </div>
      <div class="page__breadcrumb">
        <nuxt-link to="/">
          <i class="las la-home"></i> {{ $t('c.home') }}
        </nuxt-link> / {{ $t('report') }} / {{ $t('daily_notification_reject_on_eclaim') }}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('reserve-date', $event)">
          <i class="las la-angle-up" style="cursor: pointer;"></i> {{ $t('c.filter') }}
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
                    <label class="required">{{ $t('reject_date') }}</label>
                    <a-form-datepicker v-model="criteria.rejectStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.rejectStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('reject_date_to') }}</label>
                    <a-form-datepicker v-model="criteria.rejectEndDate" />
                    <div class="invalid-feedback" v-show="!$v.criteria.rejectEndDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                </b-row>
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
                    <label class="required">{{ $t('surveyor_type_report') }}</label>
                    <treeselect v-model="criteria.surveyorType" :options="surveyorTypeList" :placeholder="$t('c.all')" />
                    <div class="invalid-feedback" v-show="!$v.criteria.surveyorType.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('surveyor_company') }}</label>
                    <treeselect v-model="criteria.companyCode" :options="surveyorCompanyList" :placeholder="$t('c.all')" />
                    <div class="invalid-feedback" v-show="!$v.criteria.companyCode.required">
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
  async fetch () {
    this.surveyorCompanyList = await this.$axios.$get('api/dropdown/getSurveyorCompany')
    this.surveyorTypeList = await this.$axios.$get('api/dropdown/lov/SURVEYOR_TYPE')
    // this.partnerTypeList = await this.$axios.$get('/api/dropdown/lov/PARTNER_TYPE')
    // this.memberSubTypeList = await this.$axios.$get('/api/dropdown/lov/MEMBER_SUB_TYPE')
    // this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    // // thai
    // this.provinceList = await this.$axios.$get('/api/dropdown/getProvince')

  },
  data () {
    return {
      criteria: {},
      surveyorCompanyList: [],
      surveyorTypeList: [],
    }
  },
  validations: {
    criteria: {
      rejectStartDate: { required },
      rejectEndDate: { required },
      notifyStartDate: { required },
      notifyEndDate: { required },
      accidentStartDate: { required },
      accidentEndDate: { required },
      surveyorType: { required },
      companyCode: { required },
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
      params[params.length] = `P_REJECT_SD=${this.criteria.rejectStartDate == undefined?'':this.criteria.rejectStartDate}`
      params[params.length] = `P_REJECT_ED=${this.criteria.rejectEndDate == undefined?'':this.criteria.rejectEndDate}`
      params[params.length] = `P_NOTIFY_SD=${this.criteria.notifyStartDate == undefined?'':this.criteria.notifyStartDate}`
      params[params.length] = `P_NOTIFY_ED=${this.criteria.notifyEndDate == undefined?'':this.criteria.notifyEndDate}`
      params[params.length] = `P_ACCIDENT_SD=${this.criteria.accidentStartDate == undefined?'':this.criteria.accidentStartDate}`
      params[params.length] = `P_ACCIDENT_ED=${this.criteria.accidentEndDate == undefined?'':this.criteria.accidentEndDate}`
      params[params.length] = `P_SURVEYOR_TYPE=${this.criteria.surveyorType == undefined?'':this.criteria.surveyorType}`
      params[params.length] = `P_COMPANY_CODE=${this.criteria.companyCode == undefined?'':this.criteria.companyCode}`
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
