import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewJourneyService } from 'src/app/services/new-journey.service';


import { compileNgModule } from '@angular/compiler';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public showC: Boolean = false;
  public divideC: Boolean = false;

 public costs=[null,null,null,null,null];
 public transports=[false,false,false,false,false,false,false,false,false];

  test: any;


  constructor(private journeyService: NewJourneyService, private data: DataService, private navCtrl: NavController, private router: Router, private placeService: PlaceService) {

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
  async goToAddPlace() {
    this.readCostsAndTransports();
    this.data.newJourney = await this.journeyService.saveJourney(this.data.newJourney);
    if(this.data.newJourney.journeyID != null){
      this.placeService.newPlace(this.data.newJourney);
      this.router.navigateByUrl('/tabs/tab2/add-place');
    } else {
      //TO DO: Toast ausgeben: "Das Speichern hat nicht funktioniert"
      console.log("Das Speichern hat nicht funktioniert.");
    }

  }

  cancel(){
    this.data.newJourney=this.journeyService.newJourney(this.data.currentUser);
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
    if (this.data.newJourney.places != null) {
      return true;
    } else {
      return false;
    }

  }

  finishJourney() {
    //Data binding testen
  
    this.readCostsAndTransports();

    console.log("journeyName: " + this.data.newJourney.journeyName);
    console.log("Season: " + this.data.newJourney.seasonName);
    console.log("Year: " + this.data.newJourney.year);
    console.log("Duration: " + this.data.newJourney.duration);
    console.log("CategoryID: " + this.data.newJourney._journeyCategoryID);
    console.log("CompanionshipID: " + this.data.newJourney._companionshipID);
    console.log("JourneyDetail: " + this.data.newJourney.detail);
    console.log("Leisure Costs: " + this.data.newJourney.leisureCosts);
    console.log("Accommodation Costs: " + this.data.newJourney.accommodationCosts);
    console.log("Meals and Drinks Costs: " + this.data.newJourney.mealsanddrinksCosts);
    console.log("Transport Costs: " + this.data.newJourney.transportationCosts);
    console.log("Other Costs: " + this.data.newJourney.otherCosts);
    console.log("Total Costs: " + this.data.newJourney.totalCosts);
    console.log("Plane = "+this.data.newJourney.plane);
    
    

    console.log("Tab2: ");
    console.log(this.data.newJourney);
    
    console.log("Plane = "+this.data.newJourney.plane);
    
    this.journeyService.saveJourney(this.data.newJourney);
    
    this.data.newJourney=this.journeyService.newJourney(this.data.currentUser);
    this.router.navigateByUrl('/tabs/tab1');
  }

  readCostsAndTransports(){
    this.data.newJourney.leisureCosts=this.costs[0];
    this.data.newJourney.accommodationCosts=this.costs[1];
    this.data.newJourney.mealsanddrinksCosts=this.costs[2];
    this.data.newJourney.transportationCosts=this.costs[3];
    this.data.newJourney.otherCosts=this.costs[4];

    this.data.newJourney.plane=this.transports[0];
    this.data.newJourney.car=this.transports[1];
    this.data.newJourney.bus=this.transports[2];
    this.data.newJourney.train=this.transports[3];
    this.data.newJourney.ship=this.transports[4];
    this.data.newJourney.motorbike=this.transports[5];
    this.data.newJourney.campingtrailer=this.transports[6];
    this.data.newJourney.hiking=this.transports[7];
    this.data.newJourney.bicycle=this.transports[8];
  }
}

