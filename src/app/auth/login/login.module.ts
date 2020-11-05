import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ForgotPasswordComponent } from 'src/app/component/forgot-password/forgot-password.component';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@NgModule({
  entryComponents: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, ForgotPasswordComponent]
})
export class LoginPageModule { }
