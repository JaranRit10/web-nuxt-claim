<template>
  <div>
    <HasPerm any="partner_menu">
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('kpi_partner') }}</h1> <span>{{ $t('c.list') }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home" /> {{ $t('c.home') }} / {{ $t('master_data') }} / {{ $t('kpi_partner') }}
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
                <label>{{ $t('memberId') }}</label>
                <b-form-input v-model="criteria.memberId" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('memberName') }}</label>
                <b-form-input v-model="criteria.memberName" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('branchName') }}</label>
                <b-form-input v-model="criteria.branchName" />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('memberHeadCode') }}</label>
                <b-form-input v-model="criteria.memberHeadCode" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('memberHeadName') }}</label>
                <b-form-input v-model="criteria.memberHeadName" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('insuranceName') }}</label>
                <b-form-input v-model="criteria.insuranceName" />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('partnerGrade') }}</label>
                <treeselect v-model="criteria.partnerGrade" :options="gradeTypeList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('partnerType') }}</label>
                <treeselect v-model="criteria.partnerType" :options="partnerTypeList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('memberSubType') }}</label>
                <treeselect v-model="criteria.memberSubType" :options="memberSubTypeList" :placeholder="$t('c.all')" />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('province') }}</label>
                <treeselect v-model="criteria.province"
                            :options="provinceList"
                            @input="changeProvince(criteria.province)"
                            @select="selectProvince(criteria.province, $event)"
                            :placeholder="$t('c.select_province')"
                />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('district') }}</label>
                <treeselect v-model="criteria.district"
                            :options="districtList"
                            @input="changeDistrict(criteria.district)"
                            @select="selectDistrict(criteria.district, $event)"
                            :disabled="!criteria.province"
                            :placeholder="$t('c.select_district')"
                />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('sub_district') }}</label>
                <treeselect v-model="criteria.subDistrict"
                            :options="subDistrictList"
                            @input="changesubDistrict(criteria.subDistrict)"
                            @select="selectsubDistrict(criteria.subDistrict, $event)"
                            :disabled="!criteria.district"
                            :placeholder="$t('c.select_sub_district')"
                />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('post_code') }}</label>
                <treeselect v-model="criteria.postcode"
                            :options="postcodeList"
                            :disabled="!criteria.subDistrict"
                            :placeholder="$t('c.select_post_code')"
                />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('c.status') }}</label>
                <treeselect v-model="criteria.status" :options="statusList" :placeholder="$t('c.all')" />
              </b-col>
              <b-col sm="3">

              </b-col>
            </b-row>
          </div>
        </b-collapse>
      </div>

      <div class="card">
        <div class="card-body">
          <a-table
            :id="$route.name"
            :datasource="datasource"
            :paging="paging"
            :columns="columns"
            @refresh="search"
          >
            <template slot="tableAction">
              <HasPerm any="partner_create">
                <button class="btn btn-success" @click="gotoCreate()">
                  <i class="las la-plus"></i> {{ $t('c.create') }}
                </button>
              </HasPerm>
              <HasPerm any="partner_delete">
                <button class="btn btn-danger ml-2" @click="deleteData()">
                  <i class="las la-times"></i> {{ $t('c.delete') }}
                </button>
              </HasPerm>
            </template>
            <template slot="tableBody">
              <!-- @dblclick="gotoEdit(obj.memberId)" -->
              <tr v-for="(obj, index) in datasource.data" :key="index">
                <td class="text-center"><b-form-checkbox v-model="obj.checked"></b-form-checkbox></td>
                <td class="text-center">{{ obj.memberId | emptyToDash }}</td>
                <td>{{ obj.memberName | emptyToDash }}</td>
                <td>{{ obj.branchName | emptyToDash }}</td>
                <td>{{ obj.memberHeadCode | emptyToDash }}</td>
                <td>{{ obj.memberHeadName | emptyToDash }}</td>
                <td>{{ obj.insuranceName | emptyToDash }}</td>
                <td>{{ obj.gradeDetail | emptyToDash }}</td>
                <td>{{ obj.partnerType | emptyToDash }}</td>
                <td>{{ obj.memberSubType | emptyToDash }}</td>
                <td>{{ obj.provinceName | emptyToDash }}</td>
                <td>{{ obj.districtName | emptyToDash }}</td>
                <td>{{ obj.subDistrictName | emptyToDash }}</td>
                <td class="text-center">{{ obj.postcode | emptyToDash }}</td>
                <td class="text-center">{{ obj.status+' - '+obj.statusName | emptyToDash }}</td>
                <td>
                  <div class="btn-action-gl">
                    <button class="btn btn-sm btn-info" @click="gotoView(obj.memberId)"
                            v-b-tooltip:page.bottom.hover="$t('c.view')"
                    >
                      <i class="las la-md la-eye"></i></button>

                    <button class="btn btn-sm btn-warning" @click="gotoEdit(obj.memberId)"
                            v-b-tooltip:page.bottom.hover="$t('c.edit')"
                    >
                      <i class="las la-pen"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" @click="deleteData(obj)"
                            v-b-tooltip:page.bottom.hover="$t('c.delete')"
                    >
                      <i class="las la-times"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </a-table>
        </div>
      </div>
    </HasPerm>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  name: 'KpiPartnerList',
  mixins: [CommonMixin],
  async fetch () {
    this.gradeTypeList = await this.$axios.$get('/api/dropdown/lov/PART_GRADE')
    this.partnerTypeList = await this.$axios.$get('/api/dropdown/lov/PARTNER_TYPE')
    this.memberSubTypeList = await this.$axios.$get('/api/dropdown/lov/MEMBER_SUB_TYPE')
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    // thai
    this.provinceList = await this.$axios.$get('/api/dropdown/getProvince')

  },
  data () {
    return {
      criteria: {},
      gradeTypeList: [],
      partnerTypeList: [],
      memberSubTypeList: [],
      provinceList: [],
      districtList: [],
      subDistrictList: [],
      postcodeList: [],
      statusList: [],
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
        { label: 'CHECK_ALL', sortable: false, filterable: false, style: { minWidth: '20px' } },
        { label: this.$t('memberId'), field: 'memberId', style: { width: '100px', minWidth: '100px' }},
        { label: this.$t('memberName'), field: 'memberName', style: { width: '150px', minWidth: '150px' }},
        { label: this.$t('branchName'), field: 'branchName', style: { width: '150px', minWidth: '150px' }},
        { label: this.$t('memberHeadCode'), field: 'memberHeadCode', style: { width: '150px', minWidth: '150px' }},
        { label: this.$t('memberHeadName'), field: 'memberHeadName', style: {width: '150px', minWidth: '150px' }},
        { label: this.$t('insuranceName'), field: 'insuranceName', style: {width: '150px', minWidth: '150px' }},
        { label: this.$t('partnerGrade'), field: 'partnerGrade', style: {width: '120px', minWidth: '120px' }},
        { label: this.$t('partnerType'), field: 'partnerType', style: {width: '120px', minWidth: '120px' }},
        { label: this.$t('memberSubType'), field: 'memberSubType', style: {width: '150px', minWidth: '150px' }},
        { label: this.$t('province'), field: 'province', style: {minWidth: '150px' }},
        { label: this.$t('district'), field: 'district', style: { minWidth: '120px' }},
        { label: this.$t('sub_district'), field: 'sub_district', style: { minWidth: '120px' }},
        { label: this.$t('post_code'), field: 'post_code', style: { minWidth: '100px' }},
        { label: this.$t('c.status'), field: 'post_code', style: { minWidth: '90px', width: '90px' }},
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { minWidth: '90px', width: '90px' }}
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
      const response = await this.$axios.$post('/api/partner/findByCriteria', criteria)
      if (response.data) {
        this.datasource = response
      }
    },
    // Province search District
    async selectProvince (id, event) {
      if (id != event.id) {
        this.districtList = await this.$axios.$get('/api/dropdown/getDistict?provinceCode='+event.id) // Use provinceCode
      }
    },
    changeProvince (id) {
      if (!id) {
        this.criteria.district = undefined
        this.criteria.subDistrict = undefined
        this.criteria.postcode = undefined
      }
      console.log('kkjkk')
    },


    // District search subDistrictCode
    async selectDistrict (id, event) {
      if (id != event.id) {
        this.subDistrictList = await this.$axios.$get('/api/dropdown/getSubDistict?districtCode='+event.id)
      }
    },
    changeDistrict (id) {
      if (!id) {
        this.criteria.subDistrict = undefined
        this.criteria.postcode = undefined
      }
    },


    // subDistrictCode search post
    async selectsubDistrict (id, event) {
      if (id != event.id) {
        this.postcodeList = await this.$axios.$get('/api/dropdown/getPostcode?subDistrictCode='+event.id)
      }
    },
    changesubDistrict (id) {
      if (!id) {
        this.criteria.postcode = undefined

      }
    },
    deleteData (obj) {
      let dataList = []
      if (obj) {
        dataList = [obj]
      } else {
        dataList = _.filter(this.datasource.data, { checked: true })
      }
      if (_.size(dataList) > 0) {
        this.msgBoxConfirm('delete').then(ok => {
          if (ok) {
            this.$axios.$post('/api/partner/delete', dataList).then(res => {
              this.toast('success', this.$t('c.success__delete'))
              this.search()
            })
          }
        })
      } else {
        this.toast('warning', this.$t('c.err__delete_required_one'))
      }
    },
    gotoCreate () {
      this.$router.push({
        path: '/master-data/kpi-partner/create'
      })
    },
    gotoEdit (id) {
      this.$router.push({
        path: `/master-data/kpi-partner/edit/${id}`
      })
    },
    gotoView (id) {
      this.$router.push({ path: `/master-data/kpi-partner/view/${id}` })
    },
    clearCriteria () {
      this.criteria = {}
    }
  },
}
</script>