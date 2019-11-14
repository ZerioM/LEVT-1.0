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

  //Costs
  leisureCosts: number;
  accommondationCosts: number;
  mealsanddrinksCosts: number;
  transportCosts: number;
  otherCosts: number;
  totalCosts: number;

  //Journey Details
  journeyTitle: string;
  journeyDetails: string;


  constructor(private data: NewJourneyService, private navCtrl: NavController, private router: Router) {
    this.loadJSON();
  }

  goToAddPlace() {
    this.router.navigateByUrl('/tabs/tab2/add-place');
  }


  loadJSON() {

    this.data.loadCurrentJourney();
    this.data.loadJourneyCategories();
    this.data.loadCompanionships();
    this.data.loadTransports();
    this.data.loadActivities();
  }

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

  safeJourney() {
    //Hier kommt die Implementierung des Speicherns der Journey 

    let inputs = document.querySelectorAll('ion-input');
    let i = 0;
    let a = "";
    let textAreas = document.querySelectorAll('ion-textarea');


    //Input Felder auslesen
    inputs.forEach(input => {
      //Costs
      if (input.id.toString() == "Leisure") {
        this.leisureCosts = parseInt(input.value);
        if (this.leisureCosts = null) this.leisureCosts = 0;
        console.log("Leisure Costs =" + this.leisureCosts);
      }
      if (input.id.toString() == "Accommodation") {
        this.accommondationCosts = parseInt(input.value);
        console.log("AccomndationCosts =" + this.accommondationCosts);
      }

      if (input.id.toString() == "Meals and Drinks") {
        this.mealsanddrinksCosts = parseInt(input.value);
        console.log("Meals and Drink Costs =" + this.mealsanddrinksCosts);
      }

      if (input.id.toString() == "Transport") {
        this.transportCosts = parseInt(input.value);
        console.log("Transport Costs =" + this.transportCosts);
      }

      if (input.id.toString() == "Other") {
        this.otherCosts = parseInt(input.value);
        console.log("OtherCosts =" + this.otherCosts);
      }


      if (input.id.toString() == "totalcosts") {
        this.totalCosts = parseInt(input.value);
        console.log("Leisure Costs =" + this.leisureCosts);
      }
      //Journey Title
      if (input.id.toString() == "journeyName") {
        this.journeyTitle = input.value;
        console.log("journeyTitle =" + this.journeyTitle);
      }

    });

    if (this.divideC) {
      this.totalCosts = this.leisureCosts + this.mealsanddrinksCosts + this.otherCosts + this.transportCosts + this.accommondationCosts;
    }
    console.log("TotalCosts:" + this.totalCosts)

    this.data.setInputs(this.leisureCosts, this.accommondationCosts, this.transportCosts, this.mealsanddrinksCosts, this.otherCosts, this.totalCosts, this.journeyTitle);



    this.router.navigateByUrl('/tabs/tab1');
  }


}

