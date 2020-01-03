import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private data: DataService, private navCtrl:NavController, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  backToProfileOrHomepage(){


    this.data.resetTab=true;

  

    this.router.navigateByUrl('/tabs/tab1');
  


   }

   showLogoutAlert(){

    this.alert();
   }

   showLogin(){

    this.data.wantsToLogin=true;
    
  }

  cancleWantsToLogin(){

    this.data.wantsToLogin=false;
  }

  cancleWantsToRegister(){

    this.data.wantsToRegister=false;
  }

   async alert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to log out?',
      //message: '<strong>Would you like to save your created journey?</strong>',
      buttons: [
        {
          text: 'Log Out',
          handler: () => {
            console.log('Logout Okal');
            this.logout();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.goBacktoSettingsWithoutSaving();
          }
        }, 
      ]
    });

    await alert.present();
  }

  logout(){

    this.data.userLoggedIn=false;
  }

  

  goBacktoSettingsWithoutSaving(){

    this.router.navigateByUrl('/tabs/tab1/settings');
  }

  

}
