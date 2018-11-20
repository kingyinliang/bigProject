<template>
  <el-row v-loading.fullscreen.lock="lodingS" element-loading-text="加载中">
    <div class="main">
      <el-card class="searchCard">
        <el-row type="flex">
          <el-col>
            <linkage :plantList="plantList"></linkage>
            <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="70px">
              <el-form-item label="品项：">
                <el-select v-model="plantList.material" filterable placeholder="请选择">
                  <el-option label="请选择"  value=""></el-option>
                  <el-option
                    v-for="item in SerchSapList"
                    :key="item.sapCode+' '+item.itemName"
                    :label="item.sapCode+' '+item.itemName"
                    :value="item.sapCode+' '+item.itemName">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生产日期：" class="dateinput">
                <el-date-picker v-model="plantList.commitDateTwo" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 170px"></el-date-picker>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="width: 200px">
            <el-button type="primary" size="small" @click="GetList(true)">查询</el-button>
            <el-button type="primary" size="small" @click="ExportExcel(true)">导出</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </el-row>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      lodingS: false,
      SerchSapList: [],
      dataList: [],
      plantList: {
        material: '',
        factory: '',
        workshop: '',
        productline: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      }
    }
  },
  mounted () {
    this.$http(`${BASICDATA_API.FINDSAP_API}`, 'POST', {params: ''}).then(({data}) => {
      if (data.code === 0) {
        this.SerchSapList = data.list
      } else {
        this.$message.error(data.msg)
      }
    })
  },
  methods: {},
  computed: {},
  components: {
    Linkage: resolve => {
      require(['@/views/page/ReportForms/common/linkage'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
