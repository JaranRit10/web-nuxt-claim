<template>
  <div>
    <b-row>
      <b-col lg="3" class="mb-2 pt-3">
        <b-button variant="success" size="sm" class="mb-1">
          <i class="las la-md la-cogs" /> Submit to PFM
        </b-button>
        <b-button variant="success" size="sm" class="mb-1">
          <i class="las la-md la-user" /> Submit to AVP
        </b-button>
      </b-col>
      <b-col lg="3" class="mb-2">
        <label>New Article/ Barcode/ Root Code/ Brand Code</label>
        <b-input-group>
          <b-form-input v-model="barcode" />
          <b-input-group-append>
            <b-button variant="success" size="sm" @click="addRow()">
              <i class="las la-md la-plus-circle" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col lg="6" class="mb-3" style="padding-top: 1.35rem">
        <b-button variant="outline-warning" size="sm" @click="getValue()">
          Reload Article
        </b-button>
        <b-dropdown text="Go to section" variant="outline-primary" class="ml-3">
          <b-dropdown-item href="#" @click="getValue1()">Article Information</b-dropdown-item>
          <b-dropdown-item href="#" @click="getValue2()">Forcast by SKU</b-dropdown-item>
          <b-dropdown-item href="#" @click="getValue3()">Compensate</b-dropdown-item>
          <b-dropdown-item href="#" @click="getValue4()">Premium , PWP , Member</b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <hot-table ref="handsonTable"
                   id="handsonTable"
                   license-key="non-commercial-and-evaluation"
                   :settings="hotSettings"
        >
        </hot-table>
      </b-col>
    </b-row>
    <!-- <pre>{{ obj }}</pre> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { HotTable, Handsontable } from '~/plugins/vue-handsontable.js'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  name: 'HotTab',
  components: {
    HotTable
  },
  mixins: [CommonMixin],

  props: {
    campaignId: {
      type: String,
      default () { return '' }
    },
    startDate: {
      type: String,
      default () { return '' }
    },
    endDate: {
      type: String,
      default () { return '' }
    },
    obj: {
      type: Array,
      default () { return [] }
    },
    themeList: {
      type: Array,
      default () { return [] }
    },
    articleTypeList: {
      type: Array,
      default () { return [] }
    },
    displayTypeList: {
      type: Array,
      default () { return [] }
    },
    signageTypeList: {
      type: Array,
      default () { return [] }
    },
    mixMatchTypeList: {
      type: Array,
      default () { return [] }
    },
    limitationTypeList: {
      type: Array,
      default () { return [] }
    },
    mixMatchConditionList: {
      type: Array,
      default () { return [] }
    }
  },
  asyncData () {},
  data () {
    return {
      barcode: '',
      dataSource: [],
      hotSettings: {
        colHeaders: true,
        allowInvalid: true,
        rowHeaders: true,
        colWidths: 150,
        minRows: 100,
        data: this.getData(),
        cell: this.getCells(),
        mergeCells: this.getMergeCells(),
        // cell: this.getCells(),
        columns: this.getColums(),
        manualRowResize: true,
        manualColumnResize: true,
        autoColumnSize: false,
        autoRowSize: false,
        comments: true,
        fixedRowsTop: 3,
        fixedColumnsLeft: 8,
        afterChange: this.onAfterChange,
        contextMenu: {
          items: {
            'remove_row': {
              disabled: () => {
                const hot = this.$refs.handsonTable.hotInstance
                if (hot.getSelectedLast() != undefined && (hot.getSelectedLast()[0] <= 2 || hot.getSelectedLast()[2] <= 2)) {
                  return true
                }
              }
            },
            'hsep1': '---------',
            'undo': {},
            'redo': {},
            'alignment': {},
            'commentsAddEdit': {},
            'commentsRemove': {},
            'commentsReadOnly': {},
            'hidden_columns_hide': {},
            'hidden_columns_show': {},
            'cut': {},
            'copy': {}
          }
        }, hiddenColumns: {
          // set columns that are hidden by default
          columns: [],
          // show where are hidden columns
          indicators: true
        },
        outsideClickDeselects: false
      }
    }
  },

  computed: {
    ...mapState({
      showSidebar: state => state.layout.showSidebar
    }),
  },
  watch: {
    showSidebar (newVal, oldVal) {
      setTimeout(() => {
        this.$refs.handsonTable.hotInstance.updateSettings({
          width: '100%',
        })
      }, 300)
    }
  },
  mounted () {
    let hot = this.$refs.handsonTable.hotInstance
    hot.selectCell(3, 0)
    this.resize()
  },
  beforeDestroy () {
    this.dataSource = this.$refs.handsonTable.hotInstance.getSourceData()
    this.dataSource.splice(0, 1)
    this.dataSource.splice(0, 1)
    this.dataSource.splice(0, 1)
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
    this.$emit('re-data', this.dataSource)
  },
  methods: {
    resize () {
    // document.querySelector('#tab2').classList.contains('active')
      if (this.$refs.handsonTable && this.$refs.handsonTable.hotInstance != undefined) {
        this.$refs.handsonTable.hotInstance.updateSettings({
          height: document.documentElement.clientHeight - 340 > 340 ? document.documentElement.clientHeight - 340 : 340,
        })
      }
    },
    onAfterChange (changes, source) {
      if (source === 'edit' || source === 'CopyPaste.paste') {
        changes.forEach(([row, props, oldVal, newVal]) => {
          const handsonTable = this.$refs.handsonTable.hotInstance

          if (this.dataSource && this.dataSource.length > 0) {
            if (row == 1 && props == 'checkbox' && newVal) {
              for (let i = 0; i < this.dataSource.length; i++) {
                if (this.dataSource[i].promotionNo) {
                  handsonTable.setDataAtCell(i + 3, 0, true)
                }
              }
              // select all promotion
            } else if (row == 1 && props == 'checkbox' && !newVal) {
              for (let i = 0; i < this.dataSource.length; i++) {
                if (this.dataSource[i].promotionNo) {
                  handsonTable.setDataAtCell(i + 3, 0, false)
                }
              }
            }
          }
        })
      }
    },
    getData () {
      const header = [
        {
          quantity1: 'Total Hyper + Market', quantity2: '01: Big C', quantity3: '08: Market', quantity4: '01: Big C',
          quantity6: '08: Market', compensateBaht: 'Compensate Lumsum', compensateBahtSKU: 'Compensate By SKU',
          mixMatchCompensateType: 'Mix & Match Compensate Lumsum', mixMatchCompensateBaht: 'Mix & Match Compensation by SKU',
          couponCompensateType: 'GNM Product Coupon', premiumPromotionName: 'Premium , PWP , Member',
          amt: 'GP Compensate Promotion (Hyper & Market)', remarkBuyer: 'Remark Buyer'
        },
        {
          checkbox: false, icon: '', startDate: 'Promotion Date', departmentCode: 'Dept.', subDepartmentCode: 'Sub Dept.', theme: 'THEME', promotionNo: 'No',
          promotionName: 'Promotion Name', barcode: 'Barcode', articleName: 'Article Name TH',
          articleNameEn: 'Article Name EN', venderCode: 'Vender Code', venderName: 'Vender Name',
          packingSize: 'Packing Size', usePFMModule: 'Use PFM', image: 'Image', articleCode: 'Article Code',
          articleTypeCode: 'Article Type', displayTypeCode: 'Display Type', signageTypeCode: 'Signage', POGHyper: 'POG HYPER No. Store',
          POGMarket: 'POG MARKET No. Store', costNormal: 'Cost/Unit (Ex-Vat)', vatRate: 'Retail Price', mixMatch: 'Promotion Mechanic',
          exitPlan: 'Exit Plan', quantity1: 'Buyer - Sales Target', quantity2: 'Buyer - Sales Target', quantity3: 'Buyer - Sales Target',
          quantity4: 'Buyer - Sales Target', quantity5: 'PFM', quantity6: 'Buyer - Sales Target', quantity7: 'PFM',
          compensateType: 'Price Off : Compensate Type', compensateBaht: 'Compensate Baht', supplierCode: 'Supplier Code',
          brandCode: 'Brand Code', acceptNo: 'Accept No', compensateBahtSKU: 'Price Off : Compensate Baht', compensateRCVBaht: 'Compensate RCV Baht',
          compensate: 'Compensate', CompensatePOStartDate: 'Compensate PO Start Date', CompensatePOEndDate: 'Compensate PO End Date',
          mixMatchCompensateType: 'Mix & Match Compensate Type', mixMatchAcceptNo: 'Accept No', supplierCode1: 'Supplier Code1',
          compensateBaht1: 'Compensate Baht1', supplierCode2: 'Supplier Code2', compensateBaht2: 'compensateBaht2',
          promotionId: 'Promotion ID', mixMatchPromotionName: 'Promotion Name', mixMatchBarcode: 'Barcode',
          description: 'Description', mixMatchCompensateBaht: 'Mix & Match Compensate Baht', SKUSupplierCode: 'Supplier Code',
          couponCompensateType: 'Coupon Compensate Type', couponValue: 'Coupon Value', premiumPromotionName: 'ต้องกรอก (สินค้าที่ร่วมรายการ)',
          customerType: 'กรอกเมื่อมีรายการสินค้ายกเว้น', premiumCompensateType: 'Compensate สำหรับตัวแลกซื้อ , Premium เท่านั้น *** ถ้ามี Supplier ร่วมรายการมากกว่า 1 ราย ไม่ต้องกรอกข้อมูล Compensate ***',
          amt: 'Sales & GP Normal (Hyper & Market)', qty: 'FC Total (Hyper & Market)', costUnit: 'GP Compensate Promotion (Hyper & Market)'
        },
        {
          startDate: 'Start Date', endDate: 'End Date', costNormal: 'Cost Normal', costPromotion: 'Cost Promotion',
          costStartDate: 'Start Date', costEndDate: 'End Date', vatRate: 'Vat Rate', normalPrice: 'Normal Price',
          promotionPrice: 'Promotion Price', avgPrice: 'Avg. price/ unit (In.Vat)', discount: '%Discount', mixMatch: 'Mix & Match Name',
          xUnit: 'X unit(X For X Baht)', xBaht: 'X Baht(X For X Baht)', type: 'Type', limitation: 'Limitation',
          limitSet: 'Limit Set', condition: 'Condition', costDistribution: 'Cost Distribution for Get Item', remark: 'Remark',
          quantity1: 'Quantity', amount1: 'Amount', quantity2: 'Quantity', amount2: 'Amount',
          quantity3: 'Quantity', amount3: 'Amount', quantity4: 'Quantity (Barcode)', amount4: 'Amount (Barcode)',
          quantity5: 'Quantity', amount5: 'Amount', quantity6: 'Quantity (Barcode)', amount6: 'Amount (Barcode)',
          quantity7: 'Quantity', amount7: 'Amount', premiumPromotionName: 'Promotion Name', productRule1: 'Product Rule',
          premiumBrandCode1: 'Hierarchy, Supplier code,Brand code, Barcode', premiumBrandName1: 'Hierarchy, Supplier name, Brand name, Description',
          productRule2: 'Product Rule',
          premiumBrandCode2: 'Hierarchy, Supplier code,Brand code, Barcode', premiumBrandName2: 'Hierarchy, Supplier name, Brand name, Description',
          customerType: 'Customer type', minimumEvery: 'Minimum การซื้อขึนต่ำ / Every การซื้อครบทุกๆ',
          minimumPurchase: '1) Minimum Purchase กำหนดการซื้อขั้นต่ำเป็นบาท 2) Minimum Unit กำหนดการซื้อขั้นต่ำเป็นจำนวนชิ้น',
          limitationRule: 'Limitation Rule', premiumValue: 'PWP or Premium Value (baht) (มูลค่าสินค้าแลกซื้อหรือสินค้าฟรี)',
          premiumCompensateType: 'Compensate Type', fixBahtPerUnit: 'Fix Baht per Unit (MP0203)', bahtForTotalPeriod: 'Compensation (Baht for total period) ชดเชยแบบเหมาจ่าย (MP0205)',
          SupplierToCompensate: 'Supplier to compensate (ระบุรหัสร้านค้าเสมอ)', amt: 'AMT', GPUnit: 'GP/Unit', GPBaht: 'GP Baht', GPPercent: 'GP%',
          qty: 'QTY', amt2: 'AMT', costUnit: 'Cost/ Unit', avgPriceGP: 'Avg. Price/ Unit (ex. Vat)', GPUnit2: 'GP/Unit',
          GPAmtBefore: 'GP Amt Before compensate', GPBefore: '%GP Before Compensate', compensateBahtUnit: 'Compensate (baht/unit)',
          compensateLumsum: 'Compensate (Lumsum)', GPAmtAfter: 'GP Amt after Compensate', GPPerAfter: '%GP after Compensate',
          diff: 'Diff (Promo VS Normal)', pointOperater: 'Point Operater', extraPoint: 'Extra Point', pwp: 'PWP',
        }
      ]
      if (this.obj && this.obj.length > 0 && (!this.dataSource || (this.dataSource && this.dataSource.length == 0))) {
        return [...header, ...this.obj]
      }
      return header
    },
    getMergeCells () {
      // * row 0 lvl 1
      // * row 1 lvl 2
      // * row 2 lvl 3
      return [
        { row: 0, col: 45, rowspan: 1, colspan: 2 },
        { row: 0, col: 47, rowspan: 1, colspan: 2 },
        { row: 0, col: 49, rowspan: 1, colspan: 2 },
        { row: 0, col: 51, rowspan: 1, colspan: 4 },
        { row: 0, col: 55, rowspan: 1, colspan: 4 },
        { row: 0, col: 60, rowspan: 1, colspan: 4 },
        { row: 0, col: 64, rowspan: 1, colspan: 5 },
        { row: 0, col: 69, rowspan: 1, colspan: 10 },
        { row: 0, col: 79, rowspan: 1, colspan: 2 },
        { row: 0, col: 81, rowspan: 1, colspan: 2 },
        { row: 0, col: 83, rowspan: 1, colspan: 17 },
        { row: 0, col: 100, rowspan: 1, colspan: 16 },
        { row: 0, col: 116, rowspan: 3, colspan: 1 },
        { row: 1, col: 0, rowspan: 2, colspan: 1 },
        { row: 1, col: 1, rowspan: 2, colspan: 1 },
        { row: 1, col: 2, rowspan: 2, colspan: 1 },
        { row: 1, col: 3, rowspan: 2, colspan: 1 },
        { row: 1, col: 4, rowspan: 2, colspan: 1 },
        { row: 1, col: 5, rowspan: 2, colspan: 1 },
        { row: 1, col: 6, rowspan: 2, colspan: 1 },
        { row: 1, col: 7, rowspan: 2, colspan: 1 },
        { row: 1, col: 8, rowspan: 1, colspan: 2 },
        { row: 1, col: 10, rowspan: 2, colspan: 1 },
        { row: 1, col: 11, rowspan: 2, colspan: 1 },
        { row: 1, col: 12, rowspan: 2, colspan: 1 },
        { row: 1, col: 13, rowspan: 2, colspan: 1 },
        { row: 1, col: 14, rowspan: 2, colspan: 1 },
        { row: 1, col: 15, rowspan: 2, colspan: 1 },
        { row: 1, col: 16, rowspan: 2, colspan: 1 },
        { row: 1, col: 17, rowspan: 2, colspan: 1 },
        { row: 1, col: 18, rowspan: 2, colspan: 1 },
        { row: 1, col: 19, rowspan: 2, colspan: 1 },
        { row: 1, col: 20, rowspan: 2, colspan: 1 },
        { row: 1, col: 21, rowspan: 2, colspan: 1 },
        { row: 1, col: 22, rowspan: 2, colspan: 1 },
        { row: 1, col: 23, rowspan: 1, colspan: 4 },
        { row: 1, col: 27, rowspan: 1, colspan: 5 },
        { row: 1, col: 32, rowspan: 1, colspan: 12 },
        { row: 1, col: 44, rowspan: 2, colspan: 1 },
        { row: 1, col: 45, rowspan: 1, colspan: 2 },
        { row: 1, col: 47, rowspan: 1, colspan: 2 },
        { row: 1, col: 49, rowspan: 1, colspan: 2 },
        { row: 1, col: 51, rowspan: 1, colspan: 2 },
        { row: 1, col: 53, rowspan: 1, colspan: 2 },
        { row: 1, col: 55, rowspan: 1, colspan: 2 },
        { row: 1, col: 57, rowspan: 1, colspan: 2 },
        { row: 1, col: 59, rowspan: 2, colspan: 1 },
        { row: 1, col: 60, rowspan: 2, colspan: 1 },
        { row: 1, col: 61, rowspan: 2, colspan: 1 },
        { row: 1, col: 62, rowspan: 2, colspan: 1 },
        { row: 1, col: 63, rowspan: 2, colspan: 1 },
        { row: 1, col: 64, rowspan: 2, colspan: 1 },
        { row: 1, col: 65, rowspan: 2, colspan: 1 },
        { row: 1, col: 66, rowspan: 2, colspan: 1 },
        { row: 1, col: 67, rowspan: 2, colspan: 1 },
        { row: 1, col: 68, rowspan: 2, colspan: 1 },
        { row: 1, col: 69, rowspan: 2, colspan: 1 },
        { row: 1, col: 70, rowspan: 2, colspan: 1 },
        { row: 1, col: 71, rowspan: 2, colspan: 1 },
        { row: 1, col: 72, rowspan: 2, colspan: 1 },
        { row: 1, col: 73, rowspan: 2, colspan: 1 },
        { row: 1, col: 74, rowspan: 2, colspan: 1 },
        { row: 1, col: 75, rowspan: 2, colspan: 1 },
        { row: 1, col: 76, rowspan: 2, colspan: 1 },
        { row: 1, col: 77, rowspan: 2, colspan: 1 },
        { row: 1, col: 78, rowspan: 2, colspan: 1 },
        { row: 1, col: 79, rowspan: 2, colspan: 1 },
        { row: 1, col: 80, rowspan: 2, colspan: 1 },
        { row: 1, col: 81, rowspan: 2, colspan: 1 },
        { row: 1, col: 82, rowspan: 2, colspan: 1 },
        { row: 1, col: 83, rowspan: 1, colspan: 4 },
        { row: 1, col: 87, rowspan: 1, colspan: 3 },
        { row: 1, col: 90, rowspan: 1, colspan: 6 },
        { row: 1, col: 96, rowspan: 1, colspan: 4 },
        { row: 1, col: 100, rowspan: 1, colspan: 4 },
        { row: 1, col: 104, rowspan: 1, colspan: 2 },
        { row: 1, col: 106, rowspan: 1, colspan: 10 },
        { row: 2, col: 93, rowspan: 1, colspan: 2 }
      ]
    },
    getCells () {
      // * row 0 lvl 1
      // * row 1 lvl 2
      // * row 2 lvl 3
      let arr = [
        { row: 0, col: 1, type: 'text' },
        { row: 0, col: 5, type: 'text' },
        { row: 0, col: 45, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 0, col: 47, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 0, col: 49, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 0, col: 51, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Gold' },
        { row: 0, col: 55, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Gold' },
        { row: 0, col: 60, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 0, col: 64, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 0, col: 69, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 0, col: 79, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 0, col: 81, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 0, col: 83, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 0, col: 100, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 0, col: 116, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 0, type: 'checkbox', readOnly: false, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 1, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 2, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 3, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 4, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 5, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 6, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 7, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 8, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 9, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 10, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 11, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 12, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-gray' },
        { row: 1, col: 13, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 14, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 15, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 16, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 17, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 18, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 19, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 20, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 21, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Azure' },
        { row: 1, col: 22, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-lightGreen' },
        { row: 1, col: 23, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 1, col: 27, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-LemonChiffon' },
        { row: 1, col: 32, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 1, col: 40, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Gold' },
        { row: 1, col: 42, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 1, col: 44, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 1, col: 45, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 1, col: 47, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Gold' },
        { row: 1, col: 49, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 51, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Gold' },
        { row: 1, col: 53, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 55, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-SteelBlue' },
        { row: 1, col: 57, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 1, col: 59, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 1, col: 60, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 1, col: 61, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-SteelBlue' },
        { row: 1, col: 62, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-SteelBlue' },
        { row: 1, col: 63, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-SteelBlue' },
        { row: 1, col: 64, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-SteelBlue' },
        // { row: 1, col: 64, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 65, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 66, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 67, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 68, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 69, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 70, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 71, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 72, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 73, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 74, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 75, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 76, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 77, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 78, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 79, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 80, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 81, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 82, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 83, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 85, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 87, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 90, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 96, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 99, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 100, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 104, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 1, col: 106, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 8, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 2, col: 9, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 2, col: 23, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 2, col: 24, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 2, col: 25, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 2, col: 26, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-purple' },
        { row: 2, col: 27, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-LemonChiffon' },
        { row: 2, col: 28, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-LemonChiffon' },
        { row: 2, col: 29, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-LemonChiffon' },
        { row: 2, col: 30, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-LemonChiffon' },
        { row: 2, col: 31, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-LemonChiffon' },
        { row: 2, col: 32, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 2, col: 33, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 2, col: 34, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 2, col: 35, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 2, col: 36, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 2, col: 37, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 2, col: 38, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 2, col: 39, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 2, col: 40, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 2, col: 41, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 2, col: 42, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        { row: 2, col: 43, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-blue' },
        // { row: 2, col: 40, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        // { row: 2, col: 41, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        // { row: 2, col: 42, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        // { row: 2, col: 43, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 2, col: 44, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-LemonChiffon' },
        { row: 2, col: 45, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Tomato' },
        { row: 2, col: 46, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Gold' },
        { row: 2, col: 47, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Gold' },
        { row: 2, col: 48, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 49, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 50, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Gold' },
        { row: 2, col: 51, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle htColor-Gold' },
        { row: 2, col: 52, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 53, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 54, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 55, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 56, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 57, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 58, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 83, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 84, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 85, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 86, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 87, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 88, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 89, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 90, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 91, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 92, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 93, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 94, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 95, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 96, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 97, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 98, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 99, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 100, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 101, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 102, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 103, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 104, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 105, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 106, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 107, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 108, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 109, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 110, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 111, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 112, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 113, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 114, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' },
        { row: 2, col: 115, type: 'text', readOnly: true, className: 'htHeader htCenter htMiddle' }
      ]
      if (this.obj && this.obj.length > 0 && (!this.dataSource || (this.dataSource && this.dataSource.length == 0))) {
        let setCheckBox = []
        for (let i = 0; i < this.obj.length; i++) {
          if (this.obj[i].promotionNo) {
            setCheckBox.push({ row: i + 3, col: 0, type: 'checkbox', readOnly: false })
          }
        }
        return [...arr, ...setCheckBox]
      }
      return arr
    },
    getColums () {
      return [
        { data: 'checkbox', width: 30, readOnly: true, className: 'htCenter htMiddle' },
        { data: 'icon', type: 'text', width: 35, readOnly: true, className: 'htCenter htMiddle', renderer: this.rendererTest },
        { data: 'promotionNo', type: 'text', width: 50, readOnly: true },
        { data: 'promotionName', type: 'text', width: 180 },
        { data: 'barcode', type: 'text', width: 100 },
        { data: 'articleCode', type: 'text', width: 100 },
        { data: 'articleName', type: 'text', width: 200, readOnly: true },
        { data: 'articleNameEn', type: 'text', width: 200, readOnly: true },
        { data: 'startDate', type: 'text', width: 75 },
        { data: 'endDate', type: 'text', width: 75 },
        { data: 'departmentCode', type: 'text', width: 50, readOnly: true, className: 'htCenter htMiddle' },
        { data: 'subDepartmentCode', type: 'text', width: 50, readOnly: true, className: 'htCenter htMiddle' },
        { data: 'theme', type: 'dropdown', source: this.themeList, width: 180 },
        { data: 'venderCode', type: 'text', width: 60, readOnly: true },
        { data: 'venderName', type: 'text', width: 120, readOnly: true },
        { data: 'packingSize', type: 'text', width: 60, readOnly: true, className: 'htCenter htMiddle' },
        { data: 'usePFMModule', type: 'text', width: 60, readOnly: true, className: 'htCenter htMiddle' },
        { data: 'image', type: 'text', readOnly: true },
        { data: 'articleTypeCode', type: 'dropdown', source: this.articleTypeList },
        { data: 'displayTypeCode', type: 'dropdown', source: this.displayTypeList },
        { data: 'signageTypeCode', type: 'dropdown', source: this.signageTypeList },
        { data: 'POGHyper', type: 'text', width: 60, readOnly: true, className: 'htCenter htMiddle' },
        { data: 'POGMarket', type: 'text', width: 60, readOnly: true, className: 'htCenter htMiddle' },
        { data: 'costNormal', type: 'text', readOnly: true, className: 'htRight' },
        { data: 'costPromotion', type: 'text' },
        { data: 'costStartDate', type: 'text' },
        { data: 'costEndDate', type: 'text' },
        { data: 'vatRate', type: 'text', readOnly: true, className: 'htCenter' },
        { data: 'normalPrice', type: 'text', readOnly: true, className: 'htRight' },
        { data: 'promotionPrice', type: 'text', className: 'htRight' },
        { data: 'avgPrice', type: 'text', readOnly: true, className: 'htRight' },
        { data: 'discount', type: 'text', readOnly: true, className: 'htRight' },
        { data: 'mixMatch', type: 'text' },
        { data: 'xUnit', type: 'text' },
        { data: 'xBaht', type: 'text' },
        { data: 'type', type: 'dropdown', source: this.mixMatchTypeList },
        { data: 'limitation', type: 'dropdown', source: this.limitationTypeList },
        { data: 'limitSet', type: 'text' },
        { data: 'condition', type: 'dropdown', source: this.mixMatchConditionList },
        { data: 'costDistribution', type: 'text' },
        { data: 'pointOperater', type: 'dropdown', source: [] },
        { data: 'extraPoint', type: 'text' },
        { data: 'pwp', type: 'text' },
        { data: 'remark', type: 'text' },
        { data: 'exitPlan', type: 'text' },
        { data: 'quantity1', type: 'text', readOnly: true },
        { data: 'amount1', type: 'text', readOnly: true },
        { data: 'quantity2', type: 'text', readOnly: true },
        { data: 'amount2', type: 'text', readOnly: true },
        { data: 'quantity3', type: 'text', readOnly: true },
        { data: 'amount3', type: 'text', readOnly: true },
        { data: 'quantity4', type: 'text' },
        { data: 'amount4', type: 'text', readOnly: true },
        { data: 'quantity5', type: 'text', readOnly: true },
        { data: 'amount5', type: 'text', readOnly: true },
        { data: 'quantity6', type: 'text' },
        { data: 'amount6', type: 'text', readOnly: true },
        { data: 'quantity7', type: 'text', readOnly: true },
        { data: 'amount7', type: 'text', readOnly: true },
        { data: 'compensateType', type: 'dropdown', source: [] },
        { data: 'compensateBaht', type: 'text' },
        { data: 'supplierCode', type: 'text' },
        { data: 'brandCode', type: 'text' },
        { data: 'acceptNo', type: 'text' },
        { data: 'compensateBahtSKU', type: 'text', className: 'htRight' },
        { data: 'compensateRCVBaht', type: 'text', className: 'htRight' },
        { data: 'compensate', type: 'text', className: 'htRight' },
        { data: 'CompensatePOStartDate', type: 'text' },
        { data: 'CompensatePOEndDate', type: 'text' },
        { data: 'mixMatchCompensateType', type: 'dropdown', source: [] },
        { data: 'mixMatchAcceptNo', type: 'text' },
        { data: 'supplierCode1', type: 'text' },
        { data: 'compensateBaht1', type: 'text' },
        { data: 'supplierCode2', type: 'text' },
        { data: 'compensateBaht2', type: 'text' },
        { data: 'promotionId', type: 'text' },
        { data: 'mixMatchPromotionName', type: 'text' },
        { data: 'mixMatchBarcode', type: 'text' },
        { data: 'description', type: 'text' },
        { data: 'mixMatchCompensateBaht', type: 'text' },
        { data: 'SKUSupplierCode', type: 'text' },
        { data: 'couponCompensateType', type: 'dropdown', source: [] },
        { data: 'couponValue', type: 'text' },
        { data: 'premiumPromotionName', type: 'text' },
        { data: 'productRule1', type: 'dropdown', source: [] },
        { data: 'premiumBrandCode1', type: 'text' },
        { data: 'premiumBrandName1', type: 'text' },
        { data: 'productRule2', type: 'dropdown', source: [] },
        { data: 'premiumBrandCode2', type: 'text' },
        { data: 'premiumBrandName2', type: 'text' },
        { data: 'customerType', type: 'dropdown', source: [] },
        { data: 'minimumEvery', type: 'dropdown', source: [] },
        { data: 'minimumPurchase', type: 'text' },
        { data: 'limitationRule', type: 'text' },
        { data: 'limitationRuleDropdown', type: 'dropdown', source: [] },
        { data: 'premiumValue', type: 'text' },
        { data: 'premiumCompensateType', type: 'dropdown', source: [] },
        { data: 'fixBahtPerUnit', type: 'text' },
        { data: 'bahtForTotalPeriod', type: 'text' },
        { data: 'SupplierToCompensate', type: 'text' },
        { data: 'amt', type: 'text', readOnly: true },
        { data: 'GPUnit', type: 'text', readOnly: true },
        { data: 'GPBaht', type: 'text', readOnly: true },
        { data: 'GPPercent', type: 'text', readOnly: true },
        { data: 'qty', type: 'text', readOnly: true },
        { data: 'amt2', type: 'text', readOnly: true },
        { data: 'costUnit', type: 'text', readOnly: true },
        { data: 'avgPriceGP', type: 'text', readOnly: true },
        { data: 'GPUnit2', type: 'text', readOnly: true },
        { data: 'GPAmtBefore', type: 'text', readOnly: true },
        { data: 'GPBefore', type: 'text', readOnly: true },
        { data: 'compensateBahtUnit', type: 'text', readOnly: true },
        { data: 'compensateLumsum', type: 'text', readOnly: true },
        { data: 'GPAmtAfter', type: 'text', readOnly: true },
        { data: 'GPPerAfter', type: 'text', readOnly: true },
        { data: 'diff', type: 'text', readOnly: true },
        { data: 'remarkBuyer', type: 'text' }
      ]
    },
    async getValue () {
      const handsonTable = this.$refs.handsonTable.hotInstance
      // let checkValue = true
      let dataSource = handsonTable.getSourceData()
      // dataSource.splice(0, 1)
      // dataSource.splice(0, 1)
      // dataSource.splice(0, 1)
      let barcodeList = []
      let articleList = []
      for (let i = 3; i < dataSource.length; i++) {
        if (!dataSource[i].barcode) {
          barcodeList.push('')
          // if ((i > 0) && !dataSource[i - 1].barcode) {
          //   break
          // } else if (i == 0) {
          //   checkValue = false
          //   break
          // } else {
          // barcodeList.push('')
          // }
        } else {
          barcodeList.push(dataSource[i].barcode)
        }
        if (!dataSource[i].articleCode) {
          articleList.push('')
        } else {
          articleList.push(dataSource[i].articleCode)
        }
      }
      // if (!checkValue) {
      //   this.toast('warning', 'กรุณาระบุ Article Code')
      //   return false
      // }
      // 8850017321740
      // 8856641014485

      // 8851217719542
      // 2000006592200
      this.dataSource = await this.$axios.$post('/api/promotion/findArtical', {
        campaignId: this.campaignId,
        barcodeList,
        articleList
      })
      for (let i = 3; i < this.dataSource.length; i++) {
        if (this.dataSource[i].saleTargetList && this.dataSource[i].saleTargetList.length > 0) {
          this.dataSource[i].quantity4 = this.dataSource[i].saleTargetList[0].quantity ? this.dataSource[i].saleTargetList[0].quantity : ''
          this.dataSource[i].amount4 = this.dataSource[i].saleTargetList[0].amount ? this.dataSource[i].saleTargetList[0].amount : ''
          this.dataSource[i].quantity5 = this.dataSource[i].saleTargetList[0].pfmQuantity ? this.dataSource[i].saleTargetList[0].pfmQuantity : ''
          this.dataSource[i].amount5 = this.dataSource[i].saleTargetList[0].pfmAmount ? this.dataSource[i].saleTargetList[0].pfmAmount : ''
          this.dataSource[i].quantity6 = this.dataSource[i].saleTargetList[1].quantity ? this.dataSource[i].saleTargetList[1].quantity : ''
          this.dataSource[i].amount6 = this.dataSource[i].saleTargetList[1].amount ? this.dataSource[i].saleTargetList[1].amount : ''
          this.dataSource[i].quantity7 = this.dataSource[i].saleTargetList[1].pfmQuantity ? this.dataSource[i].saleTargetList[1].pfmQuantity : ''
          this.dataSource[i].amount7 = this.dataSource[i].saleTargetList[1].pfmAmount ? this.dataSource[i].saleTargetList[1].pfmAmount : ''
        }
      }
      let arr = [...this.getData(), ...this.dataSource]
      handsonTable.updateSettings({
        cell: this.getCells(),
        data: arr
      })
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.dataSource[i].promotionNo) {
          handsonTable.setCellMeta(i + 3, 0, 'readOnly', false)
          handsonTable.setCellMeta(i + 3, 0, 'type', 'checkbox')
          handsonTable.setCellMeta(i + 3, 1, 'renderer', this.rendererTest)
          // handsonTable.getPlugin('Comments').setCommentAtCell(i + 3, 1, 'icon')
          // handsonTable.setDataAtCell(i + 3, 0, false)
          this.dataSource[i].checkbox = false
          this.dataSource[i].startDate = this.startDate
          this.dataSource[i].endDate = this.endDate
        }
      }
      // handsonTable.loadData()
    },
    rendererTest (instance, td, row, col, prop, value) {
      Handsontable.default.renderers.HtmlRenderer.apply(this, arguments)
      td.innerHTML = '<i class="las la-md la-star" />'
      return td
    },
    getValue1 () {
      let hot = this.$refs.handsonTable.hotInstance
      hot.scrollViewportTo(0, 0)
    },
    getValue2 () {
      let hot = this.$refs.handsonTable.hotInstance
      hot.scrollViewportTo(0, 40)
    },
    getValue3 () {
      let hot = this.$refs.handsonTable.hotInstance
      hot.scrollViewportTo(0, 54)
    },
    getValue4 () {
      let hot = this.$refs.handsonTable.hotInstance
      hot.scrollViewportTo(0, 78)
    },
    async addRow () {
      if (this.barcode) {
        const hot = this.$refs.handsonTable.hotInstance
        if (hot.getSelectedLast()[0] != undefined && hot.getSelectedLast()[0] > 2) {
          await hot.alter('insert_row', hot.getSelectedLast()[0], 1)
          // hot.setDataAtCell(hot.getSelectedLast()[0], 0, null)
          for (let i = 0; i < 112; i++) {
            hot.setCellMeta(hot.getSelectedLast()[0] - 1, i, 'readOnly', false)
          }
          hot.setDataAtCell(hot.getSelectedLast()[0] - 1, 8, this.barcode)
          this.barcode = undefined
          hot.selectCell(hot.getSelectedLast()[0] - 1, 8)
        }
      } else {
        this.toast('warning', 'กรุณาระบุ Article Code / Barcode')
      }
    }
  }
}
</script>
