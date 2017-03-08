import {Component} from '@angular/core';
@Component({
  selector: 'seller-main-component',
  templateUrl: './seller.main.component.html'
})
export class SellerMainComponent {
  selected: string = 'list';
  /**
   * seller-list页面传递过来的seller对象
   */
  detailFromSellerList: boolean;

  /**
   * 当前店铺对象
   * @type {{}}
   */
  currentSeller: any = {};

  /**
   * 手动触发tab切换事件
   * @param event
   */
  tabChange(event) {

  }

  /**
   * 通过seller-list页面传递值 自动切换tab页
   * @param event
   */
  switchTabs(event) {
    this.detailFromSellerList = event;
    this.selected = 'detail';
  }

  /**
   * 拷贝对象
   * @param data
   */
  copySeller(data: any) {
    this.currentSeller = data;
  }
}