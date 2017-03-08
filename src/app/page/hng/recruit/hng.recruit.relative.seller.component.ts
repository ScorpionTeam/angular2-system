import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HngService} from '../../../service/hng.service';
import {ToastEntity} from '../../../domain/toast';
@Component({
  selector: 'relative-seller',
  templateUrl: './hng.recruit.relative.seller.component.html'
})

export class RelativeSellerComponent implements OnInit {
  /**
   * 进度条显示状态
   * @type {string}
   */
  wriInfoStatus: string = 'complete';
  relativeSellerInfoStatus: string = 'doing';
  wriPublishTimeStatus: string = 'will';
  /**
   * 招聘id
   * @type {number}
   */
  recruitId: number = 0;
  /**
   * 当前招聘对象
   * @type {{}}
   */
  operaObj: any = {};

  toast:ToastEntity = new ToastEntity;
  /**
   * 显示|隐藏 保存按钮
   * @type {boolean}
   */
  showSavBtn: boolean = false;

  ngOnInit(): void {
    this.getParams();
  }

  constructor(private router: ActivatedRoute, private hngService: HngService) {
  }

  /**
   * 选择店铺
   * @param data
   */
  relationSeller(data: Array<any>) {
    this.operaObj.hSellers = data;
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
   * 保存数据
   */
  saveData() {
    this.hngService.saveRelation(this.operaObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('关联成功', 'success');
        this.showSavBtn = !this.showSavBtn;
      } else {
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
    this.toast.showAlert = !this.toast.showAlert;
    this.toast.toastMessage = message;
    this.toast.toastType = toastType;
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.toast.showAlert = data;
  }

}