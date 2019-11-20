import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { equal } from 'assert';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showC: Boolean = false;
  divideC: Boolean = false;
  noPlace: Boolean = true;

  test: any;


  constructor(private journeyService: NewJourneyService, private data: DataService, private navCtrl: NavController, private router: Router) {

    this.loadJSON();
  }

  //Daten laden
  loadJSON() {

    this.journeyService.loadCurrentJourney();
    this.journeyService.loadJourneyCategories();
    this.journeyService.loadCompanionships();
    this.journeyService.loadTransports();
    this.journeyService.loadActivities();
    this.journeyService.loadSeasons();
  }

  //Naviagation 
  goToAddPlace() {
    this.router.navigateByUrl('/tabs/tab2/add-place');
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


    this.journeyService.sendPostRequest();

    this.router.navigateByUrl('/tabs/tab1');
  }


}

