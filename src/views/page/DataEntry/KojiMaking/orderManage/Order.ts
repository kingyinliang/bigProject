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
      return '已同步'
    } else if (this._orderStatus === '已拆分') {
      return '未录入'
    } else if (this._orderStatus === 'toBeAudited') {
      return '待审核'
    } else if (this._orderStatus === 'saved') {
      return '已保存'
    } else if (this._orderStatus === 'submit') {
      return '已提交'
    } else if (this._orderStatus === 'checked') {
      return '通过'
    } else if (this._orderStatus === 'noPass') {
      return '不通过'
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

export class OrderDetail extends Order {
  id: string
  _status: string
  inPotNo: string = ''
  inPotName: string = ''
  houseNo: string = ''
  houseName: string = ''
  cookingNo: string = ''
  cookingName: string = ''
  inKjmDate: string
  productDate: string
  isFirst: boolean = false
  constructor (orderId?: string, orderNo?: string, orderDate?: string, orderStatus?: string, materialCode?: string, materialName?: string,
    planOutput?: number, outputUnit?: string, remark?: string, delFlag?: string, id?: string, status?: string, inPotNo?: string, inPotName?: string, houseNo?: string,
    houseName?: string, cookingNo?: string, cookingName?: string, inKjmDate?: string, productDate?: string, isFirst?: boolean
    ) {
    super(orderId, orderNo, orderDate, orderStatus, materialCode, materialName, planOutput, outputUnit, remark, delFlag)
    if (id) {
      this.id = id
    }
    if (status) {
      this._status = status
    }
    if (inPotNo) {
      this.inPotNo = inPotNo
    }
    if (inPotName) {
      this.inPotName = inPotName
    }
    if (houseNo) {
      this.houseNo = houseNo
    }
    if (houseName) {
      this.houseName = houseName
    }
    if (cookingNo) {
      this.cookingNo = cookingNo
    }
    if (cookingName) {
      this.cookingName = cookingName
    }
    if (inKjmDate) {
      this.inKjmDate = inKjmDate
    }
    if (productDate) {
      this.productDate = productDate
    }
    if (isFirst) {
      this.isFirst = isFirst
    }
  }

  get status (): string {
    if (this._status === '已同步') {
      return '未录入'
    } else if (this._status === 'saved') {
      return '已保存'
    } else if (this._status === 'submit') {
      return '已提交'
    } else if (this._status === 'checked') {
      return '通过'
    } else if (this._status === 'noPass') {
      return '不通过'
    }
    return this._status
  }
  set status (status: string) {
    this._status = status
  }

  public clone (): OrderDetail {
    return JSON.parse(JSON.stringify(this))
  }
}
