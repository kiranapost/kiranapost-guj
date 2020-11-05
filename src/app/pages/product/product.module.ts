import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { ViewDetailComponent } from 'src/app/component/view-detail/view-detail.component';

@NgModule({
  entryComponents: [ViewDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule
  ],
  declarations: [ProductPage, ViewDetailComponent, HeaderComponent]
})
export class ProductPageModule { }
