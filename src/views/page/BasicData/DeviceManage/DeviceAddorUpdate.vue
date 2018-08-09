<template>
  <el-dialog
    title="功能分配"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-form :model="form" size="small" label-width="110px" class="devicedialog">
        <el-form-item label="设备名称">
          <el-input v-model="form.param" placeholder="手工录入"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="form.param" placeholder="手工录入"></el-input>
        </el-form-item>
        <el-form-item label="设备描述">
          <el-input v-model="form.param" placeholder="手工录入"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DeviceAddorUpdate',
  data () {
    return {
      visible: false
    }
  },
  mounted () {
  },
  methods: {
    init (deptId, id) {
      this.visible = true
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
