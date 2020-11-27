<template>
  <div>
    <HasPerm any="lov_menu,lov_view">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('lov') }}</h1><span> {{ $t(`c.${mode}`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('master_data') }} / {{ $t('lov') }}
        </div>
      </div>

      <!-- Page Detail -->
      <div class="card">
        <div class="card-header">
          <div class="tab" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">
            <i class="las la-info-circle"></i> {{ $t('c.info') }}
          </div>
          <div class="action">
            <HasPerm any="carbrand_update">
              <button class="btn btn-secondary ml-2" @click="gotoBack()"><i class="las la-arrow-left"></i> {{ $t('c.back') }}</button>
              <button class="btn btn-success ml-2" @click="save()" v-show="!viewMode"><i class="las la-save"></i> {{ $t('c.save') }}</button>
            </HasPerm>
          </div>
        </div>
        <div class="card-body">
          <!-- tab 1 -->
          <div v-if="tabIndex == 1">
            <form @submit.prevent :class="{ 'dirty' : $v.$dirty }">
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('group_name') }}</label>
                  <b-form-input v-model="form.groupName" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.groupName.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.groupName.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('group_name'), val: $v.form.groupName.$params.maxLength.max}) }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group">
                  <label>{{ $t('c.created_by') }}</label>
                  <b-form-input v-model="form.createBy" disabled />
                </b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('seq') }}</label>
                  <b-form-input v-model="form.seq" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.seq.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.seq.minLength">
                    {{ $t('c.err__minLength', { fieldName: $t('seq'), val: $v.form.seq.$params.minLength.min}) }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.seq.numeric">
                    {{ $t('c.err__numeric', { fieldName: $t('seq'), val: $v.form.seq.$params.numeric}) }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group">
                  <label>{{ $t('c.created_date') }}</label>
                  <b-form-input v-model="form.createDate" disabled />
                </b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('lov_name') }}</label>
                  <b-form-input v-model="form.lovName" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.lovName.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.lovName.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('lov_name'), val: $v.form.lovName.$params.maxLength.max}) }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group">
                  <label>{{ $t('c.updated_by') }}</label>
                  <b-form-input v-model="form.updateBy" disabled />
                </b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('lov_desc') }}</label>
                  <b-form-input v-model="form.lovDesc" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.lovDesc.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.lovDesc.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('lov_desc'), val: $v.form.lovDesc.$params.maxLength.max}) }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group">
                  <label>{{ $t('c.updated_date') }}</label>
                  <b-form-input v-model="form.updateDate" disabled />
                </b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('lov_descEn') }}</label>
                  <b-form-input v-model="form.lovDescEn" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.lovDescEn.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.lovDescEn.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('lov_descEn'), val: $v.form.lovDescEn.$params.maxLength.max}) }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group"></b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('value1') }}</label>
                  <b-form-input v-model="form.value1" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.value1.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.value1.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('value1'), val: $v.form.value1.$params.maxLength.max}) }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group"></b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('value2') }}</label>
                  <b-form-input v-model="form.value2" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.value2.required">
                    {{ $t('c.err__required') }}
                  </div>
                  <div class="invalid-feedback" v-show="!$v.form.value2.maxLength">
                    {{ $t('c.err__maxLength', { fieldName: $t('value2'), val: $v.form.value2.$params.maxLength.max}) }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group required"></b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('c.status') }}</label>
                  <treeselect v-model="form.status" :options="statusList" :placeholder="$t('c.please_select')" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.status.required">
                    {{ $t('c.err__required') }}
                  </div>
                </b-col>
                <b-col sm="4"></b-col>
              </b-row>
            </form>
          </div>
        </div>
      </div><!-- /Page Detail -->
    </HasPerm>
  </div>
</template>

<script>
import { required, maxLength, minLength, numeric } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'ErrorMessageDetail',

  mixins: [CommonMixin],

  async fetch () {
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
  },

  async asyncData (context) {
    const mode = context.params.id
    const id = context.query.id
    let form
    if (id) {
      form = await context.$axios.$get(`/api/lov/findById/${id}`)
    }
    if (mode === 'view') {
      return {
        mode,
        id,
        form: await form,
        disableMode: true,
        viewMode: true
      }
    } else {
      return {
        mode,
        id,
        form: await form,
        disableMode: false,
        viewMode: false
      }
    }
  },

  data () {
    return {
      mode: '',
      form: {},
      tabIndex: 1,
      statusList: [],
    }
  },

  validations: {
    form: {
      groupName: { required, maxLength: maxLength(50) },
      lovName: { required, maxLength: maxLength(255) },
      lovDesc: { required, maxLength: maxLength(1000) },
      lovDescEn: { required, maxLength: maxLength(1000) },
      value1: { required, maxLength: maxLength(500) },
      value2: { required, maxLength: maxLength(500) },
      status: { required, maxLength: maxLength(1) },
      seq: { required, minLength: minLength(1), numeric }
    }
  },

  computed: {
    ...mapState({
      locale: state => state.i18n.locale
    }),
  },

  methods: {
    gotoBack () {
      this.$router.back()
    },

    save () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return
      }

      // mode edit
      this.msgBoxConfirm('update').then((ok) => {
        if (ok) {
          this.$axios.$post('/api/lov/update', this.form).then(res => {
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
      })
    },
  }
}
</script>
