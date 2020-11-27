<template>
  <div>
    <HasPerm any="errmsg_view,errmsg_update">
      <!-- Page Header -->
      <div class="page__header">
        <div class="page__title">
          <h1>{{ $t('error_message') }}</h1><span> {{ $t(`c.${mode}`) }}</span>
        </div>
        <div class="page__breadcrumb">
          <i class="las la-md la-home"></i> {{ $t('c.home') }} / {{ $t('system_setup') }} / {{ $t('error_message') }}
        </div>
      </div>

      <!-- Page Detail -->
      <div class="card">
        <div class="card-header">
          <div class="tab" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">
            <i class="las la-info-circle"></i> {{ $t('c.info') }}
          </div>
          <div class="action">
            <HasPerm any="errmsg_update">
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
                <b-col sm="4" class="form-group">
                  <label>{{ $t('error_code') }}</label>
                  <b-form-input v-model="form.errorCode" disabled />
                </b-col>
                <b-col sm="4" class="form-group">
                  <label>{{ $t('c.created_by') }}</label>
                  <b-form-input v-model="form.createdBy" disabled />
                </b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('error_name') }}</label>
                  <b-form-input v-model="form.errorThName" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.errorThName.required">
                    {{ $t('c.err__required') }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group">
                  <label>{{ $t('c.created_date') }}</label>
                  <b-form-input v-model="form.createdDate" disabled />
                </b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('error_name_en') }}</label>
                  <b-form-input v-model="form.errorEnName" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.errorEnName.required">
                    {{ $t('c.err__required') }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group">
                  <label>{{ $t('c.last_updated_by') }}</label>
                  <b-form-input v-model="form.updatedBy" disabled />
                </b-col>
              </b-row>
              <b-row align-h="around">
                <b-col sm="4" class="form-group required">
                  <label>{{ $t('c.status') }}</label>
                  <treeselect v-model="form.status" :options="statusList" :placeholder="$t('c.please_select')" :disabled="disableMode" />
                  <div class="invalid-feedback" v-show="!$v.form.status.required">
                    {{ $t('c.err__required') }}
                  </div>
                </b-col>
                <b-col sm="4" class="form-group">
                  <label>{{ $t('c.last_updated_date') }}</label>
                  <b-form-input v-model="form.updatedDate" disabled />
                </b-col>
              </b-row>
            </form>
          </div>
        </div>
      </div><!-- /Page Detail -->
    </HasPerm>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
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
      form = await context.$axios.$get(`/api/errMsg/findById/${id}`)
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
      errorThName: { required },
      errorEnName: { required },
      status: { required },
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
      this.msgBoxConfirm('update').then(ok => {
        this.$axios.$post('/api/errMsg/update', this.form).then(res => {
          if (res == false) {
            this.toast('danger', res.errMsg)
            this.skipValidateUnsaved = true
          } else {
            this.toast('success', this.$t('c.success__update'))
            this.skipValidateUnsaved = true
            this.gotoBack()
          }
        })
      })
    },
  }
}
</script>
