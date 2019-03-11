export class WorkHour {
  orderNo: string = '108434028490'
  process: string = '煮豆'
  kojimakingRoom: string = '一号曲房'
  prepareTime: number = 2
  prepareTimeUnit: string = 'H'
  manualTime: number = 8
  manualTimeUnit: string = 'H'
  machineTime: number = 20
  machineTimeUnit: string = 'H'
  remark: string = 'good'
  // 不可编辑
  disabled: boolean = true
  // constructor () {
  // }
  // constructor (classType: string, deptId: string, dinner: number, endDate: string, startDate: string,
  //              orderId: string, productDate: string, remark: string, userId: string[], userType: string) {
  //     this.classType = classType
  //     this.deptId = deptId
  //     this.dinner = dinner
  //     this.endDate = endDate
  //     this.startDate = startDate
  //     this.orderId = orderId
  //     this.productDate = productDate
  //     this.remark = remark
  //     this.userId = userId
  //     this.userType = userType
  // }
}

export class InStock {
  orderNo: string = '108434028490'
  kojimakingRoom: string = '一号曲房'
  beanNumber: number = 232
  wheatNumber: number = 3299
  saltNumber: number = 4050
  inStockMaterial: string = '小麦粉'
  inStockNumber: number = 3282
  inStockBatch: string = '273249000000'
  unit: string = 'L'
  changer: string = '周团子'
  changeTime: string = '2019-01-12 10:12:34'
}

export class Material {
  orderNo: string = '108434028490'
  kojimakingRoom: string = '一号曲房'
  material: string = '小麦'
  container: string = '1号粮仓'
  materialBatch: string = '73943840000'
  materialNumber: number = 43829
  unit: string = 'KG'
  changer: string = '周团子'
  changeTime: string = '2019-01-12 10:12:34'
}
