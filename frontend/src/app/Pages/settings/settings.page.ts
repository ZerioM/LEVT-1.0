import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements AfterViewInit, AfterViewChecked {

  constructor(private data: DataService, private userService: UserService, private navCtrl:NavController, private router: Router, private alertController: AlertController) { }

  ngAfterViewInit(){
    this.userService.wantsToLogin = false;
  }

  ngAfterViewChecked(){
    if(this.userService.loginAtTab2OrTab5){
      this.userService.wantsToLogin = false;
    }
  }


  backToProfileOrHomepage(){


    this.data.resetTab=true;

  

    this.router.navigateByUrl('/tabs/tab1');
  


   }

   showLogoutAlert(){

    this.alert();
   }

  showLogin(){

    this.userService.wantsToLogin = true;
    console.log("showed Login");
    console.log(this.userService.wantsToLogin);
    
  }

  loginClose(){
    this.userService.wantsToLogin = false;
    this.userService.userLoggedOut = true;
  }

  cancleWantsToLogin(){

    this.userService.wantsToLogin=false;
  }

  cancleWantsToRegister(){

    this.userService.wantsToLogin=false;
    this.userService.wantsToRegister=false;
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

    this.userService.logout(this.data.loggedInUser,this.data.currentBookmark);

  }

  goBacktoSettingsWithoutSaving(){

    this.router.navigateByUrl('/tabs/tab1/settings');
  }

  

}
