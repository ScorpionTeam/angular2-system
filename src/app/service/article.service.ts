import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class ArticleService {

  constructor(private http: MyHttp) {
  }

  /**
   * 根据目录id获取目录树
   * @param id
   * @returns {Observable<Response>}
   */
  getArticleListByCategoryId(id: string) {
    return this.http.get("/article/article-category?categoryId=" + id);
  }

  /**
   * 根据目录查询文章列表
   * @param cateGoryId 目录id
   * @param page  分页对象
   * @param key 关键字
   * @returns {Observable<Response>}
   */
  getArticleList(cateGoryId: string, page: any, key: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/article/article-list", {
      page: page.page,
      size: page.perPage,
      searchKey: key,
      categoryId: cateGoryId
    });

  }

  /**
   * 删除文章
   * @param data
   * @returns {Observable<Response>}
   */
  deleteArticle(data:Array<any>){
    return this.http.post("/article/article-delete",data);
  }

  /**
   * 保存文章目录
   * @param data
   * @returns {Observable<Response>}
   */
  saveCateGory(data:any){
    return this.http.post("/article/category-create",data);
  }

  /**
   * 发布文章
   * @param data
   * @returns {Observable<Response>}
   */
  saveArticle(data:any){
    return this.http.post("/article/publish-article",data);
  }

}