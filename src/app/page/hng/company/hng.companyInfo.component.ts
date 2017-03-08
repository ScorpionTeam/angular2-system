import { Component, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import { HngService } from "../../../service/hng.service";

@Component({
  moduleId: "companyInfo",
  selector: "company-info",
  templateUrl: "hng.companyInfo.component.html"
})

export class HngcompanyInfoComponent implements OnChanges{
  @Input() public companyInput:any;
  @Input() public noBtn:boolean = true;
  @Output() public postCompanyInfo = new EventEmitter<any>();

  public companyInfo = {
    companyName: '',
    contacts: '',
    contactsPhone: '',
    filePath: ''
  }; //公司信息;

  constructor(public hngService:HngService){
    if(this.companyInput){
      this.companyInfo = this.companyInput;
    }
  }

  ngOnChanges(changes){
    let company = changes['companyInput'];
    if(company && company.currentValue && company.currentValue != company.previousValue){
      this.companyInfo = company.currentValue;
    }
  }

  /*
   * @Description: Add new company;
   * @Date: 2017-01-17;
   */
  public addCompany(){
    let valid = this.checkCompanyInfo();

    if(!valid){
      return;
    }

    this.hngService.addCompany(this.companyInfo).subscribe(res => {
      let data = res.json();
    });
  }

  /*
   * @Description: Check the company info;
   * @Date: 2017-01-17;
   */
  public checkCompanyInfo():boolean{
    let info = this.companyInfo;

    if(!info.companyName){
      alert("请输入公司名称!");

      return false;
    } else if(!info.contacts){
      alert();

      return false;
    } else if(!info.contactsPhone){
      alert();

      return false;
    } else if(!info.filePath){
      alert();

      return false;
    }

    return true;
  }

  /*
   * @Description: Post the company info;
   * @Date: 2017-01-17;
   */
  public postInfo(){
    this.postCompanyInfo.emit(this.companyInfo);
  }
}