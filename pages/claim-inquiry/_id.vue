<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1 v-if="mode == 'view'">{{ $t('claim_inquiry') }}</h1> <span>{{ $t(`c.${mode}`) }}</span>
      </div>
      <div class="page__breadcrumb">
        <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('claim_inquiry') }}
      </div>
    </div>

    <!-- Search Criteria -->
    <div class="card">
      <div class="card-header">
        <div class="tab">
          <i class="las la-info-circle"></i> {{ $t('c.general') }}
        </div>
        <div class="action">
          <button class="btn btn-secondary ml-2" @click="gotoBack()"><i class="las la-arrow-left"></i> {{ $t('c.back') }}</button>
          <button class="btn btn-info ml-2" @click="systemLog()"><i class="las la-history"></i> {{ $t('system_log') }}</button>
        </div>
      </div>
      <div class="card-body">
        <b-row align-h="around" class="form-group">
          <b-col sm="3">
            <label>{{ $t('claim_noti_no') }}</label>
            <b-form-input v-model="form.claimNotiNo" disabled />
          </b-col>
          <b-col sm="3">
            <label>{{ $t('claim_no') }}</label>
            <b-form-input v-model="form.claimNo" disabled />
          </b-col>
          <b-col sm="3">
            <label>{{ $t('claim_times', { label: '' }) }}</label>
            <b-form-input v-model="form.claimTimes" disabled />
          </b-col>
        </b-row>
        <b-row align-h="around" class="form-group">
          <b-col sm="3">
            <label>{{ $t('car_license_no') }}</label>
            <b-form-input v-model="form.carLicenseNo" disabled />
          </b-col>
          <b-col sm="3">
            <label>{{ $t('chassis_no') }}</label>
            <b-form-input v-model="form.chassisNo" disabled />
          </b-col>
          <b-col sm="3">
            <label>{{ $t('engine_number') }}</label>
            <b-form-input v-model="form.engineNumber" disabled />
          </b-col>
        </b-row>
        <b-row align-h="around" class="form-group">
          <b-col sm="3">
            <label>{{ $t('notify_name') }}</label>
            <b-form-input v-model="form.notifyName" disabled />
          </b-col>
          <b-col sm="3">
            <label>{{ $t('notify_date') }}</label>
            <a-form-datepicker v-model="form.notifyDate" disabled />
          </b-col>
          <b-col sm="3">
            <label>{{ $t('claim_issue_date') }}</label>
            <a-form-datepicker v-model="form.claimIssueDate" disabled />
          </b-col>
        </b-row>
        <b-row align-h="around" class="form-group">
          <b-col sm="3">
            <label>{{ $t('source_of_claim') }}</label>
            <treeselect v-model="form.sourceClaimId" :options="sourceClaimList" disabled />
          </b-col>
          <b-col sm="3">
            <label>{{ $t('c.created_by') }}</label>
            <b-form-input v-model="form.createdBy" disabled />
          </b-col>
          <b-col sm="3">
            <label>{{ $t('c.status') }}</label>
            <treeselect v-model="form.status" :options="statusList" disabled />
          </b-col>
        </b-row>
        <b-row align-h="around" class="form-group">
          <b-col sm="3">
            <label>{{ $t('claim_type') }}</label>
            <treeselect v-model="form.claimTypeId" :options="claimTypeList" disabled />
          </b-col>
          <b-col sm="3">
            <label>{{ $t('claim_reference') }}</label>
            <treeselect v-model="form.claimRefId" :options="claimRefList" disabled />
          </b-col>
          <b-col sm="3"></b-col>
        </b-row>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="tab">
          <i class="las la-file"></i> {{ $t('claim_version') }}
        </div>
      </div>
      <div class="card-body">
        <b-row align-h="center" class="mb-3">
          <b-col sm="8">
            <a-table
              :id="$route.name"
              :datasource="form"
              :paging="paging"
              :columns="columnsClaimVersion"
              :isFilter="false"
              :isSort="false"
              :isPaging="false"
            >
              <template slot="tableAction"></template>
              <template slot="tableBody">
                <!-- <tr v-for="(v, index) in form" :key="index"> -->
                <tr v-for="(v, index) in form.claimVersionList" :key="index" :class="{'viewActive' : rowIndex == index}" @dblclick="rowIndex = index">
                  <td class="text-right">{{ v.version }}</td>
                  <td class="text-right">{{ v.created }}</td>
                  <td>{{ v.status }}</td>
                  <td>
                    <div class="btn-action-group">
                      <button
                        class="btn btn-sm" :class="{'btn-primary' : rowIndex == index, 'btn-secondary' : rowIndex != index}"
                        @click="rowIndex = index"
                        v-b-tooltip:page.bottom.hover="$t('c.view')"
                      >
                        <i class="las la-md" :class="{'la-eye' : rowIndex == index, 'la-eye-slash' : rowIndex != index}"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </a-table>
          </b-col>
        </b-row>
        <div class="card" id="claimInquiry">
          <div class="card-header">
            <div class="tab" :class="{ 'active' : tabIndex == 1 }" @click="tabIndex = 1">{{ $t('claim_balance') }}</div>
            <div class="tab" :class="{ 'active' : tabIndex == 2 }" @click="tabIndex = 2">{{ $t('c.tab_detail', { tab: $t('claim') }) }}</div>
            <div class="tab" :class="{ 'active' : tabIndex == 3 }" @click="tabIndex = 3">{{ $t('c.tab_detail', { tab: $t('accident') }) }}</div>
            <div class="tab" :class="{ 'active' : tabIndex == 4 }" @click="tabIndex = 4">{{ $t('c.tab_detail', { tab: $t('repair_price') }) }}</div>
            <div class="tab" :class="{ 'active' : tabIndex == 5 }" @click="tabIndex = 5">Claim Activities &amp; Comment</div>
            <div class="tab" :class="{ 'active' : tabIndex == 6 }" @click="tabIndex = 6">{{ $t('claim_counter') }}</div>
          </div>
          <div class="card-body">
            <!-- Tab Policy Details -->
            <div v-if="tabIndex == 1">
              <ClaimBalance />
            </div>

            <!-- Tab Claim Details -->
            <div v-if="tabIndex == 2">
              <ClaimDetails />
            </div>
            <!-- Tab Accident Details -->
            <div v-if="tabIndex == 3">
              <AccidentDetails />
            </div>
            <!-- Tab Repair Price Details -->
            <div v-if="tabIndex == 4">
              <RepairPriceDetails />
            </div>
            <!-- Tab Claim Activities & Comment -->
            <div v-if="tabIndex == 5">
              <ClaimActivities />
            </div>
            <!-- Tab Claim Counter -->
            <div v-if="tabIndex == 6">
              <ClaimCounter />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import findIndex from 'lodash/findIndex'
import { AccidentDetails, ClaimActivities, ClaimCounter, ClaimDetails, ClaimBalance, RepairPriceDetails } from '~/pages/claim-inquiry/tabs/tabs'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'ClaimInquiryDetail',
  components: {
    AccidentDetails,
    ClaimActivities,
    ClaimCounter,
    ClaimDetails,
    ClaimBalance,
    RepairPriceDetails
  },
  mixins: [CommonMixin],
  asyncData (context) {
    const mode = context.params.id
    const id = context.query.id

    return {
      mode,
      id
    }

  },

  data () {
    return {
      rowIndex: null,
      claimRefList: [
        {
          id: 1,
          label: '-'
        }
      ],
      claimTypeList: [
        {
          id: 1,
          label: '-'
        }
      ],
      statusList: [
        {
          id: 1,
          label: '-'
        }
      ],
      sourceClaimList: [
        {
          id: 1,
          label: '-'
        }
      ],
      form: {
        claimNotiNo: 'A2020082500006',
        claimNo: 'A202009080011',
        claimTimes: '1',
        carLicenseNo: '1กว 2234',
        chassisNo: '32125',
        engineNumber: '324125983',
        notifyDate: '10/09/2020',
        claimIssueDate: '11/09/2020',
        notifyName: 'สมหญิง',
        sourceClaimId: 1,
        createdBy: 'สมแล้ว',
        claimTypeId: 1,
        claimRefId: 1,
        status: 1,
        claimVersionList: [
          {
            version: 1,
            created: '10/03/2020',
            status: 'Inactive'
          },
          {
            version: 2,
            created: '11/03/2020',
            status: 'Inactive'
          },
          {
            version: 3,
            created: '12/03/2020',
            status: 'Active'
          },
        ],
        coverageList: [
          { seq: 1, coverageCode: 'TPBI/Person', coverageName: 'ความคุ้มครองความรับผิดต่อบุคคลภายนอก ว่าด้วยความเสียหายต่อชีวิต ร่างกาย หรืออนามัย เฉพาะส่วนเกินวงเงินสูงสุดตาม พรบ.', sumInsureAmt: '1000000', unit: 'ต่อคน และจ่ายเฉพาะส่วนเกินวงเงินสูงสุดตาม พรบ.' },
          { seq: 2, coverageCode: 'TPBI/Accident', coverageName: 'ความคุ้มครองความรับผิดต่อบุคคลภายนอก ว่าด้วยความเสียหายต่อชีวิต ร่างกาย หรืออนามัย เฉพาะส่วนเกินวงเงินสูงสุดตาม พรบ.', sumInsureAmt: '10000000', unit: 'ต่อครั้ง และจ่ายเฉพาะส่วนเกินวงเงินสูงสุดตาม พรบ.' },
          { seq: 3, coverageCode: 'TPPD', coverageName: 'ความคุ้มครองความรับผิดต่อบุคคลภายนอก ว่าด้วยความเสียหายต่อทรัพย์สิน', sumInsureAmt: '1000000', unit: 'ต่อครั้ง' },
          { seq: 4, coverageCode: 'OD', coverageName: 'ความคุ้มครองความเสียหายต่อรถยนต์', sumInsureAmt: '250000', unit: 'ต่อครั้ง' },
          { seq: 5, coverageCode: 'FT-FIRE', coverageName: 'ความคุ้มครองความเสียหายต่อตัวรถยนต์ เนื่องจากรถยนต์สูญหาย/ไฟไหม้(FIRE)', sumInsureAmt: '250000', unit: 'ต่อครั้ง' },
          { seq: 6, coverageCode: 'FT-THEFT', coverageName: 'ความคุ้มครองความเสียหายต่อตัวรถยนต์ เนื่องจากรถยนต์สูญหาย/ไฟไหม้(THEFT)', sumInsureAmt: '250000', unit: 'ต่อครั้ง' },
          { seq: 7, coverageCode: 'PA01-Dead/Driver', coverageName: 'อุบัติเหตุส่วนบุคคล (ร.ย.01) / เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร / ผู้ขับขี่', sumInsureAmt: '100000', unit: 'ต่อคน เฉพาะผู้ขับขี่' },
          { seq: 8, coverageCode: 'PA01-Dead/Passengers', coverageName: 'อุบัติเหตุส่วนบุคคล (ร.ย.01) / เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร / ผู้โดยสาร', sumInsureAmt: '100000', unit: 'ต่อคน ตามจำนวนผู้โดยสารที่ระบุ' },
          { seq: 9, coverageCode: 'PA01-Temp/Driver', coverageName: 'อุบัติเหตุส่วนบุคคล (ร.ย.01) / เสียชีวิต ทุพพลภาพชั่วคราว / ผู้ขับขี่', sumInsureAmt: '0', unit: 'ต่อคน เฉพาะผู้ขับขี่' },
          { seq: 10, coverageCode: 'PA01-Temp/Passengers', coverageName: 'อุบัติเหตุส่วนบุคคล (ร.ย.01) / เสียชีวิต ทุพพลภาพชั่วคราว / ผู้โดยสาร', sumInsureAmt: '0', unit: 'ต่อคน ตามจำนวนผู้โดยสารที่ระบุ' },
          { seq: 11, coverageCode: 'PA02-MD', coverageName: 'ค่ารักษาพยาบาล (ร.ย.02)', sumInsureAmt: '100000', unit: 'ต่อคน' },
          { seq: 12, coverageCode: 'PA03-BB', coverageName: 'การประกันตัวผู้ขับขี่ (ร.ย.03)', sumInsureAmt: '200000', unit: 'ต่อครั้ง' },
          { seq: 13, coverageCode: 'OD5', coverageName: 'ความคุ้มครองความเสียหายต่อรถยนต์ เนื่องจากการชน กับยานพาหนะทางบก', sumInsureAmt: '250000', unit: 'ต่อครั้ง' },
          { seq: 14, coverageCode: 'DEDUCT-OD', coverageName: 'ความเสียหายส่วนแรก OD', sumInsureAmt: '2000', unit: 'ต่อครั้ง' },
          { seq: 15, coverageCode: 'DEDUCT-TPPD', coverageName: 'ความเสียหายส่วนแรก TPPD', sumInsureAmt: '0', unit: 'ต่อครั้ง' }
        ]
      },
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      tabIndex: 1,
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),
    columnsClaimVersion () {
      const col = [
        { label: this.$t('claim_version'), field: '', style: { width: '50px' }},
        { label: this.$t('c.created_date'), field: '', style: { width: '100px' }},
        { label: this.$t('c.status'), field: '', style: { width: '120px' }},
        { label: this.$t('c.action'), field: '', style: { width: '80px' }}
      ]
      return col
    },
  },
  mounted () {
    this.rowIndex = findIndex(this.form.claimVersionList, v => {
      return v.status == 'Active'
    })
  },
  methods: {
    gotoBack () {
      this.$router.push('/claim-inquiry')
    },
    systemLog () {}
  }
}
</script>
<style scoped>
  #claimInquiry .card-header {
    /* background-color:#6bbcff; */
    border: 1px solid rgba(255, 255, 255, 0.125);
    box-shadow: unset;
  }
  #claimInquiry .card-header .tab, #claimInquiry .card-header .tab + .tab {
    color: #5c5c5c;
  }
  #claimInquiry .card-header .tab.active {
    color: #1098f7;
    border-top: 4px solid #1098f7;
    font-weight: bolder;
  }

  .table tbody tr.viewActive {
    background-color: #ffff;
    cursor: unset;
  }
  .table tbody tr {
    background-color: #f5f5f5;
    cursor: pointer;
  }
</style>