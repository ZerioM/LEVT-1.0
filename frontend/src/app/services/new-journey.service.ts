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

  
  
  
  saveJourney() {
    
    this.data.newJourney.year = parseInt(this.data.newJourney.year.toString().substring(0,4));

    // this.postData = this.data.newJourney;
    console.log("Journey Service: ");
    console.log(this.data.newJourney)
    
    
    this.http.post("http://levt.test/newJourney", this.data.newJourney).subscribe((loadedData: Journey) => {
      console.log(loadedData);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });
    
  }

  loadNewJourney(){
  
   this.data.newJourney.journeyID=null;
   this.data.newJourney._userID=1;
   this.data.newJourney._thumbnailID=2;
   this.data.newJourney. _seasonID=null;
   this.data.newJourney._journeyCategoryID=null;
   this.data.newJourney. _companionshipID=null;
   this.data.newJourney. journeyName="";
   this.data.newJourney. year=null;
   this.data.newJourney. duration=null;
   this.data.newJourney.detail="";
   this.data.newJourney. totalCosts=null;
   this.data.newJourney.leisureCosts=null;
   this.data.newJourney. accommodationCosts=null;
   this.data.newJourney. mealsanddrinksCosts=null;
   this.data.newJourney. transportationCosts=null;
   this.data.newJourney. otherCosts=null
   this.data.newJourney. plane=false;
   this.data.newJourney. car=false;
   this.data.newJourney. bus=false;
   this.data.newJourney.train=false;
   this.data.newJourney.ship=false;
   this.data.newJourney.motorbike=false;
   this.data.newJourney.campingtrailer=false;
   this.data.newJourney.hiking=false;
   this.data.newJourney.bicycle=false;
  
   this.data.newJourney.places=null;
   this.data.newJourney.thumbnailSrc="";
   this.data.newJourney.username="";
   this.data.newJourney.userImgSrc="";
   this.data.newJourney.seasonName="";
   this.data.newJourney.journeyCategoryName="";
   this.data.newJourney.companionshipType="";
   this.data.newJourney.bookmarks=null;
  
   console.log("new Journey");
  }
}

