import {Component, OnInit} from '@angular/core';
import {HngService} from '../../../service/hng.service';
import {ToastEntity} from '../../../domain/toast';
import {PromptEntity} from '../../../domain/prompt';
@Component({
  selector: 'hng-job-component',
  templateUrl: './hng.job.component.html'
})

export class HngJobComponent implements OnInit {
  constructor(private hngService: HngService) {
  }

  ngOnInit(): void {
    this.queryJobList(this.key, this.pageOpts);
  }

  //岗位列表
  jdbList: any = {};
  //分页对象
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  //搜索条件
  key: string = '';
  placeholder: string = '搜索..岗位名称..联系人..电话';
  //操作对象
  operaObj: any = {};
  prompt:PromptEntity = new PromptEntity('您确定要删除吗?');
  /**
   * toast
   * @type {ToastEntity}
   */
  toast:ToastEntity = new ToastEntity;
  //详情模态 打开|关闭
  jobDetaiOpen: boolean = false;
  //新增|编辑   打开|关闭
  insertOrEditOpen: boolean = false;
  //显示|隐藏  *
  required: boolean = true;

  //条件搜索
  searchByCondition(data: any) {
    this.key = data;
    this.queryJobList(this.key, this.pageOpts);
  }

  //查询岗位列表
  queryJobList(key: string, page: any) {
    this.hngService.getJobList(key, page).subscribe(res=> {
      this.jdbList = res.json();
    });
  }

  //分页
  pageChange(data: any) {
    this.pageOpts.page = data;
    this.queryJobList(this.key, this.pageOpts);
  }

  //prompt取消事件
  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  //prompt确定事件
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.hngService.deleteJob(this.operaObj).subscribe(res=> {
      let ret = res.json();
      if (ret.success) {
        this.toastFunction('删除成功','success');
        this.queryJobList(this.key, this.pageOpts);
      } else {
        this.toastFunction(ret.message,'error');
      }
    });
  }

  //删除事件
  deleteFunc(data: any) {
    this.operaObj = data;
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  //编辑事件
  editFun(data: any) {
    this.operaObj = data;
    this.insertOrEditOpen = !this.insertOrEditOpen;
  }

  //toast消息通知事件
  notifyParamFunction(event: boolean) {
    this.toast.showAlert = event;
  }

  //岗位详情
  jobDetail(data: any) {
    this.operaObj = data;
    this.jobDetaiOpen = !this.jobDetaiOpen;
  }

  //模态关闭
  cancel() {
    this.jobDetaiOpen = !this.jobDetaiOpen;
  }

  //保存
  save() {
    this.hngService.saveJob(this.operaObj).subscribe(res=> {
      let ret = res.json();
      if (ret.success) {
        this.toastFunction('保存成功', 'success');
        this.insertOrEditOpen = !this.insertOrEditOpen;
        this.queryJobList(this.key, this.pageOpts);
      } else {
        this.toastFunction(ret.message, 'error');
      }
    });
  }

  //新增
  create() {
    this.insertOrEditOpen = !this.insertOrEditOpen;
    this.operaObj = {};
  }

  //toast函数
  toastFunction(message: string, toastType: string) {
    this.toast.showAlert = !this.toast.showAlert;
    this.toast.toastMessage = message;
    this.toast.toastType = toastType;
  }
}