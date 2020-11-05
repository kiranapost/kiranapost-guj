import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { UtilProvider } from '../../providers/util/util';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage'
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  userId: any = '';
  allCartItems: any = '';
  cartId: any = '';
  qty: any = '';
  total_amount = 0;
  total_quantity = 0;

  constructor(public user: UserService, public util: UtilProvider, private router: Router,
    public storage: Storage, public alertController: AlertController,public navCtrl:NavController) {
  }

  ngOnInit() {
    this.storage.get('userData').then(data => {
      if (data) {
        this.userId = data.id;
      }
      this.getItems();
    })
  }

  getItems() {

    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'user_id': this.userId
    }

    this.user.viewCart(rawData, { headers: h }).subscribe(res => {
      console.log(res,'res+++++');
      this.util.dismissLoading();
      this.allCartItems = res['response']['Data'];
      localStorage.setItem('totallength', this.allCartItems.length);
      this.allCartItems.forEach(element => {
        this.total_amount = this.total_amount + JSON.parse(element['total']);
        this.total_quantity = this.total_quantity + JSON.parse(element['quantity']);
      });
    }, error => {
      console.error(error);
    })
  }

  incrementQty(allItems) {
    this.total_amount = 0;
    this.total_quantity = 0;
    this.cartId = allItems.id;
    allItems.quantity = JSON.parse(allItems.quantity) + 1;
    this.qty = allItems.quantity;
    this.incrementupdateCart();
  }

  decrementQty(allItems) {
    this.cartId = allItems.id;
    if (allItems.quantity - 1 < 1) {
      allItems.quantity = 1;
      this.qty = allItems.quantity;

    } else {
      this.total_amount = 0;
      this.total_quantity = 0;
      allItems.quantity -= 1;
      this.qty = allItems.quantity;
      this.decrementUpdateCart();
    }
  }

  incrementupdateCart() {
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'cart_id': this.cartId,
      'quantity': 1
    }

    this.user.updateCart(rawData, { headers: h }).subscribe(res => {
      this.getItems();
    }, error => {
      console.error(error);
    })
  }

  decrementUpdateCart() {
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'cart_id': this.cartId,
      'quantity': -1
    }

    this.user.updateCart(rawData, { headers: h }).subscribe(res => {
      console.log('res', res);
      this.getItems();
    }, error => {
      console.error(error);
    });
  }

  orderNow() {
    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'user_id': this.userId,
      'note': 'nothing now'
    }

    this.user.placeOrder(rawData, { headers: h }).subscribe(res => {
      this.total_amount = 0;
      this.total_quantity = 0;
      this.util.dismissLoading();
      this.util.presentToast(res['response']['Message']);
      this.getItems();
    }, error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  async presentAlertConfirm() {
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
            this.orderNow();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteOneItem(allItems) {
    console.log('allItems', allItems.id);
    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'cart_id': allItems.id
    }

    this.user.deleteOrder(rawData, { headers: h }).subscribe(res => {
      this.util.dismissLoading();
      this.total_amount = 0;
      this.total_quantity = 0;
      this.util.presentToast(res['response']['Message']);
      this.getItems();
    }, error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  addMoreOrder(){
    this.router.navigate(['/app/tabs/home']);
  }
}
