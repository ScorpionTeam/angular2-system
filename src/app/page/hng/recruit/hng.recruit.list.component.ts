import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HngService} from '../../../service/hng.service';
import {ToastEntity} from '../../../domain/toast';
import {PromptEntity} from '../../../domain/prompt';
@Component({
  selector: 'hng-recruit-list-component',
  templateUrl: './hng.recruit.list.component.html'
})

export class HngRecruitListComponent implements OnInit {

  //招聘信息列表对象
  public hngRecruitDataList: any = {};
  //分页对象
  public pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  //查询条件对象
  public conditions: any = {};
  //操作对象
  public operaObj: any = {};
  public companyListData: Array<any> = [];
  public jobListData: Array<any> = [];
  public placeholder: string = '搜索..店铺ID..店铺名称';
  //详情模态 打开|关闭
  public recruitOpened: boolean = false;
  public recruitId: number = 0;
  toast:ToastEntity = new ToastEntity;
  prompt:PromptEntity = new PromptEntity('您确定要删除吗?');
  @Output() tabSelect = new EventEmitter<string>();
  @Output() currentRecruit = new EventEmitter<any>();

  constructor(private hngService: HngService) {
  }

  ngOnInit(): void {
    this.querySellerDataByBtn();
    this.hngService.getAllCompany().subscribe(res=> {
      this.companyListData = res.json().body;
    });

    this.hngService.getAllJob().subscribe(res=> {
      this.jobListData = res.json().body;
    });
  }

  //分页事件
  pageChange(event) {
    this.pageOpts.page = event;
    this.querySellerDataByBtn();
  }

  querySellerDataByBtn() {
    this.hngService.getRecruitData(this.pageOpts, this.conditions).subscribe(res=> {
      this.hngRecruitDataList = res.json();
    });
  }

  //prompt取消事件
  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  //prompt确定事件
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.toast.showAlert = !this.toast.showAlert;
    this.toast.toastMessage = '删除成功';
  }

  //Toast传播事件
  notifyParamFunction(event: boolean) {
    this.prompt.notificationOpen = event;
  }

  //删除事件
  delClick(data: any) {
    this.operaObj = data;
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  //删除数据操作
  confirmDel() {

  }

  //搜索
  searchByCondition(data: string) {
    this.conditions.key = data;
    this.querySellerDataByBtn();
  }

  //查看详情
  detail(data: any) {
    this.recruitOpened = !this.recruitOpened;
    this.operaObj = data;
    this.hngService.getRecruitSeller(data.id).subscribe(res=> {
      this.operaObj.hSellers = res.json().body;
    });
  }

  statics(data: any) {
    this.tabSelect.emit('statics');
    this.currentRecruit.emit(data);
  }
}