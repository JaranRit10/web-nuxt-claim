<template>
  <div>
    <HasPerm any="joblog_menu">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('job_log') }}</h1><span> {{ $t(`c.list`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }}  / {{ $t('system_setup') }} / {{ $t('job_log') }}
        </div>
      </div>

      <!-- Search Criteria -->
      <div class="card">
        <div class="card-header" @click="toggleCollapse('search-criteria-Job', $event)">
          <div class="title">
            <i class="las la-angle-up" style="cursor: pointer;"></i> {{ $t('c.filter') }}
          </div>
          <div class="action">
            <button id="cSearchJob" class="btn btn-primary ml-2" @click="searchJobLog()"><i class="las la-search"></i> {{ $t('c.search') }}</button>
            <button id="cClear" class="btn btn-warning ml-2" @click="clearCriteria()"><i class="las la-undo-alt"></i> {{ $t('c.clear') }}</button>
          </div>
        </div>
        <b-collapse visible id="search-criteria-Job">
          <div class="card-body">
            <b-row align-h="around">
              <b-col sm="3" class="form-group">
                <label>{{ $t('scheduler_job_name') }}</label>
                <b-form-input id="cJobName" v-model="criteria.jobName"></b-form-input>
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('scheduler_job_type') }}</label>
                <treeselect id="cJobType" v-model="criteria.jobType" :options="jobTypeList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('scheduler_type') }}</label>
                <treeselect id="cScheduleType" v-model="criteria.schedulerType" :options="schedulerTypeList" :placeholder="$t('c.all')" />
              </b-col>
            </b-row>
            <b-row align-h="around">
              <b-col sm="3" class="form-group">
                <label>{{ $t('scheduler_job_status') }}</label>
                <treeselect id="cLogStatus" v-model="criteria.status" :options="logStatusList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('c.start_date') }}</label>
                <a-form-datepicker id="cStartDate" v-model="criteria.startDate" />
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('c.end_date') }}</label>
                <a-form-datepicker id="cEndDate" v-model="criteria.endDate" />
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
                   @refresh="searchJobLog"
          >
            <template slot="tableAction">
              <HasPerm any="joblog_delete">
                <button id="cDelLogAllBtn" class="btn btn-danger mr-1" @click="deleteRow()"><i class="las la-times"></i> {{ $t('c.delete') }}</button>
              </HasPerm>
            </template>
            <template slot="tableBody">
              <tr v-for="obj in datasource.data" :key="obj.logId">
                <td class="text-center">
                  <b-form-checkbox v-model="obj.checked"></b-form-checkbox>
                </td>
                <td>{{ obj.jobName | emptyToDash }}</td>
                <td>{{ obj.jobTypeName | emptyToDash }}</td>
                <td>{{ obj.schedulerTypeName }}</td>
                <td>{{ obj.logStatusName }}</td>
                <td class="text-center">{{ obj.startDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.finishDate | emptyToDash }}</td>
                <td>{{ obj.message | emptyToDash }}</td>
                <td>
                  <div class="btn-action-group">
                    <HasPerm any="joblog_delete">
                      <button id="cDelLogBtn" class="btn btn-sm btn-danger" v-b-tooltip:page.bottom.hover="$t('c.delete')"
                              @click="deleteRow(obj)"
                      ><i class="las la-md la-times"></i></button>
                    </HasPerm>
                  </div>
                </td>
              </tr>
            </template>
          </a-table>
        </div><!-- /card-body -->
      </div>
    </HasPerm>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'JobLog',
  mixins: [CommonMixin],
  async fetch () {
    this.jobTypeList = await this.$axios.$get('/api/dropdown/lov/ADMIN_JOB_TYPE')
    this.schedulerTypeList = await this.$axios.$get('/api/dropdown/lov/SCHEDULER_TYPE')
    this.logStatusList = await this.$axios.$get('/api/dropdown/lov/JOB_STATUS')
  },
  data () {
    return {
      criteria: {},
      jobTypeList: [],
      schedulerTypeList: [],
      logStatusList: [],
      datasource: {},
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      objList: {},
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),
    columns () {
      const col = [
        { id: 'thead', label: 'CHECK_ALL', sortable: false, filterable: false, style: { 'width': '30px' } },
        { label: this.$t('scheduler_job_name'), field: 'jobName', style: { width: '150px', minWidth: '150px' } },
        { label: this.$t('scheduler_job_type'), field: 'jobTypeName', style: { width: '150px', minWidth: '150px' } },
        { label: this.$t('scheduler_type'), field: 'schedulerTypeName', style: { 'width': '120px', minWidth: '120px' } },
        { label: this.$t('c.status'), field: 'logStatusName', style: { width: '60px', minWidth: '60px' } },
        { label: this.$t('c.start_date'), field: 'startDate', style: { width: '100px', minWidth: '100px' } },
        { label: this.$t('c.end_date'), field: 'finishDate', style: { width: '100px', minWidth: '100px' } },
        { label: this.$t('c.message'), field: 'message', style: { minWidth: '220px', width: '220px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { width: '55px', minWidth: '55px' } }
      ]
      return col
    },
  },
  activated () {
    this.searchJobLog()
  },
  methods: {
    searchJobLog () {
      const criteriaJob = { ...this.criteria, ...this.paging }
      this.$axios.$post('/api/job/findJobLog', criteriaJob).then((resp) => {
        this.datasource = resp
      })
    },
    deleteRow (logId) {
      let logIdList = []
      if (logId) {
        logIdList = [logId]
      } else {
        logIdList = _.filter(this.datasource.data, { checked: true })
      }
      if (_.size(logIdList) > 0) {
        this.msgBoxConfirm('delete').then((ok) => {
          if (ok) {
            this.$axios.$post('/api/job/deleteJobLog', logIdList).then((res) => {
              if (res == false) {
                this.toast('danger', res.errMsg)
                this.searchJobLog()
              } else {
                this.toast('success', this.$t('c.success__delete'))
                this.searchJobLog()
              }
            })
          }
        })
      } else {
        this.toast('warning', this.$t('c.err__delete_required_one'))
      }
    },
    clearCriteria () {
      this.criteria = {}
    },
    runImmediate (jobObj) {
      this.msgBoxConfirm(this.$t('c.confirm__rerun')).then((ok) => {
        if (ok) {
          this.$axios.$get('/api/job/run/'+jobObj.jobId).then((resp) => {
            this.toast('success', this.$t('c.success__rerun'))
            this.searchJobLog()
          }).catch((err) => {
            this.toast('error', err)
            this.searchJobLog()
          })
        }
      })
    }
  }
}
</script>