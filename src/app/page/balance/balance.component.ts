import {Component, OnInit} from '@angular/core';
import {BalanceService} from '../../service/balance.service';
import {ToastEntity} from '../../domain/toast';
import {PromptEntity} from '../../domain/prompt';
@Component({
  selector: 'balance-component',
  templateUrl: './balance.component.html'
})

export class BalanceComponent implements OnInit {

  /**
   * toast封装对象
   * @type {ToastEntity}
   */
  toast: ToastEntity = new ToastEntity;
  /**
   * prompt 封装对象
   * @type {PromptEntity}
   */
  prompt: PromptEntity = new PromptEntity('您确定要现在结算吗?');
  //结算列表对象
  balanceList: any = {};
  //分页对象
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10}
  //模态分页对象
  modalPageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  //模态打开|关闭
  opened: boolean = false;
  //结算详情列表
  balanceDetailList: any = {};
  //结算详情列表查询条件
  detailQueryOpts: any = {};
  //结算详情模态title
  header: string = '';
  //结算对象
  settleMentObject: any = {};

  constructor(private balanceService: BalanceService) {
  }

  ngOnInit(): void {
    this.getBalanceList(null);
  }

  //结算列表
  getBalanceList(page: any) {
    this.balanceService.getBalanceList(page).subscribe(res=> {
      this.balanceList = res.json();
    });
  }

  //分页
  pageChange(event) {
    this.pageOpts.page = event;
    this.getBalanceList(this.pageOpts);
  }

  //结算详情列表
  getBalanceDetail(data: any, balanceType: string, title: string) {
    this.detailQueryOpts.date = data.date;
    this.detailQueryOpts.title = title;
    this.detailQueryOpts.balanceType = balanceType;
    this.header = title;
    this.balanceService.getBalanceDetailList(this.modalPageOpts, data.date, balanceType).subscribe(res=> {
      this.balanceDetailList = res.json();
    });
    this.opened = !this.opened;
  }

  //条件搜索
  searchByCondition(event) {

  }

  //结算详情列表分页
  modalPageChanges(event) {
    this.modalPageOpts.page = event;
    this.balanceService.getBalanceDetailList(this.modalPageOpts, this.detailQueryOpts.date,
      this.detailQueryOpts.balanceType).subscribe(res=> {
      this.balanceDetailList = res.json();
    });
  }

  //结算按钮
  settleMent(data: any) {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.settleMentObject = data;
  }

  //prompt取消
  cancel() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  //prompt确定
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.goSettleMent();
  }

  //关闭按钮触发
  openChange(event) {
    this.balanceDetailList = {};
  }

  //去结算
  goSettleMent() {
    this.balanceService.goSettleMent(this.settleMentObject).subscribe(res=> {
      let ret = res.json();
      if (ret.success) {
        this.toastFunction('结算成功', 'success');
      } else {
        this.toastFunction(ret.message, 'error');
      }
    });
  }

  //通知Toast状态
  notifyParamFunction(event: boolean) {
    this.toast.showAlert = event;
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

}