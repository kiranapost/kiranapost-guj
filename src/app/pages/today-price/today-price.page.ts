import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { UtilProvider } from '../../providers/util/util';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../user.service';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { ViewDetailComponent } from 'src/app/component/view-detail/view-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today-price',
  templateUrl: './today-price.page.html',
  styleUrls: ['./today-price.page.scss'],
})
export class TodayPricePage implements OnInit {
  userId: any = '';
  todayPrices: any = '';
  subscription: any = '';
  constructor(public router : Router,public storage: Storage,public alertController: AlertController, public user: UserService, public platform: Platform, public util: UtilProvider, public modelCtrl: ModalController, public navCtrl: NavController) {
    this.storage.get('userData').then(data => {
      if (data) {
        this.userId = data.id;
      }
      this.todayPrice();
    })
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => { 
        this.presentExitAlertConfirm();
    });
  }

  async presentExitAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are You Sure you want to Exit App<strong>!!!</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-text',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          cssClass: 'alert-text',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

  }
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2.5,
    spaceBetween: 5,
  }

  todayPrice() {
    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'user_id': this.userId,
    }

    this.user.todayPrice(rawData, { headers: h }).subscribe(res => {
      this.util.dismissLoading();
      this.todayPrices = res['response']['Data'];
    }, error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  doRefresh(event) {
    setTimeout(() => {
      this.todayPrice();
      event.target.complete();
    }, 2000);
  }

  async openItemDetails(todayprice) {
    localStorage.setItem('product_Id', todayprice.Product_id);
    this.subscription.unsubscribe();
    this.navCtrl.navigateForward('/view-detail')
  }
}
