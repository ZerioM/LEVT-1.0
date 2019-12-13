import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private data: DataService, private navCtrl:NavController, private router: Router) {

    this.loadJSON();
   }

  ngOnInit() {
  }

   //Daten laden
   loadJSON(){

    this.data.loadUserJourneys(this.data.currentUser);
   // this.data.loadTopPosts();
    

 }

 async showJourney(journeyID: number){
    
  await this.data.presentLoading();  
  await this.data.loadOneJourney(journeyID);
  await this.data.dismissLoading();

  //go To Journey Detail 
  this.router.navigateByUrl('/tabs/tab5/user-journey-detail');

 }

}
