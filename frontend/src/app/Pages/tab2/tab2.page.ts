import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { equal } from 'assert';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public showC: Boolean = false;
  public divideC: Boolean = false;
  public noPlace: Boolean = true;


 public costs=[0,0,0,0,0];
 public transports=[false,false,false,false,false,false,false,false,false];


  test: any;


  constructor(private journeyService: NewJourneyService, private data: DataService, private navCtrl: NavController, private router: Router) {

    this.loadJSON();
  }

  //Daten laden
  loadJSON() {

   
    this.data.loadJourneyCategories();
    this.data.loadCompanionships();
    this.data.loadTransports();
    this.data.loadActivities();
    this.data.loadSeasons();
  }

  //Naviagation 
  goToAddPlace() {
    this.router.navigateByUrl('/tabs/tab2/add-place');
  }

  cancel(){
    this.journeyService.loadNewJourney();
    this.router.navigateByUrl('/tabs/tab1');

  }

  //Toggles
  showCosts() {
    this.showC = !this.showC;
  }

  divideCosts() {
    this.divideC = !this.divideC;
  }

  showNoPlaceWarning() {
    if (this.data.currentJourney.places != null) {
      this.noPlace = false;
    }

  }

  saveJourney() {
    //Data binding testen
  
    this.data.currentJourney.leisureCosts=this.costs[0];
    this.data.currentJourney.accommodationCosts=this.costs[1];
    this.data.currentJourney.mealsanddrinkCosts=this.costs[2];
    this.data.currentJourney.transportationCosts=this.costs[3];
    this.data.currentJourney.otherCosts=this.costs[4];

    this.data.currentJourney.plane=this.transports[0];
    this.data.currentJourney.car=this.transports[1];
    this.data.currentJourney.bus=this.transports[2];
    this.data.currentJourney.train=this.transports[3];
    this.data.currentJourney.ship=this.transports[4];
    this.data.currentJourney.motorBike=this.transports[5];
    this.data.currentJourney.campingTrailer=this.transports[6];
    this.data.currentJourney.hiking=this.transports[7];
    this.data.currentJourney.bicycle=this.transports[8];

    console.log("journeyName: " + this.data.currentJourney.journeyName);
    console.log("Season: " + this.data.currentJourney.seasonName);
    console.log("Year: " + this.data.currentJourney.year);
    console.log("Duration: " + this.data.currentJourney.duration);
    console.log("CategoryID: " + this.data.currentJourney._journeyCategoryID);
    console.log("CompanionshipID: " + this.data.currentJourney._companionshipID);
    console.log("JourneyDetail: " + this.data.currentJourney.detail);
    console.log("Leisure Costs: " + this.data.currentJourney.leisureCosts);
    console.log("Accommodation Costs: " + this.data.currentJourney.accommodationCosts);
    console.log("Meals and Drinks Costs: " + this.data.currentJourney.mealsanddrinkCosts);
    console.log("Transport Costs: " + this.data.currentJourney.transportationCosts);
    console.log("Other Costs: " + this.data.currentJourney.otherCosts);
    console.log("Total Costs: " + this.data.currentJourney.totalCosts);
    console.log("Plane = "+this.data.currentJourney.plane);
    
    

    console.log("Tab2: ");
    console.log(this.data.currentJourney);
    
    console.log("Plane = "+this.data.currentJourney.plane);
    
    this.journeyService.sendPostRequest();
    
    this.journeyService.loadNewJourney();
    this.router.navigateByUrl('/tabs/tab1');
  }


}

