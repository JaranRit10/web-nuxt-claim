<template>
  <div>
    <HasPerm any="reconcile_menu,reconcile_view">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('reconcile') }}</h1> <span>{{ $t('c.list') }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('reconcile') }}
        </div>
      </div>

      <!-- Search Criteria -->
      <div class="card">
        <div class="card-header">
          <div class="title">
            <i
              class="las la-angle-up"
              @click="toggleCollapse('search-criteria-reconcile', $event)"
            ></i>
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
        <b-collapse visible id="search-criteria-reconcile">
          <div class="card-body">
            <b-row align-h="around">
              <b-col sm="4" class="form-group">
                <label>{{ $t('c.start_date') }}</label>
                <a-form-datepicker id="reconcileStartDate" v-model="criteria.startDate" />
              </b-col>
              <b-col sm="4" class="form-group">
                <label>{{ $t('c.end_date') }}</label>
                <a-form-datepicker id="reconcileEndDate" v-model="criteria.endDate" />
              </b-col>
            </b-row>
          </div>
        </b-collapse>
      </div>

      <!-- Search Result -->
      <div class="card">
        <div class="card-body">
          <a-table
            :id="$route.name"
            :datasource="datasource"
            :columns="columns"
            :paging="paging"
            @refresh="search"
          >
            <template slot="tableAction"></template>
            <template slot="tableBody">
              <tr v-for="(obj, index) in datasource.data" :key="index">
                <!-- <td class="text-center">{{ obj.seqItemId }}</td> -->
                <td class="text-left">{{ obj.fileName | emptyToDash }}</td>
                <td class="text-center">{{ obj.totalRecord | emptyToDash }}</td>
                <td class="text-center">{{ obj.reconcileDate | emptyToDash }}</td>
                <td class="text-center">{{ obj.statusName | emptyToDash }}</td>
                <td>
                  <div class="btn-action-group">
                    <HasPerm any="reconcile_view">
                      <button class="btn btn-sm btn-info" v-b-tooltip:page.bottom.hover="$t('c.view')" @click="goToView(obj.infId)"><i class="las la-md la-eye" /></button>
                    </HasPerm>
                  </div>
                </td>
              </tr>
            </template>
          </a-table>
        </div>
        <!-- /card-body -->
      </div>
    </HasPerm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'ReconcileList',
  mixins: [CommonMixin],

  async fetch () {
    // Not Now
  },

  data () {
    return {
      criteria: {},
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
        // { label: this.$t('c.no'), sortable: false, filterable: false, style: { 'width': '40px' }},
        { label: this.$t('file_name'), field: 'fileName', style: { 'min-width': '250px' }},
        { label: this.$t('total_record'), field: 'totalRecord', style: { 'width': '130px' }},
        { label: this.$t('reconcile_date'), field: 'reconcileDate', style: { 'width': '130px' }},
        { label: this.$t('c.status'), field: 'status', style: { 'width': '150px' }},
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { 'width': '80px' }}
      ]
      return col
    }
  },
  activated () {
    this.search()
  },
  methods: {
    async search () {
      const criteria = { ...this.criteria, ...this.paging }
      const response = await this.$axios.$post('/api/reconcileApp/findByCriteria', criteria)
      if (response.data) {
        this.datasource = response
      }
    },
    clearCriteria () {
      this.criteria = {}
    },
    goToView (infId) {
      this.$router.push({
        path: `/reconcile/view?id=${infId}`
      })
    }
  }
}
</script>