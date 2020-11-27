<template>
  <div class="a-table">
    <div class="table-action">
      <!-- slot: tableAction -->
      <div class="col d-flex">
        <slot name="tableAction" />
      </div>

      <div class="col-auto d-flex">
        <!-- filter column -->
        <b-dropdown variant="default" right no-caret :class="{ 'has-active': hasFilter }" v-if="isFilter">
          <template v-slot:button-content>
            <i class="las la-md la-filter"></i>
          </template>
          <b-dropdown-form>
            <div v-for="(column, index) in _columns" :key="index">
              <template v-if="column.label !== 'CHECK_ALL' && column.filterable === true">
                <b-form-checkbox class="mb-2" v-model="column.show" @input="toggleFilter(column, index)">{{ column.label }}</b-form-checkbox>
              </template>
            </div>
          </b-dropdown-form>
          <li role="presentation" class=""><hr role="separator" aria-orientation="horizontal" class="dropdown-divider mt-0"></li>
          <b-dropdown-item>
            <i class="las la-times"></i> {{ $t('c.close') }}
          </b-dropdown-item>
        </b-dropdown>

        <!-- sort column -->
        <b-dropdown variant="default" right no-caret class="ml-2" :class="{ 'has-active': hasSort }" v-if="isSort">
          <template v-slot:button-content>
            <i class="las la-md la-sort"></i>
          </template>
          <b-dropdown-item v-for="(sort, index) in paging.sortBy" :key="index" @click="removeSort(index)">
            <i class="las la-times"></i> {{ sort.label }}
          </b-dropdown-item>
          <b-dropdown-divider v-if="paging.sortBy.length"></b-dropdown-divider>
          <b-dropdown-item @click="removeSort(-1)">
            <i class="las la-undo-alt"></i> {{ $t('c.clear') }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div><!-- /table-action -->

    <div class="table-responsive" ref="myTableContainer">
      <table class="table table-sm table-bordered table-striped table-hover b-table" ref="myTable">
        <thead class="thead-dark" v-if="_columnsLv1.length === 0 && _columnsLv2.length === 0">
          <tr v-if="isSort">
            <th v-for="(column, index) in _columns" :key="index"
                class="text-center"
                :style="column.style"
                :aria-sort="column.sort || column.sortable"
                @click="toggleSort(column, index, $event)"
            >
              <template v-if="column.label === 'CHECK_ALL'">
                <b-form-checkbox
                  v-model="isCheckAll"
                  :indeterminate="isChecked"
                  @change="clickAllCheck"
                >
                </b-form-checkbox>
              </template>
              <template v-else>
                {{ column.label }}
              </template>
            </th>
          </tr>
          <tr v-if="!isSort">
            <th v-for="(column, index) in _columns" :key="index"
                class="text-center"
                :style="column.style"
            >
              <template v-if="column.label === 'CHECK_ALL'">
                <b-form-checkbox
                  v-model="isCheckAll"
                  :indeterminate="isChecked"
                  @change="clickAllCheck"
                >
                </b-form-checkbox>
              </template>
              <template v-else>
                {{ column.label }}
              </template>
            </th>
          </tr>
        </thead>
        <thead class="thead-dark" v-else>
          <tr>
            <th
              class="text-center"
              v-for="(v, index) in _columnsLv1"
              :key="index"
              :aria-sort="v.sort || v.sortable"
              :rowspan="v.rowspan"
              :colspan="v.colspan"
              :style="v.style"
              @click="toggleSort(v, v.index, $event)"
            >
              <template v-if="v.label === 'CHECK_ALL'">
                <b-form-checkbox
                  v-model="isCheckAll"
                  :indeterminate="isChecked"
                  @change="clickAllCheck()"
                />
              </template>
              <template v-else>
                {{ v.label }}
              </template>
            </th>
          </tr>

          <tr>
            <th
              class="text-center"
              v-for="(v, index) in _columnsLv2"
              :key="index"
              :aria-sort="v.sort || v.sortable"
              :rowspan="v.rowspan"
              :colspan="v.colspan"
              :style="v.style"
              @click="toggleSort(v, v.index, $event)"
            >
              <template v-if="v.label === 'CHECK_ALL'">
                <b-form-checkbox
                  v-model="isCheckAll"
                  :indeterminate="isChecked"
                  @change="clickAllCheck()"
                />
              </template>
              <template v-else>
                {{ v.label }}
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- slot: tableBody -->
          <slot name="tableBody">
            <tr>
              <td class="text-center" colspan="50">
                {{ $t('c.no_data_found') }}
              </td>
            </tr>
          </slot>
        </tbody>
      </table>
    </div><!-- /table-responsive -->

    <div class="table-paging" v-if="isPaging">
      <div class="col-sm">
        {{ $t('c.paging__showing', [ _showing.start, _showing.end, _showing.total ]) }}
      </div>
      <div class="col-sm-auto">
        <div v-if="paging.limitList">
          <span>{{ $t('c.paging__show') }} </span>
          <select class="custom-select d-inline" style="width: 60px;" v-model="paging.limit" @change="onRowPerPageChange()">
            <option v-for="(v, index) in paging.limitList" :key="index">
              {{ v }}
            </option>
            <!-- <option>25</option>
            <option>50</option>
            <option>100</option> -->
          </select>
          <span> {{ $t('c.paging__record_per_page') }}</span>
        </div>
        <div v-else>
          <span>{{ $t('c.paging__show') }} </span>
          <select class="custom-select d-inline" style="width: 60px;" v-model="paging.limit" @change="onRowPerPageChange()">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span> {{ $t('c.paging__record_per_page') }}</span>
        </div>
      </div>
      <div class="col-sm-auto" v-if="isPaging">
        <ul class="pagination pagination-sm m-0">
          <li class="page-item" v-for="(page, index) in _pages" :key="index" :class="{ 'active': page.active }">
            <a class="page-link" @click="onPageChange(page.no)" :class="{ 'mlr-sm': page.label==='<<' || page.label==='>>' }">
              {{ page.label }}
            </a>
          </li>
        </ul>
      </div>
    </div><!-- /table-paging -->
  </div>
</template>


<script>
import { mapState } from 'vuex'
import localForage from 'localforage'

export default {
  name: 'ATable',

  props: {
    id: { type: String },
    datasource: {
      type: Object,
      required: true,
      default () {
        return { data: [], total: 0 }
      }
    },
    columns: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    paging: { type: Object, required: true },
    autoSearch: { type: Boolean, default: false },
    resizable: { type: Boolean, default: false },
    isFilter: {type: Boolean, default: true},
    isSort: {type: Boolean, default: true},
    isPaging: {type: Boolean, default: true},
  },

  data () {
    return {
      isCheckAll: false,
      isChecked: false,
      // colResize: -1,
      hasFilter: false,
      hasSort: false,
      tableWidth: 0,
      sidebarWidth: 250,
    }
  },

  computed: {
    ...mapState({
      showSidebar: state => state.layout.showSidebar
    }),

    countChecked () {
      let check = 0
      if (this.datasource.data) {
        for (let i = 0; i < this.datasource.data.length; i++) {
          if (this.datasource.data[i].checked) {
            check++
          }
        }
      }
      return check
    },

    _columns () {
      // default columns sortable to true
      this.columns.forEach((col) => {
        if (col.sortable === undefined) {
          col.sortable = true
        }
        if (col.filterable === undefined) {
          col.filterable = true
        }
        if (col.show === undefined) {
          col.show = true
        }
      })

      return this.columns
    },

    _columnsLv1 () {
      let temp = this.columns
      let array = []

      temp.forEach((col, i) => {
        if (col.lv == 1) {
          if (col.sortable === undefined) {
            col.sortable = true
          }
          if (col.filterable === undefined) {
            col.filterable = true
          }
          if (col.show === undefined) {
            col.show = true
          }
          col.index = i
          array.push(col)
        } else if ( !col.lv || col.lv == undefined) {
          array = []
        }
      })

      return array
    },

    _columnsLv2 () {
      let temp = this.columns
      let array = []

      temp.forEach((col, i) => {
        if (col.lv == 2) {
          if (col.sortable === undefined) {
            col.sortable = true
          }
          if (col.filterable === undefined) {
            col.filterable = true
          }
          if (col.show === undefined) {
            col.show = true
          }
          col.index = i
          array.push(col)
        } else if ( !col.lv || col.lv == undefined) {
          array = []
        }
      })

      return array
    },

    _showing () {
      let showing = {}

      showing.start = (this.paging.pageNumber - 1) * this.paging.limit + 1
      if (showing.start > this.datasource.total) {
        showing.start = this.datasource.total
      }
      showing.end = this.paging.pageNumber * this.paging.limit
      if (showing.end > this.datasource.total) {
        showing.end = this.datasource.total
      }
      showing.total = this.datasource.total

      return showing
    },

    _pages () {
      let pages = []

      let maxPage = Math.ceil(this.datasource.total / this.paging.limit)
      let activePageNo = this.paging.pageNumber

      if (maxPage > 0) {
        for (let i = 1; i <= maxPage; i++) {
          if (i == activePageNo) {
            pages.push({ label: i + '', no: i, active: true })
          } else if (i != activePageNo) {
            if ((activePageNo < 4 && i < 6) || (activePageNo > maxPage - 3 && i > maxPage - 5)) {
              pages.push({ label: i + '', no: i, active: false })
            } else if (i > activePageNo - 3 && i < activePageNo + 3) {
              pages.push({ label: i + '', no: i, active: false })
            }
          }
        }
      } else {
        pages.push({ label: 1 + '', no: 1, active: true })
      }

      // << page >>
      pages.unshift({
        label: '<',
        no: isNaN(maxPage) || maxPage < 1 || activePageNo === 1 ? 1 : activePageNo - 1,
        active: false
      })
      pages.unshift({
        label: '<<',
        no: 1,
        active: false
      })
      pages.push({
        label: '>',
        no: isNaN(maxPage) || maxPage < 1 ? 1 : activePageNo === maxPage ? maxPage : activePageNo + 1,
        active: false
      })
      pages.push({
        label: '>>',
        no: isNaN(maxPage) || maxPage < 1 ? 1 : maxPage,
        active: false
      })

      return pages
    },
  },

  watch: {
    _columns () {
      this._columns.forEach((col, index) => {
        if (!col.show) {
          this.toggleFilter(col, index)
        }
      })
    },

    datasource () {
      if (this.datasource.total > 0 && this.paging.pageNumber > 1 && this.datasource.data.length == 0) {
        this.onPageChange(1)
      }
      this.autoSequence()
    },

    countChecked () {
      // Handle changes in individual flavour checkboxes
      this.$nextTick(function () {
        if (this.countChecked === 0) {
          this.isChecked = false
          this.isCheckAll = false
        } else if (this.countChecked === (this.datasource.data.length)) {
          this.isChecked = false
          this.isCheckAll = true
        } else {
          this.isChecked = true
          this.isCheckAll = false
        }
      })
    }
  },

  async mounted () {

    // initial state
    if (this.id) {

      // key
      let sortbyKey = this.id + '-sortby'
      let filterKey = this.id + '-filter'

      // load filter from localstorage
      const columnIndexArr = await localForage.getItem(filterKey)

      if (columnIndexArr !== undefined && columnIndexArr !== null) {
        let i
        for (i = 0; i < columnIndexArr.length; i++) {
          let columnIndex = columnIndexArr[i]

          if (this.columns.length >= columnIndex) {
            // // **************************************************
            // // https://vuejs.org/v2/guide/list.html#Caveats
            // // **************************************************
            // this.$set(this.columns, columnIndex, col)
            if (this.columns[columnIndex].filterable !== false) {
              this.columns[columnIndex].show = false

              this.$refs.myTable.classList.add('hide-col-' + columnIndex)
              this.hasFilter = true
            }
          }
        }
      }

      // load sortby from localstorage
      const sortby = await localForage.getItem(sortbyKey)

      if (sortby !== undefined && sortby !== null) {
        this.paging.sortBy = sortby
        let i
        for (i = this.paging.sortBy.length - 1; i >= 0; i--) {
          let sort = this.paging.sortBy[i]
          let columnIndex = sort.columnIndex

          if (this.columns.length >= columnIndex && this.columns[columnIndex].field === sort.column) {
            this.columns[columnIndex].sort = sort.direction
            this.hasSort = true
          }
          else {
            // ถ้าลำดับ column ปัจจุบันไม่ตรงกับที่บรรทัด ให้เอาออกจาก paging
            this.paging.sortBy.splice(i, 1)
          }
        }
      }
      // localForage.getItem(sortbyKey).then(sortby => {
      //   if (sortby !== undefined && sortby !== null) {
      //     this.paging.sortBy = sortby
      //     let i
      //     for (i = 0; i < this.paging.sortBy.length; i++) {
      //       let sort = this.paging.sortBy[i]
      //       this.columns[sort.columnIndex].sort = sort.direction
      //     }
      //   }
      // })

      // bind destroy event
      this.$once('hook:beforeDestroy', function () {

        // save sortby to localstorage
        localForage.setItem(sortbyKey, this.paging.sortBy)

        // save filter to localstorage
        let filterIndex = []
        this.$refs.myTable.classList.forEach(clazz => {
          if (clazz.startsWith('hide-col-')) {
            filterIndex.push(clazz.substring(9) * 1)
          }
        })
        localForage.setItem(filterKey, filterIndex)
      })

      // TODO: resizable column
      // if (this.resizable) {
      //   window.$('#myTable th').resizable({
      //     direction: 'horizontal',
      //     // handle: 'e',
      //     start: () => {
      //       this.colResize = event.target.offsetParent.cellIndex
      //     },
      //     stop: () => {
      //       const cellIndex = !event.target.cellIndex ? -1 : event.target.cellIndex
      //       // const parrentCellIndex = !event.target.offsetParent ? -1 : event.target.offsetParent.offsetParent
      //       if ((this.colResize != cellIndex) && (this.colResize > -1 && cellIndex != -1)) {
      //         this.colResize = -1
      //       }
      //     }
      //   })
      // }
    }

    // check auto search
    if (this.autoSearch) {
      this.$nextTick(function () {
        // emit: refresh
        this.$emit('refresh')
      })
    }

    // TODO: remove no use ?
    this._columns.forEach((col, i) => {
      if (!col.show) {
        this.toggleFilter(col, i)
      }
    })
  },

  destroyed () {
    if (this.resizable) {
      window.$('#myTable th').resizable('destroy')
    }
  },

  methods: {
    clickAllCheck (val) {
      this.isCheckAll = val
      if (this.datasource.data) {
        if (this.isCheckAll || this.isChecked) {
          for (let i = 0; i < this.datasource.data.length; i++) {
            this.$set(this.datasource.data[i], 'checked', true)
          }
        } else {
          for (let i = 0; i < this.datasource.data.length; i++) {
            this.$set(this.datasource.data[i], 'checked', false)
          }
        }
      }
    },

    onRowPerPageChange () {
      this.paging.pageNumber = 1

      // emit: refresh
      this.$emit('refresh')
    },

    onPageChange (pageNo) {
      if (this.paging.pageNumber !== pageNo) {
        this.paging.pageNumber = pageNo

        // emit: refresh
        this.$emit('refresh')
      }
    },

    autoSequence () {
      if (this.datasource.data) {
        for (let i=0; i < this.datasource.data.length; i++) {
          if (this.paging.pageNumber == 1) {
            this.$set(this.datasource.data[i], 'seqItemId', i + 1)
          } else {
            this.$set(this.datasource.data[i], 'seqItemId', (this.paging.pageNumber * this.paging.limit) - this.paging.limit + i + 1)
          }
        }
      }
    },

    toggleFilter (column, index) {
      if (column.show) {
        // show column
        this.$refs.myTable.classList.remove('hide-col-' + index)

        // check hasFilter
        this.hasFilter = false
        for (const col of this.columns) {
          if (col.label !== 'CHECK_ALL' && col.filterable === true && col.show === false) {
            this.hasFilter = true
            break
          }
        }
      } else {
        // hide column
        this.$refs.myTable.classList.add('hide-col-' + index)

        // check hasFilter
        this.hasFilter = true
      }

      // save filter to localstorage
      if (this.id) {
        let filterKey = this.id + '-filter'
        let filterIndex = []
        this.$refs.myTable.classList.forEach(clazz => {
          if (clazz.startsWith('hide-col-')) {
            filterIndex.push(clazz.substring(9) * 1)
          }
        })
        localForage.setItem(filterKey, filterIndex)
      }
    },

    toggleSort (column, index, e) {
      // if (this.colResize > -1) {
      //   this.colResize = -1
      //   e.preventDefault()
      //   return false
      // }

      if (column.sortable) {
        // find previous sortBy
        console.log('toggleSort : ', this.paging.sortBy)
        let i = this.paging.sortBy.findIndex(o => o.column === column.field)

        // toggle sort direction 'no -> asc -> desc -> no'
        if (i >= 0) {
          if (this.paging.sortBy[i].direction === 'asc') {
            this.paging.sortBy[i].direction = 'desc'
            column.sort = 'desc'
          } else if (this.paging.sortBy[i].direction === 'desc') {
            this.paging.sortBy.splice(i, 1)
            delete column.sort
          }
        } else {
          this.paging.sortBy.push({
            column: column.field,
            direction: 'asc',
            label: column.label,
            columnIndex: index
          })
          column.sort = 'asc'
        }

        // check hasSort
        if (this.paging.sortBy.length) {
          this.hasSort = true
        }
        else {
          this.hasSort = false
        }

        // force update header
        this.$forceUpdate()

        // emit: refresh
        this.$emit('refresh')

        // save sortby to localstorage
        if (this.id) {
          let sortbyKey = this.id + '-sortby'
          localForage.setItem(sortbyKey, this.paging.sortBy)
        }
      }
    },

    removeSort (sortIndex) {
      if (sortIndex === -1) {
        // unsort all
        this.paging.sortBy = []

        this.columns.forEach(col => {
          delete col.sort
        })
      } else {
        let columnIndex = this.paging.sortBy[sortIndex].columnIndex
        this.paging.sortBy.splice(sortIndex, 1)

        delete this.columns[columnIndex].sort
      }

      // check hasSort
      if (this.paging.sortBy.length) {
        this.hasSort = true
      }
      else {
        this.hasSort = false
      }

      // emit: refresh
      this.$emit('refresh')

      // save sortby to localstorage
      if (this.id) {
        let sortbyKey = this.id + '-sortby'
        localForage.setItem(sortbyKey, this.paging.sortBy)
      }
    },
  }
}
</script>
