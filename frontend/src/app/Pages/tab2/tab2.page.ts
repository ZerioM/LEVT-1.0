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

  test:any;


  constructor(private journeyService: NewJourneyService, private data:DataService, private navCtrl: NavController, private router: Router) {

    this.loadJSON();
  }

//Daten laden
  loadJSON() {

    this.journeyService.loadCurrentJourney();
    this.journeyService.loadJourneyCategories();
    this.journeyService.loadCompanionships();
    this.journeyService.loadTransports();
    this.journeyService.loadActivities();
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

    console.log(this.data.currentJourney._companionshipID);

    this.journeyService.sendPostRequest();

    this.router.navigateByUrl('/tabs/tab1');
  }


}

