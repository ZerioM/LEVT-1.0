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
import { Seasons } from '../Interfaces/Seasons';
import { Post } from '../Interfaces/Post';
import { JourneyDetailPage } from '../Pages/journey-detail/journey-detail.page';
import { NewJourneyService } from './new-journey.service';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentPost: Post = {postID: null, _activityID:null, _placeID:null, detail: "", activityName:"", place:null, images:[]}

  public currentPlace: Place = { placeID: null,_journeyID:null,_thumbnailID: null,_countryID:"",detail: "", coordinateX: null, coordinateY: null, posts: [], thumbnailSrc: "" ,placeName:"",countryName:""}

  public newPlace: Place;

  public newPost: Post;

  public currentJourney:Journey={journeyID:null, _userID:null,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:null,duration:null,detail:"", totalCosts: null,accommodationCosts: null,leisureCosts: null,transportationCosts: null,mealsanddrinksCosts: null,otherCosts: null,plane:true, car:false, bus:false, train:false,ship:false,motorbike:false,campingtrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

  public currentUser:User={userID:11, username:"Sallie Johns",_profileImageID:6}

public newJourney: Journey;

  public currentJourneys:Journeys={journeys:[]}




  //Zentrale Daten laden 
  public journeyCategories: JourneyCategories = { journeyCategories: [] };
  public companionships: Companionships = { companionships: [] };
  public transports: Transports = { transports: [] };
  public activities: Activities = { activities: [] };
  public seasons: Seasons = { seasons: [] };

  

  private locale : string;

  constructor(private http: HttpClient, private journeyService: NewJourneyService) { 
    this.newJourney= this.journeyService.newJourney(this.currentUser);
      
    /*
    //for german Date:
    registerLocaleDate(localeDE);
    this.locale = 'de';
    */
    //for englisch Date:
    registerLocaleData(localeEN);
    this.locale = 'en';
  }

  loadJourneyCategories() {
    //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
    this.http.get("http://levt.test/allJourneyCategories").subscribe((loadedData: JourneyCategories) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.journeyCategories = loadedData;

        console.log("journeyCategories wurden überschrieben");

        //console.log(loadedData);

        console.log(this.journeyCategories);
      } else {

        console.log("null per http geladen");
      }
    });



  }


  loadCompanionships() {
    //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
    this.http.get("http://levt.test/allCompanionships").subscribe((loadedData: Companionships) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.companionships = loadedData;

        console.log("Companionships wurden überschrieben");

        //console.log(loadedData);

        console.log(this.companionships);
      } else {

        console.log("null per http geladen");
      }
    });



  }

  loadTransports() {
    //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
    this.http.get("http://levt.test/allTransports").subscribe((loadedData: Transports) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.transports = loadedData;

        console.log("Transports wurden überschrieben");

        //console.log(loadedData);

        console.log(this.transports);
      } else {

        console.log("null per http geladen");
      }
    });


  }
  loadActivities() {
    this.http.get("http://levt.test/allActivities").subscribe((loadedData: Activities) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.activities = loadedData;

        

        console.log(this.activities);
      } else {

        console.log("null per http geladen");
      }
    });
  }


  loadSeasons() {
    this.http.get("http://levt.test/allSeasons").subscribe((loadedData: Seasons) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.seasons = loadedData;

        console.log("Transports wurden überschrieben");

        //console.log(loadedData);

        console.log(this.seasons);
      } else {

        console.log("null per http geladen");
      }
    });
  }

  loadOneJourney(journeyID:number){
    
    let postData={

      "journeyID": journeyID
    }

    this.http.post("http://levt.test/oneJourney", postData).subscribe((loadedData: Journey) => {
      console.log(loadedData);
      this.currentJourney=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });
    

  }

  loadOnePlace(placeID:number){
    
    let postData={

      "placeID": placeID
    }

    this.http.post("http://levt.test/onePlace", postData).subscribe((loadedData: Place) => {
      console.log(loadedData);
      this.currentPlace=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });

  }

  loadOnePost(postID:number){
    
    let postData={

      "postID": postID
    }

    this.http.post("http://levt.test/onePost", postData).subscribe((loadedData: Post) => {
      console.log(loadedData);
      this.currentPost=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });
    

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
        console.log(loadedData);
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

  autocompletePlaceName(){
    
  }

  validatePlaceName(){
    return true;
  }
}
