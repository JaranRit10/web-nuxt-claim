<template>
  <div>
    <!-- Page Header -->
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('interface_with_coreIIA') }} <span>{{ $t('c.list') }}</span></h1>
      </div>
      <div class="page__breadcrumb">
        <nuxt-link to="/">
          <i class="las la-md la-home"></i> {{ $t('c.home') }}
        </nuxt-link> / {{ $t('inteface_log') }} / {{ $t('interface_with_coreIIA') }}
      </div>
    </div>

    <!--Card Criteria -->
    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('search-criteria', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('c.filter') }}
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
              <label>{{ $t('file_type') }}</label>
              <treeselect v-model="criteria.surveyorType" :options="surveyorTypeList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('generate_date_from') }}</label>
              <a-form-datepicker v-model="criteria.effectiveFrom" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('generate_date_end') }}</label>
              <a-form-datepicker v-model="criteria.effectiveTo" />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('file_name') }}</label>
              <treeselect v-model="criteria.surveyorType" :options="surveyorTypeList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('interface_date_from') }}</label>
              <a-form-datepicker v-model="criteria.effectiveTo" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('interface_date_end') }}</label>
              <a-form-datepicker v-model="criteria.effectiveTo" />
            </b-col>

          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('c.status') }}</label>
              <treeselect v-model="criteria.status" :options="statusList" :placeholder="$t('c.all')" />
            </b-col>
            <b-col sm="3"></b-col>
            <b-col sm="3"></b-col>
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
          <!-- <template slot="tableAction">
            <button class="btn btn-success" @click="gotoCreate()">
              <i class="las la-plus-circle"></i> {{ $t('c.create') }}
            </button>
            <button class="btn btn-danger ml-2" @click="deleteRow()">
              <i class="las la-times"></i> {{ $t('c.delete') }}
            </button>
          </template> -->
          <template slot="tableBody">
            <tr v-for="(v, index) in datasource.data" :key="index">
              <!-- <td class="text-center">
                <b-form-checkbox v-model="v.checked" />
              </td> -->
              <td class="text-center">{{ v.id }}</td>
              <td>{{ v.fileType }}</td>
              <td>{{ v.fileName }}</td>
              <td>{{ v.filePath }}</td>
              <td class="text-right">{{ v.noOfData }}</td>
              <td class="text-center">{{ v.generateDate }}</td>
              <td class="text-center">{{ v.interfaceDate }}</td>
              <td class="text-center">{{ v.status }}</td>
              <td>
                <div class="btn-action-group">
                  <button class="btn btn-sm btn-info" v-b-tooltip:page.top.hover="$t('c.view')" @click="gotoView(v.id)">
                    <i class="las la-md la-eye"></i>
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
  name: 'InteraceLogWithCoreIIA',
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
      datasource: {
        data: [
          {
            id: 1,
            fileType: 'Caim Data File',
            fileName: 'CLAIM_MV_MAIN_20201104.TXT',
            filePath: '/exportCore/motor/20160824/',
            noOfData: '3',
            generateDate: '11/4/2020  20:00:00',
            interfaceDate: '11/4/2020  20:00:00',
            status: 'Success',
          },
          {
            id: 2,
            fileType: 'Caim Data File',
            fileName: 'CLAIM_MV_DAMAGE_20201104.TXT',
            filePath: '/exportCore/motor/20160824/',
            noOfData: '5',
            generateDate: '11/4/2020  20:00:00',
            interfaceDate: '11/4/2020  20:00:00',
            status: 'Success',
          },
          {
            id: 3,
            fileType: 'Caim Data File',
            fileName: 'CLAIM_MV_PAYMENT_20201104.TXT',
            filePath: '/exportCore/motor/20160824/',
            noOfData: '5',
            generateDate: '11/4/2020  20:00:00',
            interfaceDate: '11/4/2020  20:00:00',
            status: 'Success',
          },
        ],
      }
    }
  },

  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),

    columns () {
      const col = [
        // { label: 'CHECK_ALL', sortable: false, filterable: false, style: { 'width': '20px' } },
        { label: this.$t('seq'), field: 'seq', style: {width: '20px' } },
        { label: this.$t('file_type'), field: 'fileType', style: {minWidth: '120px', width: '120px' } },
        { label: this.$t('file_name'), field: 'fileName', style: {minWidth: '180px' } },
        { label: this.$t('file_path'), field: 'filePath', style: {minWidth: '180px' } },
        { label: this.$t('no_of_data'), field: 'noOfData', style: {minWidth: '90px', width: '90px' } },
        { label: this.$t('generate_date'), field: 'generateDate', style: { minWidth: '130px', width: '130px' } },
        { label: this.$t('interface_date'), field: 'interfaceDate', style: {minWidth: '130px', width: '130px' } },
        { label: this.$t('c.status'), field: 'status', style: { minWidth: '80px', width: '80px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { minWidth: '70px', width: '70px' } }
      ]
      return col
    }
  },

  activated () {
    this.search()
  },

  methods: {
    async search () {
      // const criteria = {...this.criteria, ...this.paging}
      // this.datasource = await this.$axios.$post('/api/interace-log-with-coreiia/findByCriteria', criteria)
    },
    gotoCreate () {
      this.$router.push({
        path: '/interace-log/interace-log-config/create'
      })
    },
    gotoView (id) {
      this.$router.push({
        path: `/interace-log/interace-log-with-coreiia/view?id=${id}`
      })
    },
    gotoEdit (id) {
      this.$router.push({
        path: `/interace-log/interace-log-config/edit?id=${id}`
      })
    },
    deleteRow () {},
  },
}
</script>
