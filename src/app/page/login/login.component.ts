import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';
import {ToastEntity} from '../../domain/toast';
@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  token: string = '';
  user: any = {};
  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast:ToastEntity = new ToastEntity;

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.token = window.localStorage.getItem("hl-token");
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/index/chart']);
    }
  }

  /**
   * 登录
   */
  login() {
    this.loginService.login(this.user).subscribe(res=> {
      let ret = res.json();
      if (ret.success) {
        window.localStorage.setItem("hl-token", ret.token);
        this.router.navigate(['/index/chart']);
      } else {
        this.toastFunction(ret.message, 'error');
      }
    });
  }


  /**
   * toast通知
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