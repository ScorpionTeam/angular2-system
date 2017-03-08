import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GoodsService } from "../../service/goods.service";

@Component({
  moduleId: "goodsAdd",
  selector: "goods-add",
  templateUrl: "goodsAdd.component.html"
})

export class GoodsAddComponent {
  @Input() public cat:any;
  @Output() public selectTab = new EventEmitter<string>();
  public goodsInfo:any;

  constructor(public goodsService: GoodsService){console.log(this.cat)}

  /*
   * @Description: Check the form data;
   * @Date: 2017-01-10;
   */
  public checkGoodsInfo(goods):boolean {
    let goodsInfo = goods;

    if(!goodsInfo.title){
      return false;
    } else if(!goodsInfo.goodsSn){
      return false;
    } else if(!goodsInfo.recPrice || isNaN(goodsInfo.recPrice)){
      return false;
    } else if(!goodsInfo.salePrice || isNaN(goodsInfo.salePrice)){
      return false;
    }

    return true;
  }

  /*
   * @Description: Add new goods;
   * @Date: 2017-01-10;
   */
  public addGoods(goodsInfoComponent):void {
    if(!this.cat || !this.cat.id){
      return;
    }else {
      this.goodsInfo = goodsInfoComponent.getGoodsInfo();
      if(!this.checkGoodsInfo(this.goodsInfo)){
        return;
      }

      this.goodsService.addGoods(this.goodsInfo).subscribe(res => {
        let data = res.json();
        if(data.success){
          this.selectTab.emit("goodsList");
        }else {
          alert(data.errorCode + ": " + data.message);
          console.error(data.errorCode + ": " + data.message);
        }
      });
    }
  }
}