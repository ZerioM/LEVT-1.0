import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core'
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements AfterViewInit, AfterViewChecked {

  constructor(private data: DataService, private userService: UserService, private messageService: MessagesService, private navCtrl:NavController, private router: Router,private changeRef: ChangeDetectorRef) {

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
    if(this.userService.userLoggedOut){
      if(this.userService.userLoggedIn(this.data.loggedInUser) == false){
      console.log("View checked.");
      this.userService.userLoggedOut= false;
      this.userService.wantsToLogin=true;
      this.userService.loginAtTab2OrTab5 = true;
      }
    }

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

}
