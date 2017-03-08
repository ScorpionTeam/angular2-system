import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ArticleService} from '../../../service/article.service';
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {PromptEntity} from '../../../domain/prompt';
import {ToastEntity} from '../../../domain/toast';
import {isNullOrUndefined} from "util";
@Component({
  selector: 'article-list-component',
  templateUrl: './article.list.component.html'
})

export class ArticleListComponent implements OnInit {

  /**
   * toast封装实体
   */
  toast:ToastEntity = new ToastEntity;
  /**
   * prompt封装实体
   */
  prompt:PromptEntity = new PromptEntity('您确定要删除吗?');
  /**
   * 文章目录列表
   * @type {Array}
   */
  public cateGoryArray: Array<any> = [];
  /**
   * 文章集合
   * @type {{}}
   */
  public articleListData: any = {};
  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  public pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  public placeholder: string = '搜索..文章标题.关键字';
  /**
   * 搜索关键字
   */
  public key: string;
  /**
   * 目录创建模态 打开|关闭
   * @type {boolean}
   */
  public categoryOpened: boolean = false;
  /**
   * 显示 隐藏  *
   * @type {boolean}
   */
  public required: boolean = true;

  /**
   * 当前文章对象
   * @type {{}}
   */
  public currentArticleObj: any = {};

  /**
   * 当前目录对象
   * @type {{}}
   */
  currentCategory: any = {};

  /**
   * 向上溢出文章  用于预览，修改
   * @type {EventEmitter<any>}
   */
  @Output() eventEmit = new EventEmitter<any>();

  /**
   * 向上溢出目录
   * @type {EventEmitter<any>}
   */
  @Output() eventEmitCate = new EventEmitter<any>();

  /**
   * 文章操作对象集合
   * @type {Set<any>}
   */
  public articleHashSet = new Set<any>();

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.getCateGoryList(this.currentCategory.id).subscribe(res=> {
      this.cateGoryArray = res.json().body;
    });
  }

  /**
   * 根据当前目录id获取目录树
   * @param id
   */
  getCateGoryList(id: string) {
    return this.articleService.getArticleListByCategoryId(id);
  }


  /**
   * 查询子节点目录
   * @param node
   * @returns {any}
   */
  getChildren(node: any) {
    return this.getCateGoryList(node.data.id).map(res=> {
      return res.json().body;
    }).toPromise();
  }


  /**
   * 初始化参数配置
   * @type {{getChildren: any; context: ArticleListComponent}}
   */
  treeOptions = {
    getChildren: this.getChildren.bind(this),
    context: this
  }

  /**
   * 目录点击事件
   * @param data
   */
  getCategoryId(data: any) {
    this.currentCategory = data.data;
    this.getArticleList(this.currentCategory.id, this.pageOpts, this.key);
  }

  /**
   * 创建目录
   */
  createCategory() {
    this.categoryOpened = !this.categoryOpened;
  }

  /**
   * 创建文章
   */
  createArticle() {
    if (isNullOrUndefined(this.currentCategory.id)) {
      this.toastFunction('请选择文章目录', 'info');
      return;
    }
    this.eventEmitCate.emit(this.currentCategory);
    this.eventEmit.emit(this.currentArticleObj);

  }

  /**
   * 分页事件
   * @param data
   */
  pageChange(data: number) {
    this.pageOpts.page = data;
    this.getArticleList(this.currentCategory.id, this.pageOpts, this.key);
  }

  /**
   * 搜索事件
   * @param data
   */
  searchByCondition(data: string) {
    this.key = data;
    this.getArticleList(this.currentCategory.id, this.pageOpts, this.key);
  }

  /**
   * 查询文章
   * @param cateGoryId
   * @param page
   * @param key
   */
  getArticleList(cateGoryId: string, page: any, key: string) {
    this.articleService.getArticleList(cateGoryId, page, key).subscribe(res=> {
      this.articleListData = res.json();
    });
  }

  /**
   * prompt取消事件
   */
  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * prompt确认事件
   */
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    let array: Array<any> = [];
    array = this.convertSetToList(this.articleHashSet);
    this.deleteArticle(array);
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.toast.showAlert = data;
  }

  /**
   * 删除按钮点击事件
   */
  delClick() {
    if (this.articleHashSet.size == 0) {
      this.toast.toastMessage = '请选择需要删除的文章';
      this.toast.toastType = 'info';
      this.toast.showAlert = !this.toast.showAlert;
      return;
    }
    this.prompt.promptMessage = '您确定要删除该文章吗?';
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }


  /**
   * 保存目录
   */
  saveCategory() {
    this.currentCategory.topId = this.currentCategory.id;
    this.articleService.saveCateGory(this.currentCategory).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('创建成功', 'success');
        this.categoryOpened = !this.categoryOpened;
      } else {
        this.toastFunction(result.message, 'error');
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
   * 删除文章
   * @param data
   */
  deleteArticle(data: Array<any>) {
    this.articleService.deleteArticle(data).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('删除成功', 'success');
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   *
   * @param data
   */
  check(data: any) {
    if (!this.articleHashSet.has(data)) {
      this.articleHashSet.add(data);
    } else {
      this.articleHashSet.delete(data);
    }
  }

  /**
   * Set 转换为 List
   * @param sources
   * @param target
   */
  convertSetToList(sources: Set<any>) {
    let result: Array<any> = [];
    sources.forEach(function (obj: any) {
      result.push(obj);
    });
    return result;
  }

  /**
   * 文章预览  文章编辑
   * @param data
   */
  emitObj(data: any) {
    this.eventEmit.emit(data);
    this.eventEmitCate.emit(this.currentCategory);
  }

}