<template>
  <div>
    <HasPerm any="surveyor_menu">
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('surveyor') }}</h1><span> {{ $t(`c.${mode}`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('master_data') }} / {{ $t('surveyor') }}
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
            <HasPerm any="surveyor_create,surveyor_update">
              <button class="btn btn-success ml-2" @click="save()" v-show="!viewMode">
                <i class="las la-save"></i> {{ $t('c.save') }}
              </button>
            </HasPerm>
            <HasPerm any="surveyor_delete">
              <button class="btn btn-danger ml-2" @click="deleteData()" v-if="mode == 'edit' ">
                <i class="las la-md la-times"></i> {{ $t('c.delete') }}
              </button>
            </HasPerm>
          </div>
        </div>
        <div class="card-body">
          <div @submit.prevent :class="{ 'dirty' : $v.$dirty }">
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group">
                <div>
                  <label class="required">{{ $t('survey_company_id') }}</label>
                  <b-form-input v-model="form.surveyCompanyId" :disabled="disableModeEdit"></b-form-input>
                  <div class="invalid-feedback" v-show="!$v.form.surveyCompanyId.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.surveyCompanyId.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('company_name'), val: $v.form.surveyCompanyId.$params.maxLength.max }) }}
                  </div>
                </div>
              </b-col>
              <b-col sm="4" class="form-group">
                <div v-if="mode != 'create'"><label>{{ $t('c.created_by') }}</label>
                  <b-form-input v-model="form.createBy" disabled></b-form-input></div>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group">
                <label class="required">{{ $t('company_name') }}</label>
                <b-form-input v-model="form.companyName" :disabled="disableModeEdit"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.companyName.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.companyName.maxLength">
                  {{ $t('c.err__maxLength', { fieldName: $t('company_name'), val: $v.form.companyName.$params.maxLength.max }) }}
                </div>
              <!-- <div class="error" v-show="!$v.form.companyName.maxLength">
                {{ $t('ต้องน้อยกว่า 5 คำ') }}
              </div> -->
              </b-col>
              <b-col sm="4" class="form-group">
                <div v-if="mode != 'create'"><label>{{ $t('c.created_date') }}</label>
                  <b-form-input v-model="form.createDate" disabled></b-form-input></div>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group">
                <label class="required">{{ $t('company_name_en') }}</label>
                <b-form-input v-model="form.companyNameEn" :disabled="disableModeEdit"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.companyNameEn.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.companyNameEn.maxLength">
                  {{ $t('c.err__maxLength', { fieldName: $t('company_name_en'), val: $v.form.companyNameEn.$params.maxLength.max }) }}
                </div>
              </b-col>
              <b-col sm="4" class="form-group">
                <div v-if="mode != 'create'"><label>{{ $t('c.updated_by') }}</label>
                  <b-form-input v-model="form.updateBy" disabled></b-form-input></div>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group">
                <label class="required">{{ $t('insurance') }}</label>
                <b-form-input v-model="form.insurance" :disabled="disableModeEdit"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.insurance.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.insurance.maxLength">
                  {{ $t('c.err__maxLength', { fieldName: $t('insurance'), val: $v.form.insurance.$params.maxLength.max }) }}
                </div>
              </b-col>
              <b-col sm="4" class="form-group">
                <div v-if="mode != 'create'"><label>{{ $t('c.updated_date') }}</label>
                  <b-form-input v-model="form.updateDate" disabled></b-form-input></div>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group">
                <label class="required">{{ $t('company_address') }}</label>
                <b-form-input v-model="form.companyAddress" :disabled="disableModeEdit"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.companyAddress.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.companyAddress.maxLength">
                  {{ $t('c.err__maxLength', { fieldName: $t('company_address'), val: $v.form.companyAddress.$params.maxLength.max }) }}
                </div>
              </b-col>
              <b-col sm="4" class="form-group"></b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group">
                <label class="required">{{ $t('company_province') }}</label>
                <b-form-input v-model="form.companyProvince" :disabled="disableModeEdit"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.companyProvince.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.companyProvince.maxLength">
                  {{ $t('c.err__maxLength', { fieldName: $t('company_province'), val: $v.form.companyProvince.$params.maxLength.max }) }}
                </div>
              </b-col>
              <b-col sm="4" class="form-group"></b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group">
                <label class="required">{{ $t('contact_no') }}</label>
                <b-form-input v-model="form.contactNo" :disabled="disableModeEdit"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.contactNo.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.contactNo.maxLength">
                  {{ $t('c.err__maxLength', { fieldName: $t('contact_no'), val: $v.form.contactNo.$params.maxLength.max }) }}
                </div>
              </b-col>
              <b-col sm="4" class="form-group"></b-col>
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
  },
  async asyncData (context) {
    let mode = context.params.mode
    const id = context.params.id
    let form
    if (id) {
      if (id == 'create') {
        mode = id
      } else {
        form = await context.$axios.$get(`/api/surveyor/findById/${id}`)
        console.log(form)
      }
    }
    if (mode == 'create') {
      return {
        form: {},
        mode,
        disableMode: true,
        disableModeEdit: false,
        viewMode: false
      }
    } else if (mode == 'view') {
      return {
        form: await form,
        id,
        mode,
        disableMode: true,
        disableModeEdit: true,
        viewMode: true
      }
    } else {
      return {
        form: await form,
        id,
        mode,
        disableMode: true,
        disableModeEdit: false,
        viewMode: false
      }
    }
  },
  data () {
    return {
      form: {}
    }
  },
  validations: {
    form: {
      surveyCompanyId: { required, maxLength: maxLength(10) },
      companyName: { required, maxLength: maxLength(128) },
      companyNameEn: { required, maxLength: maxLength(128) },
      insurance: { required, maxLength: maxLength(100) },
      companyAddress: { required, maxLength: maxLength(400) },
      companyProvince: { required, maxLength: maxLength(50) },
      contactNo: { required, maxLength: maxLength(20) }
    }
  },
  methods: {
    getReqField () {
      const invalidField = _.findKey(this.$v.form.$params, (value, key) => this.$v.form[key].$invalid)
      console.log('invalidField => ', invalidField)
    },
    save () {
      this.$v.$touch()
      this.getReqField()
      if (this.$v.$invalid) {
        this.toast('danger', this.$t('c.err__form_validate'))

        return false
      }
      this.msgBoxConfirm(this.$t('c.confirm__save')).then( async ok => {
        if (ok) {
          if (this.mode == 'create') {
            await this.$axios.$post('/api/surveyor/insert', this.form).then( res => {
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
            await this.$axios.$post('/api/surveyor/update', this.form).then( res => {
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
            this.$axios.$post('/api/surveyor/delete', objList).then((resp) => {
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