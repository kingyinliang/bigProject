// let HOST = 'http://localhost:8080'
// let HOST = 'http://10.8.4.153:50080/api'
// let HOST = 'http://10.10.1.29:8080'
// let HOST = 'http://10.1.1.74:8080'
// let HOST = 'http://10.1.1.148:8080'
// let HOST = 'http://10.10.1.156:8080/xhqy-fc'
// let HOST = 'http://10.10.5.40:8080/xhqy-fc'
// let HOST = 'http://10.10.1.167:8080'
// let HOST = 'http://10.10.1.21:8080/xhqy-fc' // zl
// let HOST = 'http://10.10.1.151:8080/xhqy-fc' // yc
// HOST
let HOST = 'https://apimarket-dev.shinho.net.cn/xhqy-fc' // 开发环境
// let HOST = 'http://alb001-ecs-1995142321.cn-north-1.elb.amazonaws.com.cn/xhqy-fc' // 开发环境alb
// let HOST = 'https://apimarket-test.shinho.net.cn/xhqy-fc'// 测试环境dev
// let HOST = 'https://apimarket.shinho.net.cn/xhqy-fc'// 正式环境master
/*
*MAINapi
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
  MENULIST_API: HOST + '/sys/menu/list',
  /**
   * @property {string} MENULIST_API 功能列表
   */
  UPPASS_API: HOST + '/sys/user/password',
  /**
   * @property {string} MENULIST_API 功能列表
   */
  FILE_API: HOST + '/sys/dept/fileUpLoad',
  /**
   * @property {string} MENULIST_API 功能列表
   */
  PRINTLTK_API: HOST + '/reports/printLtk'
}
/*
*基础数据api
 */
export const BASICDATA_API = {
  /**
   * @property {string} ORGSTRUCTURE_API 组织结构列表
   */
  ORGSTRUCTURE_API: HOST + '/sys/dept/list',
  /**
   * @property {string} ORGSTRUCTURE_API 组织结构详情
   */
  ORGDETAIL_API: HOST + '/sys/dept/info',
  /**
   * @property {string} SAVEORG_API 组织结构 修改
   */
  SAVEORG_API: HOST + '/sys/dept/update',
  /**
   * @property {string} DELETEORG_API 组织结构 删除
   */
  DELETEORG_API: HOST + '/sys/dept/delete',
  /**
   * @property {string} ADDORG_API 组织结构 新增
   */
  ADDORG_API: HOST + '/sys/dept/save',
  /**
   * @property {string} ADDORG_API 组织结构 按部门类型查询
   */
  FINDORG_API: HOST + '/sys/dept/findInfoByType',
  /**
   * @property {string} ADDORG_API 组织结构 按部门id查询车间
   */
  FINDORGBYID_API: HOST + '/sys/dept/findCCById',
  /**
   * @property {string} ADDORG_API 组织结构 按部门id查询子类
   */
  FINDORGBYPARENTID_API: HOST + '/sys/dept/findListByParent',
  /**
   * @property {string} FINDTEAM_API 组织结构 获取班组
   */
  FINDTEAM_API: HOST + '/sys/dept/findProductTeam',
  /**
   * @property {string} SAPLIST_API 物料列表
   */
  SAPLIST_API: HOST + '/sys/sapmaterial/list',
  /**
   * @property {string} SAPLIST_API 物料同步
   */
  SAPUPDATE_API: HOST + '/sys/sapmaterial/syncMaterialThread',
  /**
   * @property {string} SAPLIST_API 获取物料同步状态
   */
  GETSAPUPDATE_API: HOST + '/sys/async/getAsyncState/ASYNC_SAP_MATERIAL',
  /**
   * @property {string} SAPDETAIL_API 物料详情
   */
  SAPDETAIL_API: HOST + '/sys/sapmaterialitem/info',
  // 容器管理
  /**
   * @property {string} CONTAINERLIST_API 容器列表 不带权限
   */
  CONTAINERLIST_API: HOST + '/sys/holder/list',
  /**
   * @property {string} CONTAINERLIST_API 容器列表 带权限
   */
  CONTAINERLIST1_API: HOST + '/sys/holder/checkList',
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
   * @property {string} CONTAINERDEL_API 设备列表 不带权限
   */
  DEVICELIST_API: HOST + '/sys/device/list',
  /**
   * @property {string} DEVICELIST1_API 设备列表 带权限
   */
  DEVICELIST1_API: HOST + '/sys/device/checkList',
  /**
   * @property {string} DEVICEDEL_API 设备删除
   */
  DEVICEDEL_API: HOST + '/sys/device/delete',
  /**
   * @property {string} DEVICEADD_API 设备新增
   */
  DEVICEADD_API: HOST + '/sys/device/save',
  /**
   * @property {string} DEVICEADD_API 设备修改
   */
  DEVICEUPDATE_API: HOST + '/sys/device/update',
  // 订单管理
  /**
   * @property {string} ORDERLIST_API 订单列表
   */
  ORDERLIST_API: HOST + '/sys/saporder/list',
  /**
   * @property {string} LOCATIONLIST_API 库位列表
   */
  LOCATIONLIST_API: HOST + '/sys/sto/list',
  /**
   * @property {string} LOCATIONADD_API 库位新增
   */
  LOCATIONADD_API: HOST + '/sys/sto/save',
  /**
   * @property {string} LOCATIONDEL_API 库位删除
   */
  LOCATIONDEL_API: HOST + '/sys/sto/delete',
  /**
   * @property {string} LOCATIONDEL_API 获取全部物料
   */
  SERCHSAPLIST_API: HOST + '/sys/sapmaterial/findAllList',
  /**
   * @property {string} FINDSAP_API 获取全部物料
   */
  FINDSAP_API: HOST + '/sys/sapmaterialitem/productList',
  /**
   * @property {string} SAPORDERUPDATE_API 同步订单
   */
  SAPORDERUPDATE_API: HOST + '/sys/saporder/syncOrderThread',
  /**
   * @property {string} SAPORDERUPDATE_API 获取同步订单状态
   */
  GETSAPORDERUPDATE_API: HOST + '/sys/async/getAsyncState/ASYNC_SAP_ORDER',
  /**
   * @property {string} CAPALIST_API 产能列表
   */
  CAPALIST_API: HOST + '/sys/capacity/listCapa',
  /**
   * @property {string} CAPAADDORUPDATE_API 产能新增修改
   */
  CAPAADDORUPDATE_API: HOST + '/sys/capacity/saveOrUpdateCapa',
  /**
   * @property {string} CAPADEL_API 产能删除
   */
  CAPADEL_API: HOST + '/sys/capacity/deleteCapa',
  /**
   * @property {string} SPECLIST_API 规格列表
   */
  SPECLIST_API: HOST + '/sys/spec/listSpec',
  /**
   * @property {string} SPECSAVE_API 规格新增
   */
  SPECSAVE_API: HOST + '/sys/spec/saveSpec',
  /**
   * @property {string} SPECUPDATE_API 规格修改
   */
  SPECUPDATE_API: HOST + '/sys/spec/updateSpec',
  /**
   * @property {string} SPECDEL_API 规格删除
   */
  SPECDEL_API: HOST + '/sys/spec/delSpec'
}
/*
*系统设置api
 */
export const SYSTEMSETUP_API = {
  /**
   * @property {string} PARAMETERLIST_API 参数类型列表
   */
  PARAMETERLIST_API: HOST + '/sys/dict/findListByType',
  /**
   * @property {string} PARAMETERSLIST_API 参数类型列表
   */
  PARAMETERSLIST_API: HOST + '/sys/dict/findListByTypes',
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
   * @property {string} USERLIST1_API 用户列表
   */
  USERLIST1_API: HOST + '/sys/user/checkList',
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
   * @property {string} USERFORTEAM_API 获取所有人员
   */
  USERALL_API: HOST + '/sys/user/listAllOrTeamUser',
  /**
   * @property {string} ROLELIST_API 角色列表
   */
  ROLELIST_API: HOST + '/sys/role/list',
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
  MENUUPDATE_API: HOST + '/sys/menu/update',
  /**
   * @property {string} SCHEDULELIST_API 定时任务
   */
  SCHEDULELIST_API: HOST + '/sys/schedule/list',
  /**
   * @property {string} SCHEDULELIST_API 定时任务删除
   */
  SCHEDULEDEL_API: HOST + '/sys/schedule/delete',
  /**
   * @property {string} SCHEDULELIST_API 定时任务暂停
   */
  SCHEDULEPAUSE_API: HOST + '/sys/schedule/pause',
  /**
   * @property {string} SCHEDULELIST_API 定时任务恢复
   */
  SCHEDULERESUME_API: HOST + '/sys/schedule/resume',
  /**
   * @property {string} SCHEDULELIST_API 定时任务立即执行
   */
  SCHEDULERUN_API: HOST + '/sys/schedule/run',
  /**
   * @property {string} SCHEDULELIST_API 定时任务详情
   */
  SCHEDULEINFO_API: HOST + '/sys/schedule/info',
  /**
   * @property {string} SCHEDULELIST_API 定时任务
   */
  SCHEDULE_API: HOST + '/sys/schedule',
  /**
   * @property {string} SCHEDULELIST_API 日志列表
   */
  LOGLIST_API: HOST + '/sys/scheduleLog/list',
  /**
   * @property {string} SCHEDULELIST_API 失败信息
   */
  LOGINFO_API: HOST + '/sys/scheduleLog/info',
  /**
   * @property {string} USERLISTPASS_API 用户管理
   */
  USERLISTPASS_API: HOST + '/sys/user/userManagementList',
  /**
   * @property {string} PASSWORDRESET_API 用户管理重置密码
   */
  PASSWORDRESET_API: HOST + '/sys/user/reset'
}
/*
*包装车间api
 */
export const PACKAGING_API = {
  /**
   * @property {string} PKGORDELIST_API 包装车间物料换算比例
   */
  PKGBILI_API: HOST + '/sys/sapmaterial/findInfoByCode',
  /**
   * @property {string} PKGORDELIST_API 包装车间订单列表
   */
  PKGORDELIST_API: HOST + '/pkg/order/list',
  /**
   * @property {string} PKGORDERID_API 包装车间orderid
   */
  PKGORDERID_API: HOST + '/pkg/order/selectId',
  /**
   * @property {string} PKGORDERID_API 包装车间order保存
   */
  PKGORDERSAVE_API: HOST + '/pkg/order/save',
  /**
   * @property {string} PKGORDERID_API 包装车间order修改
   */
  PKGORDERUPDATE_API: HOST + '/pkg/order/update',
  /**
   * @property {string} PKGUSERLIST_API 包装车间人员列表
   */
  PKGUSERLIST_API: HOST + '/pkg/user/list',
  /**
   * @property {string} PKGUSERLIST_API 包装车间人员修改
   */
  PKGUSERUPDATE_API: HOST + '/pkg/user/update',
  /**
   * @property {string} PKGUSERSAVE_API 包装车间人员保存
   */
  PKGUSERSAVE_API: HOST + '/pkg/user/save',
  /**
   * @property {string} PKGREADYLIST_API 包装车间准备时间列表
   */
  PKGREADYLIST_API: HOST + '/pkg/ready/list',
  /**
   * @property {string} PKGREADYSAVE_API 包装车间准备时间保存
   */
  PKGREADYSAVE_API: HOST + '/pkg/ready/save',
  /**
   * @property {string} PKGREADYUPDATE_API 包装车间准备时间修改
   */
  PKGREADYUPDATE_API: HOST + '/pkg/ready/update',
  /**
   * @property {string} PKGINLIST_API 包装车间生产入库列表
   */
  PKGINLIST_API: HOST + '/sys/pkgInStorage/list',
  /**
   * @property {string} PKGINSAVE_API 包装车间生产入库保存
   */
  PKGINSAVE_API: HOST + '/sys/pkgInStorage/save',
  /**
   * @property {string} PKGINUPDATE_API 包装车间生产入库修改
   */
  PKGINUPDATE_API: HOST + '/sys/pkgInStorage/update',
  /**
   * @property {string} PKGEXCLIST_API 包装车间异常列表
   */
  PKGEXCLIST_API: HOST + '/pkg/exc/list',
  /**
   * @property {string} PKGEXCSAVE_API 包装车间异常保存
   */
  PKGEXCSAVE_API: HOST + '/pkg/exc/save',
  /**
   * @property {string} PKGEXCUPDATE_API 包装车间异常修改
   */
  PKGEXCUPDATE_API: HOST + '/pkg/exc/update',
  /**
   * @property {string} PKGEXCUPDATE_API 包装车间物料领用列表
   */
  PKGSPALIST_API: HOST + '/pkg/material/list',
  /**
   * @property {string} PKGEXCUPDATE_API 包装车间物料领用保存
   */
  PKGSPASAVE_API: HOST + '/pkg/material/save',
  /**
   * @property {string} PKGEXCUPDATE_API 包装车间物料领用修改 半成品
   */
  PKGSPAUPDATES_API: HOST + '/pkg/material/update/semi',
  /**
   * @property {string} PKGEXCUPDATE_API 包装车间物料领用修改 包材
   */
  PKGSPAUPDATEP_API: HOST + '/pkg/material/update/packing',
  /**
   * @property {string} PKGGERMSLIST_API 包装车间待杀菌数量列表
   */
  PKGGERMSLIST_API: HOST + '/pkg/germs/list',
  /**
   * @property {string} PKGGERMSSAVE_API 包装车间待杀菌数量保存
   */
  PKGGERMSSAVE_API: HOST + '/pkg/germs/save',
  /**
   * @property {string} PKGGERMSUPDATE_API 包装车间待杀菌数量修改
   */
  PKGGERMSUPDATE_API: HOST + '/pkg/germs/update',
  /**
   * @property {string} PKGTEXTLIST_API 包装车间文本记录列表
   */
  PKGTEXTLIST_API: HOST + '/pkg/text/list',
  /**
   * @property {string} PKGTEXTSAVE_API 包装车间文本记录保存
   */
  PKGTEXTSAVE_API: HOST + '/pkg/text/save',
  /**
   * @property {string} PKGTEXTUPDATE_API 包装车间文本记录修改
   */
  PKGTEXTUPDATE_API: HOST + '/pkg/text/update',
  /**
   * @property {string} PKGSAVEFORM_API 包装车间提交 报工
   */
  PKGSAVEFORM_API: HOST + '/verify/time/save',
  /**
   * @property {string} PKGSAVEFORMIN_API 包装车间提交 入库
   */
  PKGSAVEFORMIN_API: HOST + '/sys/pkgInStorage/updatePkgInSto',
  /**
   * @property {string} PKGSAVEFORMIN_API 包装车间提交物料 包材
   */
  PKGSAVEFORMP_API: HOST + '/verify/material/save/packing',
  /**
   * @property {string} PKGSAVEFORMIN_API 包装车间提交物料 半成品
   */
  PKGSAVEFORMS_API: HOST + '/verify/material/save/semi'
}
/*
*机维组api
 */
export const MAINTAIN_API = {
  /**
   * @property {string} MAINTAINLIST_API 机维组列表
   */
  MAINTAINLIST_API: HOST + '/sys/verifyJWZ/findListByParams',
  /**
   * @property {string} MAINTAINSAVE_API 机维组保存
   */
  MAINTAINSAVE_API: HOST + '/sys/verifyJWZ/update',
  /**
   * @property {string} MAINTAINSAVE_API 机维组提交
   */
  MAINTAINSUB_API: HOST + '/sys/verifyJWZ/finished'
}
/*
*立体库api
 */
export const LTK_API = {
  /**
   * @property {string} MAINTAINLIST_API 立体库列表
   */
  LTKLIST_API: HOST + '/sys/verifyLTK/list',
  /**
   * @property {string} MAINTAINSAVE_API 立体库审核
   */
  LTKAUDIT_API: HOST + '/sys/verifyLTK/auditing'
}
/*
*生管审核api
 */
export const AUDIT_API = {
  /**
   * @property {string} AUDITLIST_API 生产入库审核列表
   */
  AUDITLIST_API: HOST + '/sys/verifyInStorage/list',
  /**
   * @property {string} GOAUDIT_API 生产入库审核
   */
  GOAUDIT_API: HOST + '/sys/verifyInStorage/auditing',
  /**
   * @property {string} GOAUDIT_API 生产入库修改
   */
  INUPDATE_API: HOST + '/sys/verifyInStorage/update',
  /**
   * @property {string} AUDITHOURSLIST_API 生产报工列表
   */
  AUDITHOURSLIST_API: HOST + '/verify/time/list',
  /**
   * @property {string} AUDITHOURSUPDATE_API 生产报工审核
   */
  AUDITHOURSUPDATE_API: HOST + '/verify/time/update',
  /**
   * @property {string} AUDITISSUELIST_API 生产发料列表
   */
  AUDITISSUELIST_API: HOST + '/verify/material/list',
  /**
   * @property {string} AUDITLIST_API 生产发料审核
   */
  AUDITISSUEUPDATE_API: HOST + '/verify/material/update'
}
/*
*考勤api
 */
export const AR_API = {
  /**
   * @property {string} ARADD_API 考勤记录新增、保存
   */
  ARADD_API: HOST + '/sys/att/saveAtt',
  /**
   * @property {string} ARSUBORUP_API 考勤记录提交、修改
   */
  ARSUBORUP_API: HOST + '/sys/att/updateAtt',
  /**
   * @property {string} ARLIST_API 考勤记录列表
   */
  ARLIST_API: HOST + '/sys/att/listAtt',
  /**
   * @property {string} ARDELAPI 考勤记录删除
   */
  ARDELAPI: HOST + '/sys/att/deleteAtt',
  /**
   * @property {string} ARAUDITLOG_API 考勤记录审核日志
   */
  ARAUDITLOG_API: HOST + '/sys/att/listRecordAtt',
  /**
   * @property {string} ARAUDIT_API 考勤记录审核
   */
  ARAUDIT_API: HOST + '/sys/att/auditAtt'
}
/*
*报表api
 */
export const REP_API = {
  /**
   * @property {string} ARLIST_API 打印
   */
  REPOUT_API: HOST + '/sys/verifyLTK/exportLtk',
  /**
   * @property {string} REPSAPLIST_API 物料报表
   */
  REPSAPLIST_API: HOST + '/report/form/listMaterial',
  /**
   * @property {string} REPSAPOUTPUT_API 物料报表 导出
   */
  REPSAPOUTPUT_API: HOST + '/report/form/exportMaterial',
  /**
   * @property {string} REPJBSLIST_API JBS产出明细
   */
  REPJBSLIST_API: HOST + '/report/form/listJBS',
  /**
   * @property {string} REPJBSOUTPUT_API JBS产出明细 导出
   */
  REPJBSOUTPUT_API: HOST + '/report/form/exportJBS',
  /**
   * @property {string} REPSAPLIST_API 机维组差异
   */
  REPMADIFFLIST_API: HOST + '/report/form/listJWZPIS',
  /**
   * @property {string} REPMADIFFOUTPUT_API 机维组差异 导出
   */
  REPMADIFFOUTPUT_API: HOST + '/report/form/exportJWZPIS',
  /**
   * @property {string} REPSAPLIST_API 车间异常统计
   */
  REPEXCLIST_API: HOST + '/report/form/listExc',
  /**
   * @property {string} REPEXCOUTPUT_API 车间异常统计 导出
   */
  REPEXCOUTPUT_API: HOST + '/report/form/exportExc',
  /**
   * @property {string} REPPRODUCTMLIST_API 产量月汇总
   */
  REPPRODUCTMLIST_API: HOST + '/report/form/listProductM',
  /**
   * @property {string} REPPRODUCTMOUTPUT_API 产量月汇总 导出
   */
  REPPRODUCTMOUTPUT_API: HOST + '/report/form/exportProductM',
  /**
   * @property {string} REPOUTPUTLIST_API 产量汇总
   */
  REPOUTPUTLIST_API: HOST + '/report/formh/collectList',
  /**
   * @property {string} REPYIELDOUTPUT_API 产量汇总 导出
   */
  REPYIELDOUTPUT_API: HOST + '/report/formh/exportCollect',
  /**
   * @property {string} REPYIELDOUTPUT_API 计时考勤
   */
  REPATTMLIST_API: HOST + '/report/form/listAttM',
  /**
   * @property {string} REPYIELDOUTPUT_API 计时考勤 导出
   */
  REPATTMOUTPUT_API: HOST + '/report/form/exportAttM',
  /**
   * @property {string} REPOUTPUTANDATTMLIST_API 产量&考勤
   */
  REPOUTPUTANDATTMLIST_API: HOST + '/report/formh/collectOnWorkList',
  /**
   * @property {string} REPOUTPUTANDATTMOUTPUT_API 产量&考勤 导出
   */
  REPOUTPUTANDATTMOUTPUT_API: HOST + '/report/formh/exportCheckOnWorkCollect',
  /**
   * @property {string} REPMANHOURLIST_API 车间工时报表
   */
  REPMANHOURLIST_API: HOST + '/report/form/listWorkshopWHoursM',
  /**
   * @property {string} REPMANHOUROUTPUT_API 车间工时报表 导出
   */
  REPMANHOUROUTPUT_API: HOST + '/report/form/exportWorkshopWHoursM',
  /**
   *  车间出勤汇总表
   *  */
  REPATTM_API: HOST + '/report/form/listShopAttM',
  /**
   *  车间出勤汇总表 导出
   *  */
  REPOUTFORWORKOUTPUT_API: HOST + '/report/form/exportShopAttMThread',
  /**
   *  车间出勤汇总表 导出 获取状态
   *  */
  GETREPOUTFORWORKOUTPUT_API: HOST + '/sys/async/getAsyncState/ASYNC_TYPE_EXPORT_SHOP_ATTM',
  /**
   *  包装车间 - 产量总工时、导出
   */
  REPOUTPUTMANHOUR_API: HOST + '/report/formh/totalHoursList',
  REPOUTPUTMANHOUREXPORT_API: HOST + '/report/formh/exportTotalHours'
}
/*
*炒麦api
 */
export const WHT_API = {
  /**
   * @property {string} READYTIME_API 准备时间修改
   */
  READYTIMEUPDATE_API: HOST + '/wht/ready/whtReadyUpdate',
  /**
   * @property {string} READYTIMELIST_API 获取准备时间
   */
  READYTIMELIST_API: HOST + '/wht/ready/whtReadyList',
  /**
   * @property {string} MACHINEIMELIST_API 获取机器工时
   */
  MACHINETIMELIST_API: HOST + '/wht/ready/whtReadyList',
  /**
   * @property {string} MACHINEIMEUPDATE_API 机器工时修改
   */
  MACHINETIMEUPDATE_API: HOST + '/wht/ready/whtMachineUpdate',
  /**
   * @property {string} MACHINETESTUPDATE_API 机器检测列表
   */
  MACHINETESTlist_API: HOST + '/wht/ready/whtCheckRecordList',
  /**
   * @property {string} MACHINETESTUPDATE_API 机器检测列表
   */
  MACHINETESTUPDATE_API: HOST + '/wht/ready/whtCheckRecordUpdate',
  /**
   * 首页人员列表
   */
  CINDEXLISTUSER: HOST + '/wht/user/listUser',
  /**
   * 首页人员新增修改
   */
  CINDEXUPDATEUSER: HOST + '/wht/user/updateUser',
  /**
   * 首页人员删除
   */
  CINDEXDELUSER: HOST + '/wht/user/delUser',
  /**
   * 首页订单接口
   */
  CINDEXORDERLIST_API: HOST + '/wht/order/list',
  /**
   * @property {string} PKGORDERID_API 炒麦车间order修改
   */
  WHTORDERUPDATE_API: HOST + '/wht/order/update',
  /**
   * @property {string} INSTORAGELIST_API 生产入库列表
   */
  INSTORAGELIST_API: HOST + '/sys/whtInStorage/list',
  /**
   * @property {string} INSTORAGESAVE_API 生产入库保存
   */
  INSTORAGESAVE_API: HOST + '/sys/whtInStorage/update',
  /**
   * @property {string} INSTORAGESUBMIT_API 生产入库提交
   */
  INSTORAGESUBMIT_API: HOST + '/sys/whtInStorage/submit',
  /**
   * @property {string} MATERIELSAVEORDER_API pw小麦申请订单
   */
  MATERIELSAVEORDER_API: HOST + '/sys/whtPwMaterial/getSapOrder',
  /**
   * @property {string} MATERIELLIST_API pw小麦list
   */
  MATERIELLIST_API: HOST + '/sys/whtPwMaterial/list',
  /**
   * @property {string} MATERIELSAVE_API pw小麦保存
   */
  MATERIELSAVE_API: HOST + '/sys/whtPwMaterial/update',
  /**
   * @property {string} MATERIELSUBMIT_API pw小麦提交
   */
  MATERIELSUBMIT_API: HOST + '/sys/whtPwMaterial/submit',
  /**
   * @property {string} MATERIELTIMELIST_API pw小麦工时list
   */
  MATERIELTIMELIST_API: HOST + '/wht/pw/timeList',
  /**
   * @property {string} MATERIELTIMEUPDATE_API pw小麦工时update
   */
  MATERIELTIMEUPDATE_API: HOST + '/wht/pw/timeUpdate',
  /**
   * @property {string} MATERIELTIMESUBMIT_API pw小麦工时提交
   */
  PWMATERIELTIMESUBMIT_API: HOST + '/wht/pw/submitPW',
  /**
   * @property {string} MATERIELTIMESUBMIT_API 炒麦报工提交
   */
  MATERIELTIMESUBMIT_API: HOST + '/wht/ready/submitW',
  /**
   * @property {string} APPLYMATERIELLIST_API 物料申请list
   */
  APPLYMATERIELLIST_API: HOST + '/wht/material/list',
  /**
   * @property {string} APPLYMATERIELSAVE_API 物料申请保存
   */
  APPLYMATERIELSAVE_API: HOST + '/wht/material/updateM',
  /**
   * @property {string} APPLYMATERIELSUBMIT_API 物料申请提交
   */
  APPLYMATERIELSUBMIT_API: HOST + '/wht/material/submitM'
}

/*
*制曲api
 */
export const KJM_API = {
  // 订单管理
  /**
   * @property {string} FORMHEAD_API 表头
   */
  FORMHEAD_API: HOST + '/sys/kjmOrderHouse/headList',
  /**
   * @property {string} FORMHEADUPDATE_API 表头修改
   */
  FORMHEADUPDATE_API: HOST + '/sys/kjmOrderHouse/udpateHead',
  /**
   * @property {string} OUTMATERIELLIST_API 出曲原料领用列表
   */
  OUTMATERIELLIST_API: HOST + '/sys/kjmOutMaterial/list',
  /**
   * @property {string} OUTMATERIELSAVE_API 出曲原料领用保存
   */
  OUTMATERIELSAVE_API: HOST + '/sys/kjmOutMaterial/mySaveOrUpdate',
  /**
   * @property {string} OUTMATERIELSUBMIT_API 出曲原料领用提交
   */
  OUTMATERIELSUBMIT_API: HOST + '/sys/kjmOutMaterial/submit',
  /**
   * @property {string} OUTMATERIELLIST_API 出曲生产入库列表
   */
  OUTINLIST_API: HOST + '/sys/kjmOutInStorage/list',
  /**
   * @property {string} OUTMATERIELLIST_API 出曲得入库数据
   */
  OUTINNUMLIST_API: HOST + '/sys/kjmOutInStorage/getThreeNum',
  /**
   * @property {string} OUTMATERIELSAVE_API 出曲生产入库保存
   */
  OUTINSAVE_API: HOST + '/sys/kjmOutInStorage/mySaveOrUpdate',
  /**
   * @property {string} OUTMATERIELSUBMIT_API 出曲生产入库提交
   */
  OUTINSUBMIT_API: HOST + '/sys/kjmOutInStorage/submit',
  /**
   * @property {string} OUTMATERIELLIST_API 出曲工艺控制列表
   */
  OUTTECHLIST_API: HOST + '/sys/kjmOutTech/list',
  /**
   * @property {string} OUTMATERIELSAVE_API 出曲工艺控制保存
   */
  OUTTECHSAVE_API: HOST + '/sys/kjmOutTech/mySaveOrUpdate',
  /**
   * @property {string} OUTTIMELIST_API 工时查询
   */
  OUTTIMELIST_API: HOST + '/kjm/timeSheet/list',
  /**
   * @property {string} OUTTIMEREADYSAVE_API 工时准备时间保存
   */
  OUTTIMEREADYSAVE_API: HOST + '/wht/ready/whtReadyUpdate',
  /**
   * @property {string} OUTTIMEREADYSAVE_API 工时表头保存
   */
  OUTTIMEHEADSAVE_API: HOST + '/kjm/timeSheet/update',
  /**
   * @property {string} OUTTIMEREADYSAVE_API 工时提交
   */
  OUTTIMEHEADSUBMIT_API: HOST + '/kjm/timeSheet/submit',
  /**
   * @property {string} ORDERLIST_API 订单列表
   */
  ORDERLIST_API: HOST + '/sys/kjmOrderHouse/orderlist',
  /**
   * @property {string} ORDERDETAILLIST_API 订单详情列表
   */
  ORDERDETAILLIST_API: HOST + '/sys/kjmOrderHouse/list',
  /**
   * @property {string} SPLITORDERDETAILLIST_API 订单拆分/订单详情修改
   */
  SPLITORDERDETAILLIST_API: HOST + '/sys/kjmOrderHouse/mySaveOrUpdate',
  /**
   * @property {string} DELETEORDERDETAILLIST_API 详情批量删除
   */
  DELETEORDERDETAILLIST_API: HOST + '/sys/kjmOrderHouse/myDelete',
  /**
   * @property {string} KJMAKINGORDERLIST_API 制曲首页查询
   */
  KJMAKINGORDERLIST_API: HOST + '/kjm/order/list',

  /**
   * 煮豆edit
   */
  DOUMATERZHONG_API: HOST + '/kjm/bean/material/update', // 原料 种曲
  DOUHEADER_API: HOST + '/kjm/bean/head/update', // 表头
  DOUMATERWHEAT_API: HOST + '/kjm/bean/wheat/update', // 原料 小麦
  DOUMATERPULP_API: HOST + '/kjm/bean/pulp/update', // 原料 豆粕
  DOUMATERLIST_API: HOST + '/kjm/bean/material/list', // 原料 list
  DOUMATERSUBMITZHONG_API: HOST + '/kjm/bean/material/submit', // 原料 种曲提交
  DOUMATERSUBMITWHEAT_API: HOST + '/kjm/bean/wheat/submit', // 原料 小麦提交
  DOUMATERSUBMITSOY_API: HOST + '/kjm/bean/pulp/submit', // 原料 豆粕提交

  DOUMATERSTATUS_API: HOST + '/kjm/bean/technology/updateStatus', // 原料 状态
  DOUGONGYIZHUSAVE_API: HOST + '/kjm/bean/technology/update', // 工艺 主表
  DOUGONGYIRUISAVE_API: HOST + '/kjm/bean/boiled/update', // 工艺 煮豆润水过程
  DOUGONGYIZHENGSAVE_API: HOST + '/kjm/bean/cooking/update', // 工艺 连续蒸煮
  DOUGONGYIHUNSAVE_API: HOST + '/kjm/bean/blend/update', // 工艺 混合入曲
  DOUGONGYILISTSAVE_API: HOST + '/kjm/bean/technology/list', // 工艺 list
  /**
   * 看曲
   */
  DOUHEAERLIST: HOST + '/kjm/guard/headList', // 表头
  DOULOOKLIST_API: HOST + '/kjm/guard/list', // 工艺 list
  DOULOOKZHUSAVE_API: HOST + '/kjm/guard/tech/update', // 工艺 主表
  DOULOOKKANQUSAVE_API: HOST + '/kjm/guard/record/update', // 工艺 看曲记录
  DOULOOKGANGUANSAVE_API: HOST + '/kjm/guard/feel/update', // 工艺 感官
  DOULOOKSTATUS_API: HOST + '/kjm/guard/tech/updateStatus', // 工艺 状态

  /**
   * @property {string} KJMAKINGCHECKTIME_API 车间审核工时列表
   */
  KJMAKINGCHECKTIME_API: HOST + '/sys/midTimeSheet/list',
  /**
   * @property {string} KJMAKINGCHECKTIMEBACK_API 车间审核工时回退
   */
  KJMAKINGCHECKTIMEBACK_API: HOST + '/sys/midTimeSheet/goBack',
  /**
   * @property {string} KJMAKINGCHECKTIMESUBMIT_API 车间审核工时提交
   */
  KJMAKINGCHECKTIMESUBMIT_API: HOST + '/sys/midTimeSheet/submit',
  /**
   * @property {string} KJMAKINGCHECKSTORAGE_API 车间审核生产入库列表
   */
  KJMAKINGCHECKSTORAGE_API: HOST + '/sys/midInStorage/list',
  /**
   * @property {string} KJMAKINGCHECKSTORAGEBACK_API 车间审核生产入库回退
   */
  KJMAKINGCHECKSTORAGEBACK_API: HOST + '/sys/midInStorage/goBack',
  /**
   * @property {string} KJMAKINGCHECKSTORAGESUBMIT_API 车间审核生产入库提交
   */
  KJMAKINGCHECKSTORAGESUBMIT_API: HOST + '/sys/midInStorage/submit',
  /**
   * @property {string} KJMAKINGCHECKMATERIALE_API 车间审核物料领用列表
   */
  KJMAKINGCHECKMATERIALE_API: HOST + '/sys/midMaterial/list',
  /**
   * @property {string} KJMAKINGCHECKMATERIALEBACK_API 车间审核物料领用回退
   */
  KJMAKINGCHECKMATERIALEBACK_API: HOST + '/sys/midMaterial/goBack',
  /**
   * @property {string} KJMAKINGCHECKMATERIALESUBMIT_API 车间审核物料领用提交
   */
  KJMAKINGCHECKMATERIALESUBMIT_API: HOST + '/sys/midMaterial/submit'
}
