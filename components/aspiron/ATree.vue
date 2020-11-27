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
import { xor, forEach } from 'lodash'

export default {
  name: 'ATree',
  props: {
    myFuncList: { type: Array },
    mode: { type: String },
    isDisabled: { type: Boolean, default: false }
  },
  data () {
    return {
      checkList: []
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
      if (this.mode == 'create') {
        this.$emit('check', this.checkList)
      } else {
        this.$refs.tree.setCheckedKeys(this.checkList)
        this.$emit('check', this.checkList)
      }
    },
    checkBoxValue (data, checked, indeterminate) {
      this.checkList = this.$refs.tree.getCheckedKeys()
      let halfcheck = this.$refs.tree.getHalfCheckedKeys()
      this.$emit('check', this.checkList, halfcheck)
    }
  }
}
</script>
<style scope>
</style>
