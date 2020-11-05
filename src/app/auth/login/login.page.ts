import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ForgotPasswordComponent } from 'src/app/component/forgot-password/forgot-password.component';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../user.service';
import { UtilProvider } from '../../providers/util/util';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
  show: boolean;
  loginForm: FormGroup;
  validationMessages: any;
  submitted = false;
  error_messages: any = ''
  constructor(private router: Router, public user: UserService, public util: UtilProvider, public stroage: Storage,
    private formBuilder: FormBuilder, public menuctrl: MenuController,
    private modelCtrl: ModalController) {
    this.show = false;
    this.menuctrl.enable(false);
    this.setupLoginFormData();
  }

  ngOnInit() {
    this.menuctrl.enable(false);
  }

  setupLoginFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Email is Required' },
        { type: "pattern", message: '*Please Enter valid Email' }
      ],

      password: [
        { type: "required", message: '*Password is Required' }
      ]
    };
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
      },
    );
  }

  get f() { return this.loginForm.controls; }

  showPassword() {
    this.show = !this.show;
  }

  async forgotPassword() {
    let editProfileModal = await this.modelCtrl.create({
      component: ForgotPasswordComponent,
      cssClass: 'forgot-password-modal'
    });
    await editProfileModal.present();
    editProfileModal.onWillDismiss().then(data => {
      this.ngOnInit();
    });
  }

  submitLogin(loginForm) {
    this.util.presentLoading();
    let rawData = {
      "email": loginForm.value.email,
      "password": loginForm.value.password,
      "device_id": '2345',
      "device_token": '2345'
    }

    this.user.login(rawData).subscribe(res => {
      this.util.dismissLoading();
      let response: any = res;
      if (response.response.status == 'true' || response.response.status == true) {
        this.menuctrl.enable(true);
        this.util.presentToast(response.response.Message);
        localStorage.setItem('profileImage',response.response.Data[0].profile_pic)
        this.stroage.set('userData', response.response.Data[0]);
        localStorage.setItem('headerToken', response.response.Data[0].header_token)
        setTimeout(() => {
          this.router.navigate(['/app/tabs/today-price']);
        }, 500)
        return
      }
      else {
        this.util.presentToast(response.response.Message);
      }
    }, error => {
      console.log('error', error);
    })
  }
}
