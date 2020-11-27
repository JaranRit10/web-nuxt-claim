<template>
  <div>
    <HasPerm any="partner_menu">
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('kpi_partner') }}</h1><span> {{ $t(`c.${mode}`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('master_data') }} / {{ $t('kpi_partner') }}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="tab">
            <i class="las la-info-circle"></i> {{ $t('c.info') }}
          </div>
          <div class="action">
            <button class="btn btn-secondary ml-2" @click="gotoBack">
              <i class="las la-arrow-left"></i> {{ $t('c.back') }}
            </button>
            <HasPerm any="partner_create,partner_update">
              <button class="btn btn-success ml-2" @click="save()" v-show="!viewMode">
                <i class="las la-save"></i> {{ $t('c.save') }}
              </button>
            </HasPerm>
            <HasPerm any="partner_delete">
              <button class="btn btn-danger ml-2" @click="deleteData()" v-if="mode == 'edit' ">
                <i class="las la-md la-times"></i> {{ $t('c.delete') }}
              </button>
            </HasPerm>
          </div>
        </div>
        <div class="card-body">
          <div @submit.prevent :class="{ 'dirty' : $v.$dirty }">
            <b-row align-h="around" class="form-group mb-2">
              <!-- left -->
              <b-col sm="3" class="form-group">
                <div v-if="mode!='create'" class="form-group">
                  <label>{{ $t('memberId') }}</label>
                  <b-form-input v-model="form.memberId" :disabled="disableMode"></b-form-input>
                </div>
                <div class="form-group">
                  <label class="required">{{ $t('memberName') }}</label>
                  <b-form-input v-model="form.memberName" :disabled="disableModeEdit"></b-form-input>
                  <!-- required -->
                  <div class="invalid-feedback" v-show="!$v.form.memberName.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.memberName.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('memberName'), val: $v.form.memberName.$params.maxLength.max }) }}
                  </div>
                <!-- EndRequired -->
                </div>
                <div class="form-group">
                  <label class="required">{{ $t('branchName') }}</label>
                  <b-form-input v-model="form.branchName" :disabled="disableModeEdit"></b-form-input>
                  <!-- required -->
                  <div class="invalid-feedback" v-show="!$v.form.branchName.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.branchName.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('branchName'), val: $v.form.branchName.$params.maxLength.max }) }}
                  </div>
                <!-- EndRequired -->
                </div>
                <div v-if="mode!='create'" class="form-group">
                  <label>{{ $t('memberHeadId') }}</label>
                  <b-form-input v-model="form.memberHeadId" :disabled="disableMode"></b-form-input>
                </div>
                <div class="form-group">
                  <label class="required">{{ $t('memberHeadCode') }}</label>
                  <b-form-input v-model="form.memberHeadCode" :disabled="disableModeEdit"></b-form-input>
                  <!-- required -->
                  <div class="invalid-feedback" v-show="!$v.form.memberHeadCode.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.memberHeadCode.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('memberHeadCode'), val: $v.form.memberHeadCode.$params.maxLength.max }) }}
                  </div>
                <!-- EndRequired -->
                </div>
                <div class="form-group">
                  <label class="required">{{ $t('memberHeadName') }}</label>
                  <b-form-input v-model="form.memberHeadName" :disabled="disableModeEdit"></b-form-input>
                  <!-- required -->
                  <div class="invalid-feedback" v-show="!$v.form.memberHeadName.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.memberHeadName.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('memberHeadName'), val: $v.form.memberHeadName.$params.maxLength.max }) }}
                  </div>
                <!-- EndRequired -->
                </div>
                <div class="form-group">
                  <label>{{ $t('memberSubType') }}</label>
                  <treeselect v-model="form.memberSubType" :options="memberSubTypeList" :placeholder="$t('c.all')" :disabled="disableModeEdit" />
                </div>
                <div class="form-group">
                  <label class="required">{{ $t('insuranceName') }}</label>
                  <b-form-input v-model="form.insuranceName" :disabled="disableModeEdit"></b-form-input>
                  <!-- required -->
                  <div class="invalid-feedback" v-show="!$v.form.insuranceName.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.insuranceName.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('insuranceName'), val: $v.form.insuranceName.$params.maxLength.max }) }}
                  </div>
                <!-- EndRequired -->
                </div>
                <div class="form-group">
                  <label class="required">{{ $t('c.status') }}</label>
                  <treeselect v-model="form.status" :options="statusList" :placeholder="$t('c.status')" :disabled="disableModeEdit" />
                  <!-- required -->
                  <div class="invalid-feedback" v-show="!$v.form.status.required">
                    {{ $t('c.err__required') }}
                  </div>
                <!-- EndRequired -->
                </div>
                <div class="form-group">
                  <label>{{ $t('address') }}</label>
                  <b-form-textarea v-model="form.address" :disabled="disableModeEdit" />
                </div>
              </b-col>
              <!-- Middle -->
              <b-col sm="3" class="form-group">
                <div v-if="mode!='create'" class="form-group">
                  <label>{{ $t('gradeId') }}</label>
                  <b-form-input v-model="form.gradeId" :disabled="disableMode"></b-form-input>
                </div>
                <div class="form-group">
                  <label>{{ $t('partnerGrade') }}</label>
                  <treeselect v-model="form.gradeDetail" :options="gradeTypeList" :placeholder="$t('c.all')" :disabled="disableModeEdit" />
                </div>
                <div class="form-group">
                  <label>{{ $t('partnerType') }}</label>
                  <treeselect v-model="form.partnerType" :options="partnerTypeList" :placeholder="$t('c.all')" :disabled="disableModeEdit" />
                </div>
                <div class="form-group">
                  <label>{{ $t('province') }}</label>
                  <treeselect v-model="form.province"
                              :options="provinceList"
                              @input="changeProvince(form.province)"
                              @select="selectProvince(form.province, $event)"
                              :placeholder="$t('c.select_province')"
                              :disabled="disableModeEdit"
                  />
                </div>
                <div class="form-group">
                  <label>{{ $t('district') }}</label>
                  <treeselect v-model="form.district"
                              :options="districtList"
                              @input="changeDistrict(form.district)"
                              @select="selectDistrict(form.district, $event)"
                              :disabled="!form.province || disableModeEdit"
                              :placeholder="$t('c.select_district')"
                  />
                </div>
                <div class="form-group">
                  <label>{{ $t('sub_district') }}</label>
                  <treeselect v-model="form.subDistrict"
                              :options="subDistrictList"
                              @input="changesubDistrict(form.subDistrict)"
                              @select="selectsubDistrict(form.subDistrict, $event)"
                              :disabled="!form.district || disableModeEdit"
                              :placeholder="$t('c.select_sub_district')"
                  />
                </div>
                <div class="form-group">
                  <label>{{ $t('post_code') }}</label>
                  <treeselect v-model="form.postcode"
                              :options="postcodeList"
                              :disabled="!form.subDistrict || disableModeEdit"
                              :placeholder="$t('c.select_post_code')"
                  />
                </div>
                <div class="form-group">
                  <label>{{ $t('officePhone') }}</label>
                  <b-form-input v-model="form.officePhone" :disabled="disableModeEdit"></b-form-input>
                </div>
                <div class="form-group">
                  <label>{{ $t('laborTypeDesc') }}</label>
                  <b-form-textarea v-model="form.laborTypeDesc" :disabled="disableModeEdit" />
                </div>
              </b-col>
              <!-- right -->
              <b-col v-if="mode!='create'" sm="3" class="form-group">
                <div class="form-group">
                  <label>{{ $t('c.created_by') }}</label>
                  <b-form-input v-model="form.createBy" :disabled="disableMode"></b-form-input>
                </div>
                <div class="form-group">
                  <label>{{ $t('c.created_date') }}</label>
                  <b-form-input v-model="form.createDate" :disabled="disableMode"></b-form-input>
                </div>
                <div class="form-group">
                  <label>{{ $t('c.updated_by') }}</label>
                  <b-form-input v-model="form.updateBy" :disabled="disableMode"></b-form-input>
                </div>
                <div class="form-group">
                  <label>{{ $t('c.updated_date') }}</label>
                  <b-form-input v-model="form.updateDate" :disabled="disableMode"></b-form-input>
                </div>
              </b-col>
              <b-col sm="3" v-else></b-col>
            </b-row>
          </div>
        </div>
      </div>
    </HasPerm>
  </div>
</template>
<script>
import _ from 'lodash'
import { required, maxLength } from 'vuelidate/lib/validators'
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  name: 'SurveyorDetail',

  mixins: [CommonMixin],
  async fetch () {
    this.gradeTypeList = await this.$axios.$get('/api/dropdown/lov/PART_GRADE')
    this.partnerTypeList = await this.$axios.$get('/api/dropdown/lov/PARTNER_TYPE')
    this.memberSubTypeList = await this.$axios.$get('/api/dropdown/lov/MEMBER_SUB_TYPE')
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    // thai
    this.provinceList = await this.$axios.$get('/api/dropdown/getProvince')
    // this.districtList = await this.$axios.$get('/api/dropdown/getDistict')
    // this.subDistrictList = await this.$axios.$get('/api/dropdown/getSubDistict')
    // this.postcodeList = await this.$axios.$get('/api/dropdown/getPostcode')
  },
  async asyncData (context) {
    let mode = context.params.mode
    const id = context.params.id
    let form
    let districtListDropTemp = []
    let subDistrictListDropTemp = []
    let postcodeListDropTemp = []
    if (mode != 'create') {
      form = await context.$axios.$get(`/api/partner/findById/${id}`)
      if (form.province) {
        districtListDropTemp = await context.$axios.$get('/api/dropdown/getDistict?provinceCode='+form.province)
        if (form.district) {
          subDistrictListDropTemp = await context.$axios.$get('/api/dropdown/getSubDistict?districtCode='+form.district)
          if (form.subDistrict) {
            postcodeListDropTemp = await context.$axios.$get('/api/dropdown/getPostcode?subDistrictCode='+form.subDistrict)
          }
        }
      }
      console.log(form)
    }

    if (mode == 'create') {
      return {
        form: {},
        mode,
        disableMode: false,
        disableModeEdit: false,
        viewMode: false
      }
    } else if (mode == 'view') {
      return {
        form: await form,
        id,
        mode,
        districtList: districtListDropTemp,
        subDistrictList: subDistrictListDropTemp,
        postcodeList: postcodeListDropTemp,
        disableMode: true,
        disableModeEdit: true,
        viewMode: true
      }
    } else {
      return {
        form: await form,
        id,
        mode,
        districtList: districtListDropTemp,
        subDistrictList: subDistrictListDropTemp,
        postcodeList: postcodeListDropTemp,
        disableMode: true,
        disableModeEdit: false,
        viewMode: false
      }
    }
  },
  data () {
    return {
      form: {},
      gradeTypeList: [],
      partnerTypeList: [],
      memberSubTypeList: [],
      provinceList: [],
      districtList: [],
      subDistrictList: [],
      postcodeList: [],
      statusList: [],
      datasource: {},
      districtListDrop: [],
      subDistrictListDrop: [],
      postcodeListDrop: []
    }
  },
  validations: {
    form: {
      // surveyCompanyId: { required },
      memberName: { required, maxLength: maxLength(100) },
      branchName: { required, maxLength: maxLength(50) },
      memberHeadCode: { required, maxLength: maxLength(10) },
      memberHeadName: { required, maxLength: maxLength(100) },
      insuranceName: { required, maxLength: maxLength(100) },
      status: { required, }
    }
  },
  methods: {
    getReqField () {
      const invalidField = _.findKey(this.$v.form.$params, (value, key) => this.$v.form[key].$invalid)
      console.log('invalidField => ', invalidField)
    },
    // Province search District
    async selectProvince (id, event) {
      if (id != event.id) {
        this.districtList = await this.$axios.$get('/api/dropdown/getDistict?provinceCode='+event.id) // Use provinceCode
      }
    },
    changeProvince (id) {
      this.form.district = undefined
      this.form.subDistrict = undefined
      this.form.postcode = undefined

    },


    // District search subDistrictCode
    async selectDistrict (id, event) {
      if (id != event.id) {
        this.subDistrictList = await this.$axios.$get('/api/dropdown/getSubDistict?districtCode='+event.id)
      }
    },
    changeDistrict (id) {
      this.form.subDistrict = undefined
      this.form.postcode = undefined
    },


    // subDistrictCode search post
    async selectsubDistrict (id, event) {
      if (id != event.id) {
        this.postcodeList = await this.$axios.$get('/api/dropdown/getPostcode?subDistrictCode='+event.id)
      }
    },
    changesubDistrict (id) {
      this.form.postcode = undefined
    },
    save () {
      this.$v.$touch()
      this.getReqField()
      console.log(this.$v.form)
      if (this.$v.$invalid) {
        this.toast('danger', this.$t('c.err__form_validate'))

        return false
      }
      this.msgBoxConfirm(this.$t('c.confirm__save')).then( async ok => {
        if (ok) {
          if (this.mode == 'create') {
            await this.$axios.$post('/api/partner/insert', this.form).then( res => {
              if (res == false) {
                this.toast('danger', res.errMsg)
                this.skipValidateUnsaved = true
              } else {
                this.toast('success', this.$t('c.success__save'))
                this.skipValidateUnsaved = true
                this.gotoBack()
              }
            })
          } else {
            await this.$axios.$post('/api/partner/update', this.form).then( res => {
              if (res == false) {
                this.toast('danger', res.errMsg)
                this.skipValidateUnsaved = true
              } else {
                this.toast('success', this.$t('c.success__update'))
                this.skipValidateUnsaved = true
                this.gotoBack()
              }
            })
          }
        }
      })
    },
    deleteData () {
      let objList = []
      objList.push(this.form)
      if (objList.length > 0) {
        this.msgBoxConfirm('delete').then((ok) => {
          if (ok) {
            this.$axios.$post('/api/partner/delete', objList).then((resp) => {
              this.toast('success', this.$t('c.success__delete'))
              this.gotoBack()
            })
          }
        })
      }
    },
    gotoBack () {
      if ( this.mode =='view' ) {
        this.skipValidateUnsaved = true
      }
      this.$router.back()
    },
  },
}
</script>