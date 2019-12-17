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

  
  
  
  async saveJourney(journey:Journey) {// als Übergabeparameter eine Journey Übergeben
    
    journey.year = parseInt(journey.year.toString().substring(0,4));

    // this.postData = this.data.newJourney;
    console.log("Journey Service: ");
    console.log(journey);
    
    //Abfragen, ob journeyID == null, dann newJourney aufrufen, sonst updateJourney aufrufen
    if(journey.journeyID == null){
      await this.http.post("https://flock-1427.students.fhstp.ac.at/backend/public/newJourney", journey).toPromise().then((loadedData: Journey) => {
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
      await this.http.post("https://flock-1427.students.fhstp.ac.at/backend/public/updateJourney", journey).toPromise().then((loadedData: Journey) => {
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



  newJourney(currentUser:User){
  
    let myJourney:Journey={journeyID:null, _userID:currentUser.userID,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:2019,duration:null,detail:"", totalCosts: null,accommodationCosts: null,leisureCosts: null,transportationCosts: null,mealsanddrinksCosts: null,otherCosts: null,plane:true, car:false, bus:false, train:false,ship:false,motorbike:false,campingtrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

    console.log("new Journey");
    return myJourney;
    
    
  }
}

