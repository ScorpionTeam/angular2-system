import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'hng-company-component',
  templateUrl: './hng.company.component.html'
})

export class HngCompanyComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor() {
  }

  //公司列表对象
  companyList: any = {};
  //tab
  selectedTab:string='companyList';


}