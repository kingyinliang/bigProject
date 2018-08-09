<template>
  <el-dialog
    title="功能分配"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div style="height: 300px;overflow: auto">
      <el-tree
        :data="menuList"
        :props="menuListTreeProps"
        node-key="menuId"
        ref="menuListTree"
        :default-expand-all="true"
        show-checkbox>
      </el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeDataTranslate } from '@/net/validate'
import {MAIN_API} from '@/api/api'
export default {
  name: 'RoleAdd',
  data () {
    return {
      visible: false,
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  mounted () {
  },
  methods: {
    // 获取功能
    init (id) {
      this.$http(`${MAIN_API.MENULIST_API}`, 'GET', {}).then(({data}) => {
        console.log(data)
        this.menuList = treeDataTranslate(data, 'menuId')
        console.log(this.menuList)
      }).then(() => {
        this.visible = true
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
