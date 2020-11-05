import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UtilProvider } from '../../providers/util/util';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage'
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  orderId: any = '';
  orderDetails: any = '';
  priceDetails: any = '';
  total_amount:any=0;
  constructor(public modelCtrl: ModalController, public user: UserService,
    public util: UtilProvider, public storage: Storage, public navCtrl: NavController, public router: Router) {
    this.pastorders();
  }

  ngOnInit() {
  }

  pastorders() {
    this.orderId = localStorage.getItem('pastOrderid');
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'order_id': this.orderId,
    }

    this.user.pastOrderById(rawData, { headers: h }).subscribe(res => {
      console.log('res+++++', res)
      this.orderDetails = res['response']['Data'];
      this.priceDetails = res['response']['Data'][0].line_total;


      this.orderDetails.forEach(element => {
        this.total_amount = this.total_amount + JSON.parse(element['line_total']);
      });
    }, error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  reOrder() {
    this.util.presentLoading();
    this.orderId = localStorage.getItem('pastOrderid');
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'order_id': this.orderId,
    }

    this.user.reOrderProduct(rawData, { headers: h }).subscribe(res => {
      this.util.presentToast(res['response']['Message']);
      this.navCtrl.navigateForward('/cart')
      this.util.dismissLoading();
    }, error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  dismissModal() {
    this.navCtrl.back();
  }

}
