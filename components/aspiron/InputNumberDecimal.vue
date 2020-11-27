<template>
  <input
    ref="inputNumberDecimal"
    v-model="inputValue"
    type="text"
    class="form-control text-right"
    @drop.prevent
    @focus="$emit('focus', $event.target.value)"
    @keypress="onKeypress"
    @blur="onBlur($event.target.value)"
    @click="onClick($event.target.value)"
  >
</template>

<script>
export default {
  name: 'InputNumberDecimal',
  props: {
    value: {}, // from parent v-model
    min: { type: Number, default: Number.MIN_VALUE },
    max: { type: Number, default: Number.MAX_VALUE },
    decimal: { type: Number, default: 2 }
  },

  data () {
    return {
      inputValue: '',
      posStart: 0,
      posEnd: 0
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
      }
      else if (e.keyCode === 46 || e.charCode === 46) {
        // allow dot
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
    onClick (event) {
      this.posStart = this.$refs.inputNumberDecimal.selectionStart
      this.posEnd = this.$refs.inputNumberDecimal.selectionEnd
      // console.log('click posStart', this.posStart)
      // console.log('click posEnd', this.posEnd)
      this.$emit('click', event) // trigger event click
      this.onFocus(event) // trigger event focus after click
    },

    onFocus (event) {
      // call by onClick
      if (this.inputValue) {
        if (this.inputValue.indexOf(',') > 0) {
          if (this.posStart > this.inputValue.indexOf(',')) {
            this.posStart--
          }
          if (this.posEnd > this.inputValue.indexOf(',')) {
            this.posEnd--
          }
        }
        this.inputValue = this.inputValue.replace(/,/g, '')
      }
      this.$emit('focus', event) // trigger event focus
      this.$nextTick(() => {
        this.$refs.inputNumberDecimal.setSelectionRange(
          this.posStart,
          this.posEnd
        )
      })
    },

    onBlur (event) {
      // check is number
      if (isNaN(this.inputValue) || this.inputValue === '') {
        // error: not a number
        this.inputValue = ''
        this.$emit('input', undefined) // update parent v-model
        // format number
        this.formatInputValue(this.value)
      } else {
        // ok: number
        // TODO: check min, max
        // ...
        // ...
        this.$emit('input', (+this.inputValue).toFixed(this.decimal)) // update parent v-model
        // format number
        this.formatInputValue(this.value)
      }
      this.$emit('blur', event) // trigger event blur

      this.posStart = 0 // restore cursor position
      this.posEnd = 0 // restore cursor position
      // console.log('blur posStart', this.posStart)
      // console.log('blur posEnd', this.posEnd)
    },

    formatInputValue (newVal) {
      if (isNaN(newVal) || newVal === '') {
        // fail: not a number
        this.inputValue = newVal
      } else {
        // ok: number
        this.inputValue = this.formatNumber(newVal)
      }
    },

    formatNumber (str) {
      if (this.decimal === 0) {
        return (+str).toFixed(2).replace(/\d(?=(\d{3})+$)/g, '$&,')
      } else {
        return (+str).toFixed(this.decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
    }
  }
}
</script>
