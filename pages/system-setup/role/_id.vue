<template>
  <div>
    <HasPerm any="role_view,role_update">
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('role_manage') }}</h1><span> {{ $t(`c.${mode}`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('system_setup') }} / {{ $t('role_manage') }}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="tab" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">
            <i class="las la-bookmark la-lg" /> {{ $t('c.info') }}
          </div>
          <div class="tab" :class="{ active: tabIndex == 2 }" @click="tabIndex = 2" v-if="form.roleGroupId">
            <i class="las la-tasks la-lg" /> {{ $t('authorization') }}
          </div>
          <div class="tab" :class="{ active: tabIndex == 3 }" @click="tabIndex = 3">
            <i class="las la-user la-lg" /> {{ $t('mapping_user') }}
          </div>
          <div class="action">
            <button class="btn btn-secondary ml-2" @click="gotoBack()"><i class="las la-arrow-left"></i> {{ $t('c.back') }}</button>
            <HasPerm any="role_create,role_update">
              <button class="btn btn-success ml-2" @click="save()" v-show="!viewMode">
                <i class="las la-save"></i> {{ $t('c.save') }}
              </button>
            </HasPerm>
            <HasPerm any="role_update,role_delete">
              <button class="btn btn-danger ml-2" @click="deleteRole()" v-if="mode == 'edit'">
                <i class="las la-md la-times"></i> {{ $t('c.delete') }}
              </button>
            </HasPerm>
          </div>
        </div>
        <div class="card-body my-3">
          <!-- tab 1 -->
          <div v-if="tabIndex == 1">
            <form @submit.prevent :class="{ 'dirty' : $v.$dirty }">
              <b-row align-h="around" class="mb-2">
                <b-col sm="4">
                  <label class="required">{{ $t('role_code') }}</label>
                  <b-form-input v-model="form.roleCode" :disabled="disableModeStatus" />
                  <div class="invalid-feedback" v-show="!$v.form.roleCode.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.roleCode.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('role_code'), val: $v.form.roleCode.$params.maxLength.max }) }}
                  </div>
                </b-col>
                <b-col sm="4">
                  <div v-if="mode != 'create'">
                    <label>Created By</label>
                    <b-form-input v-model="form.createdBy" disabled />
                  </div>
                </b-col>
              </b-row>

              <b-row align-h="around" class="mb-2">
                <b-col sm="4">
                  <label class="required">{{ $t('role_name') }}</label>
                  <b-form-input v-model="form.roleName" :disabled="disableModeStatus" />
                  <div class="invalid-feedback" v-show="!$v.form.roleName.required">
                    {{ $t('c.err__required') }}
                  </div>
                </b-col>
                <b-col sm="4">
                  <div v-if="mode != 'create'">
                    <label>Created Date</label>
                    <b-form-input v-model="form.createdDate" disabled />
                  </div>
                </b-col>
              </b-row>
              <b-row align-h="around" class="mb-2">
                <b-col sm="4">
                  <label class="required">{{ $t('role_group') }}</label>
                  <treeselect
                    v-model="form.roleGroupId"
                    :options="roleList"
                    :disabled="disableModeStatus"
                    @input="getFunctions"
                  />
                  <div class="invalid-feedback" v-show="!$v.form.roleGroupId.required">
                    {{ $t('c.err__required') }}
                  </div>
                </b-col>
                <b-col sm="4">
                  <div v-if="mode != 'create'">
                    <label>Updated By</label>
                    <b-form-input v-model="form.updatedBy" disabled />
                  </div>
                </b-col>
              </b-row>
              <b-row align-h="around" class="mb-2">
                <b-col sm="4">
                  <label class="required">{{ $t('c.status') }}</label>
                  <treeselect v-model="form.status" :options="statusList" :disabled="disableModeStatus" />
                  <div class="invalid-feedback" v-show="!$v.form.status.required">
                    {{ $t('c.err__required') }}
                  </div>
                </b-col>
                <b-col sm="4">
                  <div v-if="mode != 'create'">
                    <label>Updated Date</label>
                    <b-form-input v-model="form.updatedDate" disabled />
                  </div>
                </b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col offset="1" sm="4">
                  <label>Description</label>
                  <b-form-textarea v-model="form.description" :disabled="disableModeStatus" />
                </b-col>
              </b-row>
            </form>
          </div>

          <!-- tab 2 -->
          <div v-show="tabIndex == 2">
            <a-tree ref="tree"
                    :my-func-list="myFuncList"
                    :default-checked="form.functionIdList"
                    :mode="mode"
                    :is-disabled="mode == 'create' || mode == 'edit'?false:true"
                    @check="check"
            />
          </div>

          <!-- tab 3 -->
          <div v-if="tabIndex == 3">
            <div class="card">
              <div class="card-body">
                <a-table :id="$route.name"
                         :datasource="datasource"
                         :columns="mode=='edit' || mode=='create'?columns:columns2"
                         :paging="paging"
                         @refresh="search"
                         :isFilter="mode=='view'?false:true"
                         :isSort="mode=='view'?false:true"
                >
                  <template slot="tableAction">
                    <HasPerm any="role_create,role_update">
                      <button class="btn btn-success mr-1" @click="modalShow = !modalShow" v-if="mode=='view'?false:true"><i class="las la-plus"></i> {{ $t('c.add') }}</button>
                    </HasPerm>
                    <HasPerm any="role_delete">
                      <button class="btn btn-danger mr-1" @click="deleteUser()" v-if="mode=='view'?false:true"><i class="las la-times"></i> {{ $t('c.delete') }}</button>
                    </HasPerm>
                  </template>

                  <template slot="tableBody">
                    <tr v-for="(v, i) in datasource.data" :key="i">
                      <td v-if="mode=='view'?false:true" class="text-center"><b-form-checkbox v-model="v.checked" /></td>
                      <td class="text-center">{{ v.userCode }}</td>
                      <td>{{ v.firstName | emptyToDash }}</td>
                      <td>{{ v.firstNameEn | emptyToDash }}</td>
                      <td class="text-center">{{ v.statusName | emptyToDash }}</td>
                      <td v-if="mode=='view'?false:true">
                        <div class="btn-action-group">
                          <HasPerm any="role_delete">
                            <button class="btn btn-sm btn-danger" @click="deleteUser(v)" v-b-tooltip:page.bottom.hover="$t('c.delete')"><i class="las la-md la-times"></i></button>
                          </HasPerm>
                        </div>
                      </td>
                    </tr>
                  </template>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <b-modal
        v-model="modalShow"
        :title="$t('add_user')"
        size="lg"
        hide-footer
        :header-bg-variant="'info'"
        :header-text-variant="'light'"
        :no-close-on-backdrop="true"
        @hidden="clearData()"
      >
        <div class="card">
          <div class="card-header">
            <div class="title">
              <i class="las la-angle-up" @click="toggleCollapse('modal-search-criteria', $event)"></i> {{ $t('c.filter') }}
            </div>
            <div class="action">
              <HasPerm any="role_view">
                <button class="btn btn-primary ml-2" @click="mSearch()">
                  <i class="las la-search"></i> <span>{{ $t('c.search') }}</span>
                </button>
              </HasPerm>
              <button class="btn btn-warning ml-2" @click="mClear()">
                <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
              </button>
            </div>
          </div>

          <b-collapse visible id="modal-search-criteria">
            <div class="card-body">
              <div class="row form-group justify-content-around dirty">
                <div class="col-sm-5">
                  <label class="required">{{ $t('user_code') }}</label>
                  <b-form-input v-model="mCriteria.userCode" />
                  <div class="invalid-feedback" v-show="mIsSearch === true && (!mCriteria.userCode || mCriteria.userCode == '')">
                    {{ $t('c.err__required') }}
                  </div>
                </div>
                <div class="col-sm-5">
                  <label class="required">{{ $t('user_name') }}</label>
                  <b-form-input v-model="mCriteria.userName" />
                  <div class="invalid-feedback" v-show="mIsSearch === true && (!mCriteria.userName || mCriteria.userName == '')">
                    {{ $t('c.err__required') }}
                  </div>
                </div>
              </div>
            </div>
          </b-collapse>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="a-table">
              <div class="col d-flex" style="padding: 6px 0;">
                <HasPerm any="role_create,role_update">
                  <button class="btn btn-success" @click="selectUser()"><i class="las la-check-double"></i> <span>{{ $t('c.select') }}</span></button>
                </HasPerm>
              </div>

              <div class="table" ref="myTableContainer">
                <table class="table table-sm table-bordered table-striped table-hover b-table" ref="myTable">
                  <thead class="thead-dark">
                    <tr>
                      <th v-for="(column, index) in mColumns" :key="index" class="text-center" :style="column.style">
                        <template v-if="column.label === 'CHECK_ALL'">
                          <b-form-checkbox
                            v-model="mIsCheckAll"
                            :indeterminate="mIndeterminate"
                            @input="clickAllCheckModal()"
                          >
                          </b-form-checkbox>
                        </template>
                        <template v-else>
                          {{ column.label }}
                        </template>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :v-if="mDatasource || mDatasource.length !== 0" v-for="(v, i) in mDatasource" :key="i">
                      <td class="text-center">
                        <b-form-checkbox v-model="v.checked" @input="clickCheckModal()" v-if="ckeckDuplicate(v.userCode)" />
                      </td>
                      <td>{{ v.userCode }}</td>
                      <td>{{ v.firstName | emptyToDash }}</td>
                      <td>{{ v.firstNameEn | emptyToDash }}</td>
                      <td class="text-center">{{ v.statusName | emptyToDash }}</td>
                    </tr>
                    <tr>
                      <td v-if="!mDatasource || mDatasource.length === 0" class="text-center" colspan="50">
                        {{ $t('c.no_data_found') }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </HasPerm>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'RoleDetail',
  mixins: [CommonMixin],
  async fetch () {
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    this.roleList = await this.$axios.$get('/api/dropdown/getRoleGroup')
  },
  async asyncData (context) {
    const id = context.query.id
    const mode = context.params.id
    let form
    let data
    let list
    if (id) {
      form = await context.$axios.$get(`/api/roles/findById/${id}`)
      list = await context.$axios.$post('/api/roles/getFunctionByRoleGroupId', {roleId: id, roleGroupId: form.roleGroupId})
      data = await context.$axios.$post('/api/roles/findUserCriteria', { roleId: id, limit: 10, pageNumber: 1, sortBy: [] })
    }
    if (mode == 'edit') {
      return {
        form: await form,
        datasource: await data,
        myFuncList: await list,
        mode,
        paging: {
          sortBy: [],
          limit: 10,
          pageNumber: 1
        },
        id,
        tabIndex: 1,
        disableModeStatus: false,
        disableMode: true,
        viewMode: false
      }
    } else if (mode == 'view') {
      return {
        form: await form,
        myFuncList: await list,
        datasource: await data,
        mode,
        paging: {
          sortBy: [],
          limit: 10,
          pageNumber: 1
        },
        id,
        tabIndex: 1,
        disableMode: true,
        disableModeStatus: true,
        viewMode: true
      }
    } else {
      return {
        form: { userList: [] },
        datasource: { data: [] },
        myFuncList: [],
        paging: {
          sortBy: [],
          limit: 10,
          pageNumber: 1
        },
        mode,
        id,
        tabIndex: 1,
        disableMode: false,
        disableModeStatus: false,
        viewMode: false
      }
    }
  },
  data () {
    return {
      tabIndex: 1,
      statusList: [],
      roleList: [],
      datasource: {},
      myFuncList: [],
      criteria: {},
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      isCheckAll: false,
      indeterminate: false,
      modalShow: false,
      mCriteria: {},
      mDatasource: [],
      mIsCheckAll: false,
      mIndeterminate: false,
      mIsSearch: false,
      missingValue: []
    }
  },
  validations: {
    form: {
      roleCode: { required, maxLength: maxLength(10) },
      roleName: { required },
      roleGroupId: { required },
      status: { required }
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),
    columns () {
      const col = [
        { label: 'CHECK_ALL', sortable: false, style: { minWidth: '20px' } },
        { label: this.$t('user_code'), field: 'userCode', style: { minWidth: '100px' } },
        { label: this.$t('user_name'), field: 'userName' },
        { label: this.$t('user_name_en'), field: 'userNameEn' },
        { label: this.$t('c.status'), field: 'statusName', style: { minWidth: '80px' } },
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { minWidth: '60px' } }
      ]
      return col
    },
    columns2 () {
      const col = [
        { label: this.$t('user_code'), field: 'userCode', style: { minWidth: '100px' } },
        { label: this.$t('user_name'), field: 'userName' },
        { label: this.$t('user_name_en'), field: 'userNameEn' },
        { label: this.$t('c.status'), field: 'statusName', style: { minWidth: '80px' } }
      ]
      return col
    },
    mColumns () {
      return [
        { label: 'CHECK_ALL', style: { 'width': '20px' } },
        { label: this.$t('user_code'), style: { 'width': '100px' } },
        { label: this.$t('user_name'), style: { 'min-width': '90px' } },
        { label: this.$t('user_name_en'), style: { 'min-width': '90px' } },
        { label: this.$t('c.status'), style: { 'min-width': '90px' } },
      ]
    }
  },
  methods: {
    gotoBack () {
      if ( this.mode =='view' ) {
        this.skipValidateUnsaved = true
      }
      this.$router.back()
    },
    async getFunctions () {
      try {
        if (!this.form.roleGroupId) {
          this.myFuncList = []
        } else {
          this.myFuncList = await this.$axios.$post('/api/roles/getFunctionByRoleGroupId', {roleId: this.id, roleGroupId: this.form.roleGroupId})

          _.forEach(this.myFuncList, (v) => {
            if (v.id == 1) {
              v.select = true
              return false
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return false
      }
      // if (!this.form.functionIdList) {
      //   this.form.functionIdList = []
      // }
      // if (!this.missingValue) {
      //   this.missingValue = []
      // }
      this.form.functionIdList = this.$refs.tree.$children[0].getCheckedKeys()
      if (!this.form.functionIdList || this.form.functionIdList.length == 0) {
        this.form.functionIdList = []
      }
      if (!this.missingValue || this.missingValue == undefined) {
        this.missingValue = []
      }
      const functionSave = [ ...this.form.functionIdList, ...this.missingValue ]
      const formSave = _.cloneDeep(this.form)
      formSave.functionIdList = functionSave

      this.msgBoxConfirm(this.$t('c.confirm__save')).then( async ok => {
        if (ok) {
          if (this.mode == 'create') {
            // this.form.functionIdList = this.$refs.tree.$children[0].getCheckedKeys()
            await this.$axios.$post('/api/roles/insert', formSave).then(res => {
              if (res == false) {
                this.toast('danger', res.errMsg)
                this.skipValidateUnsaved = true
              } else {
                this.toast('success', this.$t('c.success__save'))
                this.skipValidateUnsaved = true
                this.gotoBack()
              }
            })
          } else if (this.mode == 'edit') {
            // this.form.functionIdList = this.$refs.tree.$children[0].getCheckedKeys()
            await this.$axios.$post('/api/roles/update', formSave).then(res => {
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
    // ###### Tab 2 ######
    check (checkList, missingValues) {
      if (checkList.length > 0) {
        this.missingValue = missingValues
        this.$set(this.form, 'functionIdList', checkList)
      }
    },
    // ###### Tab 3 ######
    async search () {
      let criteria = { ...this.criteria, ...this.paging }
      criteria.roleId = this.id
      this.datasource = await this.$axios.$post('/api/roles/findUserCriteria', criteria)
      // this.isCheckAll = false
    },
    clear () {
      this.criteria = {}
    },
    deleteRole () {
      let objlist = []
      objlist.push(this.form)
      if (objlist.length > 0) {
        this.msgBoxConfirm(this.$t('c.confirm__delete')).then( async ok => {
          if (ok) {
            await this.$axios.$post('/api/roles/delete', objlist).then(res => {
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
    deleteUser (v) {
      let arr = []
      if (!v) {
        arr = this.getCheckedValue(this.datasource, 'userCode')
      } else {
        arr.push(v.userCode)
      }
      if (arr.length > 0) {
        this.msgBoxConfirm(this.$t('c.confirm__delete')).then( async ok => {
          if (ok) {
            this.datasource.data = await _.remove(this.datasource.data, function (v) {
              return !arr.includes(v.userCode)
            })
            this.form.userList = await this.datasource.data
          }
        })
      } else {
        this.toast('warning', this.$t('c.err__delete_required_one'))
      }
    },
    // ###### Modal ######
    async mSearch () {
      this.mIsSearch = true
      if ((!this.mCriteria.userCode || this.mCriteria.userCode == '') && (!this.mCriteria.userName || this.mCriteria.userName == '')) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return false
      }
      this.mDatasource = await this.$axios.$post('/api/roles/findUser', {userCode: this.mCriteria.userCode, userName: this.mCriteria.userName, oldUserList: this.datasource.data})
      this.mIsSearch = false
      this.mIsCheckAll = false
    },
    mClear () {
      this.mCriteria = {}
    },
    clearData () {
      this.mIsSearch = false
      this.mIsCheckAll = false
      this.mCriteria = {}
      this.mDatasource = []
    },
    ckeckDuplicate (userCodes) {
      let find = _.findIndex(this.datasource, { userCode: userCodes })
      if (find !== -1) {
        return false
      } else {
        return true
      }
    },
    selectUser () {
      let arr = []
      arr = _.filter(this.mDatasource, { checked: true })
      _.forEach(arr, (v) => {
        delete v.checked
      })
      console.log('arr', arr)
      if (arr.length > 0) {
        if (this.datasource.data == undefined) {
          this.datasource.data = arr
          this.form.userList = arr
        } else {
          this.datasource.data = _.concat(this.datasource.data, arr)
          this.form.userList = _.concat(this.form.userList, arr)
        }
        this.modalShow = false
        // this.search()
      } else {
        this.toast('warning', this.$t('c.err__select_required_one'))
      }
    },
    clickAllCheckModal () {
      if (this.mDatasource) {
        if (this.mIsCheckAll) {
          for (let i = 0; i < this.mDatasource.length; i++) {
            // for checkbox disabled
            let find = _.findIndex(this.datasource, { userCode: this.mDatasource[i].userCode })
            if (find === -1) {
              this.$set(this.mDatasource[i], 'checked', true)
            }
          }
        } else {
          if (this.mIndeterminate == false) {
            for (let i = 0; i < this.mDatasource.length; i++) {
              this.$set(this.mDatasource[i], 'checked', false)
            }
          }
        }
      }
    },
    clickCheckModal () {
      let temp = _.filter(this.mDatasource, { checked: true })
      if (temp.length === 0) {
        this.mIndeterminate = false
        this.mIsCheckAll = false
      } else if (temp.length === this.mDatasource.length) {
        this.mIndeterminate = false
        this.mIsCheckAll = true
      } else {
        this.mIndeterminate = true
        this.mIsCheckAll = false
      }
    }
  }
}
</script>