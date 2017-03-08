import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch'
import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, RequestOptions, Response, Headers, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
declare var $;
import * as querystring from 'querystring'
const mergeAuthToken = (options: RequestOptionsArgs)=> {
  let newOptions = new RequestOptions({}).merge(options);
  let newHeaders = new Headers(newOptions.headers);
  newHeaders.set('Content-Type', 'application/json');
  newHeaders.set('token', localStorage.getItem('hl-token'));
  newHeaders.set('city', localStorage.getItem("hualaCity"));
  if (!localStorage.getItem("hualaCity")) {
    alert('请选择城市');
  }
  newOptions.headers = newHeaders;
  return newOptions;
};

//接口地址
const ApiUrl = process.env.ApiUrl;
@Injectable()
export class MyHttp {
  private template: string = '<div class="httpOverlay" style="z-index: 9999;background: rgba(0,0,0,.4);width: 100%;height: 100vh;position: fixed;left: 0;top: 0;">' +
    '<div class="row" style="padding-top: 20%;"><div class="col-md-4"></div><div class="col-md-4" style="text-align: center;color:#fff;"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i></div><div class="col-md-4"></div></div></div>';

  constructor(public http: Http, public router?: Router) {
  }

  get(url: string, body?: Object, options?: RequestOptionsArgs): Observable<Response> {
    let overlay = $('body .httpOverlay');
    if (overlay.length == 0) {
      $('body').append(this.template);
    }
    let opt = mergeAuthToken(options);
    opt.search = new URLSearchParams(querystring.stringify(body));
    let route = this.router;
    return this.http.get(ApiUrl + url, opt).map(res=> {
      $('body .httpOverlay').remove();
      return res;
    }).catch((error) => {
      let body = error.json();
      if (error.status == 401 || error.status == 402) {
        window.localStorage.removeItem("hl-token");
        route.navigate(["login"]);
      }
      $('body .httpOverlay').remove();
      return Observable.throw(error);
    });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let overlay = $('body .httpOverlay');
    if (overlay.length == 0) {
      $('body').append(this.template);
    }
    let route = this.router;
    return this.http.post(ApiUrl + url, body, mergeAuthToken(options)).map(res=> {
      $('body .httpOverlay').remove();
      return res;
    }).catch((error) => {
      let body = error.json();
      if (error.status == 401 || error.status == 402) {
        window.localStorage.removeItem("hl-token");
        route.navigate(["login"]);
      }
      $('body .httpOverlay').remove();
      return Observable.throw(error);
    });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(ApiUrl + url, body, mergeAuthToken(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(ApiUrl + url, mergeAuthToken(options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(ApiUrl + url, body, mergeAuthToken(options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.head(ApiUrl + url, mergeAuthToken(options));
  }
}