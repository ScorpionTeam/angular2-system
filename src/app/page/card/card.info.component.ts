import {Component, Input} from '@angular/core';
import {CardService} from '../../service/card.service';
import {ToastEntity} from '../../domain/toast';
@Component({
  selector: 'card-info-component',
  templateUrl: './card.info.component.html'
})

export class CardInfoComponent {


  /**
   * 显示 |隐藏  *
   * @type {boolean}
   */
  required: boolean = true;

  /**
   * 编辑对象
   * @type {{}}
   */
  @Input() editObj: any = {};

  /**
   * 选择店铺集合
   * @type {Array}
   */
  @Input() sellerArray: Array<any> = [];
  toast:ToastEntity = new ToastEntity;
  constructor(private cardService: CardService) {
  }

  /**
   * 保存卡券列表
   */
  saveCard() {
    let self: any = this.editObj;
    if (self.type == '3' || (self.type == '1' && self.sellerItems == '1')) {
      self.sellerIds = [0];
    } else {
      self.sellerIds = this.sellerArray;
    }

    this.cardService.saveCard(this.editObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('保存卡券成功', 'success');
      } else {
        this.toastFunction(result.message, 'error');
      }
    });

  }

  /**
   * toast通知事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.toast.showAlert = data;
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