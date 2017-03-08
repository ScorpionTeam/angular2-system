import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SellerService} from '../../service/seller.service';
import {ToastEntity} from '../../domain/toast';
import {PromptEntity} from '../../domain/prompt';
@Component({
  selector: 'seller-bank-component',
  templateUrl: './seller.bank.component.html'
})

export class SellerBankComponent implements OnChanges,OnInit {

  /**
   * 银行卡信息
   * @type {Array}
   */
  bankList: Array<any> = [];

  /**
   * 用户列表
   * @type {Array}
   */
  userList: Array<any> = [];

  @Input() currentSeller: any = {};

  /**
   * 打开 |关闭 编辑框
   * @type {boolean}
   */
  openEdit: boolean = false;

  /**
   * 显示 |隐藏 *
   * @type {boolean}
   */
  required: boolean = true;

  /**
   * 银行卡对象
   * @type {{}}
   */
  bankObj: any = {};

  /**
   * 修改账号模态 打开|关闭
   * @type {boolean}
   */
  editAccountOpened: boolean = false;

  /**
   * 当前编辑对象
   * @type {{}}
   */
  currentObj: any = {};

  type: string = '';

  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast:ToastEntity = new ToastEntity;
  /**
   * prompt封装实体
   * @type {PromptEntity}
   */
  prompt:PromptEntity = new PromptEntity('您确定要重置吗?');
  constructor(private sellerService: SellerService) {
  }

  ngOnInit(): void {
    this.getBankListData();
  }


  /**
   * 监听当前店铺对象改变触发查询操作
   * @param changes
   */
  ngOnChanges(changes: any): void {
    let result = changes['currentSeller'];
    if (!result) {
      return;
    }
    if (result.currentValue.id != result.previousValue.id) {
      this.getUserListData(this.currentSeller.id);
    }
  }


  /**
   * 查询银行卡列表信息
   */
  getBankListData() {
    this.sellerService.getBankDataList().subscribe(res=> {
      this.bankList = res.json().body;
    });
  }

  /**
   * 查询用户信息
   * @param id
   */
  getUserListData(id: number) {
    this.sellerService.getBankUserDataList(this.currentSeller.id).subscribe(res=> {
      this.userList = res.json().rows;
    });
  }

  /**
   * 修改银行卡信息
   */
  updateBank(data: any) {
    this.bankObj = data.billInfo;
    this.currentObj = data;
    this.openEdit = !this.openEdit;
  }

  /**
   * 修改账号
   */
  updateAccount(data: any) {
    this.currentObj = data;
    this.editAccountOpened = !this.editAccountOpened;
  }


  /**
   * prompt取消事件
   */
  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * prompt确认事件
   */
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.sellerService.updateUser(this.currentObj, this.type).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('修改成功', 'success');
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.toast.showAlert = data;
  }

  /**
   * 重置密码按钮事件
   */
  resetPassword(data: any, type) {
    this.currentObj = data;
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.currentObj.sellerId = this.currentSeller.id;
    this.type = type;
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
   * 修改密码取消事件
   */
  cancel() {
    this.editAccountOpened = !this.editAccountOpened;
  }

  /**
   * 保存银行卡信息
   */
  saveBank(data: any) {
    this.currentObj.sellerId = this.currentSeller.id;
    data.billInfo = this.bankObj;
    this.sellerService.updateBankInfo(data).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('保存成功', 'success');
        this.getUserListData(this.currentSeller.id);
        this.openEdit = !this.openEdit;
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

}