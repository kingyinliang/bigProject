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
                <el-form-item label="布浆线：">
                  <el-select v-model="params.clothLineId" style="width:150px" >
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in workshopList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="领用日期：" >
                  <el-date-picker type="date" v-model="params.applyDate" value-format="yyyy-MM-dd" style="width:150px"></el-date-picker>
                </el-form-item>
                <el-form-item label="提交人员："  >
                  <div style="border-bottom: 1px solid #D8D8D8;width:150px">张三(18090027)</div>
                </el-form-item>
                <el-form-item label="提交日期：" >
                  <div style="border-bottom: 1px solid #D8D8D8;width:150px">2019-02-03</div>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col style='width:180px'>
              <div style="float:right; line-height:31px;font-size: 14px">
                <div style="float:left">
                  <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890f' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
                </div>
                <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="rowButton" >
            <el-button type="primary" size="small" style='float:right;' @click="getOrderList()"  v-if="isMyAuth">提交</el-button>
            <el-button type="primary" size="small" style='float:right;' @click="getOrderList()"  v-if="isMyAuth">保存</el-button>
            <el-button type="primary" size="small" style='float:right;' @click="getOrderList()"  v-if="isMyAuth">编辑</el-button>
            <el-button type="primary" size="small" style='float:right;' @click="getOrderList()"  v-if="isMyAuth">查询</el-button>
          </el-row>
        </el-card>
        <el-row v-if="searched" style="margin-top:10px;background-color:#fff">
          <el-col :span="24">
            <el-row type="flex" justify="center" style="margin-top:20px">
              <div style='width:217px;height:250px;border-radius:2px;border:1px solid rgba(232,232,232,1);margin-right:50px;'>
                <div style="height:40px;line-height:40px;background:rgba(235,235,235,1);border-radius:4px 4px 0px 0px;" >
                  <span style="font-size:14px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,0.65);margin-left:5px;">1#暂存罐</span>
                  <span style="font-size:14px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,0.65);float:right;margin-right:5px;">领用中</span>
                </div>
                <div class='img' style="width:120px;height:120px;margin:auto;margin-top:16px;">
                </div>
                <div style="marginTop:20px;display:flex;justify-content:center">
                  <div style="width:72px;height:24px;background:rgba(24,144,255,1);border-radius:4px;border:1px solid rgba(0,0,0,0.25);text-align:center; cursor:pointer;">
                    <span style="line-height:24px;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:#fff;">入罐开始</span>
                  </div>
                  <div style="width:72px;height:24px;margin-left:8px;border-radius:4px;border:1px solid rgba(0,0,0,0.25);text-align:center; cursor:pointer;">
                    <span style="line-height:24px;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:#000;">入罐结束</span>
                  </div>
                </div>
              </div>
              <div style='width:217px;height:250px;border-radius:2px;border:1px solid rgba(232,232,232,1)'>
                <div style="height:40px;line-height:40px;background:rgba(235,235,235,1);border-radius:4px 4px 0px 0px;" >
                  <span style="font-size:14px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,0.65);margin-left:5px;">1#暂存罐</span>
                  <span style="font-size:14px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,0.65);float:right;margin-right:5px;">领用中</span>
                </div>
                <div class='img' style="width:120px;height:120px;margin:auto;margin-top:16px;">
                </div>
                <div style="marginTop:20px;display:flex;justify-content:center">
                  <div style="width:72px;height:24px;background:rgba(24,144,255,1);border-radius:4px;border:1px solid rgba(0,0,0,0.25);text-align:center; cursor:pointer;">
                    <span style="line-height:24px;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:#fff;">入罐开始</span>
                  </div>
                  <div style="width:72px;height:24px;margin-left:8px;border-radius:4px;border:1px solid rgba(0,0,0,0.25);text-align:center; cursor:pointer;">
                    <span style="line-height:24px;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:#000;">入罐结束</span>
                  </div>
                </div>
              </div>
            </el-row>
            <el-row>
              <el-table header-row-class-name="tableHead"  border tooltip-effect="dark" >
                <el-table-column type="index" width="55" label="序号"></el-table-column>
                <el-table-column label="布浆线" >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="暂存罐" >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="发酵罐号">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="批次"  >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="发酵剩余量" width="100">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="起始数" >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="终止数" >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="打料数" >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="暂存剩余量" width="100">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="单位" >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="备注" >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="操作时间" >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="操作人" >
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {BASICDATA_API} from '@/api/api'
import {dateFormat} from '@/net/validate'
import {Vue, Component, Watch} from 'vue-property-decorator'

@Component({
  components: {
  }
})

export default class Index extends Vue {
  // 将common中的参数复制一份到本地
  params = JSON.parse(JSON.stringify(this.$store.state.common.SqueezeWorkshop))
  factoryList = []
  workshopList = []
  searched: boolean = true
  disabled: boolean = true
  orderStatus: string = 'noPass'
  mounted () {
    this.params.applyDate = dateFormat(new Date(), 'yyyy-MM-dd')
    this.getFactory()
    this.getWorkshop(this.params.factoryId)
  }
  isAuth (key) {
    return Vue.prototype.isAuth(key)
  }
  get isMyAuth () {
    return true
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
        if (!this.params.factoryId) {
          this.params.factoryId = res.data.typeList[0].deptId
        }
      } else {
        this.$message.error(res.data.msg)
      }
    })
  }
  // 根据工厂获车间
  getWorkshop (fid: string) {
    this.workshopList = []
    if (fid) {
      Vue.prototype.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: fid, deptName: '制曲'}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.workshopList = res.data.typeList
          if (!this.params.factoryId) {
            this.params.workshopId = res.data.typeList[0].deptId
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
  setDisabled (flag: boolean) {
    this.disabled = flag
  }
  setStore (params) {
    this.$store.commit('common/updateSqueezeWorkshop', params)
  }
  getOrderList () {
    if (this.params.factoryId === '') {
      this.$message.error('请选择工厂')
      return
    }
    if (this.params.workshopId === '') {
      this.$message.error('请选择车间')
      return
    }
    if (this.params.clothLineId === '') {
      this.$message.error('请选择布浆线')
      return
    }
    if (this.params.applyDate === null || this.params.applyDate === '') {
      this.$message.error('请选择领用日期')
      return
    }
    // 保存选项值到common store
    this.setStore(this.params)
    this.searched = true
    let params = {
      factory: this.params.factoryId,
      workShop: this.params.workshopId,
      clothLine: this.params.clothLineId,
      applyDate: this.params.applyDate
    }
    this.retrieveOrderList(params)
  }
  retrieveOrderList (params) {
  }
  @Watch('params', {deep: true})
  onChangeValue (newVal: string, oldVal: string) {
    this.searched = false
    this.disabled = true
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
.el-form-item__content{
  height: 32px;
  border-bottom: 1px solid #D8D8D8;
}
</style>
<style lang="scss" scoped>
.img{
  background: url('~@/assets/img/sq_G1.png')
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
