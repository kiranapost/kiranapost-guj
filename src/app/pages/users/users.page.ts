import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../user.service';
import { UtilProvider } from '../../providers/util/util';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  allUsersList: any = '';
  constructor(public modelCtrl: ModalController, public util: UtilProvider, public user: UserService, public navCtrl: NavController) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));

    this.user.getHappyUserList({ headers: h }).subscribe(res => {
      console.log('getHappyUserList', res);
      this.util.dismissLoading();
      this.allUsersList = res['response']['Data'];
    }, error => {
      console.error(error);
    })
  }
}
