import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange} from "@angular/core";

@Component({
  moduleId: "goodsInfo",
  selector: "goods-info",
  templateUrl: "goodsInfo.component.html"
})

export class GoodsInfoComponent implements OnChanges {
  @Input() public cat: any; //外部传入的类目;
  @Input() public goodsInfoIpt: any; //编辑时的商品信息;
  @Output() public selectTab = new EventEmitter<string>();
  //@Output() public goodsInfoOut = new EventEmitter<any>();
  public goodsInfo: any = {
    cid: "",
    cname: "",
    title: "",
    goodsSn: "",
    recPrice: "",
    salePrice: "",
    picUrl: "",
    picDescription: ["", ""],
    goodsExtendList: [
      {
        metaKey: "info",
        meta_desc: "商品信息",
        dataKey: "img_url",
        dataValue: [],
        dataDesc: "图片地址",
        isValid: "1",
        isFixed: "1"
      }
    ]
  };

  constructor() {
    if (this.cat) {
      this.goodsInfo.cid = this.cat.id;
      this.goodsInfo.cname = this.cat.name;
    }
  }

  ngOnChanges(changes: any): void {
    let chg = changes["goodsInfoIpt"];

    if (chg && chg.currentValue && chg.currentValue != chg.previousValue) {
      this.goodsInfo = this.goodsInfoIpt;

      if (!this.goodsInfo.picDescription || this.goodsInfo.picDescription.length == 0) {
        this.goodsInfo.picDescription = new Array(2);
      }
    }
    let chgCat = changes["cat"];
    if (chgCat && chgCat.currentValue && chgCat.currentValue != chgCat.previousValue) {
      this.goodsInfo.cid = chgCat.currentValue.id;
      this.goodsInfo.cname = chgCat.currentValue.name;
    }
  }

  public getGoodsInfo() {
    this.goodsInfo.cid = this.cat.id;
    //this.goodsInfoOut.emit(this.goodsInfo);
    return this.goodsInfo;
  }

  printResult(data: any) {
    console.log('打印图片上传返回 ->', data);
  }
}