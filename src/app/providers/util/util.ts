import { Injectable } from '@angular/core';
import { LoadingController, ToastController, ModalController, AlertController, Platform } from '@ionic/angular';

@Injectable()

export class UtilProvider {
    constructor(private loadingCtrl: LoadingController, public alertController: AlertController,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        public modalController: ModalController,
        public platform: Platform
    ) {
    }

    async presentLoading() {
        const loading = await this.loadingCtrl.create({
            spinner: 'bubbles',
            message: 'Please Wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading',
            backdropDismiss: true
        });
        await loading.present();

    }

    async dismissLoading() {
        if (this.loadingCtrl) {
            this.loadingCtrl.dismiss();
        }
    }

    async presentToast(message) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        toast.present()
    }


    //FOR BASIC SERVER ERROR
    async presentAlert() {
        const alert = await this.alertCtrl.create({

            header: 'Server Error',
            subHeader: 'Something went wrong',
            cssClass: 'alertDanger',
            buttons: [
                {
                    text: 'Try Again!',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                        // this.platform.exitApp();
                    }
                }
            ]
        });
        await alert.present();
    }


    //FOR CONFIRM NETWORK ERROR
    async presentNetwork() {
        let alert = await this.alertCtrl.create({
            header: 'Network Error',
            message: 'Internet not connected please try again.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        console.log('Ok clicked');
                        //this.navCtrl.push(HomePage);
                    }
                }
            ]
        });
        await alert.present();
    }


}
