// filter สำหรับแปลง empty string เป็น dash(-)
export function emptyToDash (value) {
  try {
    if (value === '' || !value) {
      return '-'
    } else {
      return value
    }
  } catch (error) {
    return ''
  }
}

// filter สำหรับ print object เป็น JSON
// เช่น <pre>{{ data | pretty }}</pre>
export function pretty (value) {
  return JSON.stringify(value, null, 2)
}
// Add comma and decimal
export function fmtNumber (value, decimal = 0) {
  try {
    if (isNaN(value) || value === '') {
      return value
    } else {
      if (decimal === 0) {
        return (+value).toFixed(decimal).replace(/\d(?=(\d{3})+$)/g, '$&,')
      } else {
        return (+value).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
    }
  } catch (error) {
    return value
  }
}
