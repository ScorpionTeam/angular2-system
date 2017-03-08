import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ToastEntity} from '../../../domain/toast';
import {PromptEntity} from '../../../domain/prompt';
@Component({
  selector: 'user-component',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
  /**
   * prompt封装对象
   * @type {Prompt}
   */
  prompt: PromptEntity = new PromptEntity('测试信息');
  /**
   * toast封装对象
   * @type {ToastEntity}
   */
  toast: ToastEntity = new ToastEntity;
  /**
   * 搜索条件
   * @type {string}
   */
  key: string = '';
  /**
   * 用户列表对象
   * @type {{}}
   */
  userList: any = {};
  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10}
  /**
   * 搜索提示
   * @type {string}
   */
  placeholder: string = '搜索..';
  /**
   * 显示 | 隐藏用户新增模态
   * @type {boolean}
   */
  opened: boolean = false;
  /**
   * 显示 | 隐藏错误星标
   * @type {boolean}
   */
  required: boolean = true;
  /**
   * 操作对象
   * @type {{}}
   */
  operaObj: any = {};
  /**
   * confirm类型
   * @type {string}
   */
  confirmType: string = '';

  /**
   * 角色集合
   * @type {Array}
   */
  roleDataList: Array<any> = [];

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getUserList(null, this.key);
    this.getRoleDataList();
  }

  /**
   * 查询用户列表
   * @param page
   * @param key
   */
  getUserList(page: any, key: string) {
    this.userService.getUserList(page, key).subscribe(res=> {
      this.userList = res.json();
    });
  }

  /**
   * 条件搜索
   * @param event
   */
  searchByCondition(event) {
    this.key = event;
    this.getUserList(this.pageOpts, event);
  }

  /**
   * 分页
   * @param event
   */
  pageChange(event) {
    this.pageOpts.page = event;
    this.getUserList(this.pageOpts, this.key);
  }

  /**
   * 打开创建用户modal
   */
  openModal() {
    this.opened = !this.opened;
    this.operaObj = {};
  }

  /**
   * 创建用户模态取消事件
   */
  cancel() {
    this.opened = !this.opened;
  }

  /**
   * 保存用户
   */
  saveUser() {
    this.userService.saveUser(this.operaObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('保存成功', 'success');
        this.opened = !this.opened;
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * 密码重置
   * @param data
   */
  reset(data: any) {
    this.operaObj = data;
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.prompt.promptMessage = '您确定要重置密码吗?';
    this.confirmType = 'reset';
  }

  /**
   * prompt取消事件
   */
  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * prompt确定事件
   */
  confirm() {
    if (this.confirmType == 'delete') {
      this.confirmDelete();
    }
    if (this.confirmType == 'reset') {
      this.confirmReset();
    }
  }

  /**
   * toast传递事件
   * @param event
   */
  notifyParamFunction(event: boolean) {
    this.toast.showAlert = event;
  }

  /**
   * 删除用户
   * @param data
   */
  deleteUser(data: any) {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.prompt.promptMessage = '您确定要删除该用户吗?';
    this.confirmType = 'delete';
    this.operaObj = data;
  }


  /**
   * 确认删除
   */
  confirmDelete() {
    this.userService.deleteUser(this.operaObj).subscribe(res=> {
      let ret = res.json();
      if (ret.success) {
        this.toastFunction('删除成功', 'success');
        this.prompt.notificationOpen = !this.prompt.notificationOpen;
        this.getUserList(null, this.pageOpts);
      } else {
        this.toastFunction(ret.message, 'error');
        this.prompt.notificationOpen = !this.prompt.notificationOpen;
      }
    });
  }

  /**
   * 确认重置密码
   */
  confirmReset() {
    this.userService.resetPassword(this.operaObj).subscribe(res=> {
      let ret = res.json();
      if (ret.success) {
        this.toastFunction('密码重置成功', 'success');
        this.prompt.notificationOpen = !this.prompt.notificationOpen;
      } else {
        this.toastFunction(ret.message, 'error');
        this.prompt.notificationOpen = !this.prompt.notificationOpen;
      }
    });
  }

  /**
   * 编辑用户信息
   * @param data
   */
  edit(data: any) {
    this.operaObj = data;
    this.opened = !this.opened;
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
   * 查询角色集合
   */
  getRoleDataList() {
    this.userService.getRoleList().subscribe(res=> {
      this.roleDataList = res.json().body;
    });
  }

}