import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewJourneyService } from 'src/app/services/new-journey.service';

@Component({
  selector: 'app-user-journey-detail',
  templateUrl: './user-journey-detail.page.html',
  styleUrls: ['./user-journey-detail.page.scss'],
})
export class UserJourneyDetailPage implements OnInit {
  [x: string]: any;

  constructor(private data: DataService, private navCtrl:NavController, private router: Router, private journeyService:NewJourneyService) { }

  ngOnInit() {
  }

  async showPlace(placeID: number){

    await this.data.presentLoading();
    await this.data.loadOneUserPlace(placeID);
    await this.data.dismissLoading();
        
      //go To Place Detail 
      this.router.navigateByUrl('/tabs/tab5/user-place-detail');
    
     }
  
     backToProfile(){
  
      this.router.navigateByUrl('/tabs/tab5');
    
     }

     async editJourney(){
      this.data.fromEditJourney=true;
      this.data.fromNewJourney=false;
  
      await this.journeyService.loadJourneyWithChildren(this.data.newJourney,this.data.currentJourney.journeyID,this.data.url);

      console.log("New Journey bei Edit");
      console.log(this.data.newJourney);

      
  
      this.router.navigateByUrl('tabs/tab2');
  
     }

}
