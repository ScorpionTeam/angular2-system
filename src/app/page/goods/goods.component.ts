import {Component} from '@angular/core';

@Component({
    moduleId: "goods",
    selector: "hl-goods",
    templateUrl: "goods.component.html"
})

export class GoodsComponent {
  public selectedTab: string = "goodsList";
  public showDetail: boolean;
  public cat: any;
}