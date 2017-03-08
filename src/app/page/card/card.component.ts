import {Component, OnInit,} from '@angular/core';
import {ToastEntity} from '../../domain/toast';
import {PromptEntity} from '../../domain/prompt';
import {CardService} from '../../service/card.service';
@Component({
  selector: 'card-component',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  /**
   * 卡券对象
   * @type {{}}
   */
  cardDataList: any = {};

  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10}

  /**
   * 查询条件对象
   * @type {{types: string}}
   */
  conditions: any = {types: '0'};

  /**
   * placeholder
   * @type {string}
   */
  placeholder: string = '店铺..卡券';

  /**
   * 新增卡券  打开|关闭
   * @type {boolean}
   */
  createOpened: boolean = false;

  /**
   * 操作对象
   * @type {{}}
   */
  operaObj: any = {};

  /**
   * 当前卡券对象
   * @type {{}}
   */
  currentCard: any = {};

  /**
   * 编辑卡券  打开|关闭
   * @type {boolean}
   */
  editOpned: boolean = false;
  toast:ToastEntity = new ToastEntity;
  prompt:PromptEntity = new PromptEntity('您确定要删除吗?');
  _date_formate: string = 'yyyy-mm-dd';

  /**
   * 选择店铺集合
   * @type {Array}
   */
  sellerArray: Array<any> = [];

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
    this.getCardList(this.pageOpts, this.conditions);
  }

  /**
   * 查询卡券列表
   * @param page
   * @param conditions
   */
  getCardList(page: any, conditions: any) {
    this.cardService.getCardList(page, conditions).subscribe(res=> {
      this.cardDataList = res.json();
    });
  }

  /**
   * 分页事件
   * @param data
   */
  pageChange(data: number) {
    this.pageOpts.page = data;
    this.getCardList(this.pageOpts, this.conditions);
  }

  /**
   * 编辑事件
   * @param data
   */
  edit(data: any) {
    this.editOpned = !this.editOpned;
    this.currentCard = data;
  }

  /**
   * 删除按钮操作事件
   * @param data
   */
  del(data: any) {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.operaObj = data;
  }

  /**
   * 条件搜索
   * @param data
   */
  searchByCondition(data: string) {
    this.conditions.sellerName = data;
    this.getCardList(this.pageOpts, this.conditions);
  }

  /**
   * 接收 seller-list选中的店铺
   * @param data
   */
  showData(data: any) {
    this.sellerArray = data;
  }

  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * prompt确定事件
   */
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.cardService.deleteCard(this.operaObj.id).subscribe(res=> {
      let result = res.json();
      if (result.errorCode == 'success') {
        this.toastFunction('删除卡券成功', 'success');
        this.getCardList(this.pageOpts, this.conditions);
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
   * 接收开始时间
   * @param data
   */
  receiveStartTime(data: any) {
    this.conditions.startTimeStr = data;
  }

  /**
   * 接收结束时间
   * @param data
   */
  receiveEndTime(data: any) {
    this.conditions.endTimeStr = data;
  }

  /**
   * 搜索按钮事件
   */
  search() {
    this.getCardList(this.pageOpts, this.conditions);
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