import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { ImageService } from './image.service';

import { Md5 } from 'ts-md5/dist/md5';
import { Validators } from '@angular/forms';
import { Search } from '../Interfaces/Search';
import { Places } from '../Interfaces/Places';
import { Messages } from '../Interfaces/Messages';
import { Message } from '../Interfaces/Message';
import { UserService } from './user.service';
import { Countries } from '../Interfaces/Countries';

import { Storage } from '@ionic/storage';
import { BookmarkService } from './bookmark.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentPost: Post = {postID: null, _activityID:null, _placeID:null, detail: "", activityName:"", iconName:"" , placeName: null, _countryID: null, images:[]}

  public currentUserPost: Post = {postID: null, _activityID:null, _placeID:null, detail: "", activityName:"", iconName:"" , placeName:null, _countryID: null, images:[]}

  public currentPlace: Place = { placeID: null,_journeyID:null,_thumbnailID: null,_countryID:"",detail: "", coordinateX: null, coordinateY: null, posts: [], thumbnailSrc: "" ,placeName:"",countryName:""}
  public allPlaces: Places;

  public currentUserPlace: Place = { placeID: null,_journeyID:null,_thumbnailID: null,_countryID:"",detail: "", coordinateX: null, coordinateY: null, posts: [], thumbnailSrc: "" ,placeName:"",countryName:""}

  public newPlace: Place;

  public newPost: Post;

  public currentJourney:Journey={journeyID:null, _userID:null,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:null,duration:null,detail:"", totalCosts: null,accommodationCosts: null,leisureCosts: null,transportationCosts: null,mealsanddrinksCosts: null,otherCosts: null,plane:true, car:false, bus:false, train:false,ship:false,motorbike:false,campingtrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

  public currentUserJourney:Journey={journeyID:null, _userID:null,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:null,duration:null,detail:"", totalCosts: null,accommodationCosts: null,leisureCosts: null,transportationCosts: null,mealsanddrinksCosts: null,otherCosts: null,plane:true, car:false, bus:false, train:false,ship:false,motorbike:false,campingtrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

  public loggedInUser:User={userID:null, username:null,_profileImageID: null, userImgSrc: null,password: null,emailAddress: null, birthday:null, _countryOfResidenceID:null,sessionID:null,explorerBadgeProgress:null,pioneerBadgeProgress:null,age:null,countryName: null, gamificationPoints:null, pwClear:null,email_verified_at:null}
  public loginHeaders = {
    headers: new HttpHeaders({})
  };

  //chat
  public chatUser:User={userID:2, username:"leo41",_profileImageID:6, userImgSrc:"/assets/images/sarah3110.jpg",password:"",emailAddress:"",birthday:null, _countryOfResidenceID:null,sessionID:null,explorerBadgeProgress:null,pioneerBadgeProgress:null,age:null,countryName:"",gamificationPoints:null, pwClear:null, email_verified_at:null}

  public currentMessages:Messages={messages:[]};
  public currentMessage:Message={messageID: null, fromUserID: null, fromUsername: '', toUserID: null, createdAt: null, msg: ''}

  public newUser:User;

  public newJourney: Journey;

  public currentJourneys:Journeys={journeys:[]};
  public currentUserJourneys:Journeys={journeys:[]};

  public placeInJourney: number;
  public postInPlace: number;

  public currentBookmark:Bookmark ={bookmarkID:null,_journeyID:null,_userID: this.loggedInUser.userID};
  public bookmarkIcon: string = "assets/icon/bookmark_unsaved_icon.svg";
  public bookmarkUnsaved:string="assets/icon/bookmark_unsaved_icon.svg";
  public bookmarkSaved:string="assets/icon/bookmark_saved_icon.svg";

  public costs = [null, null, null, null, null];
  public transportsCheckbox = [false, false, false, false, false, false, false, false, false];

  public hasJourneyDetail=false;
  public hasPlaces=false;
  public hasPlaceDetail=false;
  public hasPosts=false;
  public hasPostDetail=false;
  

  public hasUserJourneyDetail=false;
  public hasUserPlaces=false;
  public hasUserPlaceDetail=false;
  public hasUserPosts=false;
  public hasUserPostDetail=false;

  //image

  public newImage:Image;

  //Zentrale Daten laden 
  public journeyCategories: JourneyCategories = { journeyCategories: [] };
  public companionships: Companionships = { companionships: [] };
  public transports: Transports = { transports: [] };
  public activities: Activities = { activities: [] };
  public seasons: Seasons = { seasons: [] };
  public countries: Countries = { countries: [] };

  public placeInserted:boolean =false;
  public postInserted:boolean = false;
  public loading;

  public errorMsg;

  //gamification
  public showedPioneerStep1:boolean=false;
  public showedPioneerStep2:boolean=false;
  public showedPioneerStep3:boolean=false;
  public showedPioneerFinish:boolean=false;

  public showedExplorerFulltext:boolean=false;
  public showedExplorerMap:boolean= false;
  public showedExplorerJourney:boolean = false;
  public clickedSearch:boolean=false;
  public clickedMap:boolean=false;
  public clickedJourney:boolean=false;

  public showPointsChallenge:boolean=false;

  //homepage
  public reloadHomePage = false;

  //search

  public search: Search = {searchEntry: ''};

  //map

  public contentChanged: boolean = true;

  //settings
  public settingsFromHome=true;
  public resetTab=false;

  //edit
  public edit: boolean=false;
  public fromEditJourney:boolean=false;
  public fromNewJourney:boolean=true;
  
  private locale : string;

  public flock: string = "https://flock-1427.students.fhstp.ac.at/backend/public";
  public homestead: string = "http://levt.test";
  public url: string = this.homestead;
  

  constructor(private storage: Storage, private bookmarkService: BookmarkService, private http: HttpClient, private userService: UserService, private journeyService: NewJourneyService, private placeService: PlaceService, private postService: PostService,private imageService:ImageService, public toastController: ToastController, public loadingController:LoadingController) { 

    this.loadCentralData();

    this.newJourney= this.journeyService.newJourney(this.loggedInUser);
  
    /*
    //for german Date:
    registerLocaleDate(localeDE);
    this.locale = 'de';
    */
    //for englisch Date:
    registerLocaleData(localeEN);
    this.locale = 'en';
  }

  loadCentralData(){
    this.loadJourneyCategories();
    this.loadSeasons();
    this.loadCompanionships();
    this.loadCountries();
    this.loadTransports();
    this.loadUser();
  }

  // public saveUser() {
  //   this.storage.set("myUser",this.loggedInUser);
  // }

  public loadUser() {
    this.storage.get("myUser").then((someData: User) => {
      if(someData != null){
        this.loggedInUser.userID = someData.userID;
        this.loggedInUser.username = someData.username;
        this.loggedInUser._profileImageID = someData._profileImageID;
        this.loggedInUser.password = someData.password;
        this.loggedInUser.emailAddress = someData.emailAddress;
        this.loggedInUser.birthday = someData.birthday;
        this.loggedInUser._countryOfResidenceID = someData._countryOfResidenceID;
        this.loggedInUser.sessionID = someData.sessionID;
        this.loggedInUser.explorerBadgeProgress = someData.explorerBadgeProgress;
        this.loggedInUser.pioneerBadgeProgress = someData.pioneerBadgeProgress;
        this.loggedInUser.gamificationPoints = someData.gamificationPoints;
        this.loggedInUser.email_verified_at=someData.email_verified_at;
        
        this.loggedInUser.age = someData.age;
        this.loggedInUser.countryName = someData.countryName;
        this.loggedInUser.userImgSrc = someData.userImgSrc;
        this.loggedInUser.pwClear = someData.pwClear;

        console.log("Hehe, Daten geladen!");
        console.log(JSON.stringify(this.loggedInUser));

        this.currentBookmark._userID = this.loggedInUser.userID;
        this.newJourney = this.journeyService.newJourney(this.loggedInUser);
      } else {
        console.log("someData war null");
      }
    }).catch((r)=>{
      console.log("catch");
      console.log(r);
    });
  }

  loadJourneyCategories() {
    //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
    this.http.get(this.url+"/allJourneyCategories").subscribe((loadedData: JourneyCategories) => {
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

  loadCountries() {
    this.http.get(this.url+"/allCountries").subscribe((loadedData: Countries) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.countries = loadedData;

        console.log("Countries wurden überschrieben");

        //console.log(loadedData);

        console.log(this.countries);
      } else {

        console.log("null per http geladen");
      }
    });
  }


  loadCompanionships() {
    //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
    this.http.get(this.url+"/allCompanionships").subscribe((loadedData: Companionships) => {
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
    this.http.get(this.url+"/allTransports").subscribe((loadedData: Transports) => {
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
    this.http.get(this.url+"/allActivities").subscribe((loadedData: Activities) => {
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
    this.http.get(this.url+"/allSeasons").subscribe((loadedData: Seasons) => {
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

  async loadAllPlaces(){
    return await this.placeService.loadAllPlaces(this.url);
  }

  async loadCurrentJourneyByPlaceID(place: Place){
    this.currentJourney = await this.journeyService.loadJourneyByPlaceID(this.url,place);

    
    this.currentBookmark._journeyID = this.currentJourney.journeyID;

    if(this.loggedInUser.userID==this.currentJourney._userID){
      this.edit=true;
    }else{
      this.edit=false;
    }

    this.contentChanged = true;
  }

  async loadOneJourney(journeyID:number){
    
    let postData={

      "journeyID": journeyID
    }
    
    await this.http.post(this.url+"/oneJourney", postData).toPromise().then((loadedData: Journey) => {
      console.log(loadedData);
      this.currentJourney=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });

    this.currentBookmark._journeyID = this.currentJourney.journeyID;

    if(this.loggedInUser.userID==this.currentJourney._userID){
      this.edit=true;
    }else{
      this.edit=false;
    }
  
     this.contentChanged = true;
  
  }


  async loadOneUserJourney(journeyID:number){
    
    let postData={

      "journeyID": journeyID
    }
    
    await this.http.post(this.url+"/oneJourney", postData).toPromise().then((loadedData: Journey) => {
      console.log(loadedData);
      this.currentUserJourney=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });   
  
  }

  loadOnePlace(placeID:number){
    
    let postData={

      "placeID": placeID
    }

    this.http.post(this.url+"/onePlace", postData).subscribe((loadedData: Place) => {
      console.log(loadedData);
      this.currentPlace=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });


  }

  loadOneUserPlace(placeID:number){
    
    let postData={

      "placeID": placeID
    }

    this.http.post(this.url+"/onePlace", postData).subscribe((loadedData: Place) => {
      console.log(loadedData);
      this.currentUserPlace=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });

  }

  loadOnePost(postID:number){
    
    let postData={

      "postID": postID
    }

    this.http.post(this.url+"/onePost", postData).subscribe((loadedData: Post) => {
      console.log(loadedData);
      this.currentPost=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });

  }

  loadOneUserPost(postID:number){
    
    let postData={

      "postID": postID
    }

    this.http.post(this.url+"/onePost", postData).subscribe((loadedData: Post) => {
      console.log(loadedData);
      this.currentUserPost=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });

  }


   //HOMEPAGE:

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
    // http://flock-1427.students.fhstp.ac.at/backend/public/top100 liefert die Daten aus der DB 
    
    this.http.get(this.url+"/top100").toPromise().then( (loadedData: Journeys) => {
      if(loadedData!=null){
        console.log("Json file wurde geladen");
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


  //PROFILE

  loadUserJourneys(user:User){
  

    this.http.post(this.url+"/userJourneys", user).subscribe((loadedData: Journeys) => {
      console.log(loadedData);
      this.currentUserJourneys=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });

  }


  //Bookmarks

  async setBookmark(){
    if(this.userService.userLoggedIn(this.loggedInUser)){
      await this.bookmarkService.setBookmark(this.loggedInUser, this.currentBookmark, this.currentJourney, this.url);      
    } else {
      this.userService.wantsToLogin = true;
      console.log("DataService@setBookmark: User isn't logged in.");
    }
  }

  async unsetBookmark(){
    if(this.userService.userLoggedIn(this.loggedInUser)){
      await this.bookmarkService.unsetBookmark(this.loggedInUser, this.currentBookmark, this.currentJourney, this.url);
    } else {
      this.userService.wantsToLogin = true;
      console.log("DataService@unsetBookmark: User isn't logged in.");
    }
  }

  async loadBookmarkedPosts(){

    let loadWorked = await this.bookmarkService.loadBookmarkedPosts(this.currentJourneys, this.url, this.loggedInUser);

    //VIELLEICHT NOCH ÜBERPRÜFEN DURCH SESSION-KEY
    if(loadWorked == 0){
      this.loadTopPosts();
      this.presentGeneralToast("We couldn`t find any results for your entered search. Please try again!",5000);
    }else if(loadWorked == 2){
      this.presentGeneralToast("There was a problem with the connection to the database. Please try again later!",5000);
    }
  }


  //TOASTS

  async presentGeneralToast(msg: string, dur: number){
      const toast = await this.toastController.create({
        message: msg,
        duration: dur
      });
      toast.present();
  }
  
  async presentNotSavedToast() {
      this.presentGeneralToast('There was a problem with saving the content to database. Please try again!',8000);
  }
  
  async presentValidPlaceToast() {
      this.presentGeneralToast('The place you entered is not a valid place. Please enter a correct place and try again!',8000);
  }
  
  async presentMandatoryToast() {
      this.presentGeneralToast('You haven`t entered some mandatory fields. Please check if you filled all fields with a * and try again!',8000);
  }
  
  async presentDBErrorToast() {
      this.presentGeneralToast(this.errorMsg,8000);
  }
  
  
  async presentGamificationToast(msg: string, dur: number){
      const toast = await this.toastController.create({
        message: msg,
        duration: dur,
        cssClass:"gamificationToast"
      });
      toast.present();
  }


  

  //Outsourced to other services:

  updateJourneyWorks() {
    return this.journeyService.updateJourneyWorks;
  }

  updatePlaceWorks() {
    return this.placeService.updatePlaceWorks;
  }

  updatePostWorks() {
    return this.postService.updatePostWorks;
  }

  async autocompletePlaceName(){
    this.placeService.autocompletePlace(this.newPlace, this.url);
  }

  async validatePlaceName(){
    return this.placeService.validatePlace(this.newPlace, this.url);
  }

  loadJourneyWithChildren(newJourney: Journey, journeyID:number) {
    this.journeyService.loadJourneyWithChildren(newJourney, journeyID,this.url);
  }


  //Loading

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: null,
      duration: 20000,
      message: '<img src="/assets/images/loadingscreen.gif">',
      translucent: true,
    }); 

    return await this.loading.present();

  }

  async dismissLoading() {
    return await this.loading.dismiss();
  }



  //Search

  filterSearch(){
    if(this.loggedInUser.explorerBadgeProgress < 100 && this.showedExplorerFulltext==false){
      this.loggedInUser.explorerBadgeProgress+=34;
      this.clickedSearch = true; 
    }
    if(this.search.searchEntry == ''){
      this.loadTopPosts();
    } else {
      this.loadFilteredPosts();
    }

  }

  loadFilteredPosts(){
    this.http.post(this.url+"/filteredPosts",this.search).toPromise().then( (loadedData: Journeys) => {
      if(loadedData!=null){
        console.log("Json file wurde geladen");
        console.log(loadedData);
        this.currentJourneys=loadedData;

        console.log(this.currentJourneys);

      }else{
        this.currentJourneys.journeys=loadedData.journeys;
        this.presentGeneralToast("We couldn`t find any results for your entered search. Please try again!",5000);
        console.log("null per http geladen");
        }
    }, error => {
      console.log(error);
      console.info(error);
      this.errorMsg = error;
      this.presentGeneralToast("There was a problem with the connection to the database. Please try again later!",5000);
    }
    );
  }


}