import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  validationMessages: any = '';
  submitted = false;
  forgotForm: FormGroup;

  error_messages:any;
  constructor(
    private modelCtrl: ModalController,
    private formBuilder: FormBuilder, public user: UserService,
  ) { 
    this.setupLoginFormData();
  }

  ngOnInit() {
  }
  setupLoginFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Email is Required' },
        { type: "pattern", message: '*Please Enter valid Email' }
      ]
    };
    this.forgotForm = this.formBuilder.group(
      {
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),]))
      },
    );
  }
  get f() { return this.forgotForm.controls; }

  async submitEmail(forgotForm: FormGroup) {
    this.submitted = true;
    if (forgotForm.invalid) {
      return;
    } else {
      // alert("success")
      let rawData = {
        "email": forgotForm.value.email
      }
      this.user.forget_password(rawData).subscribe(res => {
        let response: any = res;
        console.log('response', response);
        if (response.status == "1") {
          setTimeout(() => {

          }, 500)
          return
        }
        else {
        }
      }, error => {

      })
    }
  }

  dismissModal() {
    this.modelCtrl.dismiss();
  }
}
