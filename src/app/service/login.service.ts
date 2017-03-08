import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class LoginService {
  constructor(private http: MyHttp) {
  }

  /**
   * 登录
   * @param user
   * @returns {Observable<Response>}
   */
  login(user: any) {
    return this.http.post('/sys/login', user);
  }

  updatePassword(data: any) {
    return this.http.post("/role/modify-password",
      {
        oldPassword: data.oldPassword,
        newpassword: data.newPassword,
        confirmPassword: data.confirPassword
      });
  }

}