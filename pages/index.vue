<template>
  <div>
    <div class="page__header">
      <div class="page__title">
        <h1>Claim Summary</h1>
      </div>
      <div class="page__breadcrumb">
        <i class="las la-md la-home"></i> {{ $t('c.home') }}
      </div>
    </div>
    <div id="card">
      <b-row align-h="around">
        <b-col xl="2">
          <div class="card">
            <div class="card-body">
              <b-row>
                <b-col sm="0.1" style="margin-top: -0.5rem; margin-bottom: -0.5rem;">
                  <div class="progress">
                    <div id="claimOpen" class="tabValue"></div>
                  </div>
                </b-col>
                <b-col>
                  <div class="details">
                    <span>{{ form.claimOpen }}</span>
                  </div>
                  <i class="las la-folder-open"></i>
                  <span>{{ $t('claim_open') }}</span>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
        <b-col xl="2">
          <div class="card">
            <div class="card-body">
              <b-row>
                <b-col sm="0.1" style="margin-top: -0.5rem; margin-bottom: -0.5rem;">
                  <div class="progress">
                    <div id="claimRegister" class="tabValue"></div>
                  </div>
                </b-col>
                <b-col>
                  <div class="details">
                    <span>{{ form.claimRegister }}</span>
                  </div>
                  <i class="las la-folder-plus"></i>
                  <span>{{ $t('claim_register') }}</span>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
        <b-col xl="2">
          <div class="card">
            <div class="card-body">
              <b-row>
                <b-col sm="0.1" style="margin-top: -0.5rem; margin-bottom: -0.5rem;">
                  <div class="progress" style="background-color: #EDA4F !important;">
                    <div id="claimRepair" class="tabValue"></div>
                  </div>
                </b-col>
                <b-col>
                  <div class="details">
                    <span>{{ form.claimRepair }}</span>
                  </div>
                  <i class="las la-tools"></i>
                  <span>{{ $t('claim_repair') }}</span>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
        <b-col xl="2">
          <div class="card">
            <div class="card-body">
              <b-row>
                <b-col sm="0.1" style="margin-top: -0.5rem; margin-bottom: -0.5rem;">
                  <div class="progress" style="background-color: #FF66CC	 !important;">
                    <div id="claimBilling" class="tabValue"></div>
                  </div>
                </b-col>
                <b-col>
                  <div class="details">
                    <span>{{ form.claimBilling }}</span>
                  </div>
                  <i class="las la-file-invoice-dollar"></i>
                  <span>{{ $t('claim_billing') }}</span>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
        <b-col xl="2">
          <div class="card">
            <div class="card-body">
              <b-row>
                <b-col sm="0.1" style="margin-top: -0.5rem; margin-bottom: -0.5rem;">
                  <div class="progress" style="background-color: #EDA4F !important;">
                    <div id="claimCancel" class="tabValue"></div>
                  </div>
                </b-col>
                <b-col>
                  <div class="details">
                    <span>{{ form.claimCancel }}</span>
                  </div>
                  <i class="las la-folder-minus"></i>
                  <span>{{ $t('claim_cancel') }}</span>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col>
        <!-- <div class="card">
          <div class="card-body">
            <b-row class="mb-4">
              <b-col sm="2">
                <label>Select...</label>
                <treeselect
                  v-model="typeId" :options="typeList" @input="notChangeType(typeId)" @select="changeType(typeId, $event)"
                />
              </b-col>
              <b-col align-self="end">
                <div class="float-right">
                  <button class="btn btn-default ml-2" @click="changeView('bar')"><i class="las la-md la-chart-bar"></i></button>
                  <button class="btn btn-default ml-2" @click="changeView('pie')"><i class="las la-md la-chart-pie"></i></button>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col v-if="view == 'bar'">
                <horizontal-bar-chart :chart-data="datacollection" :options="options" style="height: 370px;"></horizontal-bar-chart>
              </b-col>
              <b-col v-if="view == 'pie'">
                <doughnut-chart :chart-data="datacollection" :options="options" style="max-width: 50%; margin-left: auto; margin-right: auto;"></doughnut-chart>
              </b-col>
            </b-row>
            <b-col>
              <button class="btn"><i class="las la-table"></i></button>
            </b-col>
          </div>
        </div> -->
        <!-- <a-table
          :id="$route.name"
          :paging="paging"
          :columns="columns"
          :datasource="form"
          :isSort="false"
          :isFilter="false"
          :isPaging="false"
        >
          <template slot="tableBody">
            <tr v-for="(v, index) in form.dataList" :key="index">
              <td>{{ v.claimNotiNo }}</td>
              <td>{{ v.claimNo }}</td>
              <td>{{ v.policyType }}</td>
              <td>{{ v.insuredName }}</td>
              <td>{{ v.notiDate }}</td>
              <td>{{ v.status }}</td>
            </tr>
          </template>
        </a-table> -->
      </b-col>
      <b-col sm="4"></b-col>
    </b-row>
  </div>
</template>

<script>
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  mixins: [CommonMixin],
  data () {
    return {
      datacollection: {},
      // options: {
      //   scales: {
      //     yAxes: [{
      //       ticks: {
      //         beginAtZero: true
      //       },
      //       gridLines: {
      //         display: false
      //       }
      //     }],
      //     xAxes: [{
      //       ticks: {
      //         beginAtZero: true
      //       },
      //       gridLines: {
      //         display: true
      //       }
      //     }]
      //   },
      //   legend: {
      //     display: false
      //   },
      //   responsive: true,
      //   maintainAspectRatio: false
      // },
      paging: {
        sortBy: [],
        limit: 10,
        pageNumber: 1
      },
      view: 'bar',
      typeId: 1,
      typeList: [
        { id: 1, label: 'Daily' },
        { id: 2, label: 'Weekly' },
        { id: 3, label: 'Monthly' }
      ],
      form: {
        claimOpen: 204,
        claimRegister: 177,
        claimRepair: 102,
        claimBilling: 98,
        claimCancel: 79,
        dataList: [
          { claimNotiNo: 'A2020082500006', claimNo: 'A202009080011', policyType: 'ประเภทที่ 1', insuredName: '	สมศัก', notiDate: '10/09/2020', status: 'รอยืนยันกรมธรรม์' },
          { claimNotiNo: 'A2020082500009', claimNo: 'A202009080014', policyType: 'ประเภทที่ 1', insuredName: '	สมชาย', notiDate: '08/09/2020', status: 'รอยืนยันกรมธรรม์' }
        ]
      },
    }
  },
  computed: {
    columns () {
      const col = [
        { label: 'Claim Notify No.', },
        { label: 'Claim No.	' },
        { label: 'Policy Type	' },
        { label: 'Insured Name' },
        { label: 'Notify Date' },
        { label: 'Status' }
      ]
      return col
    }
  },
  mounted () {
    // this.fillData()

    // CARD PROGRESS VALUE
    let eleClaimRegister = document.getElementById('claimRegister')
    let eleClaimRepair = document.getElementById('claimRepair')
    let eleClaimBilling = document.getElementById('claimBilling')
    let eleClaimCancel = document.getElementById('claimCancel')
    let eleClaimOpen = document.getElementById('claimOpen')
    eleClaimOpen.style.height = 0 + '%'
    eleClaimRegister.style.height = (100 - (this.form.claimRegister * 100/this.form.claimOpen)) + '%'
    eleClaimRepair.style.height = (100 - (this.form.claimRepair * 100/this.form.claimRegister)) + '%'
    eleClaimBilling.style.height = (100 - (this.form.claimBilling * 100/this.form.claimRepair)) + '%'
    eleClaimCancel.style.height = (100 - (this.form.claimCancel * 100/this.form.claimOpen)) + '%'
  },
  methods: {
    // changeView (chart) {
    //   if (chart == 'bar') {
    //     this.options = {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           },
    //           gridLines: {
    //             display: false
    //           }
    //         }],
    //         xAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           },
    //           gridLines: {
    //             display: true
    //           }
    //         }]
    //       },
    //       legend: {
    //         display: false
    //       },
    //       responsive: true,
    //       maintainAspectRatio: false
    //     }
    //     this.view = chart
    //   } else {
    //     this.options = {
    //       legend: {
    //         display: true,
    //         position: 'right'
    //       },
    //     }
    //     this.view = chart
    //   }
    // },
    // changeType (type, event) {
    //   console.log(type, event)
    //   if (type && type != event.id) {
    //     this.fillData()
    //   }
    // },
    // notChangeType (type) {
    //   console.log(type)
    //   if (!type || type == undefined) {
    //     this.typeId = 1
    //   }
    // },
    // fillData () {
    //   this.datacollection = {
    //     labels: [
    //       'First Reserve',
    //       'Billing Approve',
    //       'Surveyor Fee'
    //     ],
    //     datasets: [
    //       {
    //         label: 'Daily Data',
    //         backgroundColor: ['#FF6666', '#FFCC66', '#FFA867'],
    //         pointBackgroundColor: 'white',
    //         borderWidth: 1,
    //         pointBorderColor: '#249EBF',
    //         data: [
    //           this.getRandomInt(),
    //           this.getRandomInt(),
    //           this.getRandomInt()
    //         ]
    //       }
    //     ]
    //   }
    // },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>
<style lang="scss" scoped>
  @media only screen and (min-width: 1200px) {
    .col-xl-2 {
      flex: 0 0 20% !important;
      max-width: 25% !important;
    }
  }
  @media only screen and (min-width: 768px) {
    .col-xl-2 {
      flex: 0 0 45%;
      max-width: 50%;
    }
  }
  #card .card {
    border: none;
    .card-body {
      padding: 0.5rem;
      margin-right: 0;
      margin-left: 0;
      background-color: rgba(255, 255, 255, .9);
      .progress {
        height: 100%;
        width: 10px;
        background-color: #19c5f3;
      }
      .tabValue {
        background-color: #ddd;
        transition: all .3s linear;
        height: 100%;
        width: 10px;
      }
      .details {
        padding: inherit;
        position: absolute;
        z-index: 0;
        span {
          transition: all .3s linear;
          font-size: 2.75rem;
          font-weight: 500;
          color:#3c414b;
        }
      }
      span {
        font-size: 1.25rem;
        color:  #6D6E71;
        text-align: right;
        display: block;
      }
      .las {
        font-size: 4.5rem;
        color:#19c5f3;
        width: 100%;
        text-align: right;
      }
    }
    .card-body:hover {
      .details {
        span {
          transition: all .3s linear;
          font-size: 3.25rem;
        }
      }
    }
  }
</style>