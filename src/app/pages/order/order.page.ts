import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { UtilProvider } from '../../providers/util/util';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage'
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  userId: any = '';
  orderDetails: any = '';
  userData:any='';
  subscription:any=''
  constructor(public router :Router,public modelCtrl: ModalController,public platform:Platform,public navCtrl: NavController,
     public user: UserService, public util: UtilProvider, public storage: Storage,
     public alertController: AlertController,) {
    this.storage.get('userData').then(data => {
      if (data) {
        this.userData=data;
      }
      this.myOrders();
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

  async viewOrderDetail(pastOrder) {
    localStorage.setItem('pastOrderid', pastOrder.id);
    this.subscription.unsubscribe();
    this.navCtrl.navigateForward('/order-detail');
  }

  myOrders() {
    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'user_id': this.userData.id
    }

    this.user.pastOrders(rawData, { headers: h }).subscribe(res => {
      console.log('response',res['response']['Data']);
      this.util.dismissLoading();
      this.orderDetails = res['response']['Data'];
    }, error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  cancelOrder(pastOrder) {
    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'order_id': pastOrder.id
    }

    this.user.cancelOrder(rawData, { headers: h }).subscribe(res => {
      console.log(res['response']['Data'], 'res')
      this.util.dismissLoading();
      this.myOrders();
    }, error => {
      console.error(error);
    })
  }

  async presentAlertConfirm(pastOrder) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are You Sure <strong>!!!</strong>',
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
            this.cancelOrder(pastOrder);
          }
        }
      ]
    });
    await alert.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.myOrders();
      event.target.complete();
    }, 2000);
  }
}
