import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {SellerService} from '../../../service/seller.service';
@Component({
  selector: 'seller-little-component',
  templateUrl: './seller.little.component.html'
})

export class SellerLittleComponent implements OnInit {
  /**
   * 商家data
   * @type {{}}
   */
  public sellerDataList: any = {};
  /**
   * 搜索关键字
   * @type {string}
   */
  public key: string = '';
  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  public pageOpts: any = {page: 1, total: 0, limit: 1, perPage: 10};
  /**
   * 输出
   * @type {EventEmitter<any>}
   */
  @Output() targetSeller = new EventEmitter<any>();

  placeholder:string ='搜索...';

  constructor(private sellerService: SellerService) {
  }

  ngOnInit(): void {
    this.getSellerList(this.pageOpts, this.key);
  }

  /**
   * 查询商家列表
   * @param page
   * @param key
   */
  getSellerList(page: any, key: string) {
    this.sellerService.getSellerList(page, key).subscribe(res=> {
      this.sellerDataList = res.json();
    });
  }

  /**
   * 分页事件
   * @param data
   */
  pageChange(data: number) {
    this.pageOpts.page = data;
    this.getSellerList(this.pageOpts, this.key);
  }

  /**
   * 操作  按钮事件
   * @param data
   */
  onRowClick(data: any) {
    this.targetSeller.emit(data);
  }

  /**
   * 关键字搜索
   * @param data
   */
  searchByCondition(data: any) {
    this.key = data;
    this.getSellerList(this.pageOpts, this.key);
  }

}