<template>
  <div>
    <b-row align-h="around" class="form-group">
      <b-col sm="3">
        <label>{{ $t('repair_days') }}</label>
        <b-form-input class="text-right" v-model="form.repairDays" disabled />
      </b-col>
      <b-col sm="3">
        <label>{{ $t('estimate_finish_date') }}</label>
        <a-form-datepicker v-model="form.estimateFinishDate" disabled />
      </b-col>
      <b-col sm="3">
        <label>{{ $t('estimate_finish_date_modify') }}</label>
        <a-form-datepicker v-model="form.estimateFinishDateModify" disabled />
      </b-col>
    </b-row>
    <b-row align-h="around" class="form-group">
      <b-col sm="11">
        <label>{{ $t('remark_Repire_Time') }}</label>
        <b-form-textarea v-model="form.remarkRepaireTime" disabled />
      </b-col>
    </b-row>
    <b-row align-h="around" class="form-group">
      <b-col sm="11">
        <label>{{ $t('repairer_comment') }}</label>
        <b-form-textarea v-model="form.repairerComment" disabled />
      </b-col>
    </b-row>
    <b-row align-h="around" class="form-group">
      <b-col sm="11">
        <label>{{ $t('ins_comment') }}</label>
        <b-form-textarea v-model="form.insComment" disabled />
      </b-col>
    </b-row>
    <b-row align-h="around" class="mt-3">
      <b-col sm="11">
        <a-table
          :id="$route.name+'/claim-activity'"
          :columns="columnsClaimAcivity"
          :paging="APP.paging"
          :datasource="datasource"
        >
          <template slot="tableAction"></template>
          <template slot="tableBody">
            <tr v-for="(v, index) in datasource.data" :key="index">
              <td class="text-center">{{ v.id }}</td>
              <td class="text-right">{{ v.activityId }}</td>
              <td class="text-center">{{ v.activityDate }}</td>
              <td class="text-right">{{ v.userId }}</td>
              <td>{{ v.userName }}</td>
              <td>{{ v.roleName }}</td>
              <td>{{ v.headOffice }}</td>
              <td>{{ v.branch }}</td>
              <td class="text-center">{{ v.claimStatus }}</td>
            </tr>
          </template>
        </a-table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import App from '~/assets/js/Constant'
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  mixins: [CommonMixin],
  data () {
    return {
      APP: App,
      form: {},
      datasource: {
        data: [
          {
            id: 1,
            activityId: '0001',
            activityDate: '10/11/253',
            userId: '10001',
            expense_details: '-',
            userName: 'สมหญิง',
            roleName: '-',
            headOffice: 'บริษัทประกัน',
            branch: 'ลาดพราว',
            claimStatus: 'รอดำเนินการ',
          },
          {
            id: 2,
            activityId: '0002',
            activityDate: '10/11/253',
            userId: '10002',
            expense_details: '-',
            userName: 'สมชาย',
            roleName: '-',
            headOffice: 'บริษัทประกัน',
            branch: 'ลาดพราว',
            claimStatus: 'เสร็จสิ้น',
          },
        ],
      }

    }
  },
  computed: {
    columnsClaimAcivity () {
      const col = [
        { label: this.$t('c.seq'), field: 'seq', style: { width: '100px' }},
        { label: this.$t('activity_id'), field: 'activityId', style: { width: '100px' }},
        { label: this.$t('activity_date'), field: 'activityDate', style: { width: '100px' }},
        { label: this.$t('user_id'), field: 'userId', style: { width: '100px' }},
        { label: this.$t('user_name'), field: 'userName', style: { width: '100px' }},
        { label: this.$t('role_name'), field: 'roleName', style: { width: '100px' }},
        { label: this.$t('head_office'), field: 'headOffice', style: { width: '100px' }},
        { label: this.$t('branch'), field: 'branch', style: { width: '100px' }},
        { label: this.$t('claim_status'), field: 'claimStatus', style: { width: '100px' }},
      ]
      return col
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.form = {repairDays: 7,
        estimateFinishDate: '09/11/2020',
        estimateFinishDateModify: '10/11/2020',
        remarkRepaireTime: '-',
        repairerComment: '-',
        insComment: '-'}
    }
  },
}
</script>