import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {isNullOrUndefined} from "util";
import {LoginService} from '../../service/login.service';
@Component({
  selector: 'nav-top-component',
  templateUrl: 'nav.top.component.html',
  styleUrls: ['./nav.top.component.css']
})

export class NavTopComponent implements OnInit {
  /**
   * 打开|关闭 设置模态
   * @type {boolean}
   */
  settingOpen: boolean = false;
  /**
   * tips 打开|挂壁
   * @type {boolean}
   */
  tipOpen: boolean = false;
  opened: boolean = false;
  required: boolean = true;
  dropdownOpen: boolean = false;
  selectedCity: string = '请选择';
  placement: string;
  cities: Array<any> = [
    {city: "330100", name: "杭州"},
    {city: "500100", name: "重庆"},
    {city: "130100", name: "石家庄"}
  ];

  /**
   * 修改密码
   * @type {{}}
   */
  passwordObj: any = {};

  /**
   * toast类型
   * @type {string}
   */
  toastType: string = 'success';

  /**
   * toast提示消息
   * @type {string}
   */
  toastMessage: string = '';

  /**
   * 打开|关闭  toast
   * @type {boolean}
   */
  showAlert: boolean = false;

  /**
   * prompt提示信息
   * @type {string}
   */
  promptMessage: string = '您确定要修改密码吗?';

  /**
   * prompt打开|关闭
   * @type {boolean}
   */
  notificationOpen: boolean = false;



  ngOnInit(): void {
  }

  constructor(private router: Router, private loginService: LoginService) {
    let cityCode = localStorage.getItem("hualaCity");

    if (cityCode) {
      this.cities.forEach(item => {
        if (item.city == cityCode) {
          this.selectedCity = item.name;
        }
      });
    }
  }

  /*
   * @Description: Select city from drop down box;
   * @Author: yhm0188;
   * @Date: 2017-01-11;
   */
  selectCity(city): void {
    this.dropdownOpen = false;
    this.selectedCity = city.name;
    localStorage.setItem("hualaCity", city.city);
    this.router.navigateByUrl("/");
  }

  //设置tips打开或关闭
  settingChange(placement: string) {
    this.settingOpen = !this.settingOpen;
    this.placement = placement;
  }

  //消息tips打开或关闭
  tipChange(placement: string) {
    this.tipOpen = !this.tipOpen;
    this.placement = placement;
  }

  //登出
  logout() {
    window.localStorage.removeItem("hl-token");
    this.router.navigate(['/login']);
  }

  //打开修改密码模态
  openModifyPassword() {
    this.opened = !this.opened;
    this.settingOpen = !this.settingOpen;
  }

  //关闭修改密码模态
  cancel() {
    this.opened = !this.opened;
  }

  /**
   * 修改密码
   */
  updatePassword() {
    this.notificationOpen = !this.notificationOpen;
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.showAlert = data;
  }

  /**
   * prompt取消事件
   */
  cancelPrompt() {
    this.notificationOpen = !this.notificationOpen;
  }

  /**
   * prompt确定事件
   */
  confirm() {
    if (isNullOrUndefined(this.passwordObj.oldPassword)) {
      this.notificationOpen = !this.notificationOpen;
      this.toastType = 'info';
      this.toastMessage = '请填写原始密码';
      this.showAlert = !this.showAlert;
      return;
    }
    if (isNullOrUndefined(this.passwordObj.newPassword)) {
      this.notificationOpen = !this.notificationOpen;
      this.toastMessage = '请填写新密码';
      this.toastType = 'info';
      this.showAlert = !this.showAlert;
      return;
    }
    if (isNullOrUndefined(this.passwordObj.confirmPassword)) {
      this.notificationOpen = !this.notificationOpen;
      this.toastType = 'info';
      this.toastMessage = '请填写确认密码';
      this.showAlert = !this.showAlert;
      return;
    }

    this.loginService.updatePassword(this.passwordObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.notificationOpen = !this.notificationOpen;
        this.opened = !this.opened;
        this.toastFunction('修改密码成功', 'success');
        localStorage.removeItem('hl-token');
        this.router.navigate(['/login']);
      } else {
        this.notificationOpen = !this.notificationOpen;
        this.toastFunction(result.message, 'error');
      }
    });

  }

  /**
   * toast函数
   * @param message
   * @param toastType
   */
  toastFunction(message: string, toastType: string) {
    this.showAlert = !this.showAlert;
    this.toastMessage = message;
    this.toastType = toastType;
  }

}