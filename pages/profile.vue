<template>
  <div>
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('c.profile') }}</h1>
      </div>
      <div class="page__breadcrumb">
        <i class="las la-md la-home"></i>
        <nuxt-link to="/">{{ $t('c.home') }}</nuxt-link> / <span>{{ $t('c.profile') }}</span>
      </div>
    </div>

    <!-- Tab -->
    <div class="card">
      <div class="card-header">
        <div class="tab">
          <i class="las la-info-circle"></i> {{ $t('user_infor') }}
        </div>
        <div class="action">
          <button
            class="btn btn-secondary ml-2"
            @click="gotoBack()"
          ><i class="las la-arrow-left"></i> {{ $t('c.back') }}</button>
        </div>
      </div>
      <!-- Card body -->
      <div class="card-body">
        <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('user_code') }}</label>
            <b-form-input v-model="obj.userCode" disabled />
          </b-col>
          <b-col sm="4">
            <label>{{ $t('division') }}</label>
            <b-form-input v-model="obj.division" disabled />
          </b-col>
        </b-row>
        <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('title') }}</label>
            <b-form-input v-model="obj.title" disabled />
          </b-col>
          <b-col sm="4">
            <label>{{ $t('department') }}</label>
            <b-form-input v-model="obj.department" disabled />
          </b-col>
        </b-row>
        <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('user_name') }}</label>
            <b-form-input v-model="obj.firstName" disabled />
          </b-col>
          <b-col sm="4">
            <label>{{ $t('position') }}</label>
            <b-form-input v-model="obj.position" disabled />
          </b-col>
        </b-row>
        <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('user_name_en') }}</label>
            <b-form-input v-model="obj.firstNameEn" disabled />
          </b-col>
          <b-col sm="4">
            <label>{{ $t('telephone_no') }}</label>
            <b-form-input v-model="obj.telephoneNo" disabled />
          </b-col>
        </b-row>
        <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('last_name') }}</label>
            <b-form-input v-model="obj.lastName" disabled />
          </b-col>
          <b-col sm="4">
            <label>{{ $t('mobile_no') }}</label>
            <b-form-input v-model="obj.mobileNo" disabled />
          </b-col>
        </b-row>
        <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('last_name_en') }}</label>
            <b-form-input v-model="obj.lastNameEn" disabled />
          </b-col>
          <b-col sm="4"></b-col>
        </b-row>
        <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('user_type') }}</label>
            <b-form-input v-model="obj.userTypeName" disabled />
          </b-col>
          <b-col sm="4"></b-col>
        </b-row>
        <!-- <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('user_role') }}</label>
            <treeselect v-model="obj.roleId" :options="roleList" disabled :placeholder="$t('c.all')" />
          </b-col>
          <b-col sm="4"></b-col>
        </b-row> -->
        <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('c.status') }}</label>
            <treeselect v-model="obj.status" :options="statusList" disabled :placeholder="$t('c.all')" />
          </b-col>
          <b-col sm="4"></b-col>
        </b-row>
        <b-row align-h="around" class="mb-2">
          <b-col sm="4">
            <label>{{ $t('user_email') }}</label>
            <b-form-input v-model="obj.email" disabled />
          </b-col>
          <b-col sm="4"></b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'Profile',
  mixins: [CommonMixin],

  async fetch () {
    this.statusList = await this.$axios.$get('/api/dropdown/lov/DEFAULT_STATUS')
    this.roleList = await this.$axios.$get('/api/dropdown/getRole')
  },

  data () {
    return {
      obj: {},
      statusList: [],
      roleList: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  mounted () {
    this.findById()
  },
  methods: {
    async findById () {
      await this.$axios.$get(`/api/users/findById/${this.user.userid}`).then((resp) => {
        this.obj = resp
      })
    },
    gotoBack () {
      this.$router.push('/')
    }
  },
}
</script>