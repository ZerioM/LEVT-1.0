import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from 'src/app/Interfaces/Image';
import { Journey } from 'src/app/Interfaces/Journey';
import { Journeys } from 'src/app/Interfaces/Journeys';
import { formatDate } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeEN from '@angular/common/locales/en';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Place } from '../Interfaces/Place';
import { JourneyCategories } from '../Interfaces/JourneyCategories';
import { Companionships } from '../Interfaces/Companionships';
import { Transports } from '../Interfaces/Transports';
import { Activities } from '../Interfaces/Activities';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentJourney:Journey={journeyID:null, _userID:null,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:null,duration:null,detail:"", totalCosts: null,accommodationCosts:null,leisureCosts:null,transportationCosts:null,mealsanddrinkCosts:null,otherCosts:null,plane:true, car:false, bus:false, train:false,ship:false,motorBike:false,campingTrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

  public currentPlace: Place = { placeID: null,_journeyID:null,_thumbnailID: null,_countryID:"",detail: "", coordinateX: null, coordinateY: null, posts: [], thumbnailSrc: "" ,placeName:"",countryName:""}

  public currentJourneys:Journeys={journeys:[]}


  //Zentrale Daten laden 
  public journeyCategories: JourneyCategories = { journeyCategories: [] };
  public companionships: Companionships = { companionships: [] };
  public transports: Transports = { transports: [] };
  public activities: Activities = { activities: [] };

  

  private locale : string;

  constructor(private http: HttpClient, private sanitizer:DomSanitizer) { 
      
    /*
    //for german Date:
    registerLocaleDate(localeDE);
    this.locale = 'de';
    */
    //for englisch Date:
    registerLocaleData(localeEN);
    this.locale = 'en';
  }

  loadTestJSON(){
//ladet das JSON File mit den Testdaten aus den assets
    this.http.get("/assets/journeys.json").subscribe( (loadedData: Journeys)=> {
      if(loadedData!=null){
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.currentJourneys=loadedData;

        console.log("currentJourney wurde überschrieben");

        /*this.currentJourney.places.forEach( place=> {
        this.thumbnailSrcString=place.thumbnailSrcString;
        place.thumbnailSrcUrl=this.sanitizer.bypassSecurityTrustUrl(this.thumbnailSrcString);
          
        });*/

        /*this.currentJourneys.journeys.forEach(journey => {
          //MZ: Change date format
          //dd.MM.yyyy for normal date, MMM for 'Nov'
          this.arrivalDateString = formatDate(journey.arrivalDate,'MMMM yyyy', this.locale);
          journey.arrivalDate = this.arrivalDateString;        

          this.departureDateString = formatDate(journey.departureDate,'MMMM yyyy',this.locale);
          journey.departureDate = this.departureDateString;      
        });*/
        console.log(loadedData);

        console.log(this.currentJourneys);
      }else{

        console.log("null per http geladen");
      }
    });

    

  }

  loadTopPosts(){
    // http://levt.test/top100 liefert die Daten aus der DB 
    
    this.http.get("http://levt.test/top100").subscribe( (loadedData: Journeys)=> {
      if(loadedData!=null){
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.currentJourneys=loadedData;
        this.currentJourneys.journeys = this.shuffleArray(this.currentJourneys.journeys);
        /*this.currentJourneys.journeys.forEach(journey => {
          //MZ: Change date format
          //dd.MM.yyyy for normal date, MMM for 'Nov'
          this.arrivalDateString = formatDate(journey.arrivalDate,'MMMM yyyy', this.locale);
          journey.arrivalDate = this.arrivalDateString;        

          this.departureDateString = formatDate(journey.departureDate,'MMMM yyyy',this.locale);
          journey.departureDate = this.departureDateString;      
        });
        */
        console.log(this.currentJourneys);
      }else{

        console.log("null per http geladen");
      }
    });

    

  }

  // -> Fisher–Yates shuffle algorithm
  shuffleArray(array) {
    let m = array.length, t, i;
  
    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }
}
