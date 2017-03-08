import {Component,OnInit} from '@angular/core';
@Component({
  selector:'province-city-component',
  templateUrl:'./province.city.component.html'
})
export class ProvinceCityComponent implements OnInit{
  /**
   * 省市 数组
   * @type {number[]}
   */
  where:Array<any> = [35];

  ngOnInit(): void {
  }

  copyValue(){

  }


}