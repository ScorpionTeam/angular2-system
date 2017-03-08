import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class ActivityService {

  constructor(private http: MyHttp) {
  }

  public getCardList(page: any, card: any) {
    let apiUrl = "/card/card-list?page=1&size=10"
    return this.http.post(apiUrl, card);
  }
}