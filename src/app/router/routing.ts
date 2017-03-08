//路由
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../page/login/login.component';
import {IndexComponent} from '../page/index/inde.component';
import {ActivityComponent} from '../page/activtity/activity.component';
import {ChartComponent} from '../page/chart/chart.component';
import {CardComponent} from '../page/card/card.component';
import {SellerMainComponent} from '../page/seller/seller.main.component';
import {PictureComponent} from '../page/system/picture/picture.component';
import {AppVersionComponent} from '../page/system/app/app.version.component';
import {OrderComponent} from '../page/order/order.component';
import {UserComponent} from '../page/system/user/user.component';
import {MessageComponent} from '../page/system/message/message.component';
import {BalanceComponent} from '../page/balance/balance.component';
import {GoodsComponent} from '../page/goods/goods.component';
import {SellerDataComponent} from '../page/sellerdata/seller.data.component';
import {ArticleComponent} from '../page/system/article/article.component';
import {HngCompanyComponent} from '../page/hng/company/hng.company.component';
import {HngJobComponent} from '../page/hng/job/hng.job.component';
import {HngRecruitMainComponent} from '../page/hng/recruit/hng.recruit.main.component';
import {HngMovieComponent} from '../page/hng/movie/hng.movie.component';
import {HngRecruitBasicComponent} from '../page/hng/recruit/hng.recruit.basic.component';
import {SuppliersListComponent} from '../page/suppliers/suppliersList.component';
import {EveryDateReportComponent} from '../page/everydatereport/every.date.report.component';
import {FinanceListComponent} from '../page/finance/finance.list.component';
import {SellerSubsidyComponent} from '../page/sellersubsidy/seller.subsidy.component';
import {SellerAuditComponent} from '../page/selleraudit/seller.audit.component';
import {ConfigComponent} from '../page/system/config/config.component';
import {SysMenuComponent} from '../page/system/menu/sys.menu.component';
import {RefundOrderComponent} from '../page/refundorder/refund.order.component';
import {RoleCOmponent} from '../page/system/role/role.component';
import {SpikeMainComponent} from '../page/spike/spike.main.component';
import {RelativeSellerComponent} from '../page/hng/recruit/hng.recruit.relative.seller.component';
import {RecruitChooseTimeComponent} from '../page/hng/recruit/hng.recruit.choosetime.component';
import {BasicReportComponent} from '../page/basicreport/basic.report.component';
import {SqlConfigComponent} from '../page/system/sqlconfig/sql.config.component';
import {SellerMainEnterComponent} from '../page/sellercomponent/seller.main.enter.component';
import {BannerListComponent} from "../page/banner/banner.list.component";
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'index', component: IndexComponent,
    children: [
      {path: 'act-list', component: ActivityComponent},
      {path: 'chart', component: ChartComponent},
      {path: 'banner-main', component: BannerListComponent},
      {path: 'card-list', component: CardComponent},
      {path: 'seller-info', component: SellerMainComponent},
      {path: 'seller-goods', component: SellerMainEnterComponent},
      {path: 'system-img-manage', component: PictureComponent},
      {path: 'app/app-version-index', component: AppVersionComponent},
      {path: 'order', component: OrderComponent},
      {path: 'system-user-manage', component: UserComponent},
      {path: 'system-sms', component: MessageComponent},
      {path: 'balance-list', component: BalanceComponent},
      {path: 'goods-entry', component: GoodsComponent},
      {path: 'seller-rate', component: SellerDataComponent},
      {path: 'system-article-manage', component: ArticleComponent},
      {path: 'hng/hng-company', component: HngCompanyComponent},
      {path: 'hng/hng-job', component: HngJobComponent},
      {path: 'hng/hng-recruit', component: HngRecruitMainComponent},
      {path: 'hng/hng-movie', component: HngMovieComponent},
      {path: 'hng/hng-recruit-basic/:recruitId', component: HngRecruitBasicComponent},
      {path: 'supplier-info', component: SuppliersListComponent},
      {path: 'platform', component: EveryDateReportComponent},
      {path: 'finance', component: FinanceListComponent},
      {path: 'seller-report', component: SellerSubsidyComponent},
      {path: 'seller-spike', component: SpikeMainComponent},
      {path: 'seller-auth', component: SellerAuditComponent},
      {path: 'system-sysconfig', component: ConfigComponent},
      {path: 'system-menu', component: SysMenuComponent},
      {path: 'order-refund', component: RefundOrderComponent},
      {path: 'system-role', component: RoleCOmponent},
      {path: 'report', component: BasicReportComponent},
      {path: 'hng/recruit-seller/:recruitId', component: RelativeSellerComponent},
      {path: 'hng/recruit-date/:recruitId', component: RecruitChooseTimeComponent},
      {path: 'sql/sql-index', component: SqlConfigComponent}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}