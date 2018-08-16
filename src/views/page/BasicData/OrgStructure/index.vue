<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>组织架构</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>组织架构</h3>
    </div>
    <div class="main">
      <el-card>
        <el-row :gutter="20">
          <div style="margin-bottom: 20px;padding-left: 20px">
            <el-input placeholder="部门名称" v-model="form.name" style="width: 300px">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button>查询</el-button>
          </div>
          <el-col :span="8">
            <el-card class="orgcard">
              <div slot="header" class="clearfix">
                <span>组织架构一览</span>
              </div>
              <el-tree :data="OrgTree" default-expand-all @node-contextmenu="showtab1" @node-click="setdetail"></el-tree>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card class="orgcard">
              <div slot="header" class="clearfix">
                <span>组织详细信息</span>
              </div>
              <div>
                <el-form :model="OrgDetail" size="small" label-width="110px">
                  <el-form-item label="部门编码" >
                    <span v-if="update">{{OrgDetail.deptCode}}</span>
                    <el-input v-model="OrgDetail.deptCode" v-else></el-input>
                  </el-form-item>
                  <el-form-item label="部门名称" >
                    <span v-if="update">{{OrgDetail.deptName}}</span>
                    <el-input v-model="OrgDetail.deptName" v-else></el-input>
                  </el-form-item>
                  <el-form-item label="上级部门" >
                    <span>{{OrgDetail.parentId}}</span>
                  </el-form-item>
                  <el-form-item label="部门类型" >
                    <span v-if="update">{{OrgDetail.deptType}}</span>
                    <el-select v-model="OrgDetail.deptType" v-else>
                      <el-option :label="item.code" v-for="(item, index) in dictList" :key="index" :value="item.code"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产线属性" v-if="OrgDetail.deptType === '产线'">
                    <span v-if="update">{{OrgDetail.proLine}}</span>
                    <el-select v-model="OrgDetail.proLine" placeholder="请选择部门类型" style="width: 100%" v-else>
                      <el-option label="普通产线" value="普通产线"></el-option>
                      <el-option label="二合一" value="二合一"></el-option>
                      <el-option label="礼盒" value="礼盒"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产线图片" v-if="OrgDetail.deptType === '产线'">
                    <img :src="OrgDetail.picUrl" alt="" v-if="update">
                    <el-upload
                      action="http://localhost:8080/sys/dept/fileUpLoad"
                      :limit="1"
                      :headers="heads"
                      list-type="picture"
                      :file-list="fileList"
                      :on-success="addfile2" v-else>
                      <el-button size="small" type="primary">选取文件</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="联系人" >
                    <span v-if="update">{{OrgDetail.lxr}}</span>
                    <el-input v-model="OrgDetail.lxr" v-else></el-input>
                  </el-form-item>
                  <el-form-item label="电话" >
                    <span v-if="update">{{OrgDetail.phone}}</span>
                    <el-input v-model="OrgDetail.phone" v-else></el-input>
                  </el-form-item>
                  <el-form-item label="备注" >
                    <span v-if="update">{{OrgDetail.remark}}</span>
                    <el-input type="textarea" v-model="OrgDetail.remark" v-else></el-input>
                  </el-form-item>
                  <div style="text-align: center">
                    <el-button @click="update = !update">编辑</el-button>
                    <el-button @click="savedatail">保存</el-button>
                    <el-button @click="deleteorg">删除</el-button>
                  </div>
                </el-form>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogFormVisible1" @close="clearForm('addDep')" :title="sibling?'新增同级':'新增下级'" id="adddepform">
          <el-form :model="addDep" size="small" label-position="left" label-width="100px">
            <el-form-item label="部门编号">
              <el-input v-model="addDep.deptCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门名称">
              <el-input v-model="addDep.deptName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="上级部门">
              <span v-if="sibling">{{clickTreeNode.parentId}}</span>
              <span v-if="!sibling">{{clickTreeNode.deptId}}</span>
            </el-form-item>
            <el-form-item label="部门类型">
              <!--<el-input v-model="addDep.deptType" auto-complete="off"></el-input>-->
              <el-select v-model="addDep.deptType" placeholder="请选择部门类型" style="width: 100%">
                <el-option :label="item.code" v-for="(item, index) in dictList" :key="index" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产线属性" v-if="addDep.deptType== '产线'">
              <el-select v-model="addDep.proLine" placeholder="请选择产线属性" style="width: 100%">
                <el-option label="普通产线" value="普通产线"></el-option>
                <el-option label="二合一" value="二合一"></el-option>
                <el-option label="礼盒" value="礼盒"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产线图片" v-if="addDep.deptType== 5">
              <el-upload
                action="http://localhost:8080/sys/dept/fileUpLoad"
                :limit="1"
                list-type="picture"
                :headers="heads"
                :on-success="addfile">
                <el-button size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="addDep.lxr" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="addDep.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="addDep.remark"></el-input>
            </el-form-item>
            <div style="text-align: center">
              <el-button @click="addOrg">保存</el-button>
              <el-button @click="closethis">关闭</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="dialogFormVisible4" @close="clearForm('adddepform')" title="班组维护">
          <el-form :model="adddepform" label-position="left" label-width="100px">
            <el-form-item label="班组编码">
              <el-input v-model="adddepform.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="班组名称">
              <el-input v-model="adddepform.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="上级部门">
              <el-input v-model="adddepform.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门类型">
              <el-select v-model="adddepform.name" auto-complete="off">
                <el-option :label="item.code" v-for="(item, index) in dictList" :key="index" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="adddepform.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="adddepform.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="adddepform.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
        <ul id = "menu" v-show = "menuVisible">
          <li class="menuli" @click="dialogFormVisible1 = true;sibling = true">新增同级</li>
          <li class="menuli" @click="dialogFormVisible1 = true;sibling = false">新增下级</li>
          <!--<li class="menuli" @click="team()">班组维护</li>-->
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>
import {BASICDATA_API, SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      form: {},
      adddepform: {
        name: ''
      },
      dictList: [],
      fileList: [{}],
      menuVisible: false,
      orgid: null,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      heads: [],
      sibling: true,
      update: true,
      OrgTree: [],
      OrgDetail: {},
      addDep: {},
      clickTreeNode: {}
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (e.target.className !== 'menuli') this.menuVisible = false
    })
    this.heads = {token: this.$cookie.get('token')}
    this.getTree()
    this.getDictList()
  },
  ready () {
    document.addEventListener('click', (e) => {
      console.log(e.target)
      if (!this.$el.contains(e.target)) this.menuVisible = false
    })
  },
  methods: {
    // 获取组织结构树
    getTree () {
      this.$http(`${BASICDATA_API.ORGSTRUCTURE_API}`, 'GET', {}).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.OrgTree = data.deptList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 容器参数下拉
    getDictList () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=DEPT_TYPE`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.dictList = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 表格自定义序号
    indexMethod (index) {
      return index + 1
    },
    // 设置组织详情
    setdetail (data) {
      this.$http(`${BASICDATA_API.ORGDETAIL_API}/${data.deptId}`, 'GET').then(({data}) => {
        if (data.code === 0) {
          this.OrgDetail = data.dept
        } else {
          this.$message.error(data.msg)
        }
      })
      this.fileList[0].name = this.OrgDetail.fileName
      this.fileList[0].url = this.OrgDetail.picUrl
    },
    // 右键菜单
    showtab1 (event, object, value, element) {
      this.clickTreeNode = object
      this.menuVisible = true
      let menu = document.querySelector('#menu')
      menu.style.left = event.clientX + 'px'
      menu.style.top = event.clientY + 'px'
    },
    // 班组维护
    team () {
      if (this.clickTreeNode.deptType === '班组') {
        this.dialogFormVisible4 = true
      } else {
        this.menuVisible = false
        this.$message.error('当前不是班组，不能班组维护')
      }
    },
    // 上传图片图片回调 新增
    addfile (res, file) {
      this.addDep.picUrl = res.picUrl
      this.addDep.fileName = res.fileName
    },
    // 上传图片回调 修改
    addfile2 (res, file) {
      console.log(this.fileList)
      this.OrgDetail.picUrl = res.picUrl
      this.OrgDetail.fileName = res.fileName
    },
    closethis () {
      console.log(this.addDep)
      this.dialogFormVisible1 = false
    },
    // 保存
    savedatail () {
      this.$confirm('确认修改部门, 是否继续?', '修改部门', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http(`${BASICDATA_API.SAVEORG_API}`, 'POST', this.OrgDetail).then(({data}) => {
          if (data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getTree()
            this.OrgDetail = {}
            this.fileList = [{}]
            this.update = true
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    //  删除
    deleteorg () {
      this.$confirm('确认删除部门, 是否继续?', '删除部门', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http(`${BASICDATA_API.DELETEORG_API}`, 'GET', {
          deptId: this.OrgDetail.deptId
        }).then(({data}) => {
          console.log(data)
          if (data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getTree()
            this.OrgDetail = {}
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    //  新增
    addOrg () {
      if (this.sibling) {
        this.addDep.parentId = this.clickTreeNode.parentId
      } else {
        this.addDep.parentId = this.clickTreeNode.deptId
      }
      this.$http(`${BASICDATA_API.ADDORG_API}`, 'POST', this.addDep).then(({data}) => {
        if (data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getTree()
          this.addDep = {}
          this.dialogFormVisible1 = false
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
  .el-card__header {
    font-size: 14px;
    padding: 13px 20px;
    background-color: #f9f9f9;
    color: black;
    font-weight: bold;
  }
  .head{
    width: 100%;
    background: white;
    padding: 20px 24px 0 24px;
    h3{
      font-size: 20px;
      font-weight: bold;
      line-height: 50px;
    }
  }
  .rightmain{
    flex: 1;
  }
  #menu{
    cursor: pointer;
    z-index: 99;
    padding: 10px;
    margin: 0;
    list-style: none;
    position: fixed;
    background: white;
    border-radius: 5px;
    box-shadow: 2px 2px 25px 5px rgba(213,221,238,.45);
    li{
      line-height: 28px;
    }
  }
  #adddepform{
    .el-form-item{
      margin-bottom: 5px;
    }
  }
</style>
<style>
  .orgcard .el-card__body{
    height: 450px;
    overflow: auto;
  }
</style>
