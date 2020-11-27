<template>
  <div>
    <!-- <HasPerm any=""> -->
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
                    <label class="required">{{ $t('reserve_date') }}</label>
                    <a-form-datepicker v-model="criteria.reserveStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.reserveStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('to_reserve_date') }}</label>
                    <a-form-datepicker v-model="criteria.reserveEndDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.reserveEndDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                </b-row>
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
                    <label class="required">{{ $t('accident_date') }}</label>
                    <a-form-datepicker v-model="criteria.accidentStartDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.accidentStartDate.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-col>
                  <b-col md="3">
                    <label class="required">{{ $t('to_accident_date') }}</label>
                    <a-form-datepicker v-model="criteria.accidentEndDate" :disabled="false" />
                    <div class="invalid-feedback" v-show="!$v.criteria.accidentEndDate.required">
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
    <!-- </HasPerm> -->
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
    reserveStartDate: '',
    reserveEndDate: '15/11/2020',
    notifyStartDate: '12/11/2020',
    notifyEndDate: '15/11/2020',
    accidentStartDate: '12/11/2020',
    accidentEndDate: '15/11/2020',
  }

export default {
  mixins: [CommonMixin],
  // async fetch () {
  //   this.criteria = await data
  //   console.log('criteria f..', this.criteria)
  // },
  data () {
    return {
      criteria: {},
    }
  },
  validations: {
    criteria: {
      reserveStartDate: { required },
      reserveEndDate: { required },
      notifyStartDate: { required },
      notifyEndDate: { required },
      accidentStartDate: { required },
      accidentEndDate: { required },
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
      // this.$set(this.criteria, data)
      console.log('criteria..', this.criteria)
    },
    viewReport () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return false
      }

      let reportTest = 'RPT003_DAILY_RESERVE_REPORT.rptdesign'
      let params = []
      params[params.length] = `__format=${APP.FILE_TYPE_XLSX}`
      params[params.length] = `__report=${reportTest}`
      params[params.length] = `P_USER_ID=${this.user.userid}`
      params[params.length] = `P_LOCALE=${this.$i18n.locale}`
      params[params.length] = `P_RESERVE_SD=${this.criteria.reserveStartDate == undefined?'':this.criteria.reserveStartDate}`
      params[params.length] = `P_RESERVE_ED=${this.criteria.reserveEndDate == undefined?'':this.criteria.reserveEndDate}`
      params[params.length] = `P_NOTIFY_SD=${this.criteria.notifyStartDate == undefined?'':this.criteria.notifyStartDate}`
      params[params.length] = `P_NOTIFY_ED=${this.criteria.notifyEndDate == undefined?'':this.criteria.notifyEndDate}`
      params[params.length] = `P_ACCIDENT_SD=${this.criteria.accidentStartDate == undefined?'':this.criteria.accidentStartDate}`
      params[params.length] = `P_ACCIDENT_ED=${this.criteria.accidentEndDate == undefined?'':this.criteria.accidentEndDate}`

      params = encodeURIComponent(params.join('&')).replace(/[!'()]/g, escape).replace(/\*/g, '%2A')

      window.open(`/api/BirtReportServlet?${params}`)
    },
    clear () {
      this.criteria = {}
    },
  }
}
</script>
