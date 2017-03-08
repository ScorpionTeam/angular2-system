import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import {AppVersionService} from '../../../service/app.version.service';
import {ToastEntity} from '../../../domain/toast';
@Component({
  selector: 'app-component',
  templateUrl: 'app.version.component.html'
})

export class AppVersionComponent implements OnInit {
  constructor(private appVersionService: AppVersionService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAppVersionList(null);
  }

  /**
   * app版本集合
   * @type {{}}
   */
  appVersionList: any = {};
  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  /**
   * 模态显示
   * @type {boolean}
   */
  opened: boolean = false;

  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast: ToastEntity = new ToastEntity;
  /**
   * 当前操作对象
   * @type {{}}
   */
  appObj: any = {};

  getAppVersionList(page: any) {
    this.appVersionService.getAppList(page).subscribe(res=> {
      this.appVersionList = res.json();
    });
  }

  /**
   * 分页方法
   * @param event
   */
  pageChange(event: number) {
    this.pageOpts.page = event;
    this.getAppVersionList(this.pageOpts);
  }

  //打开模态
  open(data) {
    this.opened = !this.opened;
    this.appObj = (<any>Object).assign({}, data);
  }

  /**
   * 关闭模态
   */
  cancel() {
    this.opened = !this.opened;
  }

  /**
   * 保存appVersion版本管理
   */
  saveAppVersion() {
    this.appVersionService.saveAppVersion(this.appObj).subscribe(res=> {
      let ret = res.json();
      if (ret.success) {
        this.toastFunction('保存成功', 'success');
      } else {
        this.toastFunction(ret.message, 'error');
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


}