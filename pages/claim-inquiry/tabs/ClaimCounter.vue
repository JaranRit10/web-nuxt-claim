<template>
  <div>
    <b-row align-h="around">
      <b-col sm="11">
        <a-table
          :id="$route.name+'/claim-counter'"
          :paging="paging"
          :columns="columnsClaimCounter"
          :datasource="form"
          :isFilter="false"
          :isSort="false"
          :isPaging="false"
        >
          <template slot="tableAction"></template>
          <template slot="tableBody">
            <tr v-for="(v, index) in form.claimCounterList" :key="index">
              <td class="text-center">{{ v.seq }}</td>
              <td>{{ v.claimCounterType }}</td>
              <td>{{ v.insuredName }}</td>
              <td>{{ v.col4 }}</td>
              <td>{{ v.col5 }}</td>
              <td>{{ v.col6 }}</td>
              <td>{{ v.col7 }}</td>
              <td>{{ v.col8 }}</td>
              <td>{{ v.col9 }}</td>
              <td>
                <div class="btn-action-gl">
                  <button class="btn btn-sm btn-info" @click="modalShow = !modalShow" v-b-tooltip:page.bottom.hover="$t('c.view')">
                    <i class="las la-md la-eye"></i>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </a-table>
      </b-col>
    </b-row>
    <b-modal
      v-model="modalShow"
      size="lg"
      id="modalDetail"
      :ok-disabled="true"
      :no-close-on-backdrop="true"
    >
      <template #modal-title>
        <i class="las la-info-circle"></i> {{ $t('c.info') }}
      </template>
      <div class="card">
        <div class="card-header" style="background-color: rgba(108,117,125,.77);">
          <div class="title text-light">
            {{ $t('c.tab_detail', { tab: $t('claim_counter') }) }}
          </div>
        </div>
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('c.seq') }}</label>
              <b-form-input v-model="form.seq" disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ประเภทเคลมเคาน์เตอร์') }}</label>
              <treeselect v-model="form.claimCounterTypeId" :options="claimCounterType" disabled />
            </b-col>
            <b-col sm="3"></b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('insured_name') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('โทรศัพท์ผู้เอาประกัน') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3"></b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ชื่อผู้ติดต่อ') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('โทรศัพท์ผู้ติดต่อ') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ผู้ติดต่อเป็นผู้รับมอบอำนาจ') }}</label>
              <b-form-input disabled />
            </b-col>
          </b-row>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-header" style="background-color: rgba(108,117,125,.77);">
          <div class="title text-light">
            {{ $t('c.tab_detail', { tab: $t('payment') }) }}
          </div>
        </div>
        <div class="card-body">
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ยอดเงินรวม') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('วิธีการจ่ายเงิน') }}</label>
              <treeselect disabled />
            </b-col>
            <b-col sm="3"></b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('เลขที่บัญชีธนาคารรับเงิน') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ธนาคารรับเงิน') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ชื่อบัญชีธนาคารรับเงิน') }}</label>
              <b-form-input disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('สั่งจ่ายเช็คในนาม') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('วันที่นัดรับเช็ค') }}</label>
              <a-form-datepicker disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ชื่อเพื่อติดต่อรับเงิน') }}</label>
              <b-form-input disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ชื่อผู้ติดต่อรับเงิน') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('เลขบัตรประชาชนผู้รับเงิน') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('ชื่อทำจ่าย') }}</label>
              <b-form-input disabled />
            </b-col>
          </b-row>
          <b-row align-h="around" class="form-group">
            <b-col sm="3">
              <label>{{ $t('ชื่อผู้รับเงิน') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('โทรศัพท์ผู้รับเงิน') }}</label>
              <b-form-input disabled />
            </b-col>
            <b-col sm="3">
              <label>{{ $t('สถานที่ติดต่อผู้รับเงิน') }}</label>
              <b-form-input disabled />
            </b-col>
          </b-row>
          <div class="card mt-3" id="moreDetails">
            <div class="card-header">
              <div class="tab" :class="{ 'active' : tabDetail == 1 }" @click="tabDetail = 1">{{ $t('asset_details') }}</div>
              <div class="tab" :class="{ 'active' : tabDetail == 2 }" @click="tabDetail = 2">รายละเอียดผู้บาดเจ็บ</div>
            </div>
            <div class="card-body">
              <div v-if="tabDetail == 1">
                <b-row align-h="around" class="form-group">
                  <b-col sm="3">
                    <label>{{ $t('ประเภททรัพย์สิน') }}</label>
                    <b-form-input v-model="form.field1" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('ชื่อเจ้าของทรัพย์สิน') }}</label>
                    <b-form-input v-model="form.field2" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('โทรศัพท์เจ้าของทรัพย์สิน') }}</label>
                    <b-form-input v-model="form.field3" disabled />
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col sm="7">
                    <label>{{ $t('ที่อยู่เจ้าของทรัพย์สิน') }}</label>
                    <b-form-textarea v-model="form.field4" disabled />
                  </b-col>
                  <b-col sm="3"></b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col sm="3">
                    <label>{{ $t('ตรวจสภาพหลังซ่อม') }}</label>
                    <b-form-input v-model="form.field5" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('วันที่ตรวจสภาพรถ') }}</label>
                    <b-form-input v-model="form.field6" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('ชื่อผู้ตรวจสภาพรถ') }}</label>
                    <b-form-input v-model="form.field7" disabled />
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col sm="7">
                    <label>{{ $t('รายละเอียดความเสียหาย') }}</label>
                    <b-form-textarea v-model="form.field8" disabled />
                  </b-col>
                  <b-col sm="3"></b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col sm="7">
                    <label>{{ $t('รายละเอียดความเสียหาย') }}</label>
                    <b-form-textarea v-model="form.field9" disabled />
                  </b-col>
                  <b-col sm="3"></b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col sm="3">
                    <label>{{ $t('ที่อยู่อู่/ศูนย์/สถานที่จัดส่งอะไหล่') }}</label>
                    <b-form-input v-model="form.field10" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('โทรศัพท์อู่/ศูนย์') }}</label>
                    <b-form-input v-model="form.field11" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('ตรวจสอบคืนซากอะไหล่') }}</label>
                    <b-form-input v-model="form.field12" disabled />
                  </b-col>
                </b-row>
              </div>
              <div v-else>
                <b-row align-h="around" class="form-group">
                  <b-col sm="3">
                    <label>{{ $t('ชื่อผู้บาดเจ็บ') }}</label>
                    <b-form-input v-model="form.field13" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('เลขที่บัตรประชาชนผู้บาดเจ็บ') }}</label>
                    <b-form-input v-model="form.field14" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('โทรศัพท์ผู้บาดเจ็บ') }}</label>
                    <b-form-input v-model="form.field15" disabled />
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col sm="3">
                    <label>{{ $t('อายุผู้บาดเจ็บ') }}</label>
                    <b-form-input v-model="form.field16" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('สถานที่เข้ารับการรักษา') }}</label>
                    <b-form-input v-model="form.field17" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('ระยะเวลาที่ใช้ในการรักษา') }}</label>
                    <b-form-input v-model="form.field18" disabled />
                  </b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col sm="3">
                    <label>{{ $t('วันที่เริ่มรักษา') }}</label>
                    <a-form-datepicker v-model="form.field19" disabled />
                  </b-col>
                  <b-col sm="3">
                    <label>{{ $t('วันที่สิ้นสุดการรักษา') }}</label>
                    <a-form-datepicker v-model="form.field20" disabled />
                  </b-col>
                  <b-col sm="3"></b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col sm="7">
                    <label>{{ $t('ที่อยู่ผู้บาดเจ็บ') }}</label>
                    <b-form-textarea v-model="form.field21" disabled />
                  </b-col>
                  <b-col sm="3"></b-col>
                </b-row>
                <b-row align-h="around" class="form-group">
                  <b-col sm="7">
                    <label>{{ $t('รายละเอียดการรักษา') }}</label>
                    <b-form-textarea v-model="form.field22" disabled />
                  </b-col>
                  <b-col sm="3"></b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #modal-footer="{ close }">
        <b-button size="md" @click="close()">
          {{ $t('c.close') }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  mixins: [CommonMixin],
  data () {
    return {
      form: {},
      datasource: {},
      claimCounterType: [],
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      modalShow: false,
      tabDetail: 1
    }
  },
  computed: {
    columnsClaimCounter () {
      const col = [
        { label: this.$t('c.seq'), field: '', style: { width: '100px' }},
        { label: this.$t('ประเภทเคลมเคาน์เตอร์'), field: '', style: { minWidth: '130px' }},
        { label: this.$t('insured_name'), field: '', style: { width: '100px' }},
        { label: this.$t('ชื่อผู้ติดต่อ'), field: '', style: { width: '100px' }},
        { label: this.$t('ชื่อผู้บาดเจ็บ'), field: '', style: { width: '100px' }},
        { label: this.$t('ประเภททรัพย์สิน'), field: '', style: { width: '100px' }},
        { label: this.$t('lo_name'), field: '', style: { minWidth: '125px' }},
        { label: this.$t('วิธีการจ่ายเงิน'), field: '', style: { width: '100px' }},
        { label: this.$t('ยอดเงินรวม'), field: '', style: { width: '100px' }},
        { label: this.$t('c.action'), field: '', style: { minWidth: '75px' }},
      ]
      return col
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      this.form = {
        claimCounterList: [
          { seq: 1, claimCounterType: '-', insuredName: '-', col4: '-', col5: '-', col6: '-', col7: '-', col8: 'โอนชำระ', col9: '3400' },
          { seq: 2, claimCounterType: '-', insuredName: '-', col4: '-', col5: '-', col6: '-', col7: '-', col8: 'เงืนสด', col9: '5600' }
        ]
      }
      this.claimCounterType = [
        { id: 1, label: '-' }
      ]
      this.datasource = {
        data: [
          {
            seq: 1,
            claimCounterType: 'ประเภทเคลมเคาน์เตอร์',
            insuredName: 'ชื่อผู้เอาประกัน',
            col1: 'ประเภททรัพย์สิน',
            col2: 'col4',
            col3: 'col5',
            col4: 'col4',
            col5: 'col5',
            col6: 'col6',
            col7: 'col7',
            col8: 'col8',
            col9: 'col9',
            col10: 'col10',
            col11: 'col11',
            col12: 'col12',
            col13: 'ชื่อผู้บาดเจ็บ',
            col14: 'col14',
            col15: 'col15',
            col16: 'col16',
            col17: 'สถานที่เข้ารับการรักษา',
            col18: 'col18',
            col19: '11/11/2020',
            col20: '3/12/2020',
            col21: 'col21',
            col22: 'col22',
          },
          {
            seq: 2,
            claimCounterType: 'ประเภทเคลมเคาน์เตอร์',
            insuredName: 'ชื่อผู้เอาประกัน',
            col1: 'ประเภททรัพย์สิน',
            col2: 'col4',
            col3: 'col5',
            col4: 'col4',
            col5: 'col5',
            col6: 'col6',
            col7: 'col7',
            col8: 'col8',
            col9: 'col9',
            col10: 'col10',
            col11: 'col11',
            col12: 'col12',
            col13: 'ชื่อผู้บาดเจ็บ',
            col14: 'col14',
            col15: 'col15',
            col16: 'col16',
            col17: 'สถานที่เข้ารับการรักษา',
            col18: 'col18',
            col19: '12/11/2020',
            col20: '2/12/2020',
            col21: 'col21',
            col22: 'col22',
          },
          {
            seq: 3,
            claimCounterType: 'ประเภทเคลมเคาน์เตอร์',
            insuredName: 'ชื่อผู้เอาประกัน',
            col1: 'ประเภททรัพย์สิน',
            col2: 'col4',
            col3: 'col5',
            col4: 'col4',
            col5: 'col5',
            col6: 'col6',
            col7: 'col7',
            col8: 'col8',
            col9: 'col9',
            col10: 'col10',
            col11: 'col11',
            col12: 'col12',
            col13: 'ชื่อผู้บาดเจ็บ',
            col14: 'col14',
            col15: 'col15',
            col16: 'col16',
            col17: 'สถานที่เข้ารับการรักษา',
            col18: 'col18',
            col19: '13/11/2020',
            col20: '1/12/2020',
            col21: 'col21',
            col22: 'col22',
          }
        ]
      }
    }
  },
}
</script>
<style>
  .cursor {
    cursor: pointer;
  }
  #modalDetail .modal-footer {
    padding: 0.3rem;
  }

  #moreDetails {
    margin: 0;
    box-shadow: none;
    border-radius: 0;
  }

  #moreDetails .card-header {
    padding: 0;
    background-color: transparent;
  }

  #moreDetails .card-header .tab, #moreDetails .card-header .tab + .tab {
    font-weight: 500;
    background-color: #c3d5fe;
    margin: 0;
    color: #002f57;
  }

  #moreDetails .card-header .tab.active {
    color: white;
    background-color: #002f57;
    border: 0;
    box-shadow: none;
    border-radius: 0;
  }
</style>