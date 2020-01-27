import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Image } from 'src/app/Interfaces/Image';

import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraSource } from '@capacitor/core';
import { ImageService } from 'src/app/services/image.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements AfterViewInit {

  public image: Image;

  public jsBirthday: Date;

  public delay = ms => new Promise(res => setTimeout(res, ms));

  constructor(private data: DataService, private messagesService: MessagesService, private userService: UserService, private imageService: ImageService, private navCtrl: NavController, private router: Router, private alertController: AlertController) {

  }

  ngAfterViewInit() {
    this.userService.wantsToLogin = false;
    this.userService.wasOnSettingsPage = true;
  }

  backToProfileOrHomepage() {
    this.data.resetTab = true;
    this.router.navigateByUrl('/tabs/tab1');
  }

  showLogoutAlert() {
    this.alert();
  }

  showLogin() {
    this.userService.wantsToLogin = true;
    console.log("showed Login");
    console.log(this.userService.wantsToLogin);
  }

  loginClose() {
    this.userService.wantsToLogin = false;
    this.userService.wantsToRegister = false;
    this.userService.userLoggedOut = true;
  }

  cancleWantsToLogin() {
    this.userService.wantsToLogin = false;
  }

  cancleWantsToRegister() {
    this.userService.wantsToLogin = false;
    this.userService.wantsToRegister = false;
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

  async login() {
    await this.data.presentLoading();
    await this.userService.login(this.data.loggedInUser, this.data.currentBookmark, this.data.url);
    await this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }

  async register() {
    await this.data.presentLoading();
    await this.userService.register(this.data.loggedInUser, this.data.currentBookmark, this.data.url);
    await this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }

  async logout() {
    await this.data.presentLoading();
    await this.userService.logout(this.data.loggedInUser, this.data.currentBookmark, this.data.url);
    await this.data.dismissLoading();
  }

  goBacktoSettingsWithoutSaving() {
    this.router.navigateByUrl('/tabs/tab1/settings');
  }

  checkEmail() {
    this.userService.checkEmail(this.data.loggedInUser);
    this.userService.checkEmailAvailable(this.data.loggedInUser, this.data.url);
  }

  editProfile() {
    this.router.navigateByUrl('/tabs/tab5/edit-profile');
  }

  goToDataPrivacy() {
    console.log("Navigate to DataPrivacyPage...");
    this.router.navigateByUrl("/tabs/tab1/settings/data-privacy-page");
  }
}
