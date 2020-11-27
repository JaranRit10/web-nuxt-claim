<template>
  <div>
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('interface_with_coreIIA') }}</h1><span> View </span>
      </div>
      <div class="page__breadcrumb">
        <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('interace_log') }} / {{ $t('interface_with_coreIIA') }}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="tab" @click="toggleCollapse('interface-file', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i> {{ $t('interface_file') }}
        </div>
        <div class="action">
          <button class="btn btn-secondary ml-2" @click="gotoBack">
            <i class="las la-arrow-left"></i> {{ $t('c.back') }}
          </button>
        </div>
      </div>
      <b-collapse visible id="interface-file">
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('file_type') }}</label>
              <treeselect v-model="value" :options="options" :placeholder="$t('c.all')" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('file_name') }}</label>
              <b-form-input v-model="text2" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('file_path') }}</label>
              <b-form-input v-model="text3" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('no_of_data') }}</label>
              <b-form-input class="text-right" v-model="text4" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('generate_date') }}</label>
              <b-form-input v-model="text5" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('interface_date') }}</label>
              <b-form-input v-model="text6" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('c.status') }}</label>
              <treeselect v-model="value1" :options="options" :placeholder="$t('c.all')" disabled />
            </b-col>
            <b-col sm="3">
            </b-col>
            <b-col sm="3">
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="tab" @click="toggleCollapse('interface-file-body', $event)" style="cursor: pointer;">
          <i class="las la-angle-up"></i>
          {{ $t('interface_file_details') }}
        </div>
      </div>
      <b-collapse visible id="interface-file-body">
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
                <td class="text-right">{{ v.id }}</td>
                <td class="text-right">{{ v.lineNo }}</td>
                <td>{{ v.referenceId }}</td>
                <td>{{ v.referenceStatus }}</td>
                <td>{{ v.dataText }}</td>
              </tr>
            </template>
          </a-table>
        </div>
      </b-collapse>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
        // form = await context.$axios.$get(`/api/surveyor/findById/${id}`)
        // console.log(form)
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
      criteria: {},
      surveyorTypeList: [],
      policyTypeList: [],
      claimTypeList: [],
      statusList: [],
      text2: 'CLAIM_MV_MAIN_20201104.TXT',
      text3: '/exportCore/motor/20160824/',
      text4: '3',
      text5: '11/4/2020  20:00:00',
      text6: '11/4/2020  20:00:00',
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      value1: 'Success',
      value: 'Caim Data File',
      options: [ {
        id: 'Caim Data File',
        label: 'Caim Data File',
      },
      {
        id: 'Success',
        label: 'Success',
      }, ],
      datasource: {
        data: [
          {
            id: 1,
            lineNo: '1001',
            referenceId: 'C2020-000001',
            referenceStatus: 'Create Claim',
            dataText: '1100000090|C2020-00001|1100000090|C2020-00002|1100000090|C2020-00002|1100000090|C2020-00002|.....',
          },
          {
            id: 2,
            lineNo: '1002',
            referenceId: 'C2020-000002',
            referenceStatus: 'Create Claim',
            dataText: '1100000090|C2020-00002|1100000090|C2020-00002|1100000090|C2020-00002|1100000090|C2020-00002|.....',
          },
          {
            id: 3,
            lineNo: '1003',
            referenceId: 'C2020-000003',
            referenceStatus: 'Create Claim',
            dataText: '1100000090|C2020-00003|1100000090|C2020-00002|1100000090|C2020-00002|1100000090|C2020-00002|.....',
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
        { label: this.$t('seq'), field: 'id', style: {minWidth: '50px', width: '50px' } },
        { label: this.$t('line_no'), field: 'lineNo', style: {minWidth: '80px', width: '80px' } },
        { label: this.$t('reference_id'), field: 'referenceId', style: {minWidth: '100px', width: '100px' } },
        { label: this.$t('reference_status'), field: 'referenceStatus', style: {minWidth: '100px', width: '100px' } },
        { label: this.$t('data_text'), field: 'dataText', style: {minWidth: '200px', width: '200px' } },
      ]
      return col
    }
  },
  validations: {
    form: {
      // surveyCompanyId: { required },
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
      // this.msgBoxConfirm(this.$t('c.confirm__save')).then( async ok => {
      //   if (ok) {
      //     if (this.mode == 'create') {
      //       await this.$axios.$post('/api/surveyor/insert', this.form).then( res => {
      //         if (res == false) {
      //           this.toast('danger', res.errMsg)
      //           this.skipValidateUnsaved = true
      //         } else {
      //           this.toast('success', this.$t('c.success__save'))
      //           this.skipValidateUnsaved = true
      //           this.gotoBack()
      //         }
      //       })
      //     } else {
      //       await this.$axios.$post('/api/surveyor/update', this.form).then( res => {
      //         if (res == false) {
      //           this.toast('danger', res.errMsg)
      //           this.skipValidateUnsaved = true
      //         } else {
      //           this.toast('success', this.$t('c.success__update'))
      //           this.skipValidateUnsaved = true
      //           this.gotoBack()
      //         }
      //       })
      //     }
      //   }
      // })
    },
    deleteData () {
      // let objList = []
      // objList.push(this.form)
      // if (objList.length > 0) {
      //   this.msgBoxConfirm('delete').then((ok) => {
      //     if (ok) {
      //       this.$axios.$post('/api/surveyor/delete', objList).then((resp) => {
      //         this.toast('success', this.$t('c.success__delete'))
      //         this.gotoBack()
      //       })
      //     }
      //   })
      // }
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