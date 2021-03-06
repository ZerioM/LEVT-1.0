import { Component, AfterViewChecked, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { LoadingController } from '@ionic/angular';


import { compileNgModule } from '@angular/compiler';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/Interfaces/Place';

import { AlertController } from '@ionic/angular';

import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraSource } from '@capacitor/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/Interfaces/Image';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Interfaces/User';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewChecked, AfterViewInit {

  //Gamification
  public enteredAJourneyName: boolean = false;
  public enteredAmountofDays: boolean = false;
  public enteredJourneyDetails: boolean = false;
  public enteredTotalCosts = false;
  public enteredLeisureCosts = false;

  public showC: Boolean = true;
  public divideC: Boolean = false;
  public showPassword:boolean = false;

  public image: Image;

  public costs = [null, null, null, null, null];
  public transports = [false, false, false, false, false, false, false, false, false];

  test: any;





  constructor(public journeyService: NewJourneyService, public messagesService: MessagesService, public data: DataService, public imageService: ImageService, private navCtrl: NavController, private router: Router, public placeService: PlaceService, private alertController: AlertController, private loadingController: LoadingController, public userService: UserService) {

    this.loadJSON();

  }

  ngAfterViewInit() {
    if (this.userService.userLoggedIn(this.data.loggedInUser)) {
      console.log("View inited.");
      this.userService.wantsToLogin = true;
      this.userService.loginAtTab2OrTab5 = true;
    }

  }

  ngAfterViewChecked() {

    if (this.userService.userRecentlyLoggedInCreateNewJourney) {
      this.userService.userRecentlyLoggedInCreateNewJourney = false;
      this.data.newJourney = this.journeyService.newJourney(this.data.loggedInUser);
    }

  }

  //Daten laden
  loadJSON() {


    this.data.loadJourneyCategories();
    this.data.loadCompanionships();
    this.data.loadTransports();
    this.data.loadActivities();
    this.data.loadSeasons();
  }

  async selectThumbnail() {

    const webPath = await this.getPhoto(CameraSource.Prompt);

    this.data.presentLoading();

    this.image = await this.imageService.uploadImage(webPath, null, this.data.url, this.data.loggedInUser);
    if (this.image.imageID != null) {
      this.data.newJourney._thumbnailID = this.image.imageID;
      this.data.newJourney.thumbnailSrc = this.image.imgSrc;
    } else {
      this.data.presentNotSavedToast();
    }

    this.data.dismissLoading();



  }

  private async getPhoto(source: CameraSource) {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source,
      //height, width, allowEditing
    });

    return image.webPath;

  }

  public async deleteImage(image: Image) {

    let isDeleted: boolean;

    this.data.presentLoading();
    isDeleted = await this.imageService.deleteImage(image, this.data.url, this.data.loggedInUser);
    this.data.dismissLoading();

    if (isDeleted) {
      this.data.newJourney._thumbnailID = null;
      this.data.newJourney.thumbnailSrc = '';
    } else {
      this.data.presentNotSavedToast();
    }

  }

  public async deletePlace(place: Place, index: number) {
    let isDeleted: boolean;

    this.data.presentLoading();
    isDeleted = await this.placeService.deletePlace(place, this.data.url, this.data.loggedInUser);
    this.data.dismissLoading();

    if (isDeleted) {
      this.data.newJourney.places.splice(index, 1);
    } else {
      this.data.presentNotSavedToast();
    }
  }

  //Naviagation 
  async goToAddNewPlace() {
    // this.data.readCostsAndTransports();


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
    await this.journeyService.saveJourney(this.data.newJourney, this.data.url, this.data.loggedInUser);
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
    // this.data.readCostsAndTransports();

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
    //let seasonID = this.data.newJourney._seasonID;
    //let journeyCategoryID = this.data.newJourney._journeyCategoryID;
    //let companionshipID = this.data.newJourney._companionshipID;
    await this.journeyService.saveJourney(this.data.newJourney, this.data.url, this.data.loggedInUser);
    //this.data.newJourney._seasonID = seasonID;
    //this.data.newJourney._journeyCategoryID = journeyCategoryID;
    //this.data.newJourney._companionshipID = companionshipID;
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
      this.data.presentNotSavedToast();
      console.log("Das Speichern hat nicht funktioniert.");
    }
  }

  async goBacktoHomepageWithoutSaving() {
    if (this.data.newJourney.journeyID != null && this.data.fromEditJourney == false) {
      let isDeleted: boolean;

      this.data.presentLoading();
      isDeleted = await this.journeyService.deleteJourney(this.data.newJourney, this.data.url, this.data.loggedInUser);
      this.data.dismissLoading();

      if (isDeleted) {
        this.data.newJourney = this.journeyService.newJourney(this.data.loggedInUser);
        this.data.loadTopPosts();
        this.data.loadUserJourneys(this.data.loggedInUser);
        this.router.navigateByUrl('/tabs/tab1');
        this.data.reloadHomePage = true;
      } else {
        this.data.presentNotSavedToast();
      }
    } else {
      this.data.newJourney = this.journeyService.newJourney(this.data.loggedInUser);
      this.data.loadTopPosts();
      this.data.loadUserJourneys(this.data.loggedInUser);
      this.router.navigateByUrl('/tabs/tab1');
    }
  }

  async deleteJourney() {

    let isDeleted: boolean;

    this.data.presentLoading();
    isDeleted = await this.journeyService.deleteJourney(this.data.newJourney, this.data.url, this.data.loggedInUser);
    this.data.dismissLoading();

    if (isDeleted) {
      this.data.newJourney = this.journeyService.newJourney(this.data.loggedInUser);
      this.data.loadTopPosts();
      this.data.loadUserJourneys(this.data.loggedInUser);
      this.router.navigateByUrl('/tabs/tab1');
      this.data.reloadHomePage = true;
    } else {
      this.data.presentNotSavedToast();
    }
  }

  close() {
    if (this.data.newJourney.journeyName == "" && this.data.newJourney._seasonID == null && this.data.newJourney._companionshipID == null && this.data.newJourney._journeyCategoryID == null
      && this.data.newJourney.plane == false && this.data.newJourney.car == false && this.data.newJourney.bus == false
      && this.data.newJourney.train == false && this.data.newJourney.ship == false && this.data.newJourney.motorbike == false
      && this.data.newJourney.campingtrailer == false && this.data.newJourney.hiking == false && this.data.newJourney.bicycle == false && this.data.newJourney.detail == "" && this.data.newJourney.totalCosts == null && this.data.newJourney.transportationCosts == null && this.data.newJourney.leisureCosts == null && this.data.newJourney.mealsanddrinksCosts == null && this.data.newJourney.accommodationCosts == null && this.data.newJourney.otherCosts == null && this.data.newJourney.places.length == null) {
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
    if (this.data.newJourney.places != null) {
      if (this.data.newJourney.places.length == 0) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  toggleTransports(index: number) {

    this.data.transportsCheckbox[index] = !this.data.transportsCheckbox[index];
    console.log(this.data.transportsCheckbox[index]);
  }



  async finishJourney() {
    //Data binding testen

    // this.data.readCostsAndTransports();

    if (this.data.newJourney.journeyName == "" || this.data.newJourney._seasonID == null || this.data.newJourney._companionshipID == null
      || this.data.newJourney.year == null || this.data.newJourney._journeyCategoryID == null
      || this.data.newJourney.plane == false && this.data.newJourney.car == false && this.data.newJourney.bus == false
      && this.data.newJourney.train == false && this.data.newJourney.ship == false && this.data.newJourney.motorbike == false
      && this.data.newJourney.campingtrailer == false && this.data.newJourney.hiking == false && this.data.newJourney.bicycle == false) {

      this.data.presentMandatoryToast();
      return;

    }

    await this.data.presentLoading();
    await this.journeyService.saveJourney(this.data.newJourney, this.data.url, this.data.loggedInUser);
    await this.data.dismissLoading();

    if (this.data.newJourney.journeyID != null) {
      this.data.currentJourneys.journeys.unshift(this.data.newJourney);
      console.log(this.data.currentJourneys);
      this.data.newJourney = this.journeyService.newJourney(this.data.loggedInUser);
      if (this.data.loggedInUser.pioneerBadgeProgress == 76) {
        this.data.loggedInUser.pioneerBadgeProgress = 100;
        //Update User
        if (this.userService.updateUser(this.data.loggedInUser, this.data.url) != null) {
          await this.userService.updateUser(this.data.loggedInUser, this.data.url);
        }
      }
      //this.data.loadTopPosts();
      this.data.loadUserJourneys(this.data.loggedInUser);
      this.router.navigateByUrl('/tabs/tab1');
    } else {
      //Toast ausgeben: Das Speichern hat nicht funktioniert.
      this.data.presentNotSavedToast();
      console.log("Das Speichern hat nicht funktioniert.");
    }

    if (this.data.fromEditJourney == true) {
      this.data.fromEditJourney = false;
      this.data.fromNewJourney = true;
    }


  }

  //Gamification

  async focusOutJourneyName() {

    if (this.data.loggedInUser.pioneerBadgeProgress == 0) {

      this.data.loggedInUser.pioneerBadgeProgress = 25;

      //Update User
      if (await this.userService.updateUser(this.data.loggedInUser, this.data.url) != null) {

        await this.userService.updateUser(this.data.loggedInUser, this.data.url);

      }
    }

    if (this.enteredAJourneyName == false) {
      this.data.presentGamificationToast("Added a Journey Name! +5 Points", 1000);
      this.data.loggedInUser.gamificationPoints += 5;
      this.enteredAJourneyName = true;

      //Update User
      if (this.userService.updateUser(this.data.loggedInUser, this.data.url) != null) {
        await this.userService.updateUser(this.data.loggedInUser, this.data.url);
      }

    }



  }




  async focusOutDays() {
    if (this.enteredAmountofDays == false) {
      this.data.presentGamificationToast("Added the Amount of Days! +5 Points!", 3000);
      this.data.loggedInUser.gamificationPoints += 5;
      this.enteredAmountofDays = true;

      //Update User
      if (this.userService.updateUser(this.data.loggedInUser, this.data.url) != null) {
        await this.userService.updateUser(this.data.loggedInUser, this.data.url);
      }
    }
  }

  async focusOutJourneyDetails() {
    if (this.enteredJourneyDetails == false) {
      this.data.presentGamificationToast("Added more details! +5 Points!", 3000);
      this.data.loggedInUser.gamificationPoints += 5;
      this.enteredJourneyDetails = true;

      //Update User
      if (this.userService.updateUser(this.data.loggedInUser, this.data.url) != null) {
        await this.userService.updateUser(this.data.loggedInUser, this.data.url);
      }
    }
  }

  async focusOutTotalCosts() {
    if (this.enteredTotalCosts == false) {
      this.data.presentGamificationToast("Added total costs! +5 Points!", 3000);
      this.data.loggedInUser.gamificationPoints += 5;
      this.enteredTotalCosts = true;

      //Update User
      if (this.userService.updateUser(this.data.loggedInUser, this.data.url) != null) {
        await this.userService.updateUser(this.data.loggedInUser, this.data.url);
      }
    }
  }

  async focusOutLeisureCosts() {
    if (this.enteredLeisureCosts == false) {
      this.data.presentGamificationToast("Added cost details! +5 Points!", 3000);
      this.data.loggedInUser.gamificationPoints += 5;
      this.enteredLeisureCosts = true;

      //Update User
      if (this.userService.updateUser(this.data.loggedInUser, this.data.url) != null) {
        await this.userService.updateUser(this.data.loggedInUser, this.data.url);
      }
    }
  }

  async closePioneerStep1Toast() {


    this.data.loggedInUser.pioneerBadgeProgress = 26;

    //Update User
    if (this.userService.updateUser(this.data.loggedInUser, this.data.url) != null) {
      await this.userService.updateUser(this.data.loggedInUser, this.data.url);
    }
  }

  async login() {
    await this.data.presentLoading();
    await this.userService.login(this.data.loggedInUser, this.data.currentBookmark, this.data.url);
    await this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }

  async register() {
    await this.data.presentLoading();
    await this.userService.register(this.data.loggedInUser, this.data.currentBookmark, this.data.url);
    await this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }



}

