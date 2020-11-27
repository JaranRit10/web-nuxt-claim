<template>
  <div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('claim-details', $event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          {{ $t('c.tab_detail', { tab: $t('claim') }) }}
        </div>
      </div>
      <b-collapse visible id="claim-details">
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('วันที่เกิดอุบัติเหตุ') }}</label>
              <b-form-input v-model="เกิดอุบัติเหตุ" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('activity_date') }}</label>
              <b-form-input v-model="activity_date" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('claim_created_date') }}</label>
              <b-form-input v-model="claim_created_date" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('วันที่ติดต่อนำรถเข้าซ่อม') }}</label>
              <b-form-input v-model="นำรถเขาซอม" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('วันที่นำรถมาซ่อม') }}</label>
              <b-form-input v-model="วนำรถมาซอม" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('repair_finish_date') }}</label>
              <b-form-input v-model="repair_finish_date" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('จำนวนวันที่คาดว่าจะซ่อมเสร็จ') }}</label>
              <b-form-input v-model="จำนวนวันทีคาดวาจะซอมเสรจ" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('carback_date') }}</label>
              <b-form-input v-model="carback_date" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('approve_times') }}</label>
              <b-form-input v-model="approve_times" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('policy_type') }}</label>
              <b-form-input v-model="policy_type" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('จำนวนเงินคุ้มครอง') }}</label>
              <b-form-input v-model="จำนวนเงินคุมครอง" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('คุณสมบัติของเคลม') }}</label>
              <b-form-input v-model="คุณสมบัติของเคลม" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('deduct_type') }}</label>
              <b-form-input v-model="deduct_type" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('deduct_amount') }}</label>
              <b-form-input v-model="deduct_amount" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('job_no') }}</label>
              <b-form-input v-model="job_no" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="mb-3">
            <b-col sm="3">
              <label>{{ $t('is_claim_counter') }}</label>
              <b-form-input v-model="claim_counter" disabled />
            </b-col>
            <b-col sm="3"></b-col>
            <b-col sm="3"></b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>

    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('car-info', $event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          Car Information
        </div>
        <!-- <div class="action"><i class="las la-md la-angle-down"></i></div> -->
      </div>
      <b-collapse visible id="car-info">
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('car_license_no') }}</label>
              <b-form-input v-model="car_license_no" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('car_accident_type') }}</label>
              <b-form-input v-model="car_accident_type" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('car_description') }}</label>
              <b-form-input v-model="car_description" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('car_brand') }}</label>
              <b-form-input v-model="car_brand" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('car_model') }}</label>
              <b-form-input v-model="car_model" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('car_kilo') }}</label>
              <b-form-input v-model="car_kilo" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('vehicle_type') }}</label>
              <b-form-input v-model="vehicle_type" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('car_type') }}</label>
              <b-form-input v-model="car_type" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('engine_size') }}</label>
              <b-form-input v-model="engine_size" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('car_year') }}</label>
              <b-form-input v-model="car_year" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('car_color') }}</label>
              <b-form-input v-model="car_color" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('color_type') }}</label>
              <b-form-input v-model="color_type" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('heavy_damage') }}</label>
              <b-form-input v-model="heavy_damage" disabled />
            </b-col>
            <b-col sm="3"></b-col>
            <b-col sm="3"></b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('driver-info', $event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          Driver Information
        </div>
        <!-- <div class="action"><i class="las la-md la-angle-down"></i></div> -->
      </div>
      <b-collapse visible id="driver-info">
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('driver_name') }}</label>
              <b-form-input v-model="driver_name" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('เลขที่บัตรประชาชนผู้ขับขี่') }}</label>
              <b-form-input v-model="เลขทีบัตรประชาชนผูขับขี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('เลขที่ใบขับขี่') }}</label>
              <b-form-input v-model="เลขทีใบขับขี" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('หมายเลขโทรศัพท์ผู้ขับขี่') }}</label>
              <b-form-input v-model="หมายเลขโทรศัพทผูขับขี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ความสัมพันธ์กับผู้เอาประกัน') }}</label>
              <b-form-input v-model="ความสัมพันธกับผูเอาประกัน" disabled />
            </b-col>
            <b-col sm="3"></b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('insured-info', $event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          Insured Information
        </div>
        <!-- <div class="action"><i class="las la-md la-angle-down"></i></div> -->
      </div>
      <b-collapse visible id="insured-info">
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('insured_name') }}</label>
              <b-form-input v-model="insured_name" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('เลขที่บัตรประชาชนผู้เอาประกัน') }}</label>
              <b-form-input v-model="เลขทีบัตรประชาชนผูเอาประกัน" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('สถานที่ออกบัตรผู้เอาประกัน') }}</label>
              <b-form-input v-model="สถานทีออกบัตรผูเอาประกัน" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('เลขที่ใบขับขี่ผู้เอาประกัน') }}</label>
              <b-form-input v-model="เลขทีใบขับขีผูเอาประกัน" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ประเภทใบขับขี่ผู้เอาประกัน') }}</label>
              <b-form-input v-model="ประเภทใบขับขีผูเอาประกัน" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('วันหมดอายุบัติผู้เอาประกัน') }}</label>
              <b-form-input v-model="วันหมดอายุบัติผูเอาประกัน" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ที่อยู่ผู้เอาประกันภัย') }}</label>
              <b-form-textarea v-model="ทีอยูผูเอาประกันภัย" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('อำเภอผู้เอาประกัน') }}</label>
              <b-form-input v-model="อำเภอผูเอาประกัน" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('จังหวัดผู้เอาประกัน') }}</label>
              <b-form-input v-model="จังหวัดผูเอาประกัน" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('รหัสไปรษณีย์ผู้เอาประกัน') }}</label>
              <b-form-input v-model="รหัสไปรษณียผูเอาประกัน" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('โทรศัพท์ผู้เอาประกัน') }}</label>
              <b-form-input v-model="โทรศัพทผูเอาประกัน" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('เบอร์มือถือผู้เอาประกัน') }}</label>
              <b-form-input v-model="เบอรมือถือผูเอาประกัน" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('อีเมลผู้เอาประกัน') }}</label>
              <b-form-input v-model="อีเมลผูเอาประกัน" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('แฟกซ์ผู้เอาประกัน') }}</label>
              <b-form-input v-model="แฟกซผูเอาประกัน" disabled />
            </b-col>
            <b-col sm="3"></b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('repair-info', $event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          Repair Information
        </div>
        <!-- <div class="action"><i class="las la-md la-angle-down"></i></div> -->
      </div>
      <b-collapse visible id="repair-info">
        <div class="card-body">
          <b-row class="form-group" align-h="around">
            <b-col sm="3">
              <label>{{ $t('repairer') }}</label>
              <b-form-input v-model="repairer" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('repairer_branch') }}</label>
              <b-form-input v-model="repairer_branch" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('originator') }}</label>
              <b-form-input v-model="originator" disabled />
            </b-col>
          </b-row>
          <b-row class="form-group" align-h="around">
            <b-col sm="3">
              <label>{{ $t('assign_name') }}</label>
              <b-form-input v-model="assign_name" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('repairer_get_name') }}</label>
              <b-form-input v-model="repairer_get_name" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('repirer_acknowledge_name') }}</label>
              <b-form-input v-model="repirer_acknowledge_name" disabled />
            </b-col>
          </b-row>
          <b-row class="form-group" align-h="around">
            <b-col sm="3">
              <label>{{ $t('ชื่อผู้นำรถมาซ่อม') }}</label>
              <b-form-input v-model="ชือผูนำรถมาซอม" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('relation_insured') }}</label>
              <b-form-input v-model="relation_insured" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('โทรศัพท์ผู้นำรถมาซ่อม') }}</label>
              <b-form-input v-model="โทรศัพทผูนำรถมาซอม" disabled />
            </b-col>
          </b-row>
          <b-row class="form-group" align-h="around">
            <b-col sm="3">
              <label>{{ $t('get_car_back_by') }}</label>
              <b-form-input v-model="get_car_back_by" disabled />
            </b-col>
            <b-col sm="3"></b-col>
            <b-col sm="3"></b-col>
          </b-row>
          <b-row class="form-group" align-h="around">
            <b-col sm="3">
              <label>{{ $t('มือถือผู้นำรถเข้าซ่อม') }}</label>
              <b-form-input v-model="มือถือผูนำรถเขาซอม" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('id_card_get_carback') }}</label>
              <b-form-input v-model="id_card_get_carback" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('หมายเลขโทรศัพท์ผู้รับรถกลับ') }}</label>
              <b-form-input v-model="หมายเลขโทรศัพทผูรับรถกลับ" disabled />
            </b-col>
          </b-row>
          <b-row class="form-group" align-h="around">
            <b-col sm="3">
              <label>{{ $t('หมายเลขโทรศัพท์มือถือผู้รับรถกลับ') }}</label>
              <b-form-input v-model="หมายเลขโทรศัพทมือถือผูรับรถกลับ" disabled />
            </b-col>
            <b-col sm="3"></b-col>
            <b-col sm="3"></b-col>
          </b-row>
          <b-row align-h="center" class="mt-2">
            <b-col sm="8">
              <a-table
                :id="$route.name+'/expense'"
                :paging="APP.paging"
                :columns="columnsExpense"
                :datasource="form"
                :isFilter="false"
                :isSort="false"
                :isPaging="false"
              >
                <template slot="tableAction"></template>
                <template slot="tableBody">
                  <tr v-for="(v, index) in datasource.data" :key="index">
                    <td class="text-left">{{ v.expense_details }}</td>
                    <td class="text-right">{{ v.repair_amount }}</td>
                  </tr>
                </template>
              </a-table>
            </b-col>
          </b-row>
          <b-row align-h="center" class="mt-2">
            <b-col sm="8">
              <a-table
                :id="$route.name+'/expense'"
                :paging="APP.paging"
                :columns="columnsImage"
                :datasource="form"
                :isFilter="false"
                :isSort="false"
                :isPaging="false"
              >
                <template slot="tableAction"></template>
                <template slot="tableBody">
                  <tr v-for="(v, index) in form" :key="index">
                    <td></td>
                    <td></td>
                  </tr>
                </template>
              </a-table>
            </b-col>
          </b-row>
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
      //  Claim Details
      เกิดอุบัติเหตุ: '08/09/2020',
      activity_date: '09/09/2020',
      claim_created_date: '10/09/2020',
      นำรถเขาซอม: '10/09/2020',
      วนำรถมาซอม: '11/09/2020',
      repair_finish_date: '20/09/2020',
      จำนวนวันทีคาดวาจะซอมเสรจ: '20/09/2020',
      carback_date: '22/09/2020',
      approve_times: '2',
      policy_type: 'ประเภทที่ 1',
      จำนวนเงินคุมครอง: '100,000.00',
      คุณสมบัติของเคลม: 'ความคุ้มครองความเสียหายต่อรถยนต์',
      deduct_type: '50,000.00',
      deduct_amount: '50,000.00',
      job_no: '-',
      claim_counter: '-',
      //  Car Information
      car_license_no: '1กพ 2560',
      car_accident_type: '-',
      car_description: ' ไฟท้ายแตก',
      car_brand: 'AUDI',
      car_model: 'Q5',
      car_kilo: '12,563',
      vehicle_type: 'SV',
      car_type: 'รย.1',
      engine_size: '2',
      car_year: '2018',
      car_color: 'ขาว',
      color_type: '-',
      heavy_damage: '1',
      //  Driver Information
      driver_name: 'สมชาย',
      เลขทีบัตรประชาชนผูขับขี: '1234456678996',
      เลขทีใบขับขี: '61230984',
      หมายเลขโทรศัพทผูขับขี: '091929123',
      ความสัมพันธกับผูเอาประกัน: 'บิดา',
      //  Insured Information
      insured_name: 'สมชาย',
      เลขทีบัตรประชาชนผูเอาประกัน: '1234456678996',
      สถานทีออกบัตรผูเอาประกัน: '',
      เลขทีใบขับขีผูเอาประกัน: '61230984',
      ประเภทใบขับขีผูเอาประกัน: '-',
      วันหมดอายุบัติผูเอาประกัน: '20/09/2020',
      ทีอยูผูเอาประกันภัย: '1234 ต.ในเมือง',
      อำเภอผูเอาประกัน: 'เมืองลำพูน',
      จังหวัดผูเอาประกัน: 'ลำพูน',
      รหัสไปรษณียผูเอาประกัน: '51000',
      โทรศัพทผูเอาประกัน: '0912345678',
      เบอรมือถือผูเอาประกัน: '0912345678',
      อีเมลผูเอาประกัน: '12345@hotmail.com',
      แฟกซผูเอาประกัน: '-',
      // Repair Information
      repairer: 'Claim เรซซิ่ง',
      repairer_branch: 'Claim เรซซิ่ง',
      originator: '-',
      assign_name: 'สมศัก',
      repairer_get_name: 'สมชาย',
      repirer_acknowledge_name: 'สมหญิง',
      ชือผูนำรถมาซอม: 'สมชาย',
      relation_insured: 'บิดา',
      โทรศัพทผูนำรถมาซอม: '0912345678',
      get_car_back_by: 'สมชาย',
      มือถือผูนำรถเขาซอม: '0912345678',
      id_card_get_carback: '1234456678996',
      หมายเลขโทรศัพทผูรับรถกลับ: '0912345678',
      หมายเลขโทรศัพทมือถือผูรับรถกลับ: '0912345678',
      datasource: {
        data: [
          {
            id: 1,
            expense_details: 'ส่วนลดค่าแรงจากบริษัทประกัน/Insurance Labor Discount',
            repair_amount: '500.00',
          },
          {
            id: 2,
            expense_details: 'ส่วนลดค่าแรงจากอู่/Repairer Labor Discount',
            repair_amount: '1200.00',
          },
          {
            id: 3,
            expense_details: 'ส่วนลดค่าอะไหล่จากบริษัทประกัน/Insurance Part Discount',
            repair_amount: '1500.00',
          },
          {
            id: 4,
            expense_details: 'ส่วนลดค่าอะไหล่จากอู่/Repairer Part Discount',
            repair_amount: '1500.00',
          },
          {
            id: 5,
            expense_details: 'ค่าแรงก่อน Vat/Labor Amont before Vat',
            repair_amount: '2000.00',
          },
          {
            id: 6,
            expense_details: 'ค่าอะไหล่ก่อน Vat/Part Amount Before Vat',
            repair_amount: '1200.00',
          },
          {
            id: 7,
            expense_details: 'ค่าใช้จ่ายอื่นก่อน Vat/ Other Amount Before Vat',
            repair_amount: '1500.00',
          },
        ],
      }
    }
  },
  computed: {
    columnsExpense () {
      const col = [
        { label: this.$t('expense_details'), field: 'expense_details', style: { width: '500px' }},
        { label: this.$t('repair_amount'), field: 'repair_amount', style: { width: '100px' }}
      ]
      return col
    },
    columnsImage () {
      const col = [
        { label: this.$t('get_car_img'), field: '', style: { width: '500px' }},
        { label: this.$t('c.action'), sortable: false, filterable: false, style: { width: '100px' }}
      ]
      return col
    },
  },
}
</script>