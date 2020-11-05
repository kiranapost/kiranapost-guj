import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayPricePageRoutingModule } from './today-price-routing.module';

import { TodayPricePage } from './today-price.page';
import { HeaderComponent } from 'src/app/component/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayPricePageRoutingModule
  ],
  declarations: [TodayPricePage, HeaderComponent]
})
export class TodayPricePageModule { }
