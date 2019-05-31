<template>
  <el-row>
    <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
      <div class="main">
        <el-card class="newCard">
          <el-row type="flex">
            <el-col>
              <el-form :model="params" size="small" :inline="true" label-position="right" >
                <el-form-item label="生产工厂：" >
                  <el-select v-model="params.factoryId" style="width:150px" @change="changeOptions('factory')" >
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in factoryList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生产车间：">
                  <el-select v-model="params.workshopId"  style="width:150px" @change="changeOptions('workshop')">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in workshopList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col style='width:100px'>
              <el-button type="primary" size="small"  @click="getDataList()"  v-if="isAuth('prs:material:list')">查询</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-row v-if="searched" style="margin-top:10px; background-color:#fff">
          <el-col :span="24">
            <el-row type="flex" justify="space-around" style="margin:20px 0px">
              <div  class="pot-box">
                <div class="pot-title">
                </div>
              </div>
               <div  class="pot-box">
              </div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import {BASICDATA_API} from '@/api/api'

@Component({
  components: {
  }
})

export default class Index extends Vue {
  // 将common中的参数复制一份到本地
  params = JSON.parse(JSON.stringify(this.$store.state.common.GranaryWheatPot))
  factoryList = []
  workshopList = []
  dataList = []
  searched: boolean = true
  mounted () {
    this.getFactory()
    this.getWorkshop(this.params.factoryId)
  }
  isAuth (key) {
    return Vue.prototype.isAuth(key)
  }
  get mainTabs () {
    return this.$store.state.common.mainTabs
  }
  set mainTabs (val) {
    this.$store.commit('common/updateMainTabs', val)
  }
  changeOptions (flag: string) {
    if (flag === 'factory') {
      let item = this.factoryList.find(ele => ele.deptId === this.params.factoryId)
      this.params.factoryName = item ? item.deptName : ''
    } else if (flag === 'workshop') {
      let item = this.workshopList.find(ele => ele.deptId === this.params.workshopId)
      this.params.workshopName = item ? item.deptName : ''
    }
  }
  // 获取工厂
  getFactory () {
    this.factoryList = []
    Vue.prototype.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, `POST`, {}, false, false, false).then((res) => {
      if (res.data.code === 0) {
        this.factoryList = res.data.typeList
      } else {
        this.$message.error(res.data.msg)
      }
    })
  }
  // 根据工厂获车间
  getWorkshop (fid: string) {
    this.workshopList = []
    if (fid) {
      Vue.prototype.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: fid, deptName: '粮仓'}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.workshopList = res.data.typeList
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
  // 保存首页参数
  setStore (params) {
    this.$store.commit('common/updateGranaryWheatPot', params)
  }
  getDataList () {
    if (this.params.factoryId === '') {
      this.$message.error('请选择工厂')
      return
    }
    this.setStore(this.params)
    this.searched = true
    let params = {
      factory: this.params.factoryId,
      workShop: this.params.workshopId
    }
    this.retrieveWheatPotList(params)
  }
  retrieveWheatPotList (params) {
    this.dataList = []
  }
  @Watch('params', {deep: true})
  onChangeValue (newVal: string, oldVal: string) {
    this.searched = false
  }
  @Watch('params.factoryId')
  onFactoryValue (newVal: string, oldVal: string) {
    this.params.workshopId = ''
    this.params.workshopName = ''
    this.getWorkshop(newVal)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_common.scss';
.pot-box {
  width:552px;
  height:498px;
  box-shadow:0px 4px 4px 0px rgba(0,0,0,0.09);
  border-radius:6px;
  border:1px solid rgba(0,0,0,0.09);
}
.rowButton{
  button{
    margin: 0px 3px!important;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
