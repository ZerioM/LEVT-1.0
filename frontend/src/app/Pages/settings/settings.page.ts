import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Image } from 'src/app/Interfaces/Image';

import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraSource } from '@capacitor/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements AfterViewInit, AfterViewChecked {

  public image: Image;

  public jsBirthday: Date;

  public delay = ms => new Promise(res => setTimeout(res, ms));

  constructor(private data: DataService, private userService: UserService, private imageService: ImageService, private navCtrl:NavController, private router: Router, private alertController: AlertController) {

   }

  ngAfterViewInit(){
    this.userService.wantsToLogin = false;
    this.userService.wasOnSettingsPage = true;
  }

  ngAfterViewChecked(){
    // if(this.userService.loginAtTab2OrTab5){
    //   this.userService.wantsToLogin = false;
    // }
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

  async selectProfileImage(){

    const webPath = await this.getPhoto(CameraSource.Prompt);

    this.data.presentLoading();

    this.image = await this.imageService.uploadImage(webPath, null, this.data.url);
    if(this.image.imageID != null){
      this.data.loggedInUser._profileImageID = this.image.imageID;
      this.data.loggedInUser.userImgSrc = this.image.imgSrc;
    } else {
      this.data.presentNotSavedToast();
    }

    this.data.dismissLoading();
    
    

  }

  private async getPhoto(source: CameraSource) {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source,
      //height, width, allowEditing
    });

    return image.webPath;
    
  }

  async deleteProfileImage(image: Image){
    let isDeleted: boolean;

    this.data.presentLoading();
    isDeleted = await this.imageService.deleteImage(image, this.data.url);
    this.data.dismissLoading();

    if(isDeleted){
      this.data.loggedInUser._profileImageID = null;
      this.data.loggedInUser.userImgSrc = null;
    } else {
      this.data.presentNotSavedToast();
    }
  }

  // async toMySQLDate(){
  //   await this.delay(1000);
  //   this.data.loggedInUser.birthday = this.jsBirthday.toString().slice(0,19).replace('T',' ');
  //   console.log(this.data.loggedInUser.birthday);
  // }

  // function() {
  //   Date.prototype.toDateString = Date_toYMD;

  //   function Date_toYMD() {
  //       var year, month, day;
  //       year = String(this.getFullYear());
  //       month = String(this.getMonth() + 1);
  //       if (month.length == 1) {
  //           month = "0" + month;
  //       }
  //       day = String(this.getDate());
  //       if (day.length == 1) {
  //           day = "0" + day;
  //       }
  //       return year + "-" + month + "-" + day;
  //   }
  // }

}
