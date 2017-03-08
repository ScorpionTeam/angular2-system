/**
 * Prompt封装实体
 */
export class PromptEntity {
  /**
   * 打开|关闭 prompt
   * @type {boolean}
   * @private
   */
  private _notificationOpen: boolean = false;
  /**
   * prompt提示信息
   */
  private _promptMessage: string;

  /**
   * prompt图标
   * @type {string}
   */
  private _icon:string ='question_feed';

  get notificationOpen(): boolean {
    return this._notificationOpen;
  }

  set notificationOpen(value: boolean) {
    this._notificationOpen = value;
  }

  get promptMessage(): string {
    return this._promptMessage;
  }

  set promptMessage(value: string) {
    this._promptMessage = value;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  constructor(promptMessage: string) {
    this._promptMessage = promptMessage;
  }
}