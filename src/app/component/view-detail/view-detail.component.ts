import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../user.service';
import { Storage } from '@ionic/storage'
import { UtilProvider } from '../../providers/util/util';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss'],
})
export class ViewDetailComponent implements OnInit {
  quantity: number = 5;
  productId: any = '';
  productDetails: any = '';
  qty: any = 1;
  userId:any=''

  constructor(public modelCtrl: ModalController,private router: Router,public navctrl:NavController,public util: UtilProvider, public storage: Storage, public user: UserService) {
    this.productId = localStorage.getItem('product_Id');


    this.storage.get('userData').then(data => {
      if (data) {
        this.userId=data.id;
      console.log(data.id,'data++++++PPPP')
      }
    })
  }

  ngOnInit() {
    this.getItems();
  }


  plusQuantity() {
    if (this.quantity > 30) {
      this.quantity + 10;
    }
    else if (this.quantity < 30 || this.quantity == 30) {
      this.quantity + 5;
    }
    if (this.quantity < 10) {
      this.quantity + 1;
    }
  }

  minusQuantity() {
    if (this.quantity > 30) {
      this.quantity - 10;
    }
    else if (this.quantity < 30 || this.quantity == 30) {
      this.quantity - 5;
    }
    if (this.quantity < 10) {
      this.quantity - 1;
    }
  }
  dismissModal() {
    this.modelCtrl.dismiss();
  }


  getItems() {
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'product_id': this.productId
    }
    console.log('rawData', rawData);
    this.user.getproductDetails(rawData, { headers: h }).subscribe(res => {
      console.log('getproductDetails++', res['response']['Data'][0]);
      this.productDetails = res['response']['Data'][0];
    }, error => {
      console.error(error);
    })
  }

  incrementQty() {
    this.qty += 1;
  }

  // decrement product qty
  decrementQty() {
    if (this.qty - 1 < 1) {
      this.qty = 1;
    } else {
      this.qty -= 1;
    }
  }
  addTocart() {
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'product_id': this.productId,
      'user_id':this.userId,
      'quantity':this.qty,
      'product_price':this.productDetails.price,
      "product_name":this.productDetails.price,
      "tax":0,
      "service_charge":0
    }
    console.log('rawData', rawData);
    this.user.addTocartItems(rawData, { headers: h }).subscribe(res => {
      this.util.presentToast(res['response']['Message']);
    }, error => {
      console.error(error);
    })
  }
}
