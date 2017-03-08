import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SellerService} from '../../service/seller.service';
import {ToastEntity} from '../../domain/toast';
@Component({
  selector: 'seller-combination-component',
  templateUrl: './seller.combination.component.html',
  styles: [`.slds-form-element__label{line-height:2rem;float:left}`]
})

export class SellerCombinationComponent implements OnChanges {

  commonsUrls: string = process.env.ImgUrl;
  /**
   * 当前店铺对象
   * @type {{}}
   */
  @Input() currentSeller: any = {};

  /**
   * 店铺扩展信息对象
   * @type {{}}
   */
  sellerExt: any = {};

  /**
   * 当前操作扩展信息对象
   * @type {{}}
   */
  operaExtObj: any = {};

  /**
   * 扩展信息编辑模态  打开|关闭
   * @type {boolean}
   */
  editOpened: boolean = false;

  /**
   * 店铺重复信息
   * @type {string}
   */
  repeatInfo: string = '';

  /**
   * 当前图片
   */
  imgSources: string;

  /**
   * 显示|隐藏  修改按钮
   * @type {boolean}
   */
  @Input() showBtn:boolean=true;

  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast:ToastEntity = new ToastEntity;

  /**
   * 打开|关闭  图片模态
   * @type {boolean}
   */
  imgOpened: boolean = false;

  constructor(private sellerService: SellerService) {
  }

  /**
   * 监听 当前店铺变化
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    let value = changes['currentSeller'];
    if (!value) {
      return;
    }
    if (value.currentValue.id != value.previousValue.id) {
      let id = this.currentSeller.id;
      this.getSellerExt(id);
      this.getSellerInfo(id);
      this.getRepeat(id);
    }
  }

  /**
   * 根据店铺id 获取店铺扩展信息
   * @param id
   */
  getSellerExt(id: number) {
    this.sellerService.getSellerExt(id).subscribe(res=> {
      this.sellerExt = res.json();

    });
  }

  /**
   * 根据店铺id  获取店铺基本信息
   * @param id
   */
  getSellerInfo(id: number) {
    this.sellerService.getSellerInfo(id).subscribe(res=> {
      this.currentSeller = res.json();
    });
  }

  /**
   * 查询店铺重复信息
   * @param id
   */
  getRepeat(id: number) {
    this.sellerService.getRepeat(id).subscribe(res=> {
      this.repeatInfo = res.json().body;
    });
  }


  /**
   * 编辑店铺扩展信息
   * @param data
   */
  editExt(data: any) {
    this.editOpened = !this.editOpened;
    this.operaExtObj = data;
  }

  /**
   * 保存店铺扩展信息
   */
  saveExt() {
    this.sellerService.updateSellerExtInfo(this.operaExtObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('修改成功', 'success');
        this.editOpened = !this.editOpened;
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * toast传递事件
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

  /**
   * 查看图片大图
   * @param data
   */
  openImg(data: any) {
    this.imgSources = data.srcElement.currentSrc;
    this.imgOpened = !this.imgOpened;
  }
}