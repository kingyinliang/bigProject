export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 导航条, 布局风格, defalut(默认) / inverse(反向)
    navbarLayoutType: 'default',
    // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
    sidebarLayoutSkin: 'dark',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 主入口标签页
    mainTabs: [],
    mainTabsActiveName: '',
    // 包装车间
    Pkgfactoryid: '',
    PkgworkShop: '',
    PkgproductDate: '',
    // 包装车间数据录入传值
    PkgorderNo: '',
    // 炒麦车间
    FWworkShop: '', // 车间
    FWworkShopName: '',
    FWfactoryid: '', // 工厂
    FWfactoryName: '',
    FWproductLine: '', // 产线
    FWproductLineName: '',
    FWproductDate: '', // 生产日期
    FWorderId: '',
    FWorderNo: '',
    // 脱皮产线
    PWorder: {
      orderId: '',
      orderNo: '',
      productLine: '', // 产线
      productLineName: ''
    }
  },
  mutations: {
    updateDocumentClientHeight (state, height) {
      state.documentClientHeight = height
    },
    updateNavbarLayoutType (state, type) {
      state.navbarLayoutType = type
    },
    updateSidebarLayoutSkin (state, skin) {
      state.sidebarLayoutSkin = skin
    },
    updateSidebarFold (state, fold) {
      state.sidebarFold = fold
    },
    updateMenuList (state, list) {
      state.menuList = list
    },
    updateMenuActiveName (state, name) {
      state.menuActiveName = name
    },
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    },
    updateFactoryid (state, name) {
      state.Pkgfactoryid = name
    },
    updateWorkShop (state, name) {
      state.PkgworkShop = name
    },
    updateProductDate (state, name) {
      state.PkgproductDate = name
    },
    updateOrderNo (state, name) {
      state.PkgorderNo = name
    },
    updateFWFactoryid (state, name) {
      state.FWfactoryid = name
    },
    updateFWWorkShop (state, name) {
      state.FWworkShop = name
    },
    updateFWProductDate (state, name) {
      state.FWproductDate = name
    },
    updateFWOrderNo (state, name) {
      state.FWorderNo = name
    },
    updateFWfactoryName (state, name) {
      state.FWfactoryName = name
    },
    updateFWWorkShopName (state, name) {
      state.FWworkShopName = name
    },
    updateFWorderId (state, name) {
      state.FWorderId = name
    },
    updateFWproductLine (state, name) {
      state.FWproductLine = name
    },
    updateFWproductLineName (state, name) {
      state.FWproductLineName = name
    },
    /* pw 小麦 start */
    updatePWorder (state, name) {
      state.PWorder = name
    },
    updatePWorderId (state, name) {
      state.PWorder.orderId = name
    },
    updatePWorderNo (state, name) {
      state.PWorder.orderNo = name
    },
    updatePWproductLine (state, name) {
      state.PWorder.PWproductLine = name
    },
    updatePWproductLineName (state, name) {
      state.PWorder.PWproductLineName = name
    }
    /* pw 小麦 end */
  }
}
