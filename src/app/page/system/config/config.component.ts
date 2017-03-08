import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../service/config.service';
import {ToastEntity} from '../../../domain/toast';
import {PromptEntity} from '../../../domain/prompt';
@Component({
  selector: 'config-component',
  templateUrl: './config.component.html'
})

export class ConfigComponent implements OnInit {
  /**
   * 配置对象列表
   * @type {{}}
   */
  configList: any = {};
  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  /**
   * 搜索关键字
   * @type {string}
   */
  key: string = '';
  /**
   * 搜搜提示
   * @type {string}
   */
  placeholder: string = '搜索..';
  /**
   * 配置项模态  打开|关闭
   * @type {boolean}
   */
  configOpen: boolean = false;
  /**
   * 编辑对象
   * @type {{}}
   */
  configEditObj: any = {};

  /**
   * prompt封装实体
   * @type {PromptEntity}
   */
  prompt: PromptEntity = new PromptEntity('您确定要修改吗?');

  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast: ToastEntity = new ToastEntity;
  /**
   * 显示|隐藏  *
   * @type {boolean}
   */
  required: boolean = false;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.queryConfig(this.pageOpts, this.key);
  }


  /**
   * 分页
   * @param event
   */
  pageChange(event: any) {
    this.pageOpts.page = event;
    this.queryConfig(this.key, this.pageOpts);
  }

  /**
   * 编辑
   * @param data
   */
  edit(data: any) {
    this.configOpen = !this.configOpen;
    this.configEditObj = data;
  }

  /**
   * 查询方法
   * @param key
   * @param page
   */
  queryConfig(key: string, page: any) {
    this.configService.getConfigList(page, key).subscribe(res=> {
      this.configList = res.json();
    });
  }

  /**
   * 条件搜索
   * @param data
   */
  searchByCondition(data: any) {
    this.key = data;
    this.queryConfig(data, this.pageOpts);
  }

  /**
   * 模态cancel
   */
  cancel() {
    this.configOpen = !this.configOpen;
  }

  /**
   * 模态编辑按钮
   */
  confirmEdit() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * prompt取消
   */
  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * 确认修改
   */
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.configService.editConfig(this.configEditObj).subscribe(res=> {
      let ret = res.json();
      if (ret.success) {
        this.toastFunction('修改成功', 'success');
        this.configOpen = !this.configOpen;
      } else {
        this.toastFunction('修改失败', 'error');
      }
    });
  }

  /**
   * toast事件
   * @param event
   */
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