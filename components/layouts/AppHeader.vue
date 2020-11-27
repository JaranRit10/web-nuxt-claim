<template>
  <b-navbar toggleable="sm" type="dark" style="background-color: #40C0F0 !important;">
    <div class="navbar-brand">
      <i @click="toggleSidebar" class="las la-bars clickable"></i>
      <template v-if="!showSidebar && sideBarMini">
        <b>{{ $t('project_name') }}</b>
      </template>
      <template v-if="!sideBarMini">
        <b>{{ $t('project_name') }}</b>
      </template>
    </div>

    <b-navbar-toggle target="nav-collapse">
      <template v-slot:default="{ expanded }">
        <i v-if="expanded" class="las la-chevron-up"></i>
        <i v-else class="las la-chevron-down"></i>
      </template>
    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <span class="flag-icon flag-icon-gb mr-1" :class="{'flag-icon-gb': locale=='en', 'flag-icon-th': locale=='th'}" />
            <em class="text-uppercase font-weight-bold mr-1">{{ locale }}</em>
          </template>

          <b-dropdown-item href="" @click="switchLang('en')">
            <span class="flag-icon flag-icon-gb mr-2" /> {{ $t('c.english') }}
          </b-dropdown-item>
          <b-dropdown-item href="" @click="switchLang('th')">
            <span class="flag-icon flag-icon-th mr-2" /> {{ $t('c.thai') }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{ user.userid }} : {{ user.username | emptyToDash }}</em>
          </template>
          <b-dropdown-item href="/profile"><i class="las la-user mr-2" style="font-size: 16px;"></i> {{ $t('c.profile') }}</b-dropdown-item>
          <b-dropdown-item href="" @click="modalShow = !modalShow"><i class="las la-key mr-2" style="font-size: 16px;"></i> {{ $t('c.change_pwd') }} </b-dropdown-item>
          <b-dropdown-item href="" @click="logout()"><i class="las la-door-open mr-2" style="font-size: 16px;"></i> {{ $t('c.sign_out') }} </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    <b-modal
      v-model="modalShow"
      :title="$t('c.change_pwd')"
      size="lg"
      hide-footer
      :header-bg-variant="'info'"
      :header-text-variant="'light'"
      :no-close-on-backdrop="true"
      @hidden="clearData()"
    >
      <div class="card">
        <div class="card-body">
          <div @submit.prevent :class="{ 'dirty' : $v.$dirty }">
            <b-row aligh-h="around" class="mb-2">
              <label class="col-sm-4 col-form-label required">{{ $t('c.old_pwd') }} :</label>
              <b-col sm="4">
                <b-form-input v-model="form.oldPassword" type="password" />
              </b-col>
              <b-col>
                <div class="invalid-feedback" v-show="!$v.form.oldPassword.required">
                  {{ $t('c.err__required') }}
                </div>
              </b-col>
            </b-row>
            <b-row aligh-h="around" class="mb-2">
              <label class="col-sm-4 col-form-label required">{{ $t('c.new_pwd') }} :</label>
              <b-col sm="4">
                <b-form-input v-model="form.newPassword" type="password" />
              </b-col>
              <b-col>
                <div class="invalid-feedback" v-show="!$v.form.newPassword.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.newPassword.minLength">
                  {{ $t('c.err__minLength', { fieldName: $t('c.new_pwd'), val: $v.form.newPassword.$params.minLength.min}) }}
                </div>
              </b-col>
            </b-row>
            <b-row aligh-h="around" class="mb-2">
              <label class="col-sm-4 col-form-label required">{{ $t('c.confirm_pwd') }} :</label>
              <b-col sm="4">
                <b-form-input v-model="form.confirmPassword" type="password" />
              </b-col>
              <b-col>
                <div class="invalid-feedback" v-show="!$v.form.confirmPassword.required">
                  {{ $t('c.err__required') }}
                </div>
                <div class="invalid-feedback" v-show="!$v.form.confirmPassword.sameAsPassword">
                  {{ $t('c.err__repeatpwd') }}
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="card-footer">
            <div class="action">
              <button class="btn btn-success ml-2" @click="save()">
                <i class="las la-save"></i> <span>{{ $t('c.save') }}</span>
              </button>
              <button class="btn btn-warning ml-2" @click="function () {
                clearData()
                modalShow=false }"
              >
                <i class="las la-window-close"></i> <span>{{ $t('c.cancel') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import CommonMixin from '~/assets/js/CommonMixin'

export default {

  mixins: [CommonMixin],

  data () {
    return {
      form: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      modalShow: false,
    }
  },

  computed: {
    ...mapState({
      showSidebar: state => state.layout.showSidebar,
      sideBarMini: state => state.layout.sideBarMini,
      user: state => state.auth.user,
      locale: state => state.i18n.locale
    })
  },

  validations: {
    form: {
      oldPassword: {
        required
      },
      newPassword: {
        required, minLength: minLength(6)
      },
      confirmPassword: {
        required, sameAsPassword: sameAs('newPassword')
      }
    }
  },

  methods: {
    ...mapActions({
      toggleSidebar: 'layout/toggleSidebar'
    }),
    switchLang (langCode) {
      if (process.client) {
        this.$util.setCookie('i18n_redirected', langCode, 365)

        window.location.reload()
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return
      }
      this.form.userCode = this.user.userid
      this.$axios.$post('/api/users/changePassword', this.form).then((result) => {
        if (result) {
          this.toast('success', this.$t('c.success__save'))
          this.skipValidateUnsaved = true
          this.clearData()
          this.modalShow = false
        } else {
          this.toast('warning', this.$t(result.message))
          this.skipValidateUnsaved = true
          // this.clearData()
          this.modalShow = true
        }
      })
    },

    clearData () {
      this.$v.$reset()
      this.skipValidateUnsaved = true
      this.form = {}
    },
    logout () {
      this.$auth.logout()

      this.$bvModal.msgBoxOk(this.$t('c.success__logout'), {
        modalClass: 'modal-ok',
        okTitle: this.$t('c.ok')
      }).then(ok => {
        window.location.href = '/login'
      })
    }
  }
}
</script>

<style>
.app__header,
.navbar-dark .navbar-nav .nav-link {
  color: #fff;
}

.navbar {
  padding: 0 1rem;
}

.navbar-brand {
  font-size: 22px;
  line-height: 35px;
}

.navbar-brand img {
  max-height: 34px;
}
</style>
