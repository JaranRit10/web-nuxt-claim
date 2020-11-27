<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('claim_inquiry') }}</h1> <span>{{ $t('c.list') }}</span>
      </div>
      <div class="page__breadcrumb">
        <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('claim_inquiry') }}
      </div>
    </div>

    <!-- Search Criteria -->
    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('search-criteria', $event)">
          <i class="las la-angle-up"></i>
          {{ $t('c.filter') }}
        </div>
        <div class="action">
          <button class="btn btn-primary ml-2" @click="search()">
            <i class="las la-search"></i> {{ $t('c.search') }}
          </button>
          <button class="btn btn-warning ml-2" @click="clearCriteria()">
            <i class="las la-undo-alt"></i> {{ $t('c.clear') }}
          </button>
        </div>
      </div>
      <b-collapse visible id="search-criteria">
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('claim_noti_no') }}</label>
              <b-form-input v-model="criteria.claimNotiNo" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('claim_no') }}</label>
              <b-form-input v-model="criteria.claimNo" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('policy_no') }}</label>
              <b-form-input v-model="criteria.policyNo" />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('car_license_no') }}</label>
              <b-form-input v-model="criteria.carLicenseNo" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('chassis_no') }}</label>
              <b-form-input v-model="criteria.chassisNo" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('policy_type') }}</label>
              <treeselect v-model="criteria.policyTypeId" :options="policyTypeList" :placeholder="$t('c.all')" />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('engine_number') }}</label>
              <b-form-input v-model="criteria.engineNumber" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('noti_from_date') }}</label>
              <a-form-datepicker v-model="criteria.notiDateFrom" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('noti_to_date') }}</label>
              <a-form-datepicker v-model="criteria.notiDateTo" />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('insured_name') }}</label>
              <b-form-input v-model="criteria.insuredName" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('notify_name') }}</label>
              <b-form-input v-model="criteria.notifyName" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('driver_name') }}</label>
              <b-form-input v-model="criteria.driverName" />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('source_of_claim') }}</label>
              <treeselect v-model="criteria.sourceClaimId" :options="sourceClaimList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('c.status') }}</label>
              <treeselect v-model="criteria.status" :options="statusList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3">
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>

    <!-- Search Result -->
    <div class="card">
      <div class="card-body">
        <a-table :id="$route.name"
                 :datasource="datasource"
                 :columns="columns"
                 :paging="paging"
                 @refresh="search"
        >
          <template slot="tableAction"></template>
          <template slot="tableBody">
            <tr v-for="obj in datasource.data" :key="obj.applicationId" @dblclick="gotoView(obj.applicationId)">
              <td class="text-center">{{ obj.id }}</td>
              <td class="text-center">{{ obj.claimNotiNo }}</td>
              <td class="text-center">{{ obj.claimNo }}</td>
              <td class="text-center">{{ obj.policyNo }}</td>
              <td class="text-center">{{ obj.policyType }}</td>
              <td class="text-center">{{ obj.carLicenseNo }}</td>
              <td class="text-center">{{ obj.chassisNo }}</td>
              <td class="text-center">{{ obj.engineNumber }}</td>
              <td class="text-left">{{ obj.insuredName }}</td>
              <td class="text-center">{{ obj.notifyDate }}</td>
              <td class="text-left">{{ obj.notifyName }}</td>
              <td class="text-right">{{ obj.sourceOfClaim | emptyToDash }}</td>
              <td class="text-center">{{ obj.policyEffectiveDate }}</td>
              <td class="text-center">{{ obj.policyExpireDate }}</td>
              <td class="text-center">{{ obj.status }}</td>
              <td>
                <div class="btn-action-group">
                  <button class="btn btn-sm btn-primary"
                          v-b-tooltip:page.bottom.hover="$t('c.view')"
                          @click="gotoView(obj.applicationId)"
                  ><i class="las la-md la-eye"></i>
                  </button>
                </div>
              </td>
            </tr>
            <!-- <tr>
              <td class="text-center">0123456789</td>
              <td class="text-center">0123456789</td>
              <td class="text-center">0123456789</td>
              <td class="text-center">0123456789</td>
              <td class="text-left">0123456789</td>
              <td class="text-left">0123456789</td>
              <td class="text-left">0123456789</td>
              <td class="text-center">0123456789</td>
              <td class="text-center">0123456789</td>
              <td class="text-center">0123456789</td>
              <td class="text-right">0123456789</td>
              <td class="text-center">0123456789</td>
              <td class="text-center">0123456789</td>
              <td>Active</td>
              <td>
                <div class="btn-action-group">
                  <button class="btn btn-sm btn-primary"
                          v-b-tooltip:page.bottom.hover="$t('c.view')"
                          @click="gotoView(1)"
                  ><i class="las la-md la-eye"></i>
                  </button>
                </div>
              </td>
            </tr> -->
          </template>
        </a-table>
      </div>
      <!-- /card-body -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'ClaimInquiryList',
  mixins: [CommonMixin],
  async fetch () {
    // this.statusList = await this.$axios.$get('/api/dropdown/lov/APPLICATION_STATUS')
    // this.productSubClassList = await this.$axios.$get('/api/dropdown/lov/SUB_CLASS')
  },
  data () {
    return {
      criteria: {},
      statusList: [],
      sourceClaimList: [],
      policyTypeList: [],
      datasource: {
        data: [
          {
            id: 1,
            claimNotiNo: 'A2020082500006',
            claimNo: 'A202009080011',
            policyNo: '29545578',
            policyType: 'ประเภทที่ 1',
            carLicenseNo: '1กว 2234',
            chassisNo: '32125',
            engineNumber: '324125983',
            insuredName: 'สมศัก',
            notifyDate: '10/09/2020',
            notifyName: 'สมหญิง',
            sourceOfClaim: '',
            policyEffectiveDate: '10/09/2020',
            policyExpireDate: '10/09/2021',
            status: 'รอยืนยันกรมธรรม์',
          },
          {
            id: 2,
            claimNotiNo: 'A2020082500006',
            claimNo: 'A202009080012',
            policyNo: '12345678',
            policyType: 'ประเภทที่ 1',
            carLicenseNo: '1กพ 2560',
            chassisNo: '12345',
            engineNumber: '324125983',
            insuredName: 'สมชาย',
            notifyDate: '08/09/2020',
            notifyName: 'สมหญิง',
            sourceOfClaim: '',
            policyEffectiveDate: '08/09/2020',
            policyExpireDate: '08/09/2021',
            status: 'รอยืนยันกรมธรรม์',
          },
        ],
      },
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
        { label: this.$t('c.no'), sortable: false, filterable: false, style: { 'width': '40px', 'min-width': '50px' }},
        { label: this.$t('claim_noti_no'), field: 'claimNotiNo', style: { 'min-width': '150px' }},
        { label: this.$t('claim_no'), field: 'claimNo', style: { 'min-width': '130px' }},
        { label: this.$t('policy_no'), field: 'policyNo', style: { 'min-width': '130px' }},
        { label: this.$t('policy_type'), field: 'policyType', style: { 'min-width': '130px' }},
        { label: this.$t('car_license_no'), field: 'carLicenseNo', style: { 'min-width': '130px' }},
        { label: this.$t('chassis_no'), field: 'chassisNo', style: { 'min-width': '130px' }},
        { label: this.$t('engine_number'), field: 'engineNumber', style: { 'min-width': '130px' }},
        { label: this.$t('insured_name'), field: 'insuredName', style: { 'min-width': '130px' }},
        { label: this.$t('notify_date'), field: 'notifyDate', style: { 'min-width': '130px' }},
        { label: this.$t('notify_name'), field: 'notifyName', style: { 'min-width': '110px' }},
        { label: this.$t('source_of_claim'), field: 'sourceOfClaim', style: { 'min-width': '130px' }},
        { label: this.$t('policy_effective_date'), field: 'policyEffectiveDate', style: { 'min-width': '150px', width: '150px'}},
        { label: this.$t('policy_expire_date'), field: 'policyExpireDate', style: { 'min-width': '130px' }},
        { label: this.$t('c.status'), field: 'status', style: { 'min-width': '100px' }},
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { 'min-width': '70px' }}
      ]
      return col
    }
  },
  activated () {
    this.search()
  },
  methods: {
    async search () {
      // const criteria = { ...this.criteria, ...this.paging }
      // const response = await this.$axios.$post('/api/inqApp/findByCriteria', criteria)
      // if (response.data) {
      //   this.datasource = response
      // }
    },
    gotoView (applicationId) {
      this.$router.push({
        path: `/claim-inquiry/view?id=${applicationId}`
      })
    },
    clearCriteria () {
      this.criteria = {}
    },
  }
}
</script>