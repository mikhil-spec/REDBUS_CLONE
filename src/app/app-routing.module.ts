import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './Component/landing-page/landing-page.component';
import { SelectbusPageComponent } from './Component/selectbus-page/selectbus-page.component';
import { PaymentPageComponent } from './Component/payment-page/payment-page.component';
import { ProfilePageComponent } from './Component/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Tedbus - Home' },
  { path: 'select-bus', component: SelectbusPageComponent, title: 'Tedbus - Select Bus' },
  { path: 'payment', component: PaymentPageComponent, title: 'Tedbus - Payment' },
  { path: 'profile', component: ProfilePageComponent, title: 'Tedbus - My Profile' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}