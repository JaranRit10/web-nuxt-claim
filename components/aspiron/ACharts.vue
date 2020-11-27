<script>
import { Doughnut, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins

export default {
  name: 'AChart',
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    options: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    center: {
      type: Number,
      default () {
        return 0
      }
    },
  },
  mounted () {
    // https://stackoverflow.com/questions/60928670/vue-chartjs-doughnut-chart-with-text-in-the-middle
    this.addPlugin({
      id: 'my-plugin',
      beforeDraw: (chart) => {
        const chartwidth = chart.chart.width
        // const legendwidth = chart.legend.width
        const chartheight = chart.chart.height
        const legendheight = chart.legend.height
        const ctx = chart.chart.ctx
        ctx.restore()
        const fontSize = (chartheight / 114).toFixed(2)
        ctx.font = fontSize + 'em Sarabun, sans-serif'
        ctx.textBaseline = 'middle'

        const text = this.center
        const textX = Math.round((chartwidth - ctx.measureText(text).width)/2)
        const textY = (chartheight-legendheight) / 2

        ctx.fillText(text, textX, textY)
        ctx.save()
      }
    })
    this.renderChart(this.chartData, this.options)
  }
}
</script>