import {Component, OnChanges, Input,Output,EventEmitter} from '@angular/core';
import {SellerService} from '../../service/seller.service';
@Component({
  selector: 'seller-goods-component',
  templateUrl: './seller.goods.component.html'
})

export class SellerGoodsComponent implements OnChanges {


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
   * 显示|隐藏  复选框
   * @type {boolean}
   */
  @Input() showCheckBox: boolean = false;
  /**
   * 当前选择商品
   * @type {EventEmitter<any>}
   */
  @Output() emitGoods = new EventEmitter<any>();
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
   * 当前选中商品
   * @type {{}}
   */
  currentGoods: any = {};
  /**
   * 显示 |隐藏 *
   * @type {boolean}
   */
  required: boolean = true;

  /**
   * 搜索关键字
   * @type {string}
   */
  key: string = '';

  constructor(private sellerService: SellerService) {
  }

  /**
   * 监听 当前店铺对象发生改变
   * @param changes
   */
  ngOnChanges(changes: any): void {
    let result = changes['currentSeller'];
    let show = changes['showCheckBox'];
    if (result.currentValue.id != result.previousValue.id) {
      this.getGoodsList(this.currentSeller.id, this.pageOpts,this.key);
    }
  }

  /**
   * 异步搜索
   * @param data
   */
  searchByCondition(data: string) {
    this.key = data;
    this.getGoodsList(this.currentSeller.id, this.pageOpts, this.key);
  }

  /**
   * 根据店铺id 查询 商品列表
   * @param id
   * @param page
   */
  getGoodsList(id: number, page: any,key:string) {
    this.sellerService.getSellerGoodsDataList(id, page, this.key).subscribe(res=> {
      this.goodsDataList = res.json();
    });
  }

  /**
   * 分页事件
   * @param data
   */
  pageChange(data: number) {
    this.pageOpts.page = data;
    this.getGoodsList(this.currentSeller.id, this.pageOpts, this.key);
  }

  /**
   * 编辑商品信息
   * @param data
   */
  edit(data: any) {
    this.spikeOpen = !this.spikeOpen;
    this.currentGoods = data;
    console.log("当前商品 ->", data);
  }

  /**
   * 关闭模态
   */
  cancel() {
    this.spikeOpen = !this.spikeOpen;
  }

  selectGoods(data:any){
    this.emitGoods.emit(data);
  }
}