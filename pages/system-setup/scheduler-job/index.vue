<template>
  <div>
    <HasPerm any="schedulerjob_menu,schedulerjob_view">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('scheduler_job') }}</h1><span> {{ $t(`c.list`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }}  / {{ $t('system_setup') }} / {{ $t('scheduler_job') }}
        </div>
      </div>

      <!-- Search Criteria -->
      <div class="card">
        <div class="card-header" @click="toggleCollapse('search-criteria-ScJob', $event)">
          <div class="title">
            <i class="las la-angle-up" style="cursor: pointer;"></i> {{ $t('c.filter') }}
          </div>
          <div class="action">
            <button id="cSearchScJob" class="btn btn-primary ml-2" @click="searchScJob()"><i class="las la-search"></i> {{ $t('c.search') }}</button>
            <button id="cClear" class="btn btn-warning ml-2" @click="clearCriteria()"><i class="las la-undo-alt"></i> {{ $t('c.clear') }}</button>
          </div>
        </div>
        <b-collapse visible id="search-criteria-ScJob">
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
                <treeselect id="cScheduleType" v-model="criteria.schedulerType" :options="scheduleTypeList" :placeholder="$t('c.all')" />
              </b-col>
            </b-row>
            <b-row align-h="around">
              <b-col sm="3" class="form-group">
                <label>{{ $t('scheduler_job_status') }}</label>
                <treeselect id="cScStatus" v-model="criteria.jobStatus" :options="scStatusList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3" class="form-group">
                <label>{{ $t('c.status') }}</label>
                <treeselect id="cAcStatus" v-model="criteria.status" :options="acStatusList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3" class="form-group">
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
          >
            <template slot="tableAction">
              <HasPerm any="schedulerjob_create">
                <button id="cCreateScBtn" class="btn btn-success mr-1" @click="goToCreate()"><i class="las la-plus"></i> {{ $t('c.create') }}</button>
              </HasPerm>
              <HasPerm any="schedulerjob_delete">
                <button id="cDelLogAllBtn" class="btn btn-danger mr-1" @click="deleteRow()"><i class="las la-times"></i> {{ $t('c.delete') }}</button>
              </HasPerm>
            </template>
            <template slot="tableBody">
              <tr v-for="obj in datasource.data" :key="obj.jobId">
                <td class="text-center">
                  <b-form-checkbox v-model="obj.checked"></b-form-checkbox>
                </td>
                <td class="text-left">{{ obj.jobName | emptyToDash }}</td>
                <td class="text-left">{{ obj.jobTypeName | emptyToDash }}</td>
                <td class="text-center">{{ obj.schedulerTypeName | emptyToDash }}</td>
                <td class="text-center">{{ obj.nextRun | emptyToDash }}</td>
                <td class="text-center">{{ obj.lastRun | emptyToDash }}</td>
                <td class="text-left">{{ obj.description | emptyToDash }}</td>
                <td class="text-center">{{ obj.jobStatusName | emptyToDash }}</td>
                <td class="text-center">{{ obj.status }} - {{ obj.statusName }}</td>
                <td>
                  <div class="btn-action-gl">
                    <HasPerm any="schedulerjob_view">
                      <button id="cViewBtn" class="btn btn-sm btn-info" v-b-tooltip:page.bottom.hover="$t('c.view')"
                              @click="goToView(obj.jobId)"
                      ><i class="las la-md la-eye"></i></button>
                    </HasPerm>
                    <HasPerm any="schedulerjob_update">
                      <button id="cEditBtn" class="btn btn-sm btn-warning" v-b-tooltip:page.bottom.hover="$t('c.edit')"
                              @click="goToEdit(obj.jobId)"
                      ><i class="las la-md la-pen"></i></button>
                    </HasPerm>
                    <HasPerm any="schedulerjob_rerun">
                      <button id="cRerunBtn"
                              class="btn btn-sm btn-primary"
                              v-if="obj.status == 'A'"
                              v-b-tooltip:page.bottom.hover="$t('c.run_immediate')"
                              @click="runImmediate(obj)"
                      ><i class="las la-md la-redo-alt"></i>
                      </button>
                    </HasPerm>
                    <HasPerm any="schedulerjob_delete">
                      <button id="cDelLogBtn" class="btn btn-sm btn-danger" v-b-tooltip:page.bottom.hover="$t('c.delete')"
                              @click="deleteRow(obj)"
                      ><i class="las la-md la-times"></i>
                      </button>
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
  name: 'SchedulerJobList',
  mixins: [CommonMixin],
  async fetch () {
    this.jobTypeList = await this.$axios.$get('/api/dropdown/lov/ADMIN_JOB_TYPE')
    this.scheduleTypeList = await this.$axios.$get('/api/dropdown/lov/SCHEDULER_TYPE')
    this.scStatusList = await this.$axios.$get('/api/dropdown/lov/JOB_STATUS')
    this.acStatusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
  },
  data () {
    return {
      criteria: {},
      jobTypeList: [],
      scheduleTypeList: [],
      scStatusList: [],
      acStatusList: [],
      datasource: {},
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
        { id: 'thead', label: 'CHECK_ALL', sortable: false, filterable: false, style: { 'min-width': '30px' } },
        { label: this.$t('scheduler_job_name'), field: 'jobName', style: { 'min-width': '250px' } },
        { label: this.$t('scheduler_job_type'), field: 'jobType', style: { 'min-width': '250px' } },
        { label: this.$t('scheduler_type'), field: 'schedulerType', style: { 'min-width': '115px' } },
        { label: this.$t('scheduler_next_run'), field: 'nextRun', style: { 'min-width': '150px' } },
        { label: this.$t('scheduler_last_run'), field: 'lastRun', style: { 'min-width': '150px' } },
        { label: this.$t('c.description'), field: 'msg', style: { 'min-width': '250px' } },
        { label: this.$t('scheduler_job_status'), field: 'jobStatus', style: { 'min-width': '100px' } },
        { label: this.$t('c.status'), field: 'status', style: { 'min-width': '80px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { 'min-width': '80px' } }
      ]
      return col
    },
  },
  activated () {
    this.searchScJob()
  },
  methods: {
    searchScJob () {
      const criteriaJob = { ...this.criteria, ...this.paging }
      this.$axios.$post('/api/job/findScheduleJob', criteriaJob).then((resp) => {
        this.datasource = resp
      })
    },
    deleteRow (obj) {
      let objList = []
      if (obj) {
        objList = [obj]
      } else {
        objList = this.datasource.data.filter(v => v.checked == true)
      }
      if (_.size(objList) > 0) {
        this.msgBoxConfirm('delete').then((ok) => {
          if (ok) {
            this.$axios.$post('/api/job/deleteJob', objList).then((resp) => {
              this.toast('success', this.$t('c.success__delete'))
              this.searchScJob()
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
    goToCreate () {
      this.$router.push({ path: '/system-setup/scheduler-job/create' })
    },
    goToEdit (jobId) {
      this.$router.push({ path: `/system-setup/scheduler-job/edit?id=${jobId}` })
    },
    goToView (jobId) {
      this.$router.push({ path: `/system-setup/scheduler-job/view?id=${jobId}` })
    },
    runImmediate (jobObj) {
      this.msgBoxConfirm(this.$t('c.confirm__rerun')).then((ok) => {
        if (ok) {
          this.$axios.$get('/api/job/run/'+jobObj.jobId).then((resp) => {
            this.toast('success', this.$t('c.success__rerun'))
            this.searchScJob()
          }).catch((err) => {
            this.toast('error', err)
            this.searchScJob()
          })
        }
      })
    }
  }
}
</script>