<template>
  <div>
    <!-- <HasPerm any="report006_menu"> -->
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('surveyor_fee_report') }}</h1><span> {{ $t('c.list') }}</span>
      </div>
      <div class="page__breadcrumb">
        <nuxt-link to="/">
          <i class="las la-home"></i> {{ $t('c.home') }}
        </nuxt-link> / {{ $t('report') }} / {{ $t('surveyor_fee_report') }}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('surveyor-fee-report', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('c.filter') }}
        </div>
        <div class="action">
          <!-- <HasPerm any="report006_export"> -->
          <button class="btn btn-primary ml-2" @click="viewReport()">
            <i class="las la-search"></i> <span>{{ $t('c.view_report') }}</span>
          </button>
          <!-- </HasPerm> -->
          <button class="btn btn-warning ml-2" @click="clear()">
            <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
          </button>
        </div>
      </div>
      <b-collapse visible id="surveyor-fee-report">
        <div class="card-body">
          <b-row class="mb-2">
            <b-col md="12">
              <form @submit.prevent :class="{ 'dirty' : $v.$dirty }">
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('report_notify_date') }}</label>
                    <a-form-datepicker v-model="criteria.notifyStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.notifyStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('to_report_notify_date') }}</label>
                    <a-form-datepicker v-model="criteria.notifyEndDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.notifyEndDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('assign_date') }}</label>
                    <a-form-datepicker v-model="criteria.accidentStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.accidentStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('to_assign_date') }}</label>
                    <a-form-datepicker v-model="criteria.accidentEndDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.accidentEndDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('report_surveyor_type') }}</label>
                    <treeselect v-model="criteria.surveyorType" :options="surveyorTypeList" :placeholder="$t('c.all')" />
                    <div class="invalid-feedback" v-show="!$v.criteria.surveyorType.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3"></b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('report_surveyor_company') }}</label>
                    <treeselect v-model="criteria.companyCode" :options="companyCodeList" :placeholder="$t('c.all')" />
                    <div class="invalid-feedback" v-show="!$v.criteria.companyCode.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3"></b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('report_surveyor') }}</label>
                    <treeselect v-model="criteria.surveyorCode" :options="surveyorCodeList" :placeholder="$t('c.all')" />
                    <div class="invalid-feedback" v-show="!$v.criteria.surveyorCode.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3"></b-col>
                </b-row>
              </form>
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <!-- </HasPerm> -->
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'
import APP from '~/assets/js/Constant'

const data =
  {
    notifyStartDate: '',
    notifyEndDate: '15/11/2020',
    accidentStartDate: '12/11/2020',
    accidentEndDate: '15/11/2020',
    surveyorType: '1',
    companyCode: '2',
    surveyorCode: '1'
  }
const dataSurveyorCompanyList = [
  {
    id: 1,
    label: '1 - CompanyList',
    value: '1'
  },
  {
    id: 2,
    label: '2 - CompanyList',
    value: '2'
  }
]
const dataSurveyorList = [
  {
    id: 1,
    label: '1 - Surveyor',
    value: '1'
  },
  {
    id: 2,
    label: '2 - Surveyor',
    value: '2'
  }
]

export default {
  mixins: [CommonMixin],
  async fetch () {
    this.surveyorTypeList = await this.$axios.$get('api/dropdown/lov2/SURVEYOR_TYPE')
    // this.companyCodeList = await this.$axios.$get('api/dropdown/getSurveyorCompany')
    // this.surveyorCodeList = await this.$axios.$get('api/dropdown/getSurveyor')
    // console.log('surveyorTypeList..', this.surveyorTypeList)
    // console.log('companyCodeList..', this.companyCodeList)
    // console.log('surveyorCodeList..', this.surveyorCodeList)
    this.companyCodeList = dataSurveyorCompanyList
    this.surveyorCodeList = dataSurveyorList
  },
  data () {
    return {
      criteria: {},
      surveyorTypeList: {},
      companyCodeList: {},
      surveyorCodeList: {},
    }
  },
  validations: {
    criteria: {
      notifyStartDate: { required },
      notifyEndDate: { required },
      accidentStartDate: { required },
      accidentEndDate: { required },
      surveyorType: { required },
      companyCode: { required },
      surveyorCode: { required }
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  watch: {
    criteria () {
      this.criteria = data
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      this.criteria = await data
      // console.log('criteria get..', this.criteria)
    },
    viewReport () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return false
      }

      let reportTest = 'RPT006_SURVEYOR_FEE.rptdesign'
      let params = []
      params[params.length] = `__format=${APP.FILE_TYPE_XLSX}`
      params[params.length] = `__report=${reportTest}`
      params[params.length] = `P_USER_ID=${this.user.userid}`
      params[params.length] = `P_LOCALE=${this.$i18n.locale}`
      params[params.length] = `P_NOTIFY_SD=${this.criteria.notifyStartDate == undefined?'':this.criteria.notifyStartDate}`
      params[params.length] = `P_NOTIFY_ED=${this.criteria.notifyEndDate == undefined?'':this.criteria.notifyEndDate}`
      params[params.length] = `P_ACCIDENT_SD=${this.criteria.accidentStartDate == undefined?'':this.criteria.accidentStartDate}`
      params[params.length] = `P_ACCIDENT_ED=${this.criteria.accidentEndDate == undefined?'':this.criteria.accidentEndDate}`
      params[params.length] = `P_SURVEYOR_TYPE=${this.criteria.surveyorType == undefined?'':this.criteria.surveyorType}`
      params[params.length] = `P_COMPANY_CODE=${this.criteria.companyCode == undefined?'':this.criteria.companyCode}`
      params[params.length] = `P_SURVEYOR_CODE=${this.criteria.surveyorCode == undefined?'':this.criteria.surveyorCode}`

      params = encodeURIComponent(params.join('&')).replace(/[!'()]/g, escape).replace(/\*/g, '%2A')

      window.open(`/api/BirtReportServlet?${params}`)
    },
    clear () {
      this.criteria = {}
    },
  }
}
</script>
