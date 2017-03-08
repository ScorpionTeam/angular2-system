import {Component, OnInit} from '@angular/core';
import {BannerService} from '../../service/banner.service';
import {ToastEntity} from '../../domain/toast';
import {PromptEntity} from '../../domain/prompt';
@Component({
  selector: 'banner-list-component',
  templateUrl: 'banner.list.component.html'
})
export class BannerListComponent implements OnInit {
  //banner列表对象
  bannerList: any = {};
  //分页对象
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10}
  commonImgUrl = process.env.ImgUrl;
  //搜索关键词
  searchKey: string = '';
  //是否展示提示信息
  showAlert: boolean = false;
  value: string;
  placeholder: string = '搜索    名称';
  //删除标记默认为false
  delFlag: boolean = false;
  toast: ToastEntity = new ToastEntity;
  prompt: PromptEntity = new PromptEntity('您确定要删除吗?');
  createOpened: boolean = false;
  required: boolean = true;
  _date_formate: string = 'yyyy-mm-dd';
  delObj: any = {};
  /**
   * 图片上传返回地址
   * @type {string}
   */
  picUrl: string = '';
  /**
   * 当前操作对象
   * @type {{}}
   */
  operaObj: any = {};

  /**
   * 店铺集合
   * @type {Array}
   */
  sellerList: Array<any> = [];

  uploadFolder: string = 'banner';

  constructor(private bannerService: BannerService) {
  }

  ngOnInit(): void {
    this.getBannerList(null, this.searchKey);
  }

  //分页事件
  pageChange(event) {
    this.pageOpts.page = event;
    this.getBannerList(this.pageOpts, this.searchKey);
  }

  //获取banner列表
  getBannerList(page: any, searchKey: string) {
    this.bannerService.getBannerList(page, searchKey).subscribe(res=> {
      this.bannerList = res.json();
    });
  }

  //打开Toasth
  show() {
    this.showAlert = true;
  }

  //关闭Toast
  onClose(reason: string) {
    this.showAlert = false;
  }

  //搜索方法
  searchByCondition(event) {
    this.searchKey = event;
    this.getBannerList(this.pageOpts, this.searchKey);
  }

  //删除提示
  delConfirm(event: any) {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.delObj = event;
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.toast.showAlert = data;
  }

  /**
   * prompt取消事件
   */
  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * prompt确认事件
   */
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.bannerService.deleteBanner(this.delObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('删除成功', 'success');
        this.getBannerList(this.pageOpts,this.searchKey);
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * 开始时间
   * @param data
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
   * 保存banner
   */
  saveBanner() {
    this.operaObj.imgUrl = this.picUrl;
    if (this.operaObj.scopeSeller == 'part') {
      if (this.sellerList.length == 0) {
        this.toastFunction('请选择店铺', 'info');
        return;
      } else {
        let array: Array<any> = [];
        this.sellerList.forEach(function (value: any) {
          array.push(value.id);
        });
        this.operaObj.sellerIdList = array;
      }
      this.bannerService.saveBanner(this.operaObj).subscribe(res=> {
        let result = res.json();
        if (result.success) {
          this.toastFunction('保存成功', 'success');
        } else {
          this.toastFunction(result.message, 'error');
        }
      });
    }
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