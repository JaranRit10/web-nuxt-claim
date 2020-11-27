<template>
  <div>
    <el-tree
      ref="tree"
      node-key="id"
      show-checkbox
      default-expand-all
      :data="myFuncList"
      @check-change="checkBoxValue"
    />
  </div>

</template>

<script>
// Support 8 level
import intersection from 'lodash/intersection'
import { xor, forEach, findIndex } from 'lodash'

export default {
  name: 'ATreeUser',
  props: {
    myFuncList: { type: Array },
    mode: { type: String },
    isDisabled: { type: Boolean, default: false }
  },
  data () {
    return {
      checkList: [],
      tempCheck: [],
      tempCheck2: [],
      tempCheck3: []
    }
  },
  watch: {
    myFuncList (newVal, oldVal) {
      this.checkTree()
    }
  },
  mounted () {
    this.checkTree()
  },
  methods: {
    findCheckList (obj, parent, level1, level2, level3, level4, level5, level6, level7) {
      if (obj.select) {
        this.checkList.push(obj.id)
      } else {
        // if children = false and parent.select = true push for delete id parent
        if (parent && parent.select && intersection(this.arrList, [parent.id]).length == 0) {
          this.arrList.push(parent.id)
        }
        if (level1 && level1.select && intersection(this.arrList, [level1.id]).length == 0) {
          this.arrList.push(level1.id)
        }
        if (level2 && level2.select && intersection(this.arrList, [level2.id]).length == 0) {
          this.arrList.push(level2.id)
        }
        if (level3 && level3.select && intersection(this.arrList, [level3.id]).length == 0) {
          this.arrList.push(level3.id)
        }
        if (level4 && level4.select && intersection(this.arrList, [level4.id]).length == 0) {
          this.arrList.push(level4.id)
        }
        if (level5 && level5.select && intersection(this.arrList, [level5.id]).length == 0) {
          this.arrList.push(level5.id)
        }
        if (level6 && level6.select && intersection(this.arrList, [level6.id]).length == 0) {
          this.arrList.push(level6.id)
        }
        if (level7 && level7.select && intersection(this.arrList, [level7.id]).length == 0) {
          this.arrList.push(level7.id)
        }
      }
    },
    getLevel8 (children, parent, level1, level2, level3, level4, level5, level6, level7) {
      forEach(children, (v) => {
        if (this.isDisabled) {
          v.disabled = true
        }

        this.findCheckList(v, parent, level1, level2, level3, level4, level5, level6, level7)
      })
    },
    getLevel7 (children, parent, level1, level2, level3, level4, level5, level6) {
      forEach(children, (v) => {
        if (this.isDisabled) {
          v.disabled = true
        }

        this.findCheckList(v, parent, level1, level2, level3, level4, level5, level6)

        if (v.children && v.children.length > 0) {
          this.getLevel8(v.children, parent, level1, level2, level3, level4, level5, level6, v)
        }
      })
    },
    getLevel6 (children, parent, level1, level2, level3, level4, level5) {
      forEach(children, (v) => {
        if (this.isDisabled) {
          v.disabled = true
        }

        this.findCheckList(v, parent, level1, level2, level3, level4, level5)

        if (v.children && v.children.length > 0) {
          this.getLevel6(v.children, parent, level1, level2, level3, level4, level5, v)
        }
      })
    },
    getLevel5 (children, parent, level1, level2, level3, level4) {
      forEach(children, (v) => {
        if (this.isDisabled) {
          v.disabled = true
        }

        this.findCheckList(v, parent, level1, level2, level3, level4)

        if (v.children && v.children.length > 0) {
          this.getLevel6(v.children, parent, level1, level2, level3, level4, v)
        }
      })
    },
    getLevel4 (children, parent, level1, level2, level3) {
      forEach(children, (v) => {
        if (this.isDisabled) {
          v.disabled = true
        }

        this.findCheckList(v, parent, level1, level2, level3)

        if (v.children && v.children.length > 0) {
          this.getLevel5(v.children, parent, level1, level2, level3, v)
        }
      })
    },
    getLevel3 (children, parent, level1, level2) {
      forEach(children, (v) => {
        if (this.isDisabled) {
          v.disabled = true
        }

        this.findCheckList(v, parent, level1, level2)

        if (v.children && v.children.length > 0) {
          this.getLevel4(v.children, parent, level1, level2, v)
        }
      })
    },
    getLevel2 (children, parent, level1) {
      forEach(children, (v) => {
        if (this.isDisabled) {
          v.disabled = true
        }

        this.findCheckList(v, parent, level1)

        if (v.children && v.children.length > 0) {
          this.getLevel3(v.children, parent, level1, v)
        }
      })
    },
    getLevel1 (children, parent) {
      forEach(children, (v) => {
        if (this.isDisabled) {
          v.disabled = true
        }

        this.findCheckList(v, parent)

        if (v.children && v.children.length > 0) {
          this.getLevel2(v.children, parent, v)
        }
      })
    },
    checkTree () {
      this.checkList = []
      this.arrList = []
      // remove parent id  if have children.select = false
      forEach(this.myFuncList, (v) => {
        if (this.isDisabled) {
          v.disabled = true
        }

        this.findCheckList(v)

        if (v.children && v.children.length > 0) {
          this.getLevel1(v.children, v)
        }
      })
      this.checkList = xor(this.checkList, this.arrList)

      this.$refs.tree.setCheckedKeys(this.checkList)
      this.$emit('check', this.checkList)
    },
    checkBoxValue (data, checked, indeterminate) {
      if (data.levelNo == 1 && checked) {
        // this.tempCheck.push(data.id)
      }
      else if (data.levelNo == 2 && checked) {
        // this.tempCheck2.push(data.id)
      }
      else if (data.levelNo == 3 && checked) {
        let division = data.parentMsNo.substring(1, 2)
        // this.checkList.push({divisionCode: division, deptCode: data.parentMsNo, subDeptCode: data.id, levelNo: data.levelNo})
        this.tempCheck3.push({divisionCode: division, deptCode: data.parentMsNo, subDeptCode: data.id, levelNo: data.levelNo})
      }
      else if (data.levelNo == 1 && !checked) {
        // this.tempCheck.splice(1, 1)
      }
      else if (data.levelNo == 2 && !checked) {
        // this.tempCheck2.splice(1, 1)
      }
      else if (data.levelNo == 3 && !checked) {
        let indexDel = findIndex(this.tempCheck3, function (o) { return o.subDeptCode == data.id })
        this.tempCheck3.splice(indexDel, 1)
      }
      this.$emit('check', this.tempCheck3)
    }
  }
}
</script>
<style scope>
/* @import '~element-theme-chalk/lib/index.css'; */
/* .el-checkbox__input {
    padding-top: 5px !important;
} */
</style>
