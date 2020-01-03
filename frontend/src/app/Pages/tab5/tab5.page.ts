import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private data: DataService, private navCtrl:NavController, private router: Router,private changeRef: ChangeDetectorRef) {

    this.loadJSON();
   }

  ngOnInit() {
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

  //go To Journey Detail 
  this.router.navigateByUrl('/tabs/tab5/user-journey-detail');

 }

 goToSettings(){

  this.data.settingsFromHome=false;

  this.router.navigateByUrl('/tabs/tab1/settings');
}

}
