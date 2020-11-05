import { Component } from '@angular/core';
import { UtilProvider } from './providers/util/util';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userInfo: any = '';
  userId: any = '';
  profileImage: any = '';
  connectSubscription: any = '';
  disconnectSubscription: any = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController, public storage: Storage, public router: Router, public util: UtilProvider,
    public user: UserService,public network:Network
  ) {
    this.initializeApp();
    this.storage.get('userData').then(data => {
      if (data) {
        console.log('userData',data);
        this.userInfo = data;
        this.userId = data.id;  
        this.router.navigate(['/app/tabs/today-price']);
      } else {
        var isLogin = localStorage.getItem('isLoginBefore')
        if (isLogin == 'true') {
          this.router.navigate(['/login']);
        }
        else {
          this.router.navigate(['/welcome']);
        }
      }
    });

    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.util.presentAlert();
    });

    this.connectSubscription = this.network.onConnect().subscribe(() => {
      this.util.presentToast('Network Connected');
    });
  }

  ngOnInit(){
    // this.networkSubscriber();
    this.profileImage=localStorage.getItem('profileImage')
    this.storage.get('userData').then(data => {
      if (data) {
        this.userInfo = data;
        this.userId = data.id;
      }
      this.getItems();
    })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#045546');
      this.splashScreen.hide();
    });
  }


  menuClose() {
    this.menu.close();
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  doLogOut() {
    this.menu.close();
    console.log('doLogOut', this.userInfo.id);
    this.util.presentLoading();
    let rawData = {
      "user_id": this.userInfo.id
    }

    this.user.logout(rawData).subscribe(res => {
      localStorage.setItem('isLoginBefore', 'true')
      this.util.dismissLoading();
      let response: any = res;
      console.log('response', response)
      // if (response.status == 'true' || response.status == true) {
      this.storage.clear();
      // this.menuctrl.enable(false);
      this.util.presentToast(response.response.Message);
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500)
      return
      // }
      // else {
      // this.util.presentToast(response.response.Message);
      // }
    }, error => {
      console.log('error', error);
    })
  }


  getItems() {
    // this.util.presentLoading();
    let h = new HttpHeaders().append('Authorization', localStorage.getItem('headerToken'));
    let rawData = {
      'user_id': this.userId
    }

    this.user.viewCart(rawData, { headers: h }).subscribe(res => {
      // this.util.dismissLoading();
      var allCartItems = res['response']['Data'];
      localStorage.setItem('totallength', allCartItems.length);
    
    }, error => {
      console.error(error);
    })
  }
}
