import Vue from 'vue'
import { Line, Bar, HorizontalBar, Doughnut, Pie, Bubble, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

const generatedChart = (name, ext) => Vue.component(name, {
  extends: ext,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    options: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})

generatedChart('line-chart', Line)
generatedChart('bar-chart', Bar)
generatedChart('doughnut-chart', Doughnut)
generatedChart('pie-chart', Pie)
generatedChart('bubble-chart', Bubble)
generatedChart('horizontal-bar-chart', HorizontalBar)