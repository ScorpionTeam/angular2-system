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
   * 用户列表对象
   * @type {{}}
   */
  userList: any = {
    total: 20, rows: [
      {
        id: 1,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 2,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 3,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 4,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 5,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 6,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 7,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 8,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 9,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 10,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
      {
        id: 11,
        name: '张三',
        account: 'zhangsan',
        mobile: 13800138000,
        email: '13800138000@126.com',
        address: '浙江省杭州市滨江区九堡',
        sex: '男'
      },
    ]
  };
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
  
  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {
  }
  
  /**
   * 页面初始化加载
   */
  ngOnInit(): void {
  }
  
  
  /**
   * 条件搜索
   * @param event
   */
  searchByCondition(data: string) {
    this.toastFunction("搜索关键字为:" + data, 'info');
  }
  
  /**
   * 分页
   * @param event
   */
  pageChange(data: number) {
    this.pageOpts.page = data;
    this.toastFunction('这是第' + data + '页', 'info');
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
    this.opened = !this.opened;
    this.toastFunction('保存用户操作', 'info');
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
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.toastFunction('进行删除操作', 'info');
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
  
}