<template>
  <input
    ref="InputNumber"
    v-model="inputValue"
    type="text"
    class="form-control"
    @drop.prevent
    @focus="onFocus"
    @keypress="onKeypress"
    @blur="onBlur"
  >
</template>

<script>
export default {
  name: 'InputNumber',

  props: {
    value: {}, // from parent v-model
    min: { type: Number, default: Number.MIN_VALUE },
    max: { type: Number, default: Number.MAX_VALUE },
    index: { type: Number, default: undefined },
    decimal: { type: Number, default: 0 },
    noDash: { type: Boolean, default: false }
  },

  data () {
    return {
      inputValue: ''
    }
  },

  watch: {
    value (newVal, oldVal) {
      this.formatInputValue(newVal)
    }
  },

  mounted () {
    this.formatInputValue(this.value)
  },

  methods: {
    onKeypress (e) {
      if (e.charCode >= 48 && e.charCode <= 57) {
        // allow 0-9
        if ((e.target.value.charCodeAt(e.target.selectionStart - (this.decimal + 1)) === 46)) {
          e.preventDefault()
        }
      }
      // else if (e.charCode === 45 && !(opts.min >= 0)) {
      //   // allow '-' sign at first character
      //   if (element.val().indexOf("-") > -1) {
      //     e.preventDefault();
      //   }
      // }
      else if (e.keyCode === 9) {
        // allow tab
      } else if (e.keyCode === 8) {
        // allow backspace
      } else if (e.keyCode === 45 && !this.noDash) {
        // allow minus
        // if (e.target.value.indexOf('-') > -1) {
        if (e.target.value.includes('-') > -1) {
          e.preventDefault()
        }
      } else if (e.keyCode === 46) {
        // allow dot
        // if (e.target.value.indexOf('.') > -1) {
        if (e.target.value.includes('.') > -1) {
          e.preventDefault()
        }
      } else if (e.ctrlKey && e.charCode === 97) {
        // allow ctrl + a
      } else if (e.ctrlKey && e.charCode === 99) {
        // allow ctrl + c
      } else if (e.ctrlKey && e.charCode === 118) {
        // allow ctrl + v
      } else if (e.ctrlKey && e.charCode === 120) {
        // allow ctrl + x
      } else {
        e.preventDefault()
      }
    },

    onFocus (event) {
      if (this.inputValue) {
        this.inputValue = this.inputValue.replace(/,/g, '')
      }
      this.$nextTick(() => this.$refs.InputNumber.setSelectionRange(0, 0))
    },

    onBlur (event) {
      if (this.inputValue && (this.formatNumber(this.inputValue) == this.formatNumber(this.value))) {
        this.inputValue = this.formatNumber(this.inputValue)
        return false //* value not change stop emit
      }

      if (isNaN(this.inputValue) || this.inputValue === '') {
        // error: not a number
        this.inputValue = ''
        this.$emit('input', undefined, this.index) // update parent v-model
      } else {
        // ok: number
        // check min, max
        this.$emit('beforLimit', (+this.inputValue).toFixed(this.decimal), this.min, this.max)
        if (+this.inputValue < this.min) {
          this.inputValue = this.min
        }

        if (+this.inputValue > this.max) {
          this.inputValue = this.max
        }

        try {
          // if (this.inputValue.indexOf('.') < 0) {
          if (this.inputValue.includes('.') < 0) {
            this.$emit('input', (+this.inputValue).toFixed(this.decimal), this.index) // update parent v-model
          } else {
            let re = new RegExp('^-?\\d+(?:.\\d{0,' + (this.decimal || -1) + '})?')
            let numberToShow = this.inputValue.match(re)[0]
            this.$emit('input', numberToShow, this.index) // update parent v-model
          }
        } catch {
          this.$emit('input', (+this.inputValue).toFixed(this.decimal), this.index) // update parent v-model
        }

        // Old
        // this.$emit('input', (+this.inputValue).toFixed(this.decimal), this.index) // update parent v-model
        // format number
        this.inputValue = this.formatNumber(this.inputValue)
      }
    },

    formatInputValue (newVal) {
      if (isNaN(newVal) || newVal === '') {
        // fail: not a number
        this.inputValue = newVal
      } else {
        // ok: number
        // console.log('this.inputValue', this.inputValue)
        this.inputValue = this.formatNumber(newVal)
      }
    },

    formatNumber (str) {
      // return (+str).toFixed(this.decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      if (this.decimal === 0) {
        return (+str).toFixed(this.decimal).replace(/\d(?=(\d{3})+$)/g, '$&,')
      } else {
        try {
          let re = new RegExp('^-?\\d+(?:.\\d{0,' + (this.decimal || -1) + '})?')
          let numberToShow = str.match(re)[0]
          // return numberToShow
          return (+numberToShow).toFixed(this.decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        } catch {
          return (+str).toFixed(this.decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }
        // Old
        // return (+str).toFixed(this.decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
    }
  }
}
</script>
