<template>
  <div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('accident-details', $event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          {{ $t('c.tab_detail', { tab: $t('accident') }) }}
        </div>
      </div>
      <b-collapse visible id="accident-details">
        <div class="card-body">
          <div v-for="(obj, index) in form.accidentList" :key="index">
            <b-row align-h="around" class="form-group">
              <b-col sm="3">
                <label>{{ $t('รหัสภัยยานยนต์') }}</label>
                <b-form-input v-model="obj.moterDisasterCode" disabled />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('จังหวัดที่เกิดเหตุ') }}</label>
                <treeselect v-model="obj.incidentProvinceId" :options="incidentProvinceList" disabled />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('เขตอำเภอที่เกิดเหตุ') }}</label>
                <treeselect v-model="obj.incidentDistrictId" :options="incidentDistrictList" disabled />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="7">
                <label>{{ $t('สถานที่เกิดเหตุ') }}</label>
                <b-form-textarea v-model="obj.scene" disabled />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('เวลาที่เกิดเหตุ') }}</label>
                <b-form-input v-model="obj.incidentTime" disabled />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="7">
                <label>{{ $t('ลักษณะการเกิดอุบัติเหตุ') }}</label>
                <b-form-textarea v-model="obj.natureAccident" disabled />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('เอกสารอ้างอิง') }}</label>
                <b-form-input v-model="obj.referDoc" disabled />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="7">
                <label>{{ $t('รายการค่าซ่อม') }}</label>
                <b-form-textarea v-model="obj.repairPriceList" disabled />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('ประมาณค่าซ่อม') }}</label>
                <b-form-input v-model="obj.estimateRepairCost" disabled />
              </b-col>
            </b-row>
            <b-row align-h="around" class="form-group">
              <b-col sm="7">
                <label>{{ $t('รายการค่าอะไหล่') }}</label>
                <b-form-textarea v-model="obj.loSpareParts" disabled />
              </b-col>
              <b-col sm="3">
                <label>{{ $t('ประมาณค่าอะไหล่') }}</label>
                <b-form-input v-model="obj.eCostofSpareParts" disabled />
              </b-col>
            </b-row>
          </div>
        </div>
      </b-collapse>
    </div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('car-get-claim',$event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          {{ $t('รถเอาประกัน') }}
        </div>
        <!-- <div class="action"><i class="las la-md la-angle-down"></i></div> -->
      </div>
      <b-collapse visible id="car-get-claim">
        <div class="card-body" v-for="(obj, index) in form.insuredCarList" :key="index">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('เลขอ้างอิงกรมธรรม์') }}</label>
              <b-form-input v-model="obj.policyNo" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('วันที่เริ่มคุ้มครอง') }}</label>
              <a-form-datepicker v-model="obj.effectDateFrom" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('วันที่สิ้นสุดคุ้มครอง') }}</label>
              <a-form-datepicker v-model="obj.effectDateTo" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('vehicle_registration') }}</label>
              <b-form-input v-model="obj.vehicleRegistration" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ปีจดทะเบียน') }}</label>
              <b-form-input v-model="obj.registerYear" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ประเภทจดทะเบียนรถ') }}</label>
              <b-form-input v-model="obj.registerCarType" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ยี่ห้อ') }}</label>
              <b-form-input v-model="obj.brand" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('รุ่น') }}</label>
              <b-form-input v-model="obj.generation" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ประเภทเกียร์') }}</label>
              <b-form-input v-model="obj.gearType" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('liability_type') }}</label>
              <b-form-input v-model="obj.liabilityType" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('จำนวนผู้ขับขี่ตามกรมธรรม์') }}</label>
              <b-form-input v-model="obj.numberDriverPolicy" disabled />
            </b-col>
            <b-col sm="3">
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('driver_name') }}</label>
              <b-form-input v-model="obj.driverName" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('เลขที่ใบขับขี่') }}</label>
              <b-form-input v-model="obj.carLicenseNo" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ประเภทใบขับขี่') }}</label>
              <b-form-input v-model="obj.drivingLicense" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('สถานที่ออกบัตร') }}</label>
              <b-form-input v-model="obj.สถานที่ออกบัตร" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('วันเดือนปีเกิดผู้ขับขี่') }}</label>
              <a-form-datepicker v-model="obj.วันเดือนปีเกิดผู้ขับขี่" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('อายุผู้ขับขี่') }}</label>
              <b-form-input v-model="obj.อายุผู้ขับขี่" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="7">
              <label>{{ $t('ที่อยู่ผู้ขับขี่') }}</label>
              <b-form-textarea v-model="obj.ที่อยู่ผู้ขับขี่" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ความสัมพันธ์กับผู้เอาประกัน') }}</label>
              <b-form-input v-model="obj.ความสัมพันธ์กับผู้เอาประกัน" disabled />
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <div class="card">
      <div class="card-header" style="background-color: rgba(108,117,125,.77);" @click="toggleCollapse('car-parties',$event)">
        <div class="title text-light">
          <i class="las la-md la-angle-down"></i>
          {{ $t('รถคู่กรณี') }}
        </div>
        <!-- <div class="action"><i class="las la-md la-angle-down"></i></div> -->
      </div>
      <b-collapse visible id="car-parties">
        <div class="card-body" v-for="(obj, index) in form.carPartiesList" :key="index">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('เลขกรมธรรม์รถคู่กรณี') }}</label>
              <b-form-input v-model="obj.เลขกรมธรรม์รถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('บริษัทประกันรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.บริษัทประกันรถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ประเภทกรมธรรม์รถคู่กรณี') }}</label>
              <b-form-input v-model="obj.ประเภทกรมธรรม์รถคู่กรณี" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('เลขที่รับแจ้งรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.เลขที่รับแจ้งรถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('เลขที่เคลมรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.เลขที่เคลมรถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('used_type') }}</label>
              <b-form-input v-model="obj.usedType" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ชื่อเจ้าของรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.ชื่อเจ้าของรถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ทะเบียนรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.ทะเบียนรถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('จังหวัดรถคู่กรณี') }}</label>
              <treeselect v-model="obj.จังหวัดรถคู่กรณี" :options="provincialPartiesList" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ยี่ห้อรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.ยี่ห้อรถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('รุ่นรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.รุ่นรถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('สีรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.สีรถคู่กรณี" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ชื่อผู้ขับขี่รถคู่กรณี') }}</label>
              <b-form-input v-model="obj.ชื่อผู้ขับขี่รถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('บัตรประจำตัวประชาชนรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.บัตรประจำตัวประชาชนรถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ความสัมพันธ์กับเจ้าของรถคู่กรณี') }}</label>
              <b-form-input v-model="obj.ความสัมพันธ์กับเจ้าของรถคู่กรณี" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('เกิดผู้ขับขี่รถคู่กรณี') }}</label>
              <a-form-datepicker v-model="obj.เกิดผู้ขับขี่รถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('อายุผู้ขับขี่รถคู่กรณี') }}</label>
              <b-form-input v-model="obj.อายุผู้ขับขี่รถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('เพศผู้ขับขี่รถคู่กรณี') }}</label>
              <b-form-input v-model="obj.เพศผู้ขับขี่รถคู่กรณี" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('เลขที่ใบขับขี่รถคู่กรณี') }}</label>
              <b-form-input v-model="obj.เลขที่ใบขับขี่รถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('วันที่ออกบัตรผู้ขับขี่รถคู่กรณี') }}</label>
              <a-form-datepicker v-model="obj.วันที่ออกบัตรผู้ขับขี่รถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('สถานที่ออกบัตรผู้ขับขี่รถคู่กรณี') }}</label>
              <b-form-input v-model="obj.สถานที่ออกบัตรผู้ขับขี่รถคู่กรณี" disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ประเภทใบขับขี่รถคู่กรณี') }}</label>
              <b-form-input v-model="obj.ประเภทใบขับขี่รถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('เบอร์โทรผู้ขับขี่รถคู่กรณี') }}</label>
              <b-form-input v-model="obj.เบอร์โทรผู้ขับขี่รถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3"></b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="7">
              <label>{{ $t('ที่อยู่ผู้ขับขี่รถคู่กรณี') }}</label>
              <b-form-textarea v-model="obj.ที่อยู่ผู้ขับขี่รถคู่กรณี" disabled />
            </b-col>
            <b-col sm="3"></b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
  </div>
</template>
<script>
import CommonMixin from '~/assets/js/CommonMixin'
import App from '~/assets/js/Constant'
export default {
  mixins: [CommonMixin],
  data () {
    return {
      APP: App,
      form: {},
      incidentProvinceList: [],
      incidentDistrictList: [],
      provincialPartiesList: [],
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      this.form = {
        accidentList: [{
          moterDisasterCode: '110',
          incidentProvinceId: 1,
          incidentDistrictId: 1,
          scene: 'บริเวณหน้าอาคารไทยสมุทร',
          incidentTime: '10:06',
          natureAccident: 'เฉี่ยวชนด้านข้าง',
          referDoc: '-',
          repairPriceList: 'กระจกมองข้าง ขวา, ประตูหน้า ขวา, กันชนหน้า, ประตูหลัง ขวา',
          estimateRepairCost: 6200,
          loSpareParts: 'กระจกมองข้าง ขวา',
          eCostofSpareParts: 2500,
        }],
        insuredCarList: [{
          policyNo: '-',
          effectDateFrom: '10/11/2020',
          effectDateTo: '20/11/2020',
          vehicleRegistration: '-',
          carLicenseNo: '-',
          registerYear: '-',
          registerCarType: '-',
          brand: 'Toyota',
          generation: '-',
          gearType: '-',
          liabilityType: '-',
          numberDriverPolicy: '-',
          driverName: 'จตุณรงค์ จิตใจดี',
          drivingLicense: '-',
          สถานที่ออกบัตร: '-',
          วันเดือนปีเกิดผู้ขับขี่: '-',
          อายุผู้ขับขี่: '-',
          ที่อยู่ผู้ขับขี่: '-',
          ความสัมพันธ์กับผู้เอาประกัน: '-',
        }],
        carPartiesList: [{
          เลขกรมธรรม์รถคู่กรณี: '-',
          บริษัทประกันรถคู่กรณี: '-',
          ประเภทกรมธรรม์รถคู่กรณี: '-',
          เลขที่รับแจ้งรถคู่กรณี: '-',
          เลขที่เคลมรถคู่กรณี: '-',
          usedType: '-',
          ชื่อเจ้าของรถคู่กรณี: '-',
          ทะเบียนรถคู่กรณี: '-',
          จังหวัดรถคู่กรณี: 1,
          ยี่ห้อรถคู่กรณี: '-',
          รุ่นรถคู่กรณี: '-',
          สีรถคู่กรณี: '-',
          ชื่อผู้ขับขี่รถคู่กรณี: '-',
          บัตรประจำตัวประชาชนรถคู่กรณี: '-',
          ความสัมพันธ์กับเจ้าของรถคู่กรณี: '-',
          เกิดผู้ขับขี่รถคู่กรณี: '-',
          อายุผู้ขับขี่รถคู่กรณี: '-',
          เพศผู้ขับขี่รถคู่กรณี: '-',
          เลขที่ใบขับขี่รถคู่กรณี: '-',
          วันที่ออกบัตรผู้ขับขี่รถคู่กรณี: '-',
          สถานที่ออกบัตรผู้ขับขี่รถคู่กรณี: '-',
          ประเภทใบขับขี่รถคู่กรณี: '-',
          เบอร์โทรผู้ขับขี่รถคู่กรณี: '-',
          ที่อยู่ผู้ขับขี่รถคู่กรณี: '-',
        }]
      }
      this.incidentProvinceList = [
        {
          id: 1,
          label: 'กรุงเทพมหานคร'
        }
      ]
      this.incidentDistrictList = [
        {
          id: 1,
          label: 'บางรัก'
        }
      ]

      this.provincialPartiesList = [
        {
          id: 1,
          label: 'ชลบุรี'
        }
      ]
    }
  },
}
</script>