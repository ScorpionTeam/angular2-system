import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MyHttp} from '../../core/http';
import {TreeNode} from "angular2-tree-component/dist/angular2-tree-component";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Component({
  moduleId: "goodsCat",
  selector: "goods-cat",
  templateUrl: "goodsCat.component.html",
  styleUrls: ['./goods.cat.component.css']
})

export class GoodsCatComponent implements OnInit {
  @Output() public catSelected = new EventEmitter<any>(); //将当前所选的类目节点(TreeNode)传播到父组件;
  public catNodes: Array<any> = []; //类目节点数组;
  public showDetail: boolean;
  public options = {
    getChildren: (node: TreeNode) => {
      return this.getCatsById(node.data.id).map(res => {
        return res.json().body;
      }).toPromise();
    }
  };

  //选项对象;
  ngOnInit() {
    this.getCatsById("0").subscribe(res => {
      this.catNodes = res.json().body;
      console.log("执行了");
      console.log(res.json().body);
    })
  }

  constructor(public http: MyHttp) {}

  /*
   * @description: Get children categories by parents cat id;
   * @params: parentCid: String;
   * @date: 2017-01-05;
   */
  public getCatsById(parentCid: any) {
    return this.http.get("/goods/category?parentCid=" + parentCid);
  }

  /*
   * @description: Click Event: Get godds by category id;
   * @params: TreeNode: node;
   * @date: 2017-01-05;
   */
  public getGoodsByCatId(node: TreeNode) {
    let cat = node.data;

    if (cat && !cat.hasChildren) {
      this.catSelected.emit(cat);
    }
  }
}