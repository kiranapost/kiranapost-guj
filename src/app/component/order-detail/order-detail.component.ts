import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UtilProvider } from '../../providers/util/util';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage'
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import {CartPage} from '../../pages/cart/cart.page'
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  orderId: any = '';
  orderDetails: any = '';

  constructor(public modelCtrl: ModalController, public user: UserService, 
    public util: UtilProvider, public storage: Storage,public navCtrl:NavController,public router:Router) {
    this.pastorders();
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modelCtrl.dismiss();
  }


  pastorders() {
    this.orderId = localStorage.getItem('pastOrderid');
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'order_id': this.orderId,
    }

    this.user.pastOrderById(rawData, { headers: h }).subscribe(res => {
      this.orderDetails = res['response']['Data'][0];
      // this.util.dismissLoading();
    }, error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  reOrder(){  
    console.log('router works sucessfully')

    this.util.presentLoading();
    this.orderId = localStorage.getItem('pastOrderid');
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'order_id': this.orderId,
    }

    this.user.reOrderProduct(rawData, { headers: h }).subscribe(res => {
      this.util.presentToast(res['response']['Message']);

      this.util.dismissLoading();
    }, error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  // async orderPastDetails(){
  //   this.orderId = localStorage.getItem('pastOrderid');
  //   let orderDetailModal = await this.modelCtrl.create({
  //     component: OrderDetailComponent,
  //     cssClass: 'order-detail-modal'
  //   });
  //   await orderDetailModal.present();
  //   orderDetailModal.onWillDismiss().then(data => {
  //     this.ngOnInit();
  //   }); 
  // }
}
