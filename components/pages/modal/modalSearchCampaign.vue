<template>
  <b-modal
    style="min-width: 800px"
    id="modal-search-campaign"
    ref="modal"
    title="Campaign"
    size="lg"
    @show="Opened"
    @hidden="Opened"
    @ok="handleOk"
    :no-close-on-backdrop="true"
  >
    <form @submit.prevent style="padding-bottom: 20px">
      <div class="action" style="text-align: end">
        <button class="btn btn-primary ml-2" @click="searchModalCampaign()">
          <i class="las la-search"></i> {{ $t('c.search') }}
        </button>
        <button class="btn btn-warning ml-2" @click="clearCriteria()">
          <i class="las la-undo-alt"></i> {{ $t('c.clear') }}
        </button>
      </div>
      <b-row align-h="around">
        <b-col sm="4">
          <label>{{ $t('campaign') }}</label>
          <b-form-input v-model="criteria.campaignId" />
        </b-col>
        <b-col sm="4">
          <label>{{ $t('campaign_name') }}</label>
          <b-form-input v-model="criteria.campaignName" />
        </b-col>
        <b-col sm="4">
          <label>{{ $t('year') }}</label>
          <b-form-input v-model="criteria.year" />
        </b-col>
        <b-col sm="4">
          <label>{{ $t('c.start_date') }}</label>
          <a-form-datepicker v-model="criteria.startDate" />
        </b-col>
        <b-col sm="4">
          <label>{{ $t('c.end_date') }}</label>
          <a-form-datepicker v-model="criteria.endDate" />
        </b-col>
        <b-col sm="4" />
      </b-row>
    </form>
    <section>
      <div class="card">
        <div class="card-body">
          <a-table
            :id="'modalCampaign'"
            :datasource="datasource"
            :columns="columns"
            :paging="paging"
            @refresh="searchModalCampaign"
          >
            <template slot="tableBody">
              <tr v-for="obj in datasource.data" :key="obj.campaignNo">
                <td class="text-center">
                  <b-form-checkbox v-model="obj.checked"></b-form-checkbox>
                </td>
                <td class="text-center">{{ obj.year }}</td>
                <td class="text-center">{{ obj.campaignId }}</td>
                <td>{{ obj.campaignName }}</td>
                <td class="text-center">{{ obj.startDate }}</td>
                <td class="text-center">{{ obj.endDate }}</td>
              </tr>
            </template>
          </a-table>
        </div>
      <!-- /card-body -->
      </div>
    </section>
  </b-modal>
</template>

<script>
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  mixins: [CommonMixin],
  props: ['params'],
  data () {
    return {
      name: '',
      nameState: null,
      form: {},
      selectedUser: [],
      datasource: {},
      criteria: {},
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      }
    }
  },
  computed: {
    locale () {
      return this.$i18n.locale
    },
    columns () {
      const col = [
        { label: 'CHECK_ALL', sortable: false, style: { width: '20px' } },
        { label: this.$t('year'), field: 'year', style: { width: '80px' } },
        { label: this.$t('campaign'), field: 'campaignId', style: { minWidth: '100px' } },
        { label: this.$t('campaign_name'), field: 'campaignName', style: { minWidth: '150px' } },
        { label: this.$t('c.start_date'), field: 'startDate', style: { minWidth: '120px' } },
        { label: this.$t('c.end_date'), field: 'endDate', style: { width: '120px' } }
      ]
      return col
    }
  },
  methods: {
    Opened () {
      this.$nextTick(() => {
        this.searchModalCampaign()
      })

    },
    clearCriteria () {
      this.criteria = {}
    },
    async searchModalCampaign () {
      const criteria = { ...this.criteria, ...this.paging }
      const response = await this.$axios.$post('/api/promotion/findCampaignByCriteria', criteria)
      console.log('searchModalCampaign...', response)
      if (response.data) {
        this.datasource = response
      }
    },
    // checkFormValidity() {
    //   const valid = this.$refs.form.checkValidity()
    //   this.nameState = valid
    //   return valid
    // },

    handleOk (bvModalEvt) {
      // bvModalEvt.preventDefault()
      // this.handleSubmit()
    },
    handleSubmit () {
      let arr =[]
      let data = this.datasource.data
      for (let i = 0; i < data.length; i++) {
        if (data[i].checked == true) {
          delete data[i].siteId
          arr.push(data[i])
        }
      }
      if ( arr.length > 0 ) {
        this.params.onConfirm(arr)
        this.$nextTick(() => {
          this.$bvModal.hide('modal-search-campaign')
        })
      }
    }
  }
}
</script>
