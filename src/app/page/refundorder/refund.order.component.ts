import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {OrderService} from '../../service/order.service';
import {ToastEntity} from '../../domain/toast';
@Component({
  selector: 'refund-order-component',
  templateUrl: './refund.order.component.html'
})

export class RefundOrderComponent implements OnInit,OnChanges {

  /**
   * 当前订单对象
   * @type {{}}
   */
  @Input() currentOrder: any = {};

  /**
   * 退款商品集合
   * @type {Array}
   */
  refundGoodsDataList: Array<any> = [];

  /**
   * 退款单
   * @type {{}}
   */
  refundOrder: any = {};

  /**
   * 退款金额
   * @type {string}
   */
  refundGoodsAmount: number = 0;

  /**
   * 订单优惠集合
   * @type {Array}
   */
  orderCoupon: Array<any> = [];

  /**
   * 确认退款金额
   */
  returnOrderAmount: number = 0;

  /**
   * 退运费金额
   */
  freightAmount: number = 0;

  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast:ToastEntity = new ToastEntity;
  /**
   * 初始化方法
   */
  ngOnInit(): void {
  }

  constructor(private orderService: OrderService) {
  }

  ngOnChanges(changes: any): void {
    let value = changes['currentOrder'];
    if (!value) {
      return;
    }
    if (value.currentValue.id != value.previousValue.id) {
      this.getRefundOrder(this.currentOrder.id);
    }
  }

  /**
   * 根据订单id  查询退款商品 以及退款单
   * @param id
   */
  getRefundOrder(id: number) {
    this.orderService.refundOrder(id).subscribe(res=> {
      this.refundGoodsDataList = res.json().body.returnGoods;
      this.refundGoodsAmount = res.json().body.returnAmount;
      this.refundOrder = res.json().body.refundOrder;
    });
  }

  /**
   * 财务打款
   */
  pullFinance() {
    this.orderService.pullFinance(this.refundOrder, this.refundGoodsDataList).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('打款成功', 'success');
        this.getRefundOrder(this.currentOrder.id);
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * 生成退款单
   */
  createRefundOrder() {
    this.orderService.createReturnOrder(this.currentOrder, this.returnOrderAmount * 100, this.freightAmount * 100,
      this.refundGoodsAmount).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('退款单生成成功', 'success');
        this.getRefundOrder(this.currentOrder.id);
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * 退款单修改
   */
  editRefundOrder() {
    this.orderService.updateRefundOrder(this.refundOrder, this.returnOrderAmount * 100, this.freightAmount * 100)
    .subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('修改退款单成功', 'success');
        this.getRefundOrder(this.currentOrder.id);
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }


  /**
   * toast函数
   * @param message
   * @param toastType
   */
  toastFunction(message: string, toastType: string) {
    this.toast.showAlert = !this.toast.showAlert;
    this.toast.toastMessage = message;
    this.toast.toastType = toastType;
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.toast.showAlert = data;
  }

}