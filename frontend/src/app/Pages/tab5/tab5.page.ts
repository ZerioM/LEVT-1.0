import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core'
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
import { Image } from 'src/app/Interfaces/Image';
import { ImageService } from 'src/app/services/image.service';

import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements AfterViewInit, AfterViewChecked {

  public image: Image;

  public showsExplorerInfo:boolean = false;
  public showsPioneerInfo:boolean = false;

  constructor(private data: DataService, private messagesService: MessagesService, private userService: UserService, private messageService: MessagesService, private imageService: ImageService, private navCtrl:NavController, private router: Router,private changeRef: ChangeDetectorRef) {

    this.loadJSON();
   }

  ngAfterViewInit() {
    if(this.userService.userLoggedIn(this.data.loggedInUser)){
      console.log("View initialized.");
      this.userService.wantsToLogin=true;
      this.userService.loginAtTab2OrTab5 = true;
    }
   
  }

  ngAfterViewChecked() {

    if(this.userService.userRecentlyLoggedInOrOutLoadUserJourneys){
      this.userService.userRecentlyLoggedInOrOutLoadUserJourneys = false;
      this.data.loadUserJourneys(this.data.loggedInUser);
    }
    
  }

   //Daten laden
   async loadJSON(){
    await this.data.loadUserJourneys(this.data.loggedInUser);
   // this.data.loadTopPosts();
    

 }

 async showJourney(journeyID: number){
    
  await this.data.presentLoading();  
  await this.data.loadOneUserJourney(journeyID);
  await this.data.dismissLoading();
  
  this.data.contentChanged = true;

  //go To Journey Detail 
  this.router.navigateByUrl('/tabs/tab5/user-journey-detail');

 }

 goToSettings(){

  this.data.settingsFromHome=false;

  this.router.navigateByUrl('/tabs/tab1/settings');

  }

  async login(){
    await this.data.presentLoading();
    await this.userService.login(this.data.loggedInUser, this.data.currentBookmark, this.data.url);
    await this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }

  async register(){
    await this.data.presentLoading();
    await this.userService.register(this.data.loggedInUser, this.data.currentBookmark, this.data.url);
    await this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.data.loadUser();
      this.data.loadUserJourneys(this.data.loggedInUser);
    }, 500);
  }

  showPioneerInfo(){
    this.showsPioneerInfo = true;
  }

  closePioneerInfo(){
    this.showsPioneerInfo = false;
  }

  showExplorerInfo(){
    this.showsExplorerInfo = true;
  }

  closeExplorerInfo(){
    this.showsExplorerInfo = false;
  }
}
