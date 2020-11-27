<template>
  <div>
    <b-row align-h="center">
      <b-col sm="11">
        <div class="table">
          <table class="table table-sm table-bordered table-striped table-hover b-table" ref="myTable">
            <thead class="thead-dark">
              <tr>
                <th v-for="(v, index) in columns" :key="index" class="text-center">{{ v.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(obj, index) in form.data" :key="index">
                <td>{{ obj.label }}</td>
                <td class="text-right">{{ obj.incurred | fmtNumber(2) }}</td>
                <td class="text-right">{{ obj.paid | fmtNumber(2) }}</td>
                <td class="text-right">{{ obj.balance | fmtNumber(2) }}</td>
              </tr>

              <tr style="background-color: #aebac7;">
                <td class="text-center font-weight-bolder">{{ $t('c.total') }}</td>
                <td class="text-right">32000</td>
                <td class="text-right">30500</td>
                <td class="text-right">2000</td>
              </tr>

              <tr v-if="!form.data || form.data.length === 0">
                <td class="text-center" colspan="50">{{ $t('c.no_data_found') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import App from '~/assets/js/Constant'
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  mixins: [CommonMixin],
  data () {
    return {
      APP: App,
      form: {
        data: [
          { label: 'OD [ Sum Insure 100,000 ]', incurred: 10000, paid: 10500, balance: -500 },
          { label: 'TPPD [ 10,000,000 / Accident ]', incurred: 20000, paid: 15000, balance: 5000 },
          { label: 'TPB [ 100,000 / Accident ]', incurred: 2000, paid: 5000, balance: -2000 }
        ]
      }
    }
  },
  computed: {
    columns () {
      const col = [
        { label: this.$t('type')},
        { label: this.$t('incurred')},
        { label: this.$t('paid')},
        { label: this.$t('balance')}
      ]
      return col
    }
  },
}
</script>