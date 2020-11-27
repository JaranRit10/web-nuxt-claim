<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('surveyor_fee_config') }} <span>{{ $t('c.list') }}</span></h1>
      </div>
      <div class="page__breadcrumb">
        <nuxt-link to="/">
          <i class="las la-md la-home"></i> {{ $t('c.home') }}
        </nuxt-link> / {{ $t('surveyor_fee') }} / {{ $t('surveyor_fee_config') }}
      </div>
    </div>

    <!--Card Criteria -->
    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('search-criteria', $event)">
          <i class="las la-angle-up" style="cursor: pointer;"></i> {{ $t('c.filter') }}
        </div>
        <div class="action">
          <button class="btn btn-primary ml-2" @click="search()">
            <i class="las la-search"></i> <span>{{ $t('c.search') }}</span>
          </button>
          <button class="btn btn-warning ml-2" @click="clear()">
            <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
          </button>
        </div>
      </div>
      <b-collapse visible id="search-criteria">
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('surveyor_type') }}</label>
              <treeselect v-model="criteria.surveyorType" :options="surveyorTypeList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('policy_type') }}</label>
              <treeselect v-model="criteria.policyType" :options="policyTypeList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('claim_criteria_type') }}</label>
              <treeselect v-model="criteria.claimType" :options="claimTypeList" :placeholder="$t('c.all')" />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('c.effective_from') }}</label>
              <a-form-datepicker v-model="criteria.effectiveFrom" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('c.effective_to') }}</label>
              <a-form-datepicker v-model="criteria.effectiveTo" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('c.status') }}</label>
              <treeselect v-model="criteria.status" :options="statusList" :placeholder="$t('c.all')" />
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>

    <!--Card Detail -->
    <div class="card">
      <div class="card-body">
        <a-table
          :id="$route.name"
          :datasource="datasource"
          :columns="columns"
          :paging="paging"
        >
          <template slot="tableAction">
            <button class="btn btn-success" @click="gotoCreate()">
              <i class="las la-plus-circle"></i> {{ $t('c.create') }}
            </button>
            <button class="btn btn-danger ml-2" @click="deleteRow()">
              <i class="las la-times"></i> {{ $t('c.delete') }}
            </button>
          </template>
          <template slot="tableBody">
            <tr v-for="(v, index) in datasource.data" :key="index">
              <td class="text-center">
                <b-form-checkbox v-model="v.checked" :disabled="expire" />
              </td>
              <td>{{ v.surveyorType }}</td>
              <td>{{ v.policyType }}</td>
              <td>{{ v.claimType }}</td>
              <td>{{ v.motormcType }}</td>
              <td>{{ v.effectiveDate }}</td>
              <td>{{ v.expire }}</td>
              <td>{{ v.status }}</td>
              <td>
                <div class="btn-action-group">
                  <button class="btn btn-sm btn-info" v-b-tooltip:page.bottom.hover="$t('c.view')" @click="gotoView()">
                    <i class="las la-md la-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-warning" v-b-tooltip:page.bottom.hover="$t('c.edit')" @click="gotoEdit()">
                    <i class="las la-md la-pen"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" v-b-tooltip:page.bottom.hover="$t('c.delete')" @click="deleteRow()">
                    <i class="las la-md la-times"></i>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  name: 'SurveyorFeeConfigList',
  mixins: [CommonMixin],

  async fetch () {},

  data () {
    return {
      criteria: {},
      surveyorTypeList: [],
      policyTypeList: [],
      claimTypeList: [],
      statusList: [],
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      datasource: {}
    }
  },

  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),

    columns () {
      const col = [
        { label: 'CHECK_ALL', sortable: false, filterable: false, style: { 'width': '20px' } },
        { label: this.$t('surveyor_type'), field: 'surveyorType' },
        { label: this.$t('policy_type'), field: 'policyType' },
        { label: this.$t('claim_type'), field: 'claimType' },
        { label: this.$t('motormc_type'), field: 'motormcType' },
        { label: this.$t('c.effective_date'), field: 'effectiveDate', style: { 'width': '130px' } },
        { label: this.$t('c.expire'), field: 'expire', style: { 'width': '130px' } },
        { label: this.$t('c.status'), field: 'status', style: { 'width': '80px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { 'width': '100px' } }
      ]
      return col
    }
  },

  activated () {
    this.search()
  },

  methods: {
    async search () {
      const criteria = {...this.criteria, ...this.paging}
      this.datasource = await this.$axios.$post('/api/surveyor-fee/findByCriteria', criteria)
    },
    gotoCreate () {
      this.$router.push({
        path: '/surveyor-fee/surveyor-fee-config/create'
      })
    },
    gotoView (id) {
      this.$router.push({
        path: `/surveyor-fee/surveyor-fee-config/view?id=${id}`
      })
    },
    gotoEdit (id) {
      this.$router.push({
        path: `/surveyor-fee/surveyor-fee-config/edit?id=${id}`
      })
    },
    deleteRow () {},
  },
}
</script>