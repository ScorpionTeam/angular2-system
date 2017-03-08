import { Component, OnInit, Input } from "@angular/core";
import { HngService } from "../../../service/hng.service";

@Component({
  moduleId: "companyList",
  selector: "company-list",
  templateUrl: "./hng.companyList.component.html"
})

export class HngCompanyListComponent implements OnInit {
  @Input() public editCompany:any;
  public searchKey:string = '';
  public companies:Array<any> = [];
  public pageOpts: any = {total: 100, limit: 5, perPage: 10, page: 1}; //分页对象
  public promptMessage:string = "您确定要删除该公司吗?";
  public notificationOpen:boolean = false; //是否显示删除确认对话框;
  public editorOpened:boolean = false; //whether to show editor;
  public editCompanyInfo:any;
  public curOpCompany:any;
  public placeholder:string ='搜索...';

  constructor(public hngService: HngService){}

  ngOnInit(){
    this.getCompanies(1);
  }

  public getCompanies(pageNum){
    let gData = {
      page: 1,
      size: 10,
      searchKey: this.searchKey
    };

    if(pageNum){
      gData.page = pageNum;
    }

    this.hngService.getCompanies(gData).subscribe(res => {
      let data = res.json();
      this.companies = data.rows;

      this.pageOpts = {
        total: data.total > 0 ? data.total : 1,
        limit: 5,
        perPage: 10,
        page: data.page
      };
    });
  }

  /*
   * @Description: Close the confirm box;
   * @Date: 2017-01-17;
   */
  public cancel(){
    this.notificationOpen = false;
  }

  /*
   * @Description: Confirm to delete the company;
   * @Date: 2017-01-17;
   */
  public confirm(){
    this.notificationOpen = false;
    this.delCompany();
  }

  /*
   * @Description: To edit the company;
   * @Date: 2017-01-18;
   */
  public toEdit(company){
    this.curOpCompany = company;
    this.editorOpened = true;
  }

  /*
   * @Description: Conform to edit the company;
   * @Date: 2017-01-18;
   */
  public confirmEdit(label){
    label.postInfo();
    let edit = confirm("请核对信息并确认!");
    
    if(edit){
      this.hngService.updateCompany(this.editCompanyInfo).subscribe(res => {
        let data = res.json();

        if(data.success){
          this.editorOpened = false;
          this.curOpCompany = null;
        }else{
          alert(data.message);
        }
      });
    }
  }

  /*
   * @Description: To delete the company;
   * @Date: 2017-01-17;
   */
  public toDelete(company){
    this.notificationOpen = true;
    this.curOpCompany = company;
  }

  /*
   * @Description: Delete the company;
   * @Date: 2017-01-17;
   */
  public delCompany() {
    this.hngService.deleteCompany(this.curOpCompany).subscribe(res => {
      let data = res.json();

      if(data.success){
        this.getCompanies(this.pageOpts.page);
      }
    });
  }

  /**
   * 条件搜索
   * @param data
   */
  searchByCondition(data:string){
    this.searchKey = data;
    this.getCompanies(1);
  }
}