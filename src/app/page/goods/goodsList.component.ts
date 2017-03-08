import {Component, Input} from "@angular/core";
import {GoodsService} from "../../service/goods.service";

@Component({
  moduleId: "goodsList",
  selector: "goods-list",
  templateUrl: "goodsList.component.html"
})

export class GoodsListComponent {
  @Input() public cat:any;//所选类目;
  public goodsList:any = []; //商品列表;
  public imgUrl:string;
  public pageOpts:any = {}; //分页对象
  public confirmBoxOpen:boolean = false; //打开或关闭确认对话框;
  public editorOpened:boolean = false; //打开或关闭edit对话框;
  public delGoods:any;
  public editGoodsInfo:any;

  constructor(public goodsService:GoodsService) {
    this.imgUrl = process.env.ImgUrl;
  }

  ngOnChanges(changes) {
    let catSelected = changes["cat"];

    if (!catSelected || !catSelected.currentValue) {
      return;
    } else if (catSelected.currentValue != catSelected.previousValue && !catSelected.currentValue.hasChildren) {
      this.getGoodsByCatId(1);
    }
  }

  /*
   * @description: Get goods by category id;
   * @params: pageNum:Number;
   * @date: 2017-01-05;
   */
  public getGoodsByCatId(pageNum:any) {
    if (!this.cat || !this.cat.id) {
      return;
    }

    let data = {
      page: 1,
      size: 10,
      categoryId: this.cat.id,
      searchKey: ""
    };

    if (pageNum) {
      data.page = pageNum;
    }

    this.goodsService.getGoodsByCat(data).subscribe(res => {
      let rData = res.json();

      this.goodsList = rData.rows;
      this.pageOpts = {
        total: rData.total > 0 ? rData.total : 1,
        limit: 5,
        perPage: 10,
        page: rData.page
      };

      this.goodsList.forEach((item, index) => {
        item.rank = index + 1;
        item.recPrice = item.recPrice / 100;
        item.salePrice = item.salePrice / 100;
      });
    });
  }

  /*
   * @description: Delete goods, it will bring up a confirm popup window;
   * @params: goods: Object;
   * @date: 2017-01-10;
   */
  public toDelete(goods):void {
    this.confirmBoxOpen = true;
    this.delGoods = goods;
  }

  /*
   * @description: Close confirm box;
   * @date: 2017-01-10;
   */
  public close():void {
    this.confirmBoxOpen = false;
  }

  /*
   * @description: Confirm to delete goods;
   * @date: 2017-01-10;
   */
  public confirmDel():void {
    this.confirmBoxOpen = false;
    this.goodsService.deleteGoods(this.delGoods).subscribe(res => {
      let data = res.json();

      if (data.success) {
        this.getGoodsByCatId(this.pageOpts.page);
      } else {
        console.error("删除商品失败!");
      }
    })
  }

  selectScope(event) {

  }

  searchByCondition(event) {

  }

  /*
   * @Description: Check the form data;
   * @Date: 2017-01-10;
   */
  public checkGoodsInfo(goods):boolean {
    let goodsInfo = goods;

    if(!goodsInfo){
      return false;
    }

    if(!goodsInfo.title){
      alert("请输入商品名称!");
      return false;
    } else if(!goodsInfo.goodsSn){
      alert("请输入商品货号!");
      return false;
    } else if(!goodsInfo.recPrice || isNaN(goodsInfo.recPrice)){
      alert("请输入商品进货价!");
      return false;
    } else if(!goodsInfo.salePrice || isNaN(goodsInfo.salePrice)){
      alert("请输入商品售价!");
      return false;
    }

    return true;
  }

  /*
   * @description: Click to edit goods, it will bring up a editor popup window;
   * @date: 2017-01-11;
   */
  public toEdit(goods):void {
    this.editorOpened = true;
    this.editGoodsInfo = goods;
  }

  /*
   * @description: Confirm to edit goods;
   * @date: 2017-01-11;
   */
  public confirmEdit(goodsInfoComponent):void {
    let pData = goodsInfoComponent.getGoodsInfo();
    pData.goodsExtendList = [
      {
        metaKey: "info",
        meta_desc: "商品信息",
        dataKey: "img_url",
        dataValue: "",
        dataDesc: "图片地址",
        isValid: "1",
        isFixed: "1"
      }
    ];
    if(pData.picDescription){
      let picList = "";
      pData.picDescription.forEach(item => picList += item + ";");
      picList = picList.substring(0, picList.length - 1);
      pData.goodsExtendList[0].dataValue = picList;
    }

    if(!this.checkGoodsInfo(pData)){
      return;
    }

    pData.recPrice *= 100;
    pData.salePrice *= 100;
    this.goodsService.updateGoods(pData).subscribe(res => {
      let data = res.json();
      if(data.success){
        this.editorOpened = false;
        this.editGoodsInfo = {};
        this.getGoodsByCatId(this.pageOpts.page);
      }
    });
  }
}
