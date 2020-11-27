<template>
  <div>
    <HasPerm any="schedulerjob_create,schedulerjob_view,schedulerjob_update">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('scheduler_job') }}</h1><span> {{ $t(`c.${mode}`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('system_setup') }} / {{ $t('scheduler_job') }}
        </div>
      </div>

      <!-- Page Body -->
      <div class="card">
        <div class="card-header">
          <!-- <div id="generalTab" class="tab" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1"> -->
          <div id="generalTab" class="tab">
            <i class="las la-info-circle"></i> {{ $t('c.info') }}
          </div>
          <!-- <div class="tab" :class="{ active: tabIndex == 2 }" @click="tabIndex = 2" v-if="(form.jobType == 3 || form.jobType == 4)">
            <i class="las la-server la-lg" /> {{ $t('server_config') }}
          </div> -->
          <div class="action">
            <button class="btn btn-secondary ml-2" @click="gotoBack()"><i class="las la-arrow-left"></i> {{ $t('c.back') }}</button>
            <HasPerm any="schedulerjob_create,schedulerjob_update">
              <button class="btn btn-success ml-2" @click="validateAction()"><i class="las la-save"></i> {{ $t('c.save') }}</button>
            </HasPerm>
            <HasPerm any="schedulerjob_delete,schedulerjob_update">
              <button class="btn btn-danger ml-2" @click="deleteData()" v-if="mode == 'edit' && tabIndex == 1"><i class="las la-md la-times"></i> {{ $t('c.delete') }}</button>
            </HasPerm>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent :class="{ 'dirty' : $v.$dirty }">

            <!-- Tab 1 (General) -->
            <div v-if="tabIndex == 1">
              <b-row align-h="around" class="mb-2">
                <b-col sm="4">
                  <b-row class="form-group">
                    <label class="required">{{ $t('scheduler_job_name') }}</label>
                    <b-form-input id="dJobName" v-model="form.jobName" :disabled="disableMode" />
                    <div class="invalid-feedback" v-show="!$v.form.jobName.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-row>
                  <b-row class="form-group">
                    <label class="required">{{ $t('scheduler_job_type') }}</label>
                    <treeselect id="dJobType" v-model="form.jobType" :options="jobTypeList"
                                :disabled="disableMode"
                                :placeholder="$t('c.please_select')"
                    />
                    <div class="invalid-feedback" v-show="!$v.form.jobType.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-row>
                  <b-row class="form-group">
                    <label class="required">{{ $t('scheduler_type') }}</label>
                    <treeselect id="dScheduleType" v-model="form.schedulerType" :options="scheduleTypeList"
                                :disabled="disableMode"
                                @select="changeScType1(form.schedulerType, $event)"
                                @input="changeScType2(form.schedulerType)"
                                :placeholder="$t('c.please_select')"
                    />
                    <div class="invalid-feedback" v-show="!$v.form.schedulerType.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-row>

                  <!-- schedulerType = Cron -->
                  <b-row class="form-group" v-if="form.schedulerType == 'C'">
                    <label class="required">{{ $t('scheduler_cron_expression') }}</label>
                    <b-input-group>
                      <b-form-input id="dCronExp" v-model="form.cronExpression" :disabled="disableMode" />
                      <b-input-group-append>
                        <button id="dCronHelpBtn" class="btn btn-sm btn-default"
                                @click="viewCron()" :disabled="disableMode"
                        >
                          <i class="las la-md la-info"></i>
                        </button>
                      </b-input-group-append>
                    </b-input-group>
                    <div class="invalid-feedback" v-show="!$v.form.cronExpression.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-row>

                  <!-- schedulerType = Weekly -->
                  <b-row class="form-group" v-if="form.schedulerType == 'W'">
                    <label class="required">{{ $t('day_week') }}</label>
                    <treeselect id="dScWeekly" v-model="form.dayOfWeek" :options="dOfWeekList"
                                :disabled="disableMode" :placeholder="$t('c.please_select')"
                    />
                    <div class="invalid-feedback" v-show="!$v.form.dayOfWeek.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-row>

                  <!-- schedulerType = Month -->
                  <b-row class="form-group" v-if="form.schedulerType == 'M'">
                    <label class="required">{{ $t('day_month') }}</label>
                    <treeselect id="dScMonthly" v-model="form.dayOfMonth" :options="dOfMonthList"
                                :disabled="disableMode" :placeholder="$t('c.please_select')"
                    />
                    <div class="invalid-feedback" v-show="!$v.form.dayOfMonth.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-row>

                  <!-- schedulerType = Daily + Weekly + Weekly -->
                  <span v-if="form.schedulerType == 'D' || form.schedulerType == 'W' || form.schedulerType == 'M'">
                    <b-row class="form-group">
                      <label class="required">{{ $t('start_time') }}</label>
                      <a-form-timepicker id="dScStime" v-model="form.startTime" :disabled="disableMode" />
                      <div class="invalid-feedback" v-show="!$v.form.startTime.required">
                        {{ $t('c.err__required') }}
                      </div>
                    </b-row>
                    <b-row class="form-group">
                      <label class="required">{{ $t('c.start_date') }}</label>
                      <a-form-datepicker id="dScFtime" v-model="form.startDate" :disabled="disableMode" />
                      <div class="invalid-feedback" v-show="!$v.form.startDate.required">
                        {{ $t('c.err__required') }}
                      </div>
                    </b-row>
                    <b-row class="form-group">
                      <label>{{ $t('c.end_date') }}</label>
                      <a-form-datepicker id="dScTtime" v-model="form.endDate" :disabled="disableMode" />
                      <div class="invalid-feedback" v-show="!$v.form.endDate.required">
                        {{ $t('c.err__required') }}
                      </div>
                      <div class="invalid-feedback" v-show="!$v.form.endDate.overDate">
                        {{ $t('c.err__startdate_greater_enddate') }}
                      </div>
                    </b-row>
                  </span>
                  <b-row class="form-group">
                    <label class="required">{{ $t('c.status') }}</label>
                    <treeselect id="dStatus" v-model="form.status" :options="statusList"
                                :disabled="disableMode" :placeholder="$t('c.please_select')"
                    />
                    <div class="invalid-feedback" v-show="!$v.form.status.required">
                      {{ $t('c.err__required') }}
                    </div>
                  </b-row>
                  <b-row class="form-group">
                    <label>{{ $t('c.description') }}</label>
                    <b-form-textarea v-model="form.description" :disabled="disableMode" />
                    <div class="invalid-feedback" v-show="!$v.form.description.maxLength">
                      {{ $t('c.err__maxLength', {fieldName: $t('c.description'), val: $v.form.description.$params.maxLength.max }) }}
                    </div>
                  </b-row>
                </b-col>
                <b-col sm="4" v-if="mode == 'create'"></b-col>
                <b-col sm="4" v-if="mode != 'create'">
                  <b-row class="form-group">
                    <label>{{ $t('c.created_by') }}</label>
                    <b-form-input id="dCreateBy" v-model="form.createdBy" disabled />
                  </b-row>
                  <b-row class="form-group">
                    <label>{{ $t('c.created_date') }}</label>
                    <b-form-input id="dCreateDate" v-model="form.createdDate" disabled />
                  </b-row>
                  <b-row class="form-group">
                    <label>{{ $t('c.last_updated_by') }}</label>
                    <b-form-input id="dUpdateBy" v-model="form.updatedBy" disabled />
                  </b-row>
                  <b-row class="form-group">
                    <label>{{ $t('c.last_updated_date') }}</label>
                    <b-form-input id="dUpdateDate" v-model="form.updatedDate" disabled />
                  </b-row>
                </b-col>
              </b-row>
            </div>
            <!-- tab 2 Server Configuration -->
            <div v-if="tabIndex == 2 && (form.jobType == 3 || form.jobType == 4)">
              <div v-for="(obj, i) in $v.form.jobsConfigOptionalList.$each.$iter" :key="i">
                <b-row align-h="around" class="mb-2">
                  <b-col sm="4">
                    <label>{{ $t('apply') }}</label>
                    <treeselect v-model="obj.applyTo" :options="serverConfigList" :placeholder="$t('c.all')" disabled />
                  </b-col>
                  <b-col sm="4"></b-col>
                </b-row>
                <b-row align-h="around" class="mb-2">
                  <div class="card-body">
                    <div class="card">
                      <h5 style="padding: 4px; background-color: #f0f0f0;">
                        <i class="las la-angle-up" @click="toggleCollapse('details', $event)"></i>
                      </h5>
                      <div class="card-body">
                        <b-collapse visible id="details">
                          <b-row align-h="around" class="mb-2">
                            <b-col sm="4">
                              <label>{{ $t('type') }}</label>
                              <treeselect value="1" :options="channelList" :placeholder="$t('c.all')" disabled />
                            </b-col>
                            <b-col sm="4"></b-col>
                          </b-row>
                          <b-row align-h="around" class="mb-2">
                            <b-col sm="4">
                              <label class="required">{{ $t('ip_address') }}</label>
                              <b-form-input v-model="obj.ftpIp.$model" :disabled="disableMode" />
                              <div class="invalid-feedback" v-show="!obj.ftpIp.required">
                                {{ $t('c.err__required') }}
                              </div>
                            </b-col>
                            <b-col sm="4">
                              <label class="required">{{ $t('port') }}</label>
                              <b-form-input v-model="obj.ftpPort.$model" type="number" :disabled="disableMode" />
                              <div class="invalid-feedback" v-show="!obj.ftpPort.required">
                                {{ $t('c.err__required') }}
                              </div>
                            </b-col>
                          </b-row>
                          <b-row align-h="around" class="mb-2">
                            <b-col sm="4">
                              <label class="required">{{ $t('username') }}</label>
                              <b-form-input v-model="obj.ftpUsername.$model" :disabled="disableMode" />
                              <div class="invalid-feedback" v-show="!obj.ftpUsername.required">
                                {{ $t('c.err__required') }}
                              </div>
                            </b-col>
                            <b-col sm="4">
                              <label class="required">{{ $t('password') }}</label>
                              <b-form-input v-model="obj.ftpPassword.$model" :disabled="disableMode" />
                              <div class="invalid-feedback" v-show="!obj.ftpPassword.required">
                                {{ $t('c.err__required') }}
                              </div>
                            </b-col>
                          </b-row>
                          <b-row align-h="around" class="mb-2">
                            <b-col sm="4">
                              <label class="required">{{ $t('destination_path') }}</label>
                              <b-form-input v-model="obj.ftpDestionationPath.$model" :disabled="disableMode" />
                              <div class="invalid-feedback" v-show="!obj.ftpDestionationPath.required">
                                {{ $t('c.err__required') }}
                              </div>
                            </b-col>
                            <b-col sm="4"></b-col>
                          </b-row>
                        </b-collapse>
                      </div>
                    </div>
                  </div>
                </b-row>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HasPerm>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import moment from 'moment'
import { required, requiredIf, maxLength } from 'vuelidate/lib/validators'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'SchedulerJobDetail',
  mixins: [CommonMixin],
  async fetch () {
    this.jobTypeList = await this.$axios.$get('/api/dropdown/lov/ADMIN_JOB_TYPE')
    this.scheduleTypeList = await this.$axios.$get('/api/dropdown/lov/SCHEDULER_TYPE')
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    this.dOfWeekList = await this.$axios.$get('/api/dropdown/lov/DAY_OF_WEEK')
    this.serverConfigList = await this.$axios.$get('/api/dropdown/lov2/CONFIG_JOB_APPLY_TO')
    this.channelList = await this.$axios.$get('/api/dropdown/lov2/INTERFACE_CHANNEL')
    _.forEach(_.range(1, 32), (v) => {
      this.dOfMonthList.push({ id: v, label: v })
    })
  },
  async asyncData (context) {

    const mode = context.params.id
    const id = context.query.id
    let form
    if (id) {
      form = await context.$axios.$get(`/api/job/findById/${id}`)
      if (form.schedulerType == 'D' || form.schedulerType == 'W' || form.schedulerType == 'M') {
        form.startTime = form.startHour+':'+form.startMinute
      }
      // if ((form.jobType == '3' || form.jobType == '4') && _.size(form.jobsConfigOptionalList) == 0) {
      //   form.jobsConfigOptionalList = [{
      //     applyTo: 'A',
      //     channel: 1,
      //     ftpIp: '',
      //     ftpPort: '',
      //     ftpUsername: '',
      //     ftpPassword: '',
      //     ftpDestionationPath: ''
      //   }]
      // }
    }
    if (mode === 'create') {
      return { mode, id, disableMode: false }
    } else if (mode === 'view') {
      return { mode, id, form: await form, disableMode: true }
    } else {
      return { mode, id, form: await form, disableMode: false }
    }
  },
  data () {
    return {
      mode: '',
      form: {},
      tabIndex: 1,
      jobTypeList: [],
      scheduleTypeList: [],
      statusList: [],
      dOfWeekList: [],
      dOfMonthList: [],
      serverConfigList: [],
      channelList: [],
      disableMode: false,
      isSubmit: false
    }
  },
  validations: {
    form: {
      jobName: { required, maxLength: maxLength(200) },
      jobType: { required, maxLength: maxLength(50) },
      schedulerType: { required, maxLength: maxLength(1) },
      cronExpression: {
        required: requiredIf(function (form) {
        	return form.schedulerType == 'C' && _.isEmpty(form.cronExpression)
        }),
        maxLength: maxLength(500)
      },
      startTime: {
        required: requiredIf(function (form) {
          return (form.schedulerType == 'D' || form.schedulerType == 'W' || form.schedulerType == 'M') && _.isEmpty(form.startTime)
        }),
        // maxLength: maxLength(10)
      },
      dayOfWeek: {
        required: requiredIf(function (form) {
        	return form.schedulerType == 'W' && _.isEmpty(form.dayOfWeek)
        }),
        // maxLength: maxLength(300)
      },
      dayOfMonth: {
        required: requiredIf(function (form) {
        	return form.schedulerType == 'M' && _.isEmpty(form.dayOfMonth)
        }),
        // maxLength: maxLength(300)
      },
      startDate: {
        required: requiredIf(function (form) {
          return (form.schedulerType == 'D' || form.schedulerType == 'W' || form.schedulerType == 'M') && _.isEmpty(form.startDate)
        }),
        // maxLength: maxLength(300)
      },
      endDate: {
        required: requiredIf(function (form) {
          return (form.schedulerType == 'D' || form.schedulerType == 'W' || form.schedulerType == 'M') && _.isEmpty(form.endDate)
        }),
        overDate () {
          return (_.isEmpty(this.form.startDate) || _.isEmpty(this.form.endDate))
          || moment(this.form.endDate, 'DD/MM/YYYY').isSameOrAfter(moment(this.form.startDate, 'DD/MM/YYYY')) && (this.form.schedulerType == 'D' || this.form.schedulerType == 'W' || this.form.schedulerType == 'M')
        },
        // maxLength: maxLength(300)
      },
      status: { required, maxLength: maxLength(1) },
      description: { maxLength: maxLength(100) },
      // jobsConfigOptionalList: {
      //   $each: {
      //     ftpIp: {
      //       required: requiredIf(function (form) {
      //         return (this.form.jobType == '3' || this.form.jobType == '4') && _.isEmpty(form.ftpIp)
      //       }),
      //     },
      //     ftpPort: {
      //       required: requiredIf(function (form) {
      //         return (this.form.jobType == '3' || this.form.jobType == '4') && _.isEmpty(form.ftpPort)
      //       }),
      //     },
      //     ftpUsername: {
      //       required: requiredIf(function (form) {
      //         return (this.form.jobType == '3' || this.form.jobType == '4') && _.isEmpty(form.ftpUsername)
      //       }),
      //     },
      //     ftpPassword: {
      //       required: requiredIf(function (form) {
      //         return (this.form.jobType == '3' || this.form.jobType == '4') && _.isEmpty(form.ftpPassword)
      //       }),
      //     },
      //     ftpDestionationPath: {
      //       required: requiredIf(function (form) {
      //         return (this.form.jobType == '3' || this.form.jobType == '4') && _.isEmpty(form.ftpDestionationPath)
      //       }),
      //     }
      //   }
      // }
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),
  },
  methods: {
    changeScType1 (st, e) {
      if (st != e.id) {
        delete this.form.cronExpression
        delete this.form.dayOfWeek
        delete this.form.dayOfMonth
        delete this.form.startTime
        delete this.form.startHour
        delete this.form.startMinute
        delete this.form.startDate
        delete this.form.endDate
      }
    },
    changeScType2 (st) {
      if (!st) {
        delete this.form.cronExpression
        delete this.form.dayOfWeek
        delete this.form.dayOfMonth
        delete this.form.startTime
        delete this.form.startHour
        delete this.form.startMinute
        delete this.form.startDate
        delete this.form.endDate
      }
    },
    // changeJobType1 (jt, e) {
    //   if (jt != e.id) {
    //     if (e.id == '3' || e.id == '4' ) {
    //       this.form.jobsConfigOptionalList = [{
    //         applyTo: 'A',
    //         channel: 1,
    //         ftpIp: '',
    //         ftpPort: '',
    //         ftpUsername: '',
    //         ftpPassword: '',
    //         ftpDestionationPath: ''
    //       }]
    //     }
    //   }
    // },
    // changeJobType2 (jt) {
    //   if (!jt) {
    //     this.form.jobsConfigOptionalList = [{}]
    //   }
    // },
    getReqField () {
      const invalidField = _.findKey(this.$v.form.$params, (value, key) => this.$v.form[key].$invalid)
      console.log('invalidField => ', invalidField)
    },
    validateAction () {
      // Validate data before save
      this.isSubmit = true
      this.$v.$touch()
      this.getReqField()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return false
      }
      this.realSave()
    },
    realSave () {
      // Set data
      if (!_.isEmpty(this.form.startTime) && this.form.startTime != undefined) {
        this.$set(this.form, 'startHour', (this.form.startTime).split(':')[0])
        this.$set(this.form, 'startMinute', (this.form.startTime).split(':')[1])
      }
      if (this.mode == 'create') {
        this.msgBoxConfirm('save').then(async ok => {
          if (ok) {
            await this.$axios.$post('/api/job/insertJob', this.form).then(res => {
              if (res == false) {
                this.toast('danger', res.errorMsg)
                this.skipValidateUnsaved = true
              } else {
                this.toast('success', this.$t('c.success__save'))
                this.skipValidateUnsaved = true
                this.gotoBack()
              }
            })
          }
        })
      } else {
        this.msgBoxConfirm('update').then(async ok => {
          if (ok) {
            await this.$axios.$post('/api/job/updateJob', this.form).then(res => {
              if (res == false) {
                this.toast('danger', res.errorMsg)
                this.skipValidateUnsaved = true
              } else {
                this.toast('success', this.$t('c.success__update'))
                this.skipValidateUnsaved = true
                this.gotoBack()
              }
            })
          }
        })
      }
    },
    deleteData () {
      let objList = []
      objList.push(this.form)
      if (objList.length > 0) {
        this.msgBoxConfirm('delete').then((ok) => {
          if (ok) {
            this.$axios.$post('/api/job/deleteJob', objList).then((resp) => {
              this.toast('success', this.$t('c.success__delete'))
              this.gotoBack()
            })
          }
        })
      }
    },
    viewCron () {
      window.open('../../cron-help.html')
    },
    gotoBack () {
      if (this.mode == 'view') {
        this.skipValidateUnsaved = true
      }
      this.$router.back()
    }
  }
}
</script>