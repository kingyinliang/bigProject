<template>
  <el-dialog
    :title="type? id? '修改类型':'新增类型':id? '修改参数':'新增参数'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div style="height: 300px;overflow: auto">
      <el-form :model="dataForm" :rules="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
        <el-form-item label="参数类型编码">
          <span v-if="!type">{{dataForm.holderNo}}</span>
          <el-input v-model="dataForm.holderNo" placeholder="手动输入" v-if="type"></el-input>
        </el-form-item>
        <el-form-item label="参数类型名称">
          <span v-if="!type">{{dataForm.holderNo}}</span>
          <el-input v-model="dataForm.holderNo" placeholder="手动输入" v-if="type"></el-input>
        </el-form-item>
        <el-form-item label="参数编码" v-if="!type">
          <el-input v-model="dataForm.holderNo" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="参数名称" v-if="!type">
          <el-input v-model="dataForm.holderNo" placeholder="手动输入"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'ParameterAddorUpdate',
  data () {
    return {
      id: false,
      dataForm: {},
      visible: false,
      type: true
    }
  },
  mounted () {
  },
  methods: {
    init (str, id) {
      if (str === 'type') {
        this.type = true
      } else {
        this.type = false
      }
      if (id) {
        this.id = id
      } else {
        this.id = false
      }
      this.visible = true
    },
    dataFormSubmit () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST').then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  computed: {
  },
  components: {}
}
</script>

<style scoped>

</style>
