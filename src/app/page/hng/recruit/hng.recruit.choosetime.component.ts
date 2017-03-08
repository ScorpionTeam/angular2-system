import {Component, OnInit} from '@angular/core';
import {HngService} from '../../../service/hng.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastEntity} from '../../../domain/toast';
@Component({
  selector: 'choose-time',
  templateUrl: './hng.recruit.choosetime.component.html'
})
export class RecruitChooseTimeComponent implements OnInit {

  wriInfoStatus: string = 'complete';
  relativeSellerInfoStatus: string = 'complete';
  wriPublishTimeStatus: string = 'doing';
  /**
   * 格式化时间
   * @type {string}
   * @private
   */
  _date_formate: string = 'yyyy-mm-dd';
  /**
   * 招聘模板id
   * @type {string}
   */
  recruitId: number = 0;
  toast:ToastEntity = new ToastEntity;
  /**
   * 当前招聘对象
   * @type {{}}
   */
  operaObj: any = {};

  constructor(private hngService: HngService, private router: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getParams();
  }

  /**
   * 开始时间
   * @param event
   */
  receiveStartDate(data: any) {
    this.operaObj.startTime = data;
  }

  /**
   * 结束时间
   * @param data
   */
  receiveEndDate(data: any) {
    this.operaObj.endTime = data;
  }

  /**
   * 获取链接传递参数
   */
  getParams() {
    let that = this;
    this.router.params.forEach((params: Params)=> {
      let _value: number = +params['recruitId'];
      this.recruitId = _value;
      if (_value != 0) {
        that.hngService.getRecruitById(_value).subscribe(res=> {
          that.operaObj = res.json().body;
        });
      }
    });
  }

  /**
   * 保存招聘时间
   * @param data
   */
  saveData() {
    this.hngService.saveRecruitDate(this.operaObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('保存成功', 'success');
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.toast.showAlert = data;
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