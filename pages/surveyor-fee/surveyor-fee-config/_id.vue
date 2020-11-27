<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('surveyor_fee_config') }} <span>{{ $t(`c.${mode}`) }}</span></h1>
      </div>
      <div class="page__breadcrumb">
        <nuxt-link to="/">
          <i class="las la-home"></i> {{ $t('c.home') }}
        </nuxt-link> / {{ $t('surveyor_fee') }} / {{ $t('surveyor_fee_config') }}
      </div>
    </div>
    <!-- Card Information -->
    <div class="card">
      <div class="card-header">
        <div class="tab">
          <i class="las la-info-circle"></i> {{ $t('c.info') }}
        </div>
        <div class="action">
          <button class="btn btn-secondary ml-2" @click="gotoBack()"><i class="las la-arrow-left"></i> {{ $t('c.back') }}</button>
          <button class="btn btn-success ml-2" @click="save()"><i class="las la-save"></i> {{ $t('c.save') }}</button>
          <button class="btn btn-info ml-2" @click="cloneData()"><i class="las la-copy"></i> {{ $t('c.clone') }}</button>
          <button class="btn btn-danger ml-2" @click="deleteData()"><i class="las la-times"></i> {{ $t('c.delete') }}</button>
        </div>
      </div>
      <div class="card-body">
        <b-row class="mb-4">
          <b-col md="5" offset-md="1">
            <b-row class="form-group">
              <b-col md="8">
                <label class="required">{{ $t('surveyor_type') }}</label>
                <treeselect v-model="form.surveyorType" :options="surveyorTypeList" :placeholder="$t('c.please_select')" />
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="8">
                <label class="required">{{ $t('policy_type') }}</label>
                <treeselect v-model="form.policyType" :options="policyTypeList" :placeholder="$t('c.please_select')" />
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="8">
                <label class="required">{{ $t('claim_criteria_type') }}</label>
                <treeselect v-model="form.claimType" :options="claimTypeList" :placeholder="$t('c.please_select')" />
              </b-col>
            </b-row>
            <b-row class="form-group" v-if="form.policyType === 'Motor-MV'">
              <b-col md="8">
                <label class="required">{{ $t('motormc_type') }}</label>
                <treeselect v-model="form.motormcType" :options="motormcTypeList" :placeholder="$t('c.please_select')" />
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="8">
                <label class="required">{{ $t('c.effective_date') }}</label>
                <a-form-datepicker v-model="form.EffectiveDate" />
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="8">
                <label class="required">{{ $t('c.expire_date') }}</label>
                <a-form-datepicker v-model="form.expireDate" />
              </b-col>
            </b-row>
          </b-col>
          <b-col md="5" offset-md="1" v-if="mode !== APP.MODE_CREATE">
            <b-row class="form-group">
              <b-col md="8">
                <label>{{ $t('c.created_by') }}</label>
                <b-form-input v-model="form.createdBy" disabled />
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="8">
                <label>{{ $t('c.created_date') }}</label>
                <b-form-input v-model="form.createdDate" disabled />
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="8">
                <label>{{ $t('c.last_updated_by') }}</label>
                <b-form-input v-model="form.updatedBy" disabled />
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="8">
                <label>{{ $t('c.last_updated_date') }}</label>
                <b-form-input v-model="form.updatedDate" disabled />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col md="10">
            <a-table
              :id="$route.name"
              :datasource="form"
              :columns="columns"
              :paging="paging"
              :isFilter="false"
              :isSort="false"
              :isPaging="false"
            >
              <template slot="tableAction">
                <button class="btn btn-success" @click="modalShow = !modalShow"><i class="las la-plus"></i> {{ $t('c.add') }}</button>
                <button class="btn btn-danger ml-2" @click="deleteConditions()"><i class="las la-times"></i> {{ $t('c.delete') }}</button>
              </template>
              <template slot="tableBody">
                <tr v-for="(v, index) in form.conditions" :key="index">
                  <td class="text-center">
                    <b-form-checkobox v-model="v.checked" />
                  </td>
                </tr>
              </template>
            </a-table>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal
      :title="'Surveyor Fee Condition'"
      v-model="modalShow"
      size="lg"
      :header-bg-variant="'info'"
      :header-text-variant="'light'"
      :no-close-on-backdrop="true"
    >
      <b-row align-h="around">
        <b-col md="5">
          <b-row class="form-group">
            <b-col md="10">
              <label>{{ $t('location') }}</label>
              <treeselect v-model="form.location" :placeholder="$t('c.please_select')" />
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="10">
              <label>{{ $t('vehicle_type') }}</label>
              <treeselect v-model="form.vehicleTypeId" :placeholder="$t('c.please_select')" />
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="10">
              <label>{{ $t('expense_type') }}</label>
              <treeselect v-model="form.expenseTypeId" :placeholder="$t('c.please_select')" />
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="10">
              <label>{{ $t('remark') }}</label>
              <b-form-textarea v-model="form.remark" />
            </b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row class="form-group">
            <b-col md="5">
              <label>{{ $t('time', { label: $t('c.min') }) }}</label>
              <b-form-input v-model="form.timeMin" type="time" />
            </b-col>
            <b-col md="5" offset-md="1">
              <label>{{ $t('time', { label: $t('c.max') }) }}</label>
              <b-form-input v-model="form.timeMax" type="time" :min="form.timeMin" />
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="5">
              <label>{{ $t('claim_times', { label: $t('c.min') }) }}</label>
              <b-form-input />
            </b-col>
            <b-col md="5" offset-md="1">
              <label>{{ $t('claim_times', { label: $t('c.max') }) }}</label>
              <b-form-input />
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="5">
              <label>{{ $t('distance_km', { label: $t('c.min') }) }}</label>
              <b-form-input />
            </b-col>
            <b-col md="5" offset-md="1">
              <label>{{ $t('distance_km', { label: $t('c.max') }) }}</label>
              <b-form-input />
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="5">
              <label>{{ $t('fee_rate') }}</label>
              <b-form-input />
            </b-col>
            <b-col md="5" offset-md="1">
              <label>{{ $t('fee_rate') }} ({{ $t('unit') }})</label>
              <treeselect :placeholder="$t('c.please_select')" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <template slot="modal-footer">
        <button class="btn btn-primary" @click="addCondition()">OK</button>
        <button class="btn btn-secondary" @click="closeModal()">Close</button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import CommonMixin from '~/assets/js/CommonMixin'
import App from '~/assets/js/Constant'
export default {
  name: 'SurveyorFeeConfigDetail',
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
      form: {},
      surveyorTypeList: [],
      policyTypeList: [],
      claimTypeList: [],
      statusList: [],
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      APP: App,
      modalShow: false
    }
  },
  computed: {
    columns () {
      const col = [
        { label: 'CHECK_ALL', sortable: false, style: { minWidth: '20px' } },
        { label: this.$t('location'), field: 'location' },
        { label: this.$t('time', { label: '' }), field: 'time' },
        { label: this.$t('vehicle_type'), field: 'vehicleType' },
        { label: this.$t('claim_times', { label: '' }), field: 'claimTimes' },
        { label: this.$t('expense_type'), field: 'expenseType' },
        { label: this.$t('distance_km', { label: '' }), field: 'distance' },
        { label: this.$t('fee_rate'), field: 'feeRate' },
        { label: this.$t('remark'), field: 'remark' },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { minWidth: '60px' } }
      ]

      return col
    }
  },
  methods: {
    save () {
      if (this.mode == this.APP.MODE_CREATE) {
        this.toast('success', this.$t('c.success__save'))
      } else {
        this.toast('success', this.$t('c.success__update'))
      }
    },
    deleteData () {
      this.toast('success', this.$t('c.success__delete'))
    },
    cloneData () {},
    gotoBack () {
      this.$router.push('/surveyor-fee/surveyor-fee-config')
    },
  },
}
</script>