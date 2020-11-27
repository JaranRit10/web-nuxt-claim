const HotTable = !process.client ? null : require('@handsontable/vue').HotTable
const Handsontable = !process.client ? null : require('handsontable')

export { HotTable, Handsontable }