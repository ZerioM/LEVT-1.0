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

@Injectable({
  providedIn: 'root'
})
export class NewJourneyService {


  postData: any;


 

  constructor(private http: HttpClient, private data:DataService) { }



//Test Journey mit Places
 /* loadCurrentJourney() {
    //ladet das JSON File mit den Testdaten aus den assets
    this.http.get("/assets/placesTest.json").subscribe((loadedData: Journey) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.data.currentJourney = loadedData;

        console.log("currentJourney wurde überschrieben");

        // console.log(loadedData);

        console.log(this.data.currentJourney);
      } else {

        console.log("null per http geladen");
      }
    });



  }*/

  
  
  
  sendPostRequest() {
    
    this.data.currentJourney.year = parseInt(this.data.currentJourney.year.toString().substring(0,4));

    // this.postData = this.data.currentJourney;
    console.log("Journey Service: ");
    console.log(this.data.currentJourney)
    
    
    this.http.post("http://levt.test/newJourney", this.data.currentJourney).subscribe((loadedData: Journey) => {
      console.log(loadedData);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });
    
  }

  loadNewJourney(){
  
   this.data.currentJourney.journeyID=null;
   this.data.currentJourney._userID=1;
   this.data.currentJourney._thumbnailID=2;
   this.data.currentJourney. _seasonID=null;
   this.data.currentJourney._journeyCategoryID=null;
   this.data.currentJourney. _companionshipID=null;
   this.data.currentJourney. journeyName="";
   this.data.currentJourney. year=null;
   this.data.currentJourney. duration=null;
   this.data.currentJourney.detail="";
   this.data.currentJourney. totalCosts=null;
   this.data.currentJourney.leisureCosts=null;
   this.data.currentJourney. accommodationCosts=null;
   this.data.currentJourney. mealsanddrinksCosts=null;
   this.data.currentJourney. transportationCosts=null;
   this.data.currentJourney. otherCosts=null
   this.data.currentJourney. plane=false;
   this.data.currentJourney. car=false;
   this.data.currentJourney. bus=false;
   this.data.currentJourney.train=false;
   this.data.currentJourney.ship=false;
   this.data.currentJourney.motorbike=false;
   this.data.currentJourney.campingtrailer=false;
   this.data.currentJourney.hiking=false;
   this.data.currentJourney.bicycle=false;
  
   this.data.currentJourney.places=null;
   this.data.currentJourney.thumbnailSrc="";
   this.data.currentJourney.username="";
   this.data.currentJourney.userImgSrc="";
   this.data.currentJourney.seasonName="";
   this.data.currentJourney.journeyCategoryName="";
   this.data.currentJourney.companionshipType="";
   this.data.currentJourney.bookmarks=null;
  
   console.log("new Journey");
  }
}

