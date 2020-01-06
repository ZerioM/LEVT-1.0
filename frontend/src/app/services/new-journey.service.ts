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


@Injectable({
  providedIn: 'root'
})
export class NewJourneyService {


  postData: any;


  public updateJourneyWorks: boolean = true;

  constructor(private http: HttpClient) {}



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

  
  
  
  async saveJourney(journey:Journey, url: string) {// als Übergabeparameter eine Journey Übergeben
    
    journey.year = parseInt(journey.year.toString().substring(0,4));

    // this.postData = this.data.newJourney;
    console.log("Journey Service: ");
    console.log(journey);
    
    //Abfragen, ob journeyID == null, dann newJourney aufrufen, sonst updateJourney aufrufen
    if(journey.journeyID == null){
      await this.http.post(url+"/newJourney", journey).toPromise().then((loadedData: Journey) => {
        console.log("Loaded Data:");
        console.log(loadedData);
        this.updateJourneyWorks = true;
        journey.journeyID = loadedData.journeyID;
        console.log("New Journey in DB inserted.");
        console.log("Journey after insert:");
        console.log(journey);
      }, error => {
        this.updateJourneyWorks = true;
        console.log("Ich bin in dieses Error-Feld gegangen.");
        console.log(error);
      });
    } else {
      await this.http.post(url+"/updateJourney", journey).toPromise().then((loadedData: Journey) => {
        console.log(loadedData);
        console.log("Journey with ID: ");
        console.log(journey.journeyID);
        console.log(" in DB updated.");
        this.updateJourneyWorks = true;
        journey.journeyID = loadedData.journeyID;
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
  
    let myJourney:Journey={journeyID:null, _userID:currentUser.userID,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:2019,duration:null,detail:"", totalCosts: null,accommodationCosts: null,leisureCosts: null,transportationCosts: null,mealsanddrinksCosts: null,otherCosts: null,plane:false, car:false, bus:false, train:false,ship:false,motorbike:false,campingtrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

    console.log("new Journey");
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
}

