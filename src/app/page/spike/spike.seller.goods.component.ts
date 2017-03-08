import {Component, Input, SimpleChanges} from '@angular/core';
import {SpikeService} from '../../service/spike.service';
import {ToastEntity} from '../../domain/toast';
@Component({
  selector: 'spike-seller-goods-component',
  templateUrl: './spike.seller.goods.component.html'
})

export class SpikeSellerGoodsComponent {
  placeholder: string = '搜索..商品名称';
  /**
   * 图片前缀
   */
  commonImgUrl = process.env.ImgUrl;
  /**
   * 商品数据集合
   * @type {{}}
   */
  goodsDataList: any = {};

  /**
   * 当前店铺对象
   * @type {{}}
   */
  @Input() currentSeller: any = {};
  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 7};

  /**
   * 打开|关闭 秒杀模态
   * @type {boolean}
   */
  spikeOpen: boolean = false;
  /**
   * 显示 |隐藏 *
   * @type {boolean}
   */
  required: boolean = true;

  /**
   * 当前操作对象
   * @type {{}}
   */
  operaObj: any = {};

  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast:ToastEntity = new ToastEntity;

  constructor(private spikeService: SpikeService) {
  }

  /**
   * 监听 当前店铺对象发生改变
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    let result = changes['currentSeller'];
    if (result.currentValue.id != result.previousValue.id) {
      this.getGoodsList(this.currentSeller.id, this.pageOpts);
    }
  }

  /**
   * 异步搜索
   * @param data
   */
  searchByCondition(data: string) {

  }

  /**
   * 根据店铺id 查询 商品列表
   * @param id
   * @param page
   */
  getGoodsList(id: number, page: any) {
    this.spikeService.getSellerGoods(id, page).subscribe(res=> {
      this.goodsDataList = res.json();
    });
  }

  /**
   * 分页事件
   * @param data
   */
  pageChange(data: number) {
    this.pageOpts.page = data;
    this.getGoodsList(this.currentSeller.id, this.pageOpts);
  }

  /**
   * 选择秒杀活动商品
   * @param data
   */
  edit(data: any) {
    this.spikeOpen = !this.spikeOpen;
    this.operaObj = data;
  }

  /**
   * 关闭模态
   */
  cancel() {
    this.spikeOpen = !this.spikeOpen;
  }

  /**
   * 保存秒杀信息
   */
  saveSpike() {
    this.operaObj.startTime = new Date(this.operaObj.startTime);
    this.operaObj.endTime = new Date(this.operaObj.endTime);
    this.operaObj.priceRole = this.operaObj.priceRole * 100;
    this.spikeService.settingSpike(this.operaObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('设置成功', 'success');
        this.spikeOpen = !this.spikeOpen;
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