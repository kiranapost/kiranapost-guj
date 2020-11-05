import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Storage } from '@ionic/storage';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { UtilProvider } from '../../providers/util/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})



export class HomePage implements OnInit {
  
  header_token: any = '';
  homeData: any = [];
  subscription: any = '';

  constructor(public router :Router,public user: UserService, public navCtrl: NavController,
    public util: UtilProvider, public alertController: AlertController,public stroage: Storage, public http: HttpClient,public platform:Platform) {
  }

  ngOnInit() {
    this.getCateGory();
  }
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 0,
    speed:5000,
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

  getCateGory() {
    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    return new Promise((resolve, reject) => {
      this.http.get("http://ecommerce.tjcg.in/api/v1/categories", { headers: h }).subscribe(result => {
        this.util.dismissLoading();
        let response: any = result['response']['data'];
        this.homeData = response;
      },
        err => {
          reject(err);
        }
      );
    });
  }

  subCategoryDetails(categoryItems) {
    this.subscription.unsubscribe();
    localStorage.setItem('categoryID',categoryItems.category_id);
    console.log(categoryItems.category_id, 'categoryItems');
    // this.navCtrl.navigateForward('/category', { queryParams: categoryItems.categories_id ,preserveFragment: true});
    this.navCtrl.navigateForward('/category');
  }
}
