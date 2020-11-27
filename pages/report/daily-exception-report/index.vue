<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('reserve_date') }}</h1><span> {{ $t('c.list') }}</span>
      </div>
      <div class="page__breadcrumb">
        <nuxt-link to="/">
          <i class="las la-home"></i> {{ $t('c.home') }}
        </nuxt-link> / {{ $t('report') }} / {{ $t('reserve_date') }}
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
                    <label class="required">{{ $t('system_to_system') }}</label>
                    <treeselect v-model="criteria.systemCode" :options="systemCodeList" :disabled="false" :placeholder="$t('c.please_select')" />
                    <div class="invalid-feedback" v-show="!$v.criteria.systemCode.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3"></b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col md="3">
                    <label class="required">{{ $t('report_transaction_date') }}</label>
                    <a-form-datepicker v-model="criteria.transactionStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.transactionStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('to_report_transaction_date') }}</label>
                    <a-form-datepicker v-model="criteria.transactionEndDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.transactionEndDate.required">
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
// import { cloneDeep } from 'lodash'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'
import APP from '~/assets/js/Constant'

const data =
  {
    systemCode: '1',
    transactionStartDate: '15/11/2020',
    transactionEndDate: '12/11/2020',
  }

const systemToSystemListImport = [
  {
    id: 1,
    label: '1 - system',
    value: '1'
  },
  {
    id: 2,
    label: '2 - system',
    value: '2'
  }
]

export default {
  mixins: [CommonMixin],
  fetch () {
    this.systemCodeList = systemToSystemListImport
  },
  data () {
    return {
      criteria: {},
      systemCodeList: {},
    }
  },
  validations: {
    criteria: {
      transactionStartDate: { required },
      transactionEndDate: { required },
      systemCode: { required },
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
    getDetail () {
      this.criteria = data
      console.log('criteria..', this.criteria)
    },
    viewReport () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return false
      }

      let reportTest = 'RPT004_DAILY_EXCEPTION_REPORT.rptdesign'
      let params = []
      params[params.length] = `__format=${APP.FILE_TYPE_XLSX}`
      params[params.length] = `__report=${reportTest}`
      params[params.length] = `P_USER_ID=${this.user.userid}`
      params[params.length] = `P_LOCALE=${this.$i18n.locale}`
      params[params.length] = `P_SYSTEM_CODE=${this.criteria.transactionStartDate == undefined?'':this.criteria.transactionStartDate}`
      params[params.length] = `P_TRANSACTION_SD=${this.criteria.transactionEndDate == undefined?'':this.criteria.transactionEndDate}`
      params[params.length] = `P_TRANSACTION_ED=${this.criteria.systemCode == undefined?'':this.criteria.systemCode}`

      params = encodeURIComponent(params.join('&')).replace(/[!'()]/g, escape).replace(/\*/g, '%2A')

      window.open(`/api/BirtReportServlet?${params}`)
    },
    clear () {
      this.criteria = {}
    },
  }
}
</script>
