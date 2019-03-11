import { Status } from './Enum.ts'

export class Order {
  orderId: string
  orderNo: string
  materialCode: string
  materialName: string
  planOutput: number
  outputUnit: string
  private _orderStatus: string
  remark: string
  orderDate: string
  delFlag: string = '0'
  get orderStatus (): string {
    if (this._orderStatus === '已同步') {
      return Status.SYNC
    } else if (this._orderStatus === '已拆分') {
      return Status.UNDO
    } else if (this._orderStatus === 'toBeAudited') {
      return Status.TOBE
    } else if (this._orderStatus === 'saved') {
      return Status.SAVED
    } else if (this._orderStatus === 'submit') {
      return Status.SUBMIT
    } else if (this._orderStatus === 'checked') {
      return Status.CHECKED
    } else if (this._orderStatus === 'noPass') {
      return Status.NOPASS
    }
    return this._orderStatus
  }
  set orderStatus (status: string) {
    this._orderStatus = status
  }
  constructor (orderId: string, orderNo: string, orderDate: string, orderStatus: string, materialCode: string, materialName: string,
    planOutput: number, outputUnit: string, remark: string, delFlag: string) {
    this.orderId = orderId
    this.orderNo = orderNo
    this.orderDate = orderDate
    this.orderStatus = orderStatus
    this.materialCode = materialCode
    this.materialName = materialName
    this.planOutput = planOutput
    this.outputUnit = outputUnit
    this.remark = remark
    this.delFlag = delFlag
  }
}
