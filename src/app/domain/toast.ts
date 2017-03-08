/**
 * toast实体对象
 */
export class ToastEntity {
  /**
   * toast类型
   */
  private _toastType: string ='success';
  /**
   * toast提示信息
   */
  private _toastMessage: string ='';

  /**
   * 打开|关闭 toast
   * @type {boolean}
   */
  private _showAlert: boolean = false;


  get toastType(): string {
    return this._toastType;
  }

  set toastType(value: string) {
    this._toastType = value;
  }

  get toastMessage(): string {
    return this._toastMessage;
  }

  set toastMessage(value: string) {
    this._toastMessage = value;
  }

  get showAlert(): boolean {
    return this._showAlert;
  }

  set showAlert(value: boolean) {
    this._showAlert = value;
  }
}