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
import { PlaceService } from './place.service';
import { PostService } from './post.service';
import { LoadingController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';
import { Bookmark } from '../Interfaces/Bookmark';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentPost: Post = {postID: null, _activityID:null, _placeID:null, detail: "", activityName:"", iconName:"" , place:null, images:[]}

  public currentPlace: Place = { placeID: null,_journeyID:null,_thumbnailID: null,_countryID:"",detail: "", coordinateX: null, coordinateY: null, posts: [], thumbnailSrc: "" ,placeName:"",countryName:""}

  public newPlace: Place;

  public newPost: Post;

  public currentJourney:Journey={journeyID:null, _userID:null,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:null,duration:null,detail:"", totalCosts: null,accommodationCosts: null,leisureCosts: null,transportationCosts: null,mealsanddrinksCosts: null,otherCosts: null,plane:true, car:false, bus:false, train:false,ship:false,motorbike:false,campingtrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

  public currentUser:User={userID:11, username:"Sallie Johns",_profileImageID:6}

  public newJourney: Journey;

  public currentJourneys:Journeys={journeys:[]}

  public placeInJourney: number;
  public postInPlace: number;

  public currentBookmark:Bookmark ={bookmarkID:null,_journeyID:null,_userID: this.currentUser.userID};
  public bookmarkIcon: string = "assets/icon/bookmark_unsaved_icon.svg";
  public bookmarkUnsaved:string="assets/icon/bookmark_unsaved_icon.svg";
  public bookmarkSaved:string="assets/icon/bookmark_saved_icon.svg";

  //Zentrale Daten laden 
  public journeyCategories: JourneyCategories = { journeyCategories: [] };
  public companionships: Companionships = { companionships: [] };
  public transports: Transports = { transports: [] };
  public activities: Activities = { activities: [] };
  public seasons: Seasons = { seasons: [] };

  public placeInserted:boolean =false;
  public postInserted:boolean = false;
  public loading;

  public errorMsg;
  

  private locale : string;

  constructor(private http: HttpClient, private journeyService: NewJourneyService, private placeService: PlaceService, private postService: PostService, public toastController: ToastController, public loadingController:LoadingController) { 

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
    this.http.get("http://flock-1427.students.fhstp.ac.at/backend/public/allJourneyCategories").subscribe((loadedData: JourneyCategories) => {
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
    this.http.get("http://flock-1427.students.fhstp.ac.at/backend/public/allCompanionships").subscribe((loadedData: Companionships) => {
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
    this.http.get("http://flock-1427.students.fhstp.ac.at/backend/public/allTransports").subscribe((loadedData: Transports) => {
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
    this.http.get("http://flock-1427.students.fhstp.ac.at/backend/public/allActivities").subscribe((loadedData: Activities) => {
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
    this.http.get("http://flock-1427.students.fhstp.ac.at/backend/public/allSeasons").subscribe((loadedData: Seasons) => {
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

  async loadOneJourney(journeyID:number){
    
    let postData={

      "journeyID": journeyID
    }
    
    await this.http.post("http://flock-1427.students.fhstp.ac.at/backend/public/oneJourney", postData).toPromise().then((loadedData: Journey) => {
      console.log(loadedData);
      this.currentJourney=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });

    this.currentBookmark._journeyID = this.currentJourney.journeyID;
  
  }

  loadOnePlace(placeID:number){
    
    let postData={

      "placeID": placeID
    }

    this.http.post("http://flock-1427.students.fhstp.ac.at/backend/public/onePlace", postData).subscribe((loadedData: Place) => {
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

    this.http.post("http://flock-1427.students.fhstp.ac.at/backend/public/onePost", postData).subscribe((loadedData: Post) => {
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

  async presentNotSavedToast() {
    const toast = await this.toastController.create({
      message: 'There was a problem with saving the content to database. Please try again!',
      duration: 8000
    });
    toast.present();
  }

  async presentMandatoryToast() {
    const toast = await this.toastController.create({
      message: 'You haven`t entered some mandatory fields. Please check if you filled all fields with a * and try again!',
      duration: 8000
    });
    toast.present();
  }

  async presentDBErrorToast() {
    const toast = await this.toastController.create({
      message: this.errorMsg,
      duration: 8000
    });
    toast.present();
  }

  loadTopPosts(){
    // http://flock-1427.students.fhstp.ac.at/backend/public/top100 liefert die Daten aus der DB 
    
    this.http.get("http://flock-1427.students.fhstp.ac.at/backend/public/top100").toPromise().then( (loadedData: Journeys) => {
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
    }, error => {
      console.log(error);
      console.info(error);
      this.errorMsg = error;
      this.presentDBErrorToast();
    }
    );
  }



  async setBookmark(){
    this.currentBookmark._userID=this.currentUser.userID;
    this.currentBookmark._journeyID=this.currentJourney.journeyID;
    let postData = this.currentBookmark;

    //let bookmarked: boolean = false;

    await this.http.post("http://flock-1427.students.fhstp.ac.at/backend/public/newBookmark", postData).toPromise().then((loadedData: Bookmark) => {
      this.currentBookmark = loadedData;
      console.log(this.currentBookmark);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
      
    });
  }

  async unsetBookmark(){
    this.currentBookmark._userID=this.currentUser.userID;
    this.currentBookmark._journeyID=this.currentJourney.journeyID;
    let postData = this.currentBookmark;
    
   // let bookmarked: boolean = true;

    await this.http.post("http://flock-1427.students.fhstp.ac.at/backend/public/deleteBookmark", postData).toPromise().then((loadedData: Bookmark) => {
      this.currentBookmark = loadedData;
      console.log(this.currentBookmark);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });
  }

  async bookmarkExists(){
    this.currentBookmark._userID=this.currentUser.userID;
    this.currentBookmark._journeyID=this.currentJourney.journeyID;
    let postData = this.currentBookmark;

    console.log(this.currentUser.userID);
    console.log(this.currentJourney.journeyID);

    let bookmarked: boolean = false;

    await this.http.post("http://flock-1427.students.fhstp.ac.at/backend/public/proveBookmarkExists", postData).toPromise().then((loadedData: Bookmark) => {
      console.log(loadedData);
      this.currentBookmark = loadedData;
      console.log(this.currentBookmark);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
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

  updateJourneyWorks() {
    return this.journeyService.updateJourneyWorks;
  }

  updatePlaceWorks() {
    return this.placeService.updatePlaceWorks;
  }

  async autocompletePlaceName(){
    /*let suggestedPlaces: Place[];
    await this.http.post("http://flock-1427.students.fhstp.ac.at/backend/public/autocompletePlace", this.newPlace.placeName).toPromise().then((loadedData: Place[]) => {
      console.log(loadedData);
      console.log("New Place in DB inserted");
      suggestedPlaces = loadedData;      
    }, error => {
      console.log(error);
    });

    return suggestedPlaces;*/
  }

  async validatePlaceName(){
    /*let place : Place;
    await this.http.post("http://flock-1427.students.fhstp.ac.at/backend/public/validatePlace", this.newPlace.placeName).toPromise().then((loadedData: Place) => {
      console.log(loadedData);
      console.log("New Place in DB inserted");
      place = loadedData;      
    }, error => {
      console.log(error);
    });
    if(place.coordinateX == null || place.coordinateY == null){
      return false;
    }*/
    return true;
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: null,
      duration: 20000,
      /*message: 'Please wait...',
      content: "<div class="loadingscreen"></div>",*/
      message: '<img src="/assets/images/loadingscreen.gif">',
      translucent: true,
     // cssClass: 'custom-class custom-loading'
    }); 

    return await this.loading.present();

  }

  async dismissLoading() {
    return await this.loading.dismiss();
  }
}
