import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'confirm-prompt-component',
  templateUrl: './confirm.prompt.component.html'
})
/**
 * Prompt 提示信息
 */
export class ConfirmPromptComponent {

  /**
   * 打开|关闭confirm
   * @type {boolean}
   */
  @Input() isOpen: boolean = false;
  /**
   * 取消
   * @type {EventEmitter<boolean>}
   */
  @Output() cancelFunction = new EventEmitter<boolean>();
  /**
   * 确定
   * @type {EventEmitter<boolean>}
   */
  @Output() confirmFunction = new EventEmitter<boolean>();
  /**
   * 提示消息
   * @type {string}
   */
  @Input() promptMessage: string = '确定要删除吗?';
  /**
   * icon
   * @type {string}
   */
  @Input() icon: string = 'question_feed';
  /**
   * icon类型
   * @type {string}
   */
  @Input() category: string = 'standard';

  /**
   * 取消
   */
  cancel() {
    this.cancelFunction.emit(!this.isOpen);
  }

  /**
   * 确定
   */
  confirm() {
    this.confirmFunction.emit(!this.isOpen);
  }

}