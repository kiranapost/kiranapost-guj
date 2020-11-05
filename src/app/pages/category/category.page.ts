import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';
import { NavController } from '@ionic/angular';
import { UtilProvider } from '../../providers/util/util';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  homeData: any = [];
  allCategoriesData: any = [];

  categoryId: any = ''
  constructor(public user: UserService,public navCtrl: NavController, public http: HttpClient,public util: UtilProvider,) {
    this.categoryId = localStorage.getItem('categoryID');
    console.log('value', this.categoryId);
  }

  ngOnInit() {
    this.getCateGory();
  }

  getCateGory() {
    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'category_id': this.categoryId
    }
    console.log('rawData', rawData);
    this.user.getHomeData(rawData, { headers: h }).subscribe(res => {
      this.util.dismissLoading();
      this.allCategoriesData = res['response']['Data'];
      this.util.presentToast(res['response']['Message'])
    }, error => {
      console.error(error);
    })  
  }

  getproductList(categoryItems){
    console.log(categoryItems,'categoryItems');
    localStorage.setItem('categoryItems',categoryItems.Subcategory_id)
    this.navCtrl.navigateForward('/product');
  }
}
