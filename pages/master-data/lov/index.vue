<template>
  <div>
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('lov') }}</h1> <span>{{ $t('c.list') }}</span>
      </div>
      <div class="page__breadcrumb">
        <i class="las la-md la-home" /> {{ $t('c.home') }} / {{ $t('master_data') }} / {{ $t('lov') }}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="title" @click="toggleCollapse('search-criteria', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('c.filter') }}
        </div>
        <div class="action">
          <button class="btn btn-primary" @click="search()">
            <i class="las la-search"></i> <span>{{ $t('c.search') }}</span>
          </button>
          <button class="btn btn-warning ml-2" @click="clearCriteria()">
            <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
          </button>
        </div>
      </div>

      <b-collapse visible id="search-criteria">
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('group_name') }}</label>
              <b-form-input v-model="criteria.groupName" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('lov_name') }}</label>
              <b-form-input v-model="criteria.lovName" />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('c.status') }}</label>
              <treeselect v-model="criteria.status" :options="statusList" :placeholder="$t('c.all')" />
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
            <tr v-for="obj in datasource.data" :key="obj.errorCode">
              <td>{{ obj.groupName }}</td>
              <td class="text-center">{{ obj.seq | emptyToDash }}</td>
              <td>{{ obj.lovName | emptyToDash }}</td>
              <td>{{ obj.lovDesc | emptyToDash }}</td>
              <td>{{ obj.lovDescEn | emptyToDash }}</td>
              <td class="text-center">{{ obj.value1 | emptyToDash }}</td>
              <td class="text-center">{{ obj.value2 | emptyToDash }}</td>
              <td class="text-center">{{ obj.statusName | emptyToDash }}</td>
              <td class="text-center">{{ obj.updateBy | emptyToDash }}</td>
              <td class="text-center">{{ obj.updateDate | emptyToDash }}</td>
              <td>
                <div class="btn-action-gl">
                  <!-- <HasPerm any="errmsg_view"> -->
                  <button class="btn btn-sm btn-info" v-b-tooltip:page.bottom.hover.left="$t('c.view')" @click="gotoView(obj.lovId)"><i class="las la-md la-eye" /></button>
                  <!-- </HasPerm> -->
                  <!-- <HasPerm any="errmsg_update"> -->
                  <button class="btn btn-sm btn-warning" v-b-tooltip:page.bottom.hover.left="$t('c.edit')" @click="gotoEdit(obj.lovId)"><i class="las la-md la-pen" /></button>
                  <!-- </HasPerm> -->
                </div>
              </td>
            </tr>
          </template>
        </a-table>
      </div>
    </div><!-- /Search Result -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'ListOfValueList',
  mixins: [CommonMixin],
  async fetch () {
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
  },
  data () {
    return {
      criteria: {},
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      datasource: {},
      statusList: [],
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),
    columns () {
      const col = [
        { label: this.$t('group_name'), field: 'groupName', style: { width: '123px', minWidth: '123px' } },
        { label: this.$t('seq'), field: 'seq', style: { width: '20px', minWidth: '20px' } },
        { label: this.$t('lov_name'), field: 'lovName', style: { width: '70px', minWidth: '70px' } },
        { label: this.$t('lov_desc'), field: 'lovDesc', style: { minWidth: '190px' } },
        { label: this.$t('lov_descEn'), field: 'lovDescEn', style: { minWidth: '190px' } },
        { label: this.$t('value1'), field: 'value1', style: { width: '80px', minWidth: '80px' } },
        { label: this.$t('value2'), field: 'value2', style: { width: '80px', minWidth: '80px' } },
        { label: this.$t('c.status'), field: 'statusName', style: { width: '60px', minWidth: '60px' } },
        { label: this.$t('c.updated_by'), field: 'updateBy', style: { width: '105px', minWidth: '105px' } },
        { label: this.$t('c.updated_date'), field: 'updateDate', style: { width: '140px', minWidth: '140px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { width: '60px', minWidth: '60px' } }
      ]
      return col
    },
  },
  activated () {
    this.search()
  },

  methods: {
    async search () {
      const criteria = { ...this.criteria, ...this.paging }
      const response = await this.$axios.$post('/api/lov/findByCriteria', criteria)
      console.log(response)
      if (response) {
        this.datasource = response
      }
    },

    clearCriteria () {
      this.criteria = {}
    },

    gotoView (groupName) {
      this.$router.push({ path: `/master-data/lov/view?id=${groupName}`})
    },

    gotoEdit (groupName) {
      this.$router.push({ path: `/master-data/lov/edit?id=${groupName}` })
    },

    deleteData (id) {
      let idList
      if (id) {
        idList = [id]
      }
      else {
        idList = this.getCheckedValue(this.datasource, 'groupName')
      }

      if (idList.length > 0) {
        this.msgBoxConfirm('delete').then(ok => {
          if (ok) {
            this.$axios.$post('/api/lov/delete', idList).then(res => {
              if (res == false) {
                this.toast('danger', res.errMsg)
              } else {
                this.toast('success', this.$t('c.success__delete'))
                this.search()
              }
            })
          }
        })
      }
      else {
        this.toast('warning', this.$t('c.err__delete_required_one'))
      }
    },
  }
}
</script>
