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

  constructor(private data: DataService, private userService: UserService, private messageService: MessagesService, private imageService: ImageService, private navCtrl:NavController, private router: Router,private changeRef: ChangeDetectorRef) {

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
   loadJSON(){

    this.data.loadUserJourneys(this.data.loggedInUser);
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

  chatWith(){
  //this.data.chatUser = this.profileuser;
  this.data.currentMessage = this.messageService.newMessage(this.data.loggedInUser,this.data.chatUser);
  //this.router.navigateByUrl('/tabs/tab4');
  //eigentlich navigieren zu Unterseite von tab4, wo sich chat befindet
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

}
