export enum EMPTypeList {
  TEMP = '临时工',
  FORMAL = '正式',
  TRANSFER = '借调'
}
export enum DayTypeList {
  DAY = '白班',
  MIDDLE = '中班',
  NIGHT = '夜班'
}
export class Employee {
  orderId: string
  classType: DayTypeList = DayTypeList.DAY
  deptId: string
  dinner: string
  endDate: string
  startDate: string
  productDate: string
  remark: string
  userId: string[]
  userType: EMPTypeList = EMPTypeList.FORMAL
  constructor (orderId: string, productDate: string, dinner: string) {
    this.orderId = orderId
    this.productDate = productDate
    this.dinner = dinner
  }
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
