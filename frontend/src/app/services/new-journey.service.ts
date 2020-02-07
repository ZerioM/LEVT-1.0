import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Journey } from '../Interfaces/Journey';
import { JourneyCategories } from '../Interfaces/JourneyCategories';
import { Companionships } from '../Interfaces/Companionships';
import { Transports } from '../Interfaces/Transports';
import { Activities } from '../Interfaces/Activities';
import { Seasons } from '../Interfaces/Seasons';
import { Place } from '../Interfaces/Place';
import { TouchSequence } from 'selenium-webdriver';
import { DataService } from './data.service';
import { User } from '../Interfaces/User';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class NewJourneyService {


  postData: any;


  public updateJourneyWorks: boolean = true;

  constructor(private http: HttpClient, private toastController: ToastController) {}



//Test Journey mit Places
 /* loadnewJourney() {
    //ladet das JSON File mit den Testdaten aus den assets
    this.http.get("/assets/placesTest.json").subscribe((loadedData: Journey) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.data.newJourney = loadedData;

        console.log("newJourney wurde überschrieben");

        // console.log(loadedData);

        console.log(this.data.newJourney);
      } else {

        console.log("null per http geladen");
      }
    });



  }*/

  
  
  
  async saveJourney(journey:Journey, url: string, loggedInUser: User) {// als Übergabeparameter eine Journey Übergeben
    
    journey.year = parseInt(journey.year.toString().substring(0,4));

    // this.postData = this.data.newJourney;
    console.log("Journey Service: ");
    console.log(journey);
    
    //Abfragen, ob journeyID == null, dann newJourney aufrufen, sonst updateJourney aufrufen
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};
    if(journey.journeyID == null){

      await this.http.post(url+"/newJourney", journey, loginHeaders).toPromise().then((loadedData: Journey) => {
        console.log("Loaded Data:");
        console.log(loadedData);
        if(loadedData == null){
          //journey = loadedData;
          this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
          this.updateJourneyWorks = true;
        } else {
          this.updateJourneyWorks = true;
          journey.journeyID = loadedData.journeyID;
          journey.userImgSrc = loadedData.userImgSrc;
          journey._userID = loadedData._userID;
          journey.username = loadedData.username;
          journey.thumbnailSrc = loadedData.thumbnailSrc;
          console.log("New Journey in DB inserted.");
          console.log("Journey after insert:");
          console.log(journey);
        }
        
      }, error => {
        this.updateJourneyWorks = true;
        console.log(error);
      });
    } else {
      await this.http.post(url+"/updateJourney", journey, loginHeaders).toPromise().then((loadedData: Journey) => {
        console.log(loadedData);
        if(loadedData == null){
          //journey = loadedData;
          this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
          this.updateJourneyWorks = false;
        } else {
          console.log("Journey with ID: ");
          console.log(journey.journeyID);
          console.log(" in DB updated.");
          this.updateJourneyWorks = true;
          journey.journeyID = loadedData.journeyID;
          journey.userImgSrc = loadedData.userImgSrc;
          journey._userID = loadedData._userID;
          journey.username = loadedData.username;
          journey.thumbnailSrc = loadedData.thumbnailSrc;
        }
      }, error => {
        this.updateJourneyWorks = false;
        console.log(error);
      });
    }
    
  }


  async loadJourneyByPlaceID(url: string, place: Place){
    let journey: Journey;
    await this.http.post(url+"/oneJourneyByPlaceID",place).toPromise().then((loadedData: Journey) => {
      console.log(loadedData);
      journey = loadedData;
    }, error => {
      console.log(error);
    });

    return journey;
  }

  newJourney(currentUser:User){
  
    let myJourney:Journey={journeyID:null, _userID:currentUser.userID,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:null,duration:null,detail:"", totalCosts: null,accommodationCosts: null,leisureCosts: null,transportationCosts: null,mealsanddrinksCosts: null,otherCosts: null,plane:false, car:false, bus:false, train:false,ship:false,motorbike:false,campingtrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

    console.log("new Journey");
    console.log(myJourney._userID);
    
    return myJourney;
    
    
  }


  async loadJourneyWithChildren(newJourney: Journey, journeyID:number, url:string){

    let postData={

      "journeyID": journeyID
    }

    let journey:Journey
    
    await this.http.post(url+"/oneJourneyWithChildren", postData).toPromise().then((loadedData: Journey) => {
      console.log(loadedData);
      console.log("Post funktioniert");

      console.log("Loadet Data Journey with children --> leisureCosts");
      console.log(loadedData.leisureCosts);
      console.log("Loadet Data Journey with children --> Season ID:")
      console.log(loadedData._seasonID);

      newJourney.journeyID = loadedData.journeyID;
      newJourney.journeyName=loadedData.journeyName;
      newJourney.year=loadedData.year;
      newJourney.username=loadedData.username;
      newJourney.userImgSrc=loadedData.userImgSrc;
      newJourney._userID=loadedData._userID;
      newJourney.thumbnailSrc=loadedData.thumbnailSrc;
      newJourney._companionshipID=loadedData._companionshipID;
      newJourney.companionshipType=loadedData.companionshipType;
      newJourney.seasonName=loadedData.seasonName;
      newJourney._seasonID=loadedData._seasonID;
      console.log("new Journey Season ID");
      console.log(newJourney._seasonID);
      newJourney.detail=loadedData.detail;
      newJourney.journeyCategoryName=loadedData.journeyCategoryName;
      newJourney._journeyCategoryID=loadedData._journeyCategoryID;
      newJourney.accommodationCosts=loadedData.accommodationCosts;
      newJourney.leisureCosts=loadedData.leisureCosts;
      newJourney.totalCosts=loadedData.totalCosts;
      newJourney.mealsanddrinksCosts=loadedData.mealsanddrinksCosts;
      newJourney.transportationCosts=loadedData.transportationCosts;
      newJourney.otherCosts=loadedData.otherCosts;
      newJourney.plane=loadedData.plane;
      newJourney.ship=loadedData.ship;
      newJourney.train=loadedData.train;
      newJourney.motorbike=loadedData.motorbike;
      newJourney.bicycle=loadedData.bicycle;
      newJourney.bus=loadedData.bus;
      newJourney.car=loadedData.car;
      newJourney.hiking=loadedData.hiking;
      newJourney.campingtrailer=loadedData.campingtrailer;
      newJourney.duration=loadedData.duration;
      newJourney.places=loadedData.places;

      console.log(newJourney.car);

      

      console.log ("leisure Costs nach zuweisung von loadetData:");
      console.log (newJourney.leisureCosts);

    }, error => {
      console.log(error);
    });
  }

  async deleteJourney(journey: Journey, url: string, loggedInUser: User){
    let isDeleted = false;
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};

    await this.http.post(url+"/deleteJourney", journey, loginHeaders).toPromise().then((loadedData: boolean) => {
      console.log(loadedData);
      if(loadedData == null){
        this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
      } else {
      console.log("Journey in DB deleted");
      isDeleted = loadedData;
      }      
    }, error => {
        console.log(error);
    });


    return isDeleted;
  }

  async presentGeneralToast(msg: string, dur: number){
    const toast = await this.toastController.create({
      message: msg,
      duration: dur
    });
    toast.present();
  }

}


