// let HOST = 'http://localhost:8080'
let HOST = 'http://10.8.4.153:50080/api'
/*
*首页api
 */

export const MAIN_API = {
  /**
   * @property {string} LOGIN_API 登录接口
   * @param {string}
   */
  LOGIN_API: HOST + '/sys/login',
  /**
   * @property {string} USERINFO_API 管理员信息
   */
  USERINFO_API: HOST + '/sys/user/info',
  /**
   * @property {string} LOGOUT_API 退出登录
   */
  LOGOUT_API: HOST + '/sys/logout',
  /**
   * @property {string} NAV_API 列表
   */
  NAV_API: HOST + '/sys/menu/nav',
  /**
   * @property {string} MENULIST_API 功能列表
   */
  MENULIST_API: HOST + '/sys/menu/list'
}
export const BASICDATA_API = {
  /**
   * @property {string} ORGSTRUCTURE_API 组织结构列表
   */
  ORGSTRUCTURE_API: HOST + '/sys/dept/list',
  /**
   * @property {string} SAVEORG_API 组织结构 修改
   */
  SAVEORG_API: HOST + '/sys/dept/update',
  /**
   * @property {string} DELETEORG_API 组织结构 删除
   */
  DELETEORG_API: HOST + '/sys/dept/delete',
  /**
   * @property {string} ADDORG_API 新增
   */
  ADDORG_API: HOST + '/sys/dept/save',
  /**
   * @property {string} SAPLIST_API 物料列表
   */
  SAPLIST_API: HOST + '/sys/sapmaterial/list',
  /**
   * @property {string} SAPDETAIL_API 物料详情
   */
  SAPDETAIL_API: HOST + '/sys/sapmaterialitem/info',
  // 容器管理
  /**
   * @property {string} CONTAINERLIST_API 容器列表
   */
  CONTAINERLIST_API: HOST + '/sys/holder/list',
  /**
   * @property {string} CONTAINERLIST_API 容器详情
   */
  CONTAINERDETAIL_API: HOST + '/sys/holder/findById',
  /**
   * @property {string} CONTAINERADD_API 容器新增
   */
  CONTAINERADD_API: HOST + '/sys/holder/save',
  /**
   * @property {string} CONTAINERUPDATE_API 容器修改
   */
  CONTAINERUPDATE_API: HOST + '/sys/holder/update',
  /**
   * @property {string} CONTAINERDEL_API 容器删除
   */
  CONTAINERDEL_API: HOST + '/sys/holder/delete',
  // 设备管理
  /**
   * @property {string} CONTAINERDEL_API 设备列表
   */
  DEVICELIST_API: HOST + '/sys/device/list',
  /**
   * @property {string} DEVICEDEL_API 设备删除
   */
  DEVICEDEL_API: HOST + '/sys/device/delete',
  /**
   * @property {string} DEVICEADD_API 设备新增
   */
  DEVICEADD_API: HOST + '/sys/device/save',
  // 订单管理
  /**
   * @property {string} ORDERLIST_API 订单列表
   */
  ORDERLIST_API: HOST + '/sys/saporder/list'
}
export const SYSTEMSETUP_API = {
  /**
   * @property {string} PARAMETERLIST_API 参数类型列表
   */
  PARAMETERLIST_API: HOST + '/sys/dict/findListByType',
  /**
   * @property {string} PARAMETERTYPE_API 参数类型
   */
  PARAMETERTYPE_API: HOST + '/sys/dict/list',
  /**
   * @property {string} PARAMETERADD_API 参数新增
   */
  PARAMETERADD_API: HOST + '/sys/dict/save',
  /**
   * @property {string} PARAMETERADD_API 参数删除
   */
  PARAMETERDEL_API: HOST + '/sys/dict/delete',
  /**
   * @property {string} PARAMETERADD_API 参数修改
   */
  PARAMETERUPDATE_API: HOST + '/sys/dict/update',
  /**
   * @property {string} PARAMETERDETAIL_API 参数详情
   */
  PARAMETERDETAIL_API: HOST + '/sys/dict/info',
  /**
   * @property {string} USERLIST_API 用户列表
   */
  USERLIST_API: HOST + '/sys/user/list',
  /**
   * @property {string} ROLELIST_API 角色列表
   */
  ROLELIST_API: HOST + '/sys/role/list',
  /**
   * @property {string} USERDETAIL_API 用户详情
   */
  USERDETAIL_API: HOST + '/sys/user/info',
  /**
   * @property {string} USERUPDATE_API 修改用户
   */
  USERUPDATE_API: HOST + '/sys/user/update',
  /**
   * @property {string} USERADD_API 新增用户
   */
  USERADD_API: HOST + '/sys/user/save',
  /**
   * @property {string} USERDEL_API 删除用户
   */
  USERDEL_API: HOST + '/sys/user/delete',
  /**
   * @property {string} ROLEDETAIL_API 角色详情
   */
  ROLEDETAIL_API: HOST + '/sys/role/info',
  /**
   * @property {string} ROLEUPDATE_API 修改角色
   */
  ROLEUPDATE_API: HOST + '/sys/role/update',
  /**
   * @property {string} ROLEADD_API 新增角色
   */
  ROLEADD_API: HOST + '/sys/role/save',
  /**
   * @property {string} USERDEL_API 删除角色
   */
  ROLEDEL_API: HOST + '/sys/role/delete',
  /**
   * @property {string} USERDEL_API 人员分配修改
   */
  ROLEUSERUPDATE_API: HOST + '/sys/role/updateUser',
  /**
   * @property {string} USERDEL_API 功能分配修改
   */
  ROLEMENUUPDATE_API: HOST + '/sys/role/updateMenu',
  /**
   * @property {string} USERDEL_API 组织架构分配修改
   */
  ROLEDEPTUPDATE_API: HOST + '/sys/role/updateDept',
  /**
   * @property {string} ROLEUSER_API 人员分配
   */
  ROLEUSER_API: HOST + '/sys/role/listUser',
  /**
   * @property {string} LISTMENU_API 功能分配
   */
  LISTMENU_API: HOST + '/sys/role/listMenu',
  /**
   * @property {string} LISTMENU_API 部门分配
   */
  LISTDEPT_API: HOST + '/sys/role/listDept',
  /**
   * @property {string} MENUSELECT 菜单
   */
  MENUSELECT_API: HOST + '/sys/menu/select',
  /**
   * @property {string} MENUINFO 菜单详情
   */
  MENUINFO_API: HOST + '/sys/menu/info',
  /**
   * @property {string} MENUINFO 菜单新增
   */
  MENUADD_API: HOST + '/sys/menu/save',
  /**
   * @property {string} MENUINFO 菜单新增
   */
  MENUDEL_API: HOST + '/sys/menu/delete',
  /**
   * @property {string} MENUINFO 菜单修改
   */
  MENUUPDATE_API: HOST + '/sys/menu/update'
}
