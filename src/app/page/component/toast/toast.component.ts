import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'toast-component',
  templateUrl: './toast.component.html'
})

export class ToastComponent {

  /**
   * 超时时间
   * @type {number}
   */
  @Input() timeOut: number = 5000;

  /**
   * 提示消息
   * @type {string}
   */
  @Input() toastMessage: string = '默认提示消息';

  /**
   * toast提示类型  success | error| warning |info
   * @type {string}
   */
  @Input() toastType: string = 'error';

  /**
   * 显示|关闭toast
   * @type {boolean}
   */
  @Input() showAlert: boolean = false;

  @Output() notifyParam = new EventEmitter<boolean>();

  /**
   * 关闭方法
   */
  onClose() {
    this.showAlert = !this.showAlert;
    this.notifyParam.emit(this.showAlert);
  }
}