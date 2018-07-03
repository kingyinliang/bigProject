<template>
    <div style="display: flex;flex-direction:column">
      <div class="head">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>基础数据</el-breadcrumb-item>
          <el-breadcrumb-item>组织架构</el-breadcrumb-item>
        </el-breadcrumb>
        <h3>组织架构</h3>
      </div>
      <div class="rightmain">
        <div class="bg">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-tree :data="data" @node-contextmenu="showtab1"></el-tree>
            </el-col>
            <el-col :span="12">

            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footer">
        <p>
          <a href="">帮助</a>
          <a href="">帮助</a>
          <a href="">帮助</a>
        </p>
        <p>Copyright @ 2018 欣和系统研究及运维组飞机稿</p>
      </div>
      <el-dialog :visible.sync="dialogFormVisible1" title="新增部门" id="adddepform">
        <el-form :model="adddepform" label-position="left" label-width="100px">
          <el-form-item label="部门编号">
            <span>部门编号</span>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="adddepform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="上级部门">
            <el-input v-model="adddepform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门类型">
            <el-select v-model="adddepform.name" placeholder="请选择部门类型" style="width: 100%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产线属性">
            <el-select v-model="adddepform.name" placeholder="请选择部门类型" style="width: 100%">
              <el-option label="普通产线" value="shanghai"></el-option>
              <el-option label="二合一" value="beijing"></el-option>
              <el-option label="礼盒" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产线图片">
            <el-upload :auto-upload="false" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="adddepform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="adddepform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="adddepform.name"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormVisible2" title="新增下级"></el-dialog>
      <el-dialog :visible.sync="dialogFormVisible3" title="人员维护"></el-dialog>
      <el-dialog :visible.sync="dialogFormVisible4" title="班组维护">
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
            <el-input v-model="adddepform.name" auto-complete="off"></el-input>
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
      <el-dialog :visible.sync="dialogFormVisible5" title="设备维护"></el-dialog>
      <ul id = "menu" v-show = "menuVisible">
        <li class="menuli" @click="dialogFormVisible1 = true">新增同级</li>
        <li class="menuli" @click="dialogFormVisible2 = true">新增下级</li>
        <li class="menuli" @click="dialogFormVisible3 = true">人员维护</li>
        <li class="menuli" @click="dialogFormVisible4 = true">班组维护</li>
        <li class="menuli" @click="dialogFormVisible5 = true">设备维护</li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      adddepform: {
        name: ''
      },
      data: [{
        label: '9999 欣和总部',
        children: [{
          label: '7100 烟台欣和企业食品有限公司',
          children: [
            {
              label: '制造管理处',
              children: [
                {
                  label: '制曲车间'
                },
                {
                  label: '压榨车间'
                },
                {
                  label: '发酵'
                },
                {
                  label: '杀菌车间'
                },
                {
                  label: '过滤车间'
                },
                {
                  label: '包装车间'
                },
                {
                  label: '压榨车间'
                },
                {
                  label: '发酵'
                },
                {
                  label: '杀菌车间'
                },
                {
                  label: '过滤车间'
                },
                {
                  label: '包装车间'
                }
              ]
            },
            {
              label: '生产管理处',
              children: [
                {
                  label: '计统科'
                },
                {
                  label: '仓管科'
                }
              ]
            }]
        }]
      }],
      menuVisible: false,
      orgid: null,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (e.target.className !== 'menuli') this.menuVisible = false
    })
  },
  ready () {
    document.addEventListener('click', (e) => {
      console.log(e.target)
      if (!this.$el.contains(e.target)) this.menuVisible = false
    })
  },
  methods: {
    showtab1 (event, object, value, element) {
      this.menuVisible = true
      let menu = document.querySelector('#menu')
      menu.style.left = event.clientX + 'px'
      menu.style.top = event.clientY + 'px'
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
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
    padding: 16px 24px;
    .bg{
      background: white;
      width: 100%;
      height: 100%;
      padding: 15px;
    }
  }
  .footer{
    text-align: center;
    width: 100%;
    height: 50px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 20px;
    font-size: 12px;
    a{
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      margin: 0 10px;
    }
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
