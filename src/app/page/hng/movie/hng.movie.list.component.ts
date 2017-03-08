import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HngService} from '../../../service/hng.service';
import {ToastEntity} from '../../../domain/toast';
import {PromptEntity} from '../../../domain/prompt';
import {isNullOrUndefined} from "util";
import {FileUploader} from '../../../utils/file-upload/file-uploader.class';
@Component({
  selector: 'hng-movie-list-component',
  templateUrl: './hng.movie.list.component.html'
})

export class HngMovieListComponent implements OnInit {
  /**
   * api地址
   */
  apiUrl: string = process.env.ApiUrl;
  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast: ToastEntity = new ToastEntity;
  /**
   *
   * @type {PromptEntity}
   */
  prompt: PromptEntity = new PromptEntity('您确定要删除吗?');
  /**
   * 活动对象
   * @type {{}}
   */
  public activity: any = {};
  /**
   * 文件上传
   * @type {FileUploader}
   */
  uploader: FileUploader = new FileUploader({url: this.apiUrl + '/preferential/importExcel?activityId=' + this.activity.id});
  /**
   * 影片列表
   * @type {Array}
   */
  public movieDataList: Array<any> = [];
  /**
   * 活动列表分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  public pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  /**
   * 统计分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  public votePageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  /**
   * 当前商家对象
   * @type {{}}
   */
  public currentSeller: any = {};
  /**
   * 活动列表
   * @type {{}}
   */
  public activityData: any = {};
  /**
   * 活动操作对象
   * @type {{}}
   */
  public operaActiveObj: any = {};
  /**
   * 统计详情  打开|关闭
   * @type {boolean}
   */
  public statisticalOpened: boolean = false;
  /**
   * 统计数据
   * @type {{}}
   */
  public voteDataList: any = {};
  /**
   * 当前影片对象
   * @type {{}}
   */
  public currentMovie: any = {};
  /**
   * 向上传递工具
   * @type {EventEmitter<any>}
   */
  @Output() outPutCurrentActive = new EventEmitter<any>();

  commonImgUrl = process.env.ImgUrl;

  constructor(private hngService: HngService) {
  }

  ngOnInit(): void {
    this.getMovieActiveList(this.pageOpts);
  }

  /**
   * 商家列表传递事件
   * @param event
   */
  targetFunction(event: any) {

  }

  /**
   * 获取活动列表
   * @param page
   */
  getMovieActiveList(page: any) {
    this.hngService.getMovieActiveDataList(page).subscribe(res=> {
      this.activityData = res.json();
    });
  }

  /**
   * prompt取消事件
   */
  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * prompt 确定事件
   */
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.delActivity();
  }

  /**
   * toast传播事件
   * @param event
   */
  notifyParamFunction(event: boolean) {
    this.toast.showAlert = event;
  }

  /**
   * 删除按钮点击事件
   * @param data
   */
  delClick(data: any) {
    this.operaActiveObj = data;
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * 活动详情
   * @param data
   */
  detail(data: any) {
    this.activity = data;
    this.movieDataList = data.movies;
  }

  /**
   * 活动列表分页
   * @param data
   */
  pageChange(data: any) {
    this.pageOpts.page = data;
    this.getMovieActiveList(this.pageOpts);
  }

  /**
   * 删除操作
   */
  delActivity() {
    this.hngService.delActive(this.operaActiveObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('删除成功', 'success');
        this.getMovieActiveList(this.pageOpts);
      } else {
        this.toastFunction('删除失败,请联系管理员', 'error');
      }
    });
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

  /**
   * 统计操作
   * @param data
   */
  vote(data: any) {
    this.statisticalOpened = !this.statisticalOpened;
    this.currentMovie = data;
    this.voteList(this.votePageOpts, this.currentMovie.id);
  }

  /**
   * 统计数据集合
   * @param page
   * @param id
   */
  voteList(page: any, id: string) {
    this.hngService.getMovieVote(page, id).subscribe(res=> {
      this.voteDataList = res.json();
    });
  }

  /**
   * 统计详情分页
   * @param data
   */
  votePageChange(data: number) {
    this.votePageOpts.page = data;
    this.voteList(this.votePageOpts, this.currentMovie.id);
  }

  /**
   * 活动编辑事件
   * @param data
   */
  editActive(data: any) {
    this.outPutCurrentActive.emit(data);
  }

  /**
   * 导出
   */
  exportDataReport() {
    if (isNullOrUndefined(this.activity.id)) {
      this.toastFunction('请选择一条活动进行数据导出', 'error');
      return;
    }
    this.hngService.exportActivity(this.activity.id);

  }

  /**
   * 导入
   */
  importDataReport(dom: any) {
    if (isNullOrUndefined(this.activity.id)) {
      this.toastFunction('请选择一条活动进行数据导入', 'info');
      return;
    }
    dom.click();
  }

  /**
   * 文件改变时触发 此动作
   * @param data
   */
  addQueue(data: any) {
    this.uploader.setOptions({url:this.apiUrl+'/preferential/importExcel?activityId='+this.activity.id});
    this.uploader.addToQueue(data.files);
    this.uploader.uploadAll();
    let that = this;
    this.uploader.onSuccessItem =(item:any,response:any,status:any,headers:any)=>{
      let result = response.body;
      if(result.success){
        that.toastFunction('导入成功','success');
      }else{
        that.toastFunction(result.message,'error');
      }
    }
  }
}