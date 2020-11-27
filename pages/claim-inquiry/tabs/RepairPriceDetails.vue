<template>
  <div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('repair-price-details', $event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          {{ $t('c.tab_detail', { tab: $t('repair_price') }) }}
        </div>
      </div>
      <b-collapse visible id="repair-price-details">
        <div class="card-body">
          <b-row align-h="center">
            <b-col sm="7">
              <div class="table">
                <table class="table table-sm table-bordered table-striped table-hover b-table" ref="myTable">
                  <thead class="thead-dark">
                    <tr>
                      <th class="text-center" style="width: 150px;">ประเภท</th>
                      <th class="text-center" style="width: 150px;">จำนวนรายการ</th>
                      <th class="text-center" style="width: 150px;">อู่เสนอ</th>
                      <th class="text-center" style="width: 150px;">ประกันอนุมัติ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, index) in form.dataReqairPrice" :key="index">
                      <td>{{ v.type }}</td>
                      <td class="text-right">{{ v.amtNoti }}</td>
                      <td class="text-right">{{ v.repairer | fmtNumber(2) }}</td>
                      <td class="text-right">{{ v.insurance | fmtNumber(2) }}</td>
                    </tr>

                    <tr v-if="form.totalRepairer || form.totalInsurance" style="background-color: #aebac7;">
                      <td class="text-center font-weight-bolder" colspan="2">{{ $t('c.total') }}</td>
                      <td class="text-right">{{ form.totalRepairer | fmtNumber(2) }}</td>
                      <td class="text-right">{{ form.totalInsurance | fmtNumber(2) }}</td>
                    </tr>

                    <tr v-if="!form || form.length === 0">
                      <td class="text-center" colspan="50">{{ $t('c.no_data_found') }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('labor-price-details',$event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          {{ $t('c.tab_detail', { tab: $t('labor_price') }) }}
        </div>
        <!-- <div class="action"><i class="las la-md la-angle-down"></i></div> -->
      </div>
      <b-collapse visible id="labor-price-details">
        <div class="card-body">
          <a-table
            :id="$route.name+'/labor-price-details'"
            :paging="paging"
            :columns="columnsLaborPrice"
            :datasource="form"
          >
            <template slot="tableAction"></template>
            <template slot="tableBody">
              <tr v-for="(v, index) in form.laborPriceList" :key="index">
                <td class="text-center">{{ v.col1 }}</td>
                <td class="text-center">{{ v.col2 }}</td>
                <td class="text-center">{{ v.col3 }}</td>
                <td>{{ v.col4 }}</td>
                <td>{{ v.col5 }}</td>
                <td>{{ v.col6 }}</td>
                <td class="text-right">{{ v.col7 | fmtNumber(2) }}</td>
                <td class="text-right">{{ v.col8 | fmtNumber(2) }}</td>
                <td class="text-right">{{ v.col9 | fmtNumber(2) }}</td>
                <td class="text-right">{{ v.col10 | fmtNumber(2) }}</td>
                <td>{{ v.col11 }}</td>
                <td>{{ v.col12 }}</td>
                <td class="text-right">{{ v.col13 }}</td>
                <td>{{ v.col14 }}</td>
                <td>{{ v.col15 }}</td>
              </tr>
            </template>
          </a-table>
        </div>
      </b-collapse>
    </div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('part-price-details',$event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          {{ $t('c.tab_detail', { tab: $t('part_price') }) }}
        </div>
        <!-- <div class="action"><i class="las la-md la-angle-down"></i></div> -->
      </div>
      <b-collapse visible id="part-price-details">
        <div class="card-body">
          <a-table
            :id="$route.name+'/part-price-details'"
            :paging="paging"
            :columns="columnsPartPrice"
            :datasource="form"
          >
            <template slot="tableAction"></template>
            <template slot="tableBody">
              <tr v-for="(v, index) in form.partPriceList" :key="index">
                <td class="text-center">{{ v.col1 }}</td>
                <td class="text-center">{{ v.col2 }}</td>
                <td class="text-center">{{ v.col3 }}</td>
                <td>{{ v.col4 }}</td>
                <td>{{ v.col5 }}</td>
                <td>{{ v.col6 }}</td>
                <td>{{ v.col7 }}</td>
                <td class="text-right">{{ v.col8 | fmtNumber(2) }}</td>
                <td class="text-right">{{ v.col9 | fmtNumber(2) }}</td>
                <td class="text-right">{{ v.col10 | fmtNumber(2) }}</td>
                <td class="text-right">{{ v.col11 | fmtNumber(2) }}</td>
                <td class="text-right">{{ v.col12 | fmtNumber(2) }}</td>
                <td>{{ v.col13 }}</td>
                <td>{{ v.col14 }}</td>
                <td>{{ v.col15 }}</td>
                <td>{{ v.col16 }}</td>
                <td>{{ v.col17 }}</td>
                <td>{{ v.col18 }}</td>
                <td class="text-right">{{ v.col19 }}</td>
                <td>{{ v.col20 }}</td>
              </tr>
            </template>
          </a-table>
        </div>
      </b-collapse>
    </div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('other-price-details',$event)">
        <div class="tab text-light">
          <i class="las la-md la-angle-down"></i>
          {{ $t('c.tab_detail', { tab: $t('other_price') }) }}
        </div>
        <!-- <div class="action"><i class="las la-md la-angle-down"></i></div> -->
      </div>
      <b-collapse visible id="other-price-details">
        <div class="card-body">
          <a-table
            :id="$route.name+'/other-price-details'"
            :paging="APP.paging"
            :columns="columnsOtherPrice"
            :datasource="form"
            :isFilter="false"
            :isSort="false"
            :isPaging="false"
          >
            <template slot="tableAction"></template>
            <template slot="tableBody">
              <tr v-for="(v, index) in form.otherPriceList" :key="index">
                <td class="text-center">{{ v.col1 }}</td>
                <td class="text-center">{{ v.col2 }}</td>
                <td class="text-center">{{ v.col3 }}</td>
                <td>{{ v.col4 }}</td>
                <td class="text-right">{{ v.col5 | fmtNumber(2) }}</td>
                <td class="text-right">{{ v.col6 | fmtNumber(2) }}</td>
                <td>{{ v.col7 }}</td>
                <td>{{ v.col8 }}</td>
                <td class="text-right">{{ v.col9 }}</td>
                <td>{{ v.col10 }}</td>
              </tr>
            </template>
          </a-table>
        </div>
      </b-collapse>
    </div>
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
      form: {},
      paging: {
        sortBy: [],
        limit: 10,
        limitList: [
          10
        ],
        pageNumber: 1
      },
    }
  },
  computed: {
    columnsLaborPrice () {
      const col = [
        { label: this.$t('c.seq'), field: 'seq', style: { minWidth: '70px' }, lv: 1, rowspan: 2 },
        { label: this.$t('labor_price_id'), field: 'labor_price_id', style: { minWidth: '130px' }, lv: 1, rowspan: 2 },
        { label: this.$t('notify_date'), field: 'notify_date', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('labor_detail'), field: 'labor_detail', style: { minWidth: '200px' }, lv: 1, rowspan: 2 },
        { label: this.$t('heavy_level'), sortable: false, filterable: false, lv: 1, colspan: 2 },
        { label: this.$t('repairer'), field: 'heavy_level_repairer', filterable: false, lv: 2 },
        { label: this.$t('insurance'), field: 'heavy_level_insurance', filterable: false, lv: 2 },
        { label: this.$t('mean_price'), sortable: false, filterable: false, lv: 1, colspan: 2 },
        { label: this.$t('repairer'), field: 'mean_price_repairer', filterable: false, lv: 2 },
        { label: this.$t('insurance'), field: 'mean_price_insurance', filterable: false, lv: 2 },
        { label: this.$t('suggest_price'), field: 'suggest_price', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('price_approve_ins'), field: 'price_approve_ins', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('comment_reqairer'), field: 'comment_reqairer', style: { minWidth: '150px' }, lv: 1, rowspan: 2 },
        { label: this.$t('comment_ins'), field: 'comment_ins', style: { minWidth: '150px' }, lv: 1, rowspan: 2 },
        { label: this.$t('approve_times'), field: 'approve_times', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('c.status'), field: 'status', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('attachment'), field: 'attachment', style: { minWidth: '100px' }, lv: 1, rowspan: 2 }
      ]

      return col
    },
    columnsPartPrice () {
      const col = [
        { label: this.$t('c.seq'), field: 'seq', style: { minWidth: '70px' }, lv: 1, rowspan: 2 },
        { label: this.$t('part_price_id'), field: 'part_price_id', style: { minWidth: '130px' }, lv: 1, rowspan: 2 },
        { label: this.$t('notify_date'), field: 'notify_date', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('part_id'), field: 'part_id', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('part_detail'), field: 'part_detail', style: { minWidth: '200px' }, lv: 1, rowspan: 2 },
        { label: this.$t('part_type'), sortable: false, filterable: false, lv: 1, colspan: 2 },
        { label: this.$t('repairer'), field: 'part_type_repairer', filterable: false, lv: 2 },
        { label: this.$t('insurance'), field: 'part_type_insurance', filterable: false, lv: 2 },
        { label: this.$t('mean_price'), sortable: false, filterable: false, lv: 1, colspan: 2 },
        { label: this.$t('repairer'), field: 'mean_price_repairer', filterable: false, lv: 2 },
        { label: this.$t('insurance'), field: 'mean_price_insurance', filterable: false, lv: 2 },
        { label: this.$t('ราคาอะไหล่เต็ม'), field: 'ราคาอะไหล่เต็ม', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('suggest_price'), field: 'suggest_price', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('price_approve_ins'), field: 'price_approve_ins', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('discount_approve'), field: 'discount_approve', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('number_pieces'), field: 'number_pieces', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('staff_name'), field: 'staff_name', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('ระบุคืนซาก'), field: 'ระบุคืนซาก', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('comment_reqairer'), field: 'comment_reqairer', style: { minWidth: '150px' }, lv: 1, rowspan: 2 },
        { label: this.$t('comment_ins'), field: 'comment_ins', style: { minWidth: '150px' }, lv: 1, rowspan: 2 },
        { label: this.$t('approve_times'), field: 'approve_times', style: { minWidth: '100px' }, lv: 1, rowspan: 2 },
        { label: this.$t('c.status'), field: 'status', style: { minWidth: '100px' }, lv: 1, rowspan: 2 }
      ]

      return col
    },
    columnsOtherPrice () {
      const col = [
        { label: this.$t('c.seq'), field: '', style: { minWidth: '70px' }},
        { label: this.$t('หมายเลขค่าใช้จ่ายอื่นๆ'), field: '', style: { minWidth: '130px' }},
        { label: this.$t('วันที่เสนอรายการ'), field: '', style: { minWidth: '100px' }},
        { label: this.$t('c.list'), field: '', style: { minWidth: '200px' }},
        { label: this.$t('suggest_price'), field: '', style: { minWidth: '100px' }},
        { label: this.$t('price_approve_ins'), field: '', style: { minWidth: '100px' }},
        { label: this.$t('comment_reqairer'), field: '', style: { minWidth: '150px' }},
        { label: this.$t('comment_ins'), field: '', style: { minWidth: '150px' }},
        { label: this.$t('approve_times'), field: '', style: { minWidth: '100px' }},
        { label: this.$t('c.status'), field: '', style: { minWidth: '100px' }}
      ]

      return col
    },
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      this.form = {
        dataReqairPrice: [
          { type: 'Labor Price', amtNoti: 4, repairer: 6125, insurance: 5825 },
          { type: 'Part Price', amtNoti: 1, repairer: 2000, insurance: 1900 },
          { type: 'Other Price', amtNoti: 0, repairer: 0, insurance: 0 },
        ],
        totalRepairer: 8125,
        totalInsurance: 5725,
        laborPriceList: [
          { col1: 1, col2: '14718915', col3: '10/11/2020', col4: 'เปลี่ยนกระจกมองข้าง ขวา', col5: 'เปลี่ยน', col6: 'เปลี่ยน', col7: 425, col8: 425, col9: 425, col10: 425, col11: '', col12: '', col13: '1', col14: 'อนุมัติ(11/11/2020)', col15: ''},
          { col1: 2, col2: '14114984', col3: '10/11/2020', col4: 'ซ่อมประตูหน้า ขวา', col5: 'กลาง', col6: 'น้อย', col7: 1900, col8: 1600, col9: 1900, col10: 1600, col11: '', col12: '', col13: '1', col14: 'อนุมัติ(11/11/2020)', col15: '' },
          { col1: 3, col2: '18598415', col3: '10/11/2020', col4: 'ซ่อมกันชนหน้า', col5: 'กลาง', col6: 'น้อย', col7: 2200, col8: 2200, col9: 2200, col10: 2200, col11: '', col12: '', col13: '1', col14: 'อนุมัติ(11/11/2020)', col15: ''},
          { col1: 4, col2: '28144155', col3: '10/11/2020', col4: 'ซ่อมประตูหลัง ขวา', col5: 'น้อย', col6: 'น้อย', col7: 1600, col8: 1600, col9: 1600, col10: 1600, col11: '', col12: '', col13: '1', col14: 'อนุมัติ(11/11/2020)', col15: ''}
        ],
        partPriceList: [
          { col1: 1, col2: '24504', col3: '10/11/2020', col4: '7427', col5: 'กระจกมองข้าง ขวา', col6: '', col7: '', col8: 2000, col9: 1700, col10: 1900, col11: 2000, col12: 1900, col13: '', col14: 1, col15: '', col16: '', col17: '', col18: '', col19: '1', col20: 'อนุมัติ(11/11/2020)'}
        ],
        otherPriceList: [
          // { col1: 1, col2: '27524', col3: '10/11/2020', col4: '', col5: 99999, col6: 99999, col7: '', col8: '', col9: '', col10: 'อนุมัติ(11/11/2020)'}
        ]
      }
    }
  },
}
</script>