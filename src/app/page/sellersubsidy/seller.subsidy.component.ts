import {Component, OnInit} from '@angular/core';
import {SellerSubsidyService} from '../../service/seller.subsidy.service';
@Component({
  selector: 'seller-subsidy-component',
  templateUrl: './seller.subsidy.component.html'
})
export class SellerSubsidyComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private sellerSubsidyService: SellerSubsidyService) {
  }

  /**
   *
   * @type {boolean} tips 打开|关闭
   */
  public open: boolean = false;
  /**
   *
   * @type {{}} 奖励数据对象
   */
  public rewardList: any = {};
  /**
   *
   * @type {{page: number; total: number; limit: number; perPage: number}} 分页对象
   */
  public pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  /**
   *
   * @type {string} toast类型
   */
  public toastType: string = 'success';
  /**
   *
   * @type {string} toast提示信息
   */
  public toastMessage: string = '';
  /**
   *
   * @type {boolean} toast 打开|关闭
   */
  public showAlert: boolean = false;
  /**
   *
   * @type {string} prompt消息
   */
  promptMessage: string = '';
  /**
   *
   * @type {boolean} prompt 打开|关闭
   */
  public notificationOpen: boolean = false;
  /**
   *
   * @type {string} 查询时间
   */
  public queryDate: string = '';
  /**
   *
   * @type {string} 格式化
   */
  public date_formate: string = 'yyyy-mm-dd';

  /**
   * 当前操作奖励对象
   * @type {{}}
   */
  public currentRewardObj: any = {};

  /**
   * 奖励修改模态  打开|关闭
   * @type {boolean}
   */
  public rewardOpend: boolean = false;

  /**
   * 显示 | 隐藏  *
   * @type {boolean}
   */
  public required: boolean = true;

  /**
   * 修改奖励对象
   * @type {{}}
   */
  public rewardModalObj: any = {};

  /**
   * 奖励详情订单模态  打开|关闭
   * @type {boolean}
   */
  public orderOpened: boolean = false;

  /**
   * 订单数据集合
   * @type {{}}
   */
  public orderDataList: any = {};

  /**
   * 订单分页
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  orderPageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};

  /**
   * 当前发送奖励状态
   * @type {string}
   */
  currentStatus: string = '';

  /**
   * 初始化奖励数据
   */
  initData() {
    if (this.queryDate == '') {
      this.showAlert = !this.showAlert;
      this.toastMessage = '请选择生成日期';
      this.toastType = 'warning';
      return;
    }
    this.sellerSubsidyService.initData(this.queryDate).subscribe(res=> {
      let ret = res.json();
      if (ret.success) {
        this.toastFunction('奖励数据生成成功', 'success');
        this.queryRewardList(this.queryDate, this.pageOpts);
      } else {
        this.toastFunction(ret.message, 'error');
      }
    });
  }

  /**
   * 分页事件
   * @param event
   */
  pageChange(event) {
    this.pageOpts.page = event;
    this.queryRewardList(this.queryDate, this.pageOpts);
  }

  /**
   * 时间选择事件
   * @param event
   */
  receiveDate(event: any) {
    this.queryDate = event;
    this.queryRewardList(event, this.pageOpts);
  }

  /**
   * toast 传播事件
   * @param event  打开|关闭
   */
  notifyParamFunction(event: boolean) {
    this.showAlert = event;
  }

  /**
   * prompt取消事件
   */
  cancelPrompt() {
    this.notificationOpen = !this.notificationOpen;
  }

  /**
   * prompt确定事件
   */
  confirm() {
    this.notificationOpen = !this.notificationOpen;
    this.currentRewardObj.status = this.currentStatus;
    this.sellerSubsidyService.sendData(this.currentRewardObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('发送成功', 'success');
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * 查询奖励列表
   * @param date
   * @param page
   */
  queryRewardList(date: string, page: any) {
    this.sellerSubsidyService.getRewardList(date, page).subscribe(res=> {
      this.rewardList = res.json();
    });
  }


  /**
   *
   * @param message    toast提示消息
   * @param toastType  类型
   */
  toastFunction(message: string, toastType: string) {
    this.showAlert = !this.showAlert;
    this.toastMessage = message;
    this.toastType = toastType;
  }

  /**
   * 发送奖励
   * @param data
   * @param type  1:发送   2:拒发
   */
  send(data: any, type: string) {
    this.notificationOpen = !this.notificationOpen;
    this.promptMessage = '您确定要发送吗?';
    this.currentRewardObj = data;
    this.currentStatus = type;
  }

  /**
   * 修改奖励
   * @param data
   */
  modifyReward(data: any) {
    this.rewardOpend = !this.rewardOpend;
    this.rewardModalObj = data;
    this.rewardModalObj.reward = data.amount / 100;
  }

  /**
   * 关闭模态
   */
  closeModal() {
    this.rewardOpend = !this.rewardOpend;
  }

  /**
   * 保存奖励信息
   */
  saveReward(type: string) {
    this.rewardModalObj.reward * 100;
    this.rewardModalObj.status = type;
    this.rewardOpend = !this.rewardOpend;
    this.sellerSubsidyService.sendData(this.rewardModalObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('发送成功', 'success');
        this.queryRewardList(this.queryDate, this.pageOpts);
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * 订单分页
   * @param data
   */
  orderPageChange(data: number) {
    this.orderPageOpts.page = data;
    this.detail(this.currentRewardObj);
  }

  /**
   * 详情
   * @param data
   */
  detail(data: any) {
    this.orderDataList = {};
    this.currentRewardObj = data;
    this.orderOpened = !this.orderOpened;
    this.sellerSubsidyService.getOrderList(this.orderPageOpts, 'other.getOrderCountDetail',
      data.sellerId + '--' + this.queryDate).subscribe(res=> {
      this.orderDataList = res.json();
    });
  }

}