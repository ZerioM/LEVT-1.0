import { Component, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { LoadingController } from '@ionic/angular';


import { compileNgModule } from '@angular/compiler';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/Interfaces/Place';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  public showC: Boolean = true;
  public divideC: Boolean = false;

  public costs = [null, null, null, null, null];
  public transports = [false, false, false, false, false, false, false, false, false];

  test: any;




  constructor(private journeyService: NewJourneyService, private data: DataService, private navCtrl: NavController, private router: Router, private placeService: PlaceService, private alertController: AlertController, private loadingController: LoadingController) {

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
  async goToAddNewPlace() {
    this.readCostsAndTransports();


    if (this.data.newJourney.journeyName == null || this.data.newJourney._seasonID == null || this.data.newJourney._companionshipID == null
      || this.data.newJourney.year == null || this.data.newJourney._journeyCategoryID == null
      || this.data.newJourney.plane == false && this.data.newJourney.car == false && this.data.newJourney.bus == false
      && this.data.newJourney.train == false && this.data.newJourney.ship == false && this.data.newJourney.motorbike == false
      && this.data.newJourney.campingtrailer == false && this.data.newJourney.hiking == false && this.data.newJourney.bicycle == false) {

      this.data.presentMandatoryToast();
      return;

    }

    this.data.placeInserted = false;
    await this.data.presentLoading();
    let seasonID = this.data.newJourney._seasonID;
    let journeyCategoryID = this.data.newJourney._journeyCategoryID;
    let companionshipID = this.data.newJourney._companionshipID;
    this.data.newJourney = await this.journeyService.saveJourney(this.data.newJourney);
    this.data.newJourney._seasonID = seasonID;
    this.data.newJourney._journeyCategoryID = journeyCategoryID;
    this.data.newJourney._companionshipID = companionshipID;
    await this.data.dismissLoading();
    if (this.data.newJourney.journeyID != null && this.data.updateJourneyWorks()) {
      this.placeService.newPlace(this.data.newJourney);
      this.router.navigateByUrl('/tabs/tab2/add-place');
    } else {
      //TO DO: Toast ausgeben: "Das Speichern hat nicht funktioniert"
      this.data.presentNotSavedToast();
      console.log("Das Speichern hat nicht funktioniert.");
    }

  }

  async goToEditPlace(place: Place, index: number) {
    this.readCostsAndTransports();

    if (this.data.newJourney.journeyName == null || this.data.newJourney._seasonID == null || this.data.newJourney._companionshipID == null
      || this.data.newJourney.year == null || this.data.newJourney._journeyCategoryID == null
      || this.data.newJourney.plane == false && this.data.newJourney.car == false && this.data.newJourney.bus == false
      && this.data.newJourney.train == false && this.data.newJourney.ship == false && this.data.newJourney.motorbike == false
      && this.data.newJourney.campingtrailer == false && this.data.newJourney.hiking == false && this.data.newJourney.bicycle == false) {

      this.data.presentMandatoryToast();
      return;

    }

    this.data.placeInserted = true;
    await this.data.presentLoading();
    let seasonID = this.data.newJourney._seasonID;
    let journeyCategoryID = this.data.newJourney._journeyCategoryID;
    let companionshipID = this.data.newJourney._companionshipID;
    this.data.newJourney = await this.journeyService.saveJourney(this.data.newJourney);
    this.data.newJourney._seasonID = seasonID;
    this.data.newJourney._journeyCategoryID = journeyCategoryID;
    this.data.newJourney._companionshipID = companionshipID;
    await this.data.dismissLoading();
    if (this.data.newJourney.journeyID != null && this.data.updateJourneyWorks()) {
      console.log("Place bevor es zur add place Seite geht")
      console.log(place);
      this.data.placeInJourney = index;
      this.data.newPlace = place;
      console.log("Neuer übergebener Place");
      console.log(this.data.newPlace);
      this.router.navigateByUrl('/tabs/tab2/add-place');
    } else {
      //TO DO: Toast ausgeben: "Das Speichern hat nicht funktioniert"
      this.data.presentNotSavedToast();
      console.log("Das Speichern hat nicht funktioniert.");
    }
  }

  goBacktoHomepageWithoutSaving() {
    this.data.newJourney = this.journeyService.newJourney(this.data.currentUser);
    this.router.navigateByUrl('/tabs/tab1');
  }

  close() {
    if (this.data.newJourney.journeyName == "" && this.data.newJourney._seasonID == null && this.data.newJourney._companionshipID == null && this.data.newJourney._journeyCategoryID == null
      && this.data.newJourney.plane == false && this.data.newJourney.car == false && this.data.newJourney.bus == false
      && this.data.newJourney.train == false && this.data.newJourney.ship == false && this.data.newJourney.motorbike == false
      && this.data.newJourney.campingtrailer == false && this.data.newJourney.hiking == false && this.data.newJourney.bicycle == false && this.data.newJourney.detail == "" && this.data.newJourney.totalCosts == null && this.data.newJourney.transportationCosts == null && this.data.newJourney.leisureCosts == null && this.data.newJourney.mealsanddrinksCosts == null && this.data.newJourney.accommodationCosts == null && this.data.newJourney.otherCosts == null && this.data.newJourney.places.length==null) {
      this.goBacktoHomepageWithoutSaving();
    } else {
      this.alert();

    }
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Attention! Your Journey isn´t saved yet!',
      message: '<strong>Would you like to save your created journey?</strong>',
      buttons: [
        {
          text: 'Continue without saving',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.goBacktoHomepageWithoutSaving();
          }
        }, {
          text: 'Save',
          handler: () => {
            console.log('Confirm Okay');
            this.finishJourney();
          }
        }
      ]
    });

    await alert.present();
  }

  //Toggles
  showCosts() {
    this.showC = !this.showC;
  }

  divideCosts() {
    this.divideC = !this.divideC;
    this.showC = !this.showC;
  }

  showNoPlaceWarning() {
    if (this.data.newJourney.places.length == 0) {
      return true;
    } else {
      return false;
    }
    return true;
  }

  toggleTransports(index: number) {

    this.transports[index] = !this.transports[index];
    console.log(this.transports[index]);
  }

  async finishJourney() {
    //Data binding testen

    this.readCostsAndTransports();

    if (this.data.newJourney.journeyName == "" || this.data.newJourney._seasonID == null || this.data.newJourney._companionshipID == null
      || this.data.newJourney.year == null || this.data.newJourney._journeyCategoryID == null
      || this.data.newJourney.plane == false && this.data.newJourney.car == false && this.data.newJourney.bus == false
      && this.data.newJourney.train == false && this.data.newJourney.ship == false && this.data.newJourney.motorbike == false
      && this.data.newJourney.campingtrailer == false && this.data.newJourney.hiking == false && this.data.newJourney.bicycle == false) {

      this.data.presentMandatoryToast();
      return;

    }

    await this.data.presentLoading();
    this.data.newJourney = await this.journeyService.saveJourney(this.data.newJourney);
    await this.data.dismissLoading();

    if (this.data.newJourney.journeyID != null) {
      this.data.newJourney = this.journeyService.newJourney(this.data.currentUser);
      this.router.navigateByUrl('/tabs/tab1');
    } else {
      //Toast ausgeben: Das Speichern hat nicht funktioniert.
      this.data.presentNotSavedToast();
      console.log("Das Speichern hat nicht funktioniert.");
    }


  }

  readCostsAndTransports() {
    this.data.newJourney.leisureCosts = this.costs[0];
    this.data.newJourney.accommodationCosts = this.costs[1];
    this.data.newJourney.mealsanddrinksCosts = this.costs[2];
    this.data.newJourney.transportationCosts = this.costs[3];
    this.data.newJourney.otherCosts = this.costs[4];

    this.data.newJourney.plane = this.transports[0];
    this.data.newJourney.car = this.transports[1];
    this.data.newJourney.bus = this.transports[2];
    this.data.newJourney.train = this.transports[3];
    this.data.newJourney.ship = this.transports[4];
    this.data.newJourney.motorbike = this.transports[5];
    this.data.newJourney.campingtrailer = this.transports[6];
    this.data.newJourney.hiking = this.transports[7];
    this.data.newJourney.bicycle = this.transports[8];
  }


}

