import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ViewDetailComponent } from 'src/app/component/view-detail/view-detail.component';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../user.service';
import { UtilProvider } from '../../providers/util/util';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productId: any = '';
  allProductData: any = [];
  isShow: boolean = false;
  constructor(public modelCtrl: ModalController, public util: UtilProvider, public user: UserService,public navCtrl:NavController) {
    this.productId = localStorage.getItem('categoryItems');
  }

  ngOnInit() {
    this.getItems();
  }

  async viewDetail(productItems) {
    console.log(productItems.Product_id);
    localStorage.setItem('product_Id', productItems.Product_id);
    this.navCtrl.navigateForward('/view-detail');
    // let editProfileModal = await this.modelCtrl.create({
    //   component: ViewDetailComponent,
    //   cssClass: 'view-detail-modal'
    // });
    // await editProfileModal.present();
    // editProfileModal.onWillDismiss().then(data => {
    //   this.ngOnInit();
    // });
  }

  getItems() {
    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'subcategory_id': this.productId
    }
    this.user.getCategoryData(rawData, { headers: h }).subscribe(res => {
      console.log('res',res);
      this.util.dismissLoading();
      this.isShow = true;
      this.allProductData = res['response']['Data'];
      console.log(this.allProductData.length, "lenght")
    }, error => {
      console.error(error);
    })
  }
}
