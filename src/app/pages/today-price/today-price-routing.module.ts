import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayPricePage } from './today-price.page';

const routes: Routes = [
  {
    path: '',
    component: TodayPricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayPricePageRoutingModule {}
