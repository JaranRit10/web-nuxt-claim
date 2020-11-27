<template>
  <div>
    <HasPerm any="user_create,user_view,user_update">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('user_manage') }}</h1><span> {{ $t(`c.${mode}`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('system_setup') }} / {{ $t('user_manage') }}
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
            <HasPerm any="user_resetpassword">
              <button class="btn btn-danger ml-2" @click="resetPwd()" v-if="mode == 'edit'">
                <i class="las la-md la-wrench"></i> {{ $t('c.reset_pwd') }}
              </button>
            </HasPerm>
            <HasPerm any="user_create,user_update">
              <button class="btn btn-success ml-2" @click="save()" v-show="!viewMode">
                <i class="las la-save"></i> {{ $t('c.save') }}
              </button>
            </HasPerm>
            <HasPerm any="user_update,user_delete">
              <button class="btn btn-danger ml-2" @click="deleteData()" v-if="mode == 'edit'">
                <i class="las la-md la-times"></i> {{ $t('c.delete') }}
              </button>
            </HasPerm>
          </div>
        </div>
        <div class="card-body">
          <!-- tab 1 -->
          <div @submit.prevent :class="{ 'dirty' : $v.$dirty }">
            <b-row align-h="around" class="mb-2">
              <b-col sm="4">
                <label class="required">{{ $t('user_type') }}</label>
                <treeselect v-model="form.userType" :options="userTypeList" :disabled="disableMode" :placeholder="$t('c.please_select')" />
                <div class="invalid-feedback" v-show="!$v.form.userType.required">
                  {{ $t('c.err__required') }}
                </div>
              </b-col>
              <b-col sm="4">
                <label class="required">{{ $t('c.status') }}</label>
                <treeselect id="Status" v-model="form.status" :options="statusList"
                            :disabled="disableModeStatus" :placeholder="$t('c.please_select')"
                />
                <div class="invalid-feedback" v-show="!$v.form.status.required">
                  {{ $t('c.err__required') }}
                </div>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4">
                <label class="required">{{ $t('user_code') }}</label>
                <b-form-input v-model="form.userCode" @blur="checkUserCode(form.userCode)" @keyup.enter="$event.target.blur()" :disabled="disableMode" />
                <div class="invalid-feedback" v-show="!$v.form.userCode.required">
                  {{ $t('c.err__required') }}
                </div>
              </b-col>
              <b-col sm="4">
                <label class="required">{{ $t('title') }}</label>
                <treeselect v-model="form.title" :options="titleList" :disabled="disableMode" :placeholder="$t('c.please_select')" />
                <div class="invalid-feedback" v-show="!$v.form.title.required">
                  {{ $t('c.err__required') }}
                </div> </b-col>
            </b-row>

            <b-row align-h="around" class="mb-2">
              <b-col sm="4">
                <label class="required">{{ $t('first_name') }}</label>
                <b-form-input v-model="form.firstName" :disabled="disableMode"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.firstName.required">
                  {{ $t('c.err__required') }}
                </div>
              </b-col>
              <b-col sm="4">
                <label class="required">{{ $t('last_name') }}</label>
                <b-form-input v-model="form.lastName" :disabled="disableMode"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.lastName.required">
                  {{ $t('c.err__required') }}
                </div>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4">
                <label class="required">{{ $t('first_name_en') }}</label>
                <b-form-input v-model="form.firstNameEn" :disabled="disableMode"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.firstNameEn.required">
                  {{ $t('c.err__required') }}
                </div>
              </b-col>
              <b-col sm="4">
                <label class="required">{{ $t('last_name_en') }}</label>
                <b-form-input v-model="form.lastNameEn" :disabled="disableMode"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.lastNameEn.required">
                  {{ $t('c.err__required') }}
                </div>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4">
                <label class="required">{{ $t('user_email') }}</label>
                <b-form-input v-model="form.email" :disabled="disableModeStatus"></b-form-input>
                <div class="invalid-feedback" v-show="!$v.form.email.required">
                  {{ $t('c.err__required') }}
                </div>
              </b-col>
              <b-col sm="4">
                <label>{{ $t('position') }}</label>
                <b-form-input v-model="form.position" :disabled="disableModeStatus"></b-form-input>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4">
                <label>{{ $t('department') }}</label>
                <b-form-input v-model="form.department" :disabled="disableModeStatus"></b-form-input>
              </b-col>
              <b-col sm="4">
                <label>{{ $t('division') }}</label>
                <b-form-input v-model="form.division" :disabled="disableModeStatus"></b-form-input>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2">
              <b-col sm="4">
                <label>{{ $t('telephone_no') }}</label>
                <b-form-input v-model="form.telephoneNo" :disabled="disableModeStatus"></b-form-input>
              </b-col>
              <b-col sm="4">
                <label>{{ $t('mobile_no') }}</label>
                <b-form-input v-model="form.mobileNo" :disabled="disableModeStatus"></b-form-input>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2" v-if="mode!='create'">
              <b-col sm="4">
                <label>{{ $t('c.created_by') }}</label>
                <b-form-input v-model="form.createdBy" :disabled="disableMode"></b-form-input>
              </b-col>
              <b-col sm="4">
                <label>{{ $t('c.created_date') }}</label>
                <b-form-input v-model="form.createdDate" :disabled="disableMode"></b-form-input>
              </b-col>
            </b-row>
            <b-row align-h="around" class="mb-2" v-if="mode!='create'">
              <b-col sm="4">
                <label>{{ $t('c.last_updated_by') }}</label>
                <b-form-input v-model="form.updatedBy" :disabled="disableMode"></b-form-input>
              </b-col>
              <b-col sm="4">
                <label>{{ $t('c.last_updated_date') }}</label>
                <b-form-input v-model="form.updatedDate" :disabled="disableMode"></b-form-input>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </HasPerm>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'UserDetail',

  mixins: [CommonMixin],

  async fetch () {
    const response = await this.$axios.get('/api/auth/getUser')
    this.titleList = await this.$axios.$get('/api/dropdown/getTitle')
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    this.roleList = await this.$axios.$get('/api/dropdown/getRole')
    this.userTypeList = await this.$axios.$get('/api/dropdown/lov/USER_TYPE')
    this.getUser = await response.data.updatedBy
  },
  async asyncData (context) {
    const id = context.query.id
    const mode = context.params.id
    let form
    if (id) {
      form = await context.$axios.$get(`/api/users/findById/${id}`)
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
      flagCheckUserCode: false,
      getUser: '',
      roleList: [],
      userTypeList: [],
    }
  },
  validations: {
    form: {
      status: { required },
      userCode: { required },
      firstName: { required },
      firstNameEn: { required },
      lastName: { required },
      lastNameEn: { required },
      userType: { required },
      email: { required },
      title: { required }
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
          await this.$axios.$get(`/api/users/findById/${this.id}`).then((resp) => {
            this.form = resp
          })
        } else {
          await this.$axios.$get(`/api/users/findById/${this.id}`).then((resp) => {
            this.form = resp
          })
          console.log()
        }
      }
    },
    checkUserCode (param) {
      console.log(param)
      if (!this.form.userCode) {
        this.toast('warning', this.$t('c.waring_select_user'))
        return false
      }
      this.$axios.$get(`/api/users/findDuplicateUser/${param}`).then((result) => {
        if (result.userCode) {
          this.toast('success', this.$t('c.success__nodup_user'))
          this.flagCheckUserCode = true
        } else {
          this.flagCheckUserCode = false
        }
        this.$set(this.form, 'createdBy', this.getUser)
        this.$set(this.form, 'updatedBy', this.getUser)
      })
    },
    save () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return false
      }
      if (this.mode == 'create') {
        if (this.flagCheckUserCode == false) {
          this.toast('warning', this.$t('c.waring_check_user'))
        } else {
          this.msgBoxConfirm('save').then(async ok => {
            if (ok) {
              try {
                await this.$axios.$post('/api/users/insert', this.form).then(res => {
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
              this.$axios.$post('/api/users/update', this.form).then((resp) => {
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
            this.$axios.$post('/api/users/delete', dataList).then(res => {
              if (res == false) {
                this.toast('danger', res.errMsg)
              } else {
                this.toast('success', this.$t('c.success__delete'))
                this.gotoBack()
              }
            })
          }
        })
      }
    },
    resetPwd () {
      if (!_.isEmpty(this.form.userCode)) {
        this.msgBoxConfirm(this.$t('c.confirm__reset_pwd')).then(async (ok) => {
          if (ok) {
            try {
              await this.$axios.$get('/api/users/resetPassword/'+this.form.userCode).then((res) => {
                if (res) {
                  this.toast('success', this.$t('c.success__reset_pwd'))
                }
              })
            } catch (error) {
              console.log(error)
            }
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
      // this.clear()
      this.$router.back()
    },
    changebutton () {
      this.flagCheckUserCode = false
    }
  }
}
</script>
