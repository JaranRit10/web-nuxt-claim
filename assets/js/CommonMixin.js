export default {
  data () {
    return {
      mode: '',
      skipValidateUnsaved: false,
      originalForm: null,
    }
  },

  created () {
    if (this.form) {
      this.originalForm = this.$util.cloneObject(this.form)
    }
  },

  computed: {
    toModeString () {
      if (this.mode == 'create') {
        return this.$t('c.create')
      }
      else if (this.mode == 'edit') {
        return this.$t('c.edit')
      }

      return 'Unknown'
    }
  },

  // utility function สำหรับตรวจสอบว่ามีการแก้ไข form data แต่ยังไม่ได้กดบันทึกหรือไม่
  // ถ้าใช่ จะแสดง popup confirm ก่อน
  //
  // *** ต้องตั้งชื่อ data ว่า "form" และ inittial ผ่าน "asyncData()" เท่านั้น
  //
  // (dependency: data.skipValidateUnsaved, data.originalForm, created method)
  beforeRouteLeave (to, from, next) {
    if (!this.skipValidateUnsaved && this.form) {
      if (this.$util.compareObject(this.form, this.originalForm)) {
        next()
      }
      else {
        this.msgBoxConfirm(this.$t('c.confirm__unsave')).then(ok => {
          if (ok) {
            next()
          }
          else {
            next(false)
          }
        })
      }
    }
    else {
      next()
    }
  },

  // เช็คการเคลียร์ค่า Criteria เมื่อมีการเปลี่ยนเมนู

  beforeRouteEnter (to, from, next) {
    if (to.params.id) {
      if (to.fullPath.search(from.fullPath) < 0) {
        next(vm => {
          if (vm.criteria) {
            vm.criteria = {}
          }
          if (vm.paging) {
            vm.paging = {
              sortBy: [],
              limit: 10,
              pageNumber: 1
            }
          }
        })
      } else {
        next()
      }
    } else if (from.fullPath.search(to.fullPath) < 0) {
      next(vm => {
        if (vm.criteria) {
          vm.criteria = {}
        }
        if (vm.paging) {
          vm.paging = {
            sortBy: [],
            limit: 10,
            pageNumber: 1
          }
        }
      })
    } else {
      next()
    }
  },

  // filters: {
  //   // filter สำหรับ print object เป็น JSON
  //   // เช่น <pre>{{ data | pretty }}</pre>
  //   pretty(value) {
  //     return JSON.stringify(value, null, 2);
  //   }
  // },

  deactivated () {
    // reset Vuelidate state
    if (this.$v) {
      this.$v.$reset()
    }

    // no cache "Detail" page
    if (this.$options.name && this.$options.name.endsWith('Detail')) {
      this.$destroy()
    }
  },

  methods: {
    // method สำหรับแสดงข้อความ toast บนหน้าจอ
    // เช่น this.toast('warning', this.$t('c.err__form_validate'))
    toast (variant, msg) {
      let vNodesTitle

      switch (variant) {
      case 'success': {
        vNodesTitle = this.$createElement('div', [this.$createElement('i', { class: 'las la-md la-check' }, '')])
        break
      }
      case 'warning': {
        vNodesTitle = this.$createElement('div', [this.$createElement('i', { class: 'las la-md la-exclamation-triangle' }, '')])
        break
      }
      case 'danger': {
        vNodesTitle = this.$createElement('div', [this.$createElement('i', { class: 'las la-md la-ban' }, '')])
        break
      }
      case 'info': {
        vNodesTitle = this.$createElement('div', [this.$createElement('i', { class: 'las la-md la-info-circle' }, '')])
        break
      }
      default: {
        vNodesTitle = this.$createElement('div', [this.$createElement('i', { class: 'las la-md la-square' }, '')])
        break
      }
      }

      // To make on-demand toasts persist across router $route changes,
      // use this.$root.$bvToast.toast() instead to make the toast's parent the root of your app.
      this.$root.$bvToast.toast(msg, {
        title: [vNodesTitle],
        variant,
        autoHideDelay: 3000
      })
    },

    // method สำหรับแสดง popup confirm บนหน้าจอ
    // เช่น this.msgBoxConfirm('save').then(ok => { ... })
    msgBoxConfirm (type) {
      let msg

      if (type === 'save') {
        msg = this.$t('c.confirm__save')
      }
      else if (type === 'update') {
        msg = this.$t('c.confirm__update')
      }
      else if (type === 'delete') {
        msg = this.$t('c.confirm__delete')
      }
      else {
        msg = type
      }

      return this.$bvModal.msgBoxConfirm(msg, {
        modalClass: 'modal-confirm',
        okTitle: this.$t('c.ok'),
        cancelTitle: this.$t('c.cancel')
      })
    },

    // method สำหรับแสดง popup information บนหน้าจอ
    // เช่น this.msgBoxOk(this.$t('c.success__logout')).then(ok => { ... })
    msgBoxOk (msg) {
      return this.$bvModal.msgBoxOk(msg, {
        modalClass: 'modal-ok',
        okTitle: this.$t('c.ok')
      })
    },

    // method สำหรับ get array value รายการที่ติ๊ก checkbox
    getCheckedValue (datasource, field) {
      let checedValue = []

      if (datasource.data) {
        datasource.data.forEach(data => {
          if (data.checked) {
            checedValue.push(data[field])
          }
        })
      }

      return checedValue
    },

    // method สำหรับสั่ง toggle collapse ด้วย id
    toggleCollapse (collapseId, event) {

      if (event.target.classList.contains('la-angle-up')) {
        event.target.classList.remove('la-angle-up')
        event.target.classList.add('la-angle-down')
      }
      else if (event.target.classList.contains('la-angle-down')) {
        event.target.classList.remove('la-angle-down')
        event.target.classList.add('la-angle-up')
      }

      if (event.target.className == 'card-header') {
        // Not Action
        return false
      }
      if (event.target.classList.contains('tab') || event.target.classList.contains('title')) {
        if (event.target.lastElementChild.classList.contains('la-angle-up')) {
          event.target.lastElementChild.classList.remove('la-angle-up')
          event.target.lastElementChild.classList.add('la-angle-down')

        } else if (event.target.lastElementChild.classList.contains('la-angle-down')) {
          event.target.lastElementChild.classList.remove('la-angle-down')
          event.target.lastElementChild.classList.add('la-angle-up')
        }
      }

      this.$root.$emit('bv::toggle::collapse', collapseId)
    },
  }
}