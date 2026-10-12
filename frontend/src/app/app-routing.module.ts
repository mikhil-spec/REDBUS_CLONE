import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Component/landing-page/landing-page.component';
import { SelectbusPageComponent } from './Component/selectbus-page/selectbus-page.component';
import { PaymentPageComponent } from './Component/payment-page/payment-page.component';
import { ProfilePageComponent } from './Component/profile-page/profile-page.component';
import {CommunityComponent} from './Component/community/community.component';
import { NotificationCenterComponent } from './Component/notification-center/notification-center.component';
import { RoutePlannerComponent } from './Component/route-planner/route-planner.component';
import { RouteReviewsComponent } from './Component/route-reviews/route-reviews.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { AccountComponent } from './Component/account/account.component';

const routes: Routes = [
  {path: '',component:LandingPageComponent},
  {path: 'select-bus',component:SelectbusPageComponent},
  {path:'payment',component:PaymentPageComponent},
  {path:'profile',component:ProfilePageComponent},
  {path: 'planner', component: RoutePlannerComponent},
  {path : 'community', component :CommunityComponent },
  {path: "notifications", component: NotificationCenterComponent},
  {path: "reviews", component: RouteReviewsComponent} ,
  {path: "dashboard", component: DashboardComponent},
  {path: "account", component: AccountComponent},
  // wildcard fallback
  {path: "**", redirectTo: "planner" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
