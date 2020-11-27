import Vue from 'vue'

import ATable from '~/components/aspiron/ATable'
import AFormDatepicker from '~/components/aspiron/AFormDatepicker'
import AFormTimepicker from '~/components/aspiron/AFormTimepicker'
import ATree from '~/components/aspiron/ATree'
import ATreeUser from '~/components/aspiron/ATreeUser'

import { emptyToDash, pretty, fmtNumber } from '~/components/aspiron/Filters'
import InputNumber from '~/components/aspiron/InputNumber'
import InputNumberDecimal from '~/components/aspiron/InputNumberDecimal'

// Vue Component
Vue.component(ATable.name, ATable)
Vue.component(AFormDatepicker.name, AFormDatepicker)
Vue.component(AFormTimepicker.name, AFormTimepicker)
Vue.component(ATree.name, ATree)
Vue.component(ATreeUser.name, ATreeUser)
Vue.component(InputNumber.name, InputNumber)
Vue.component(InputNumberDecimal.name, InputNumberDecimal)

Vue.component('HasPerm', {
  functional: true,
  render (createElement, context) {
    let isPermit = false
    const userPerms = context.parent.$store.getters['auth/userPerms']

    const any = context.data.attrs && context.data.attrs.any

    // check any permission
    if (any) {
      const anyPerms = any.split(',').map(item => item.trim())

      for (const perm of anyPerms) {
        if (userPerms[perm] === 1) {
          isPermit = true
          break
        }
      }
    }
    else {
      const all = context.data.attrs && context.data.attrs.all

      // check all permission
      if (all) {
        const allPerms = all.split(',').map(item => item.trim())

        for (const perm of allPerms) {
          if (userPerms[perm] === 1) {
            isPermit = true
          }
          else {
            isPermit = false
            break
          }
        }
      }
    }

    if (isPermit) {
      return createElement('div', { staticClass: context.data.staticClass }, context.children)
    }
    else {
      return null
    }
  }
})

// Vue Filter
Vue.filter('emptyToDash', emptyToDash)
Vue.filter('pretty', pretty)
Vue.filter('fmtNumber', fmtNumber)