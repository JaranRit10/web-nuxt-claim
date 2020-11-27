<template>
  <div>
    <HasPerm any="carbrand_menu,carbrand_view">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('car_brand') }}</h1><span> {{ $t(`c.${mode}`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('master_data') }} / {{ $t('car_brand') }}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="tab">
            <i class="las la-info-circle"></i> {{ $t('c.info') }}
          </div>
          <div class="action">
            <button class="btn btn-secondary ml-2" @click="gotoBack()">
              <i class="las la-arrow-left"></i> {{ $t('c.back') }}
            </button>
            <HasPerm any="carbrand_menu,carbrand_update">
              <button class="btn btn-success ml-2" @click="save()" v-show="!viewMode">
                <i class="las la-save"></i> {{ $t('c.save') }}
              </button>
            </HasPerm>
            <HasPerm any="carbrand_update,carbrand_delete">
              <button class="btn btn-danger ml-2" @click="deleteData()" v-if="mode == 'edit'">
                <i class="las la-md la-times"></i> {{ $t('c.delete') }}
              </button>
            </HasPerm>
          </div>
        </div>
        <div class="card-body">
          <!-- tab 1 -->
          <form @submit.prevent :class="{ 'dirty' : $v.$dirty }">
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group">
                <label class="required">{{ $t('brand_code') }}</label>
                <b-form-input v-model="form.brandCode" :disabled="disableMode"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.brandCode.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.brandCode.maxLength">
                  {{ $t('c.err__maxLength', { fieldName: $t('brand_code'), val: $v.form.brandCode.$params.maxLength.max}) }}
                </div>
              </b-col>
              <b-col sm="4" class="form-group" v-if="mode=='create'"></b-col>
              <b-col sm="4" class="form-group" v-if="mode!='create'">
                <label>{{ $t('c.created_by') }}</label>
                <b-form-input v-model="form.createBy" :disabled="disableMode"></b-form-input>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group">
                <label class="required">{{ $t('brand_name') }}</label>
                <b-form-input v-model="form.brandName" :disabled="viewMode"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.brandName.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.brandName.maxLength">
                  {{ $t('c.err__maxLength', { fieldName: $t('brand_name'), val: $v.form.brandName.$params.maxLength.max}) }}
                </div>
              </b-col>
              <b-col sm="4" class="form-group" v-if="mode!='create'">
                <label>{{ $t('c.created_date') }}</label>
                <b-form-input v-model="form.createDate" :disabled="disableMode"></b-form-input>
              </b-col>
              <b-col sm="4" class="form-group" v-if="mode=='create'"></b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group" v-if="mode=='create' || mode!='create'"></b-col>
              <b-col sm="4" class="form-group" v-if="mode!='create'">
                <label>{{ $t('c.updated_by') }}</label>
                <b-form-input v-model="form.updateBy" :disabled="disableMode"></b-form-input>
              </b-col>
              <b-col sm="4" class="form-group" v-if="mode=='create'"></b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4" class="form-group" v-if="mode=='create' || mode!='create'"></b-col>
              <b-col sm="4" class="form-group" v-if="mode!='create'">
                <label>{{ $t('c.updated_date') }}</label>
                <b-form-input v-model="form.updateDate" :disabled="disableMode"></b-form-input>
              </b-col>
              <b-col sm="4" class="form-group" v-if="mode=='create'"></b-col>
            </b-row>
          </form>
        </div>
      </div>
    </HasPerm>
  </div>
</template>

<script>
// import _ from 'lodash'
import { mapState } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'CarBrandDetail',

  mixins: [CommonMixin],

  async fetch () {},
  async asyncData (context) {
    const id = context.query.id
    const mode = context.params.id
    let form
    if (id) {
      form = await context.$axios.$get(`/api/carBrand/findById/${id}`)
    }
    if (mode === 'create') {
      return {
        mode,
        id,
        disableMode: false,
        disableModeStatus: false,
        viewMode: false
      }
    } else if (mode === 'view') {
      return {
        mode,
        id,
        form: await form,
        disableMode: true,
        disableModeStatus: true,
        viewMode: true
      }
    } else {
      return {
        mode,
        id,
        form: await form,
        disableModeStatus: false,
        disableMode: true,
        viewMode: false
      }
    }
  },
  data () {
    return {
      form: {},
      statusList: [],
      titleList: [],
      canotSave: false,
      flagCheckBrandCode: false,
      getUser: '',
      // roleList: [],
      userTypeList: [],
    }
  },
  validations: {
    form: {
      brandCode: { required, maxLength: maxLength(3) },
      brandName: { required, maxLength: maxLength(100) },
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    })
  },
  methods: {
    async findById () {
      if (this.mode !== 'create') {
        if (this.mode === 'view') {
          await this.$axios.$get(`/api/carBrand/findById/${this.id}`).then((resp) => {
            this.form = resp
          })
        } else {
          await this.$axios.$get(`/api/carBrand/findById/${this.id}`).then((resp) => {
            this.form = resp
          })
          console.log()
        }
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return false
      }
      if (this.mode == 'create') {
        this.flagCheckBrandCode = true
        if (this.flagCheckBrandCode == false) {
          this.toast('warning', this.$t('c.waring_check_user'))
          console.log('no save')
        } else {
          console.log('save')
          this.msgBoxConfirm('save').then(async ok => {
            if (ok) {
              try {
                await this.$axios.$post('/api/carBrand/insert', this.form).then(res => {
                  if (res == false) {
                    this.toast('danger', res.errMsg)
                    this.skipValidateUnsaved = true
                  } else {
                    this.toast('success', this.$t('c.success__save'))
                    this.skipValidateUnsaved = true
                    this.form = {}
                    this.gotoBack()
                  }
                })
              } catch (error) {
                console.log(error)
              }
            }
          })
        }
      } else if (this.mode == 'edit') {
        this.msgBoxConfirm('update').then((ok) => {
          if (ok) {
            try {
              this.$axios.$post('/api/carBrand/update', this.form).then((resp) => {
                if (resp == false) {
                  this.skipValidateUnsaved = true
                } else {
                  this.toast('success', this.$t('c.success__update'))
                  this.skipValidateUnsaved = true
                  this.form = {}
                  this.gotoBack()
                }
              })
            } catch (error) {
              console.log(error)
            }
          }
        })
      }
    },
    deleteData () {
      let dataList = []
      dataList.push(this.form)
      if (dataList.length > 0) {
        this.msgBoxConfirm('delete').then(ok => {
          if (ok) {
            this.$axios.$post('/api/carBrand/delete', dataList).then(res => {
              this.toast('success', this.$t('c.success__delete'))
              this.gotoBack()
            })
          }
        })
      }
    },
    clear () {
      this.form = {}
    },
    gotoBack () {
      if ( this.mode =='view' ) {
        this.skipValidateUnsaved = true
      }
      this.$router.back()
    },
  }
}
</script>
