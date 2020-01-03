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
import { ImageService } from './image.service';

import { Md5 } from 'ts-md5/dist/md5';
import { Validators } from '@angular/forms';
import { Search } from '../Interfaces/Search';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentPost: Post = {postID: null, _activityID:null, _placeID:null, detail: "", activityName:"", iconName:"" , placeName: null, _countryID: null, images:[]}

  public currentUserPost: Post = {postID: null, _activityID:null, _placeID:null, detail: "", activityName:"", iconName:"" , placeName:null, _countryID: null, images:[]}

  public currentPlace: Place = { placeID: null,_journeyID:null,_thumbnailID: null,_countryID:"",detail: "", coordinateX: null, coordinateY: null, posts: [], thumbnailSrc: "" ,placeName:"",countryName:""}

  public currentUserPlace: Place = { placeID: null,_journeyID:null,_thumbnailID: null,_countryID:"",detail: "", coordinateX: null, coordinateY: null, posts: [], thumbnailSrc: "" ,placeName:"",countryName:""}

  public newPlace: Place;

  public newPost: Post;

  public currentJourney:Journey={journeyID:null, _userID:null,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:null,duration:null,detail:"", totalCosts: null,accommodationCosts: null,leisureCosts: null,transportationCosts: null,mealsanddrinksCosts: null,otherCosts: null,plane:true, car:false, bus:false, train:false,ship:false,motorbike:false,campingtrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

  public currentUserJourney:Journey={journeyID:null, _userID:null,_thumbnailID:null,_seasonID:null,_journeyCategoryID:null,_companionshipID:null,journeyName:"",year:null,duration:null,detail:"", totalCosts: null,accommodationCosts: null,leisureCosts: null,transportationCosts: null,mealsanddrinksCosts: null,otherCosts: null,plane:true, car:false, bus:false, train:false,ship:false,motorbike:false,campingtrailer:false,hiking:false,bicycle:false,places:[],username:"",userImgSrc:"",bookmarks:null,seasonName:"",thumbnailSrc:"",journeyCategoryName:"",companionshipType:"",}

  public loggedInUser:User={userID:11, username:"Sallie Johns",_profileImageID:6, userImgSrc:"/assets/images/sarah3110.jpg",pwHash:"",emailAddress:"",birthday:null, _countryOfResidenceID:null,sessionID:null,explorerBadgeProgress:null,pioneerBadgeProgress:null,age:null,countryName:"",gamificationPoints:null, pwClear:null}

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

  public placeInserted:boolean =false;
  public postInserted:boolean = false;
  public loading;

  public errorMsg;

  //login
  public userLoggedIn=false;
  public wantsToRegister=false;
  public wantsToLogin = false;

  //register
  public secondPw: string;
  public passwordIsTheSame: boolean = true;
  public emailFormatIsCorrect: boolean = true;

  //search

  public search: Search = {searchEntry: ''};

  //edit
  public edit: boolean=false;
  public fromEditJourney:boolean=false;
  public fromNewJourney:boolean=true;
  
  private locale : string;

  public flock: string = "https://flock-1427.students.fhstp.ac.at/backend/public";
  public homestead: string = "http://levt.test";
  public url: string = this.homestead;

  constructor(private http: HttpClient, private journeyService: NewJourneyService, private placeService: PlaceService, private postService: PostService,private imageService:ImageService, public toastController: ToastController, public loadingController:LoadingController) { 

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

    if(this.currentJourney.detail==""){
      this.hasJourneyDetail=false;
    }else{
      this.hasJourneyDetail=true;
    }

    if(this.currentJourney.places.length==0){
      this.hasPlaces=false;
    }else{
      this.hasPlaces=true;
    }

    if(this.loggedInUser.userID==this.currentJourney._userID){
      this.edit=true;
    }else{
      this.edit=false;
    }
  
     
  
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


    if(this.currentUserJourney.detail==""){
      this.hasUserJourneyDetail=false;
    }else{
      this.hasUserJourneyDetail=true;
    }

    if(this.currentUserJourney.places.length==0){
      console.log("places sind null")
      this.hasUserPlaces=false;
    }else{
      this.hasUserPlaces=true;
    }
  
     
  
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

    if(this.currentPlace.detail==""){
      this.hasPlaceDetail=false;
    }else{
      this.hasPlaceDetail=true;
    }

    if(this.currentPlace.posts.length==null){
      this.hasPosts=false;
    }else{
      this.hasPosts=true;
    }

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

    if(this.currentUserPlace.detail==""){
      this.hasUserPlaceDetail=false;
    }else{
      this.hasUserPlaceDetail=true;
    }

    if(this.currentUserPlace.posts.length==null){
      this.hasUserPosts=false;
    }else{
      this.hasUserPosts=true;
    }

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
    
    if(this.currentPost.detail==""){
      this.hasPostDetail=false;
    }else{
      this.hasPostDetail=true;
    }

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
    
    if(this.currentPost.detail==""){
      this.hasUserPostDetail=false;
    }else{
      this.hasUserPostDetail=true;
    }

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

  async presentValidPlaceToast() {
    const toast = await this.toastController.create({
      message: 'The place you entered is not a valid place. Please enter a correct place and try again!',
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

  async presentGeneralToast(msg: string, dur: number){
    const toast = await this.toastController.create({
      message: msg,
      duration: dur
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

  loadFilteredPosts(){
    this.http.post(this.url+"/filteredPosts",this.search).toPromise().then( (loadedData: Journeys) => {
      if(loadedData!=null){
        console.log("Json file wurde geladen");
        console.log(loadedData);
        this.currentJourneys=loadedData;

        console.log(this.currentJourneys);

      }else{
        this.loadTopPosts();
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


  loadUserJourneys(loggedInUser:User){
  

    this.http.post(this.url+"/userJourneys", loggedInUser).subscribe((loadedData: Journeys) => {
      console.log(loadedData);
      this.currentUserJourneys=loadedData;
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });

  }

  async setBookmark(){
    this.currentBookmark._userID=this.loggedInUser.userID;
    this.currentBookmark._journeyID=this.currentJourney.journeyID;
    let postData = this.currentBookmark;

    //let bookmarked: boolean = false;

    await this.http.post(this.url+"/newBookmark", postData).toPromise().then((loadedData: Bookmark) => {
      this.currentBookmark = loadedData;
      console.log(this.currentBookmark);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
      
    });
  }

  async unsetBookmark(){
    this.currentBookmark._userID=this.loggedInUser.userID;
    this.currentBookmark._journeyID=this.currentJourney.journeyID;
    let postData = this.currentBookmark;
    
   // let bookmarked: boolean = true;

    await this.http.post(this.url+"/deleteBookmark", postData).toPromise().then((loadedData: Bookmark) => {
      this.currentBookmark = loadedData;
      console.log(this.currentBookmark);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });
  }

  async bookmarkExists(){
    this.currentBookmark._userID=this.loggedInUser.userID;
    this.currentBookmark._journeyID=this.currentJourney.journeyID;
    let postData = this.currentBookmark;

    console.log(this.loggedInUser.userID);
    console.log(this.currentJourney.journeyID);

    let bookmarked: boolean = false;

    await this.http.post(this.url+"/proveBookmarkExists", postData).toPromise().then((loadedData: Bookmark) => {
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

  updatePostWorks() {
    return this.postService.updatePostWorks;
  }

  async autocompletePlaceName(){
    this.placeService.autocompletePlace(this.newPlace, this.url);
  }

  async validatePlaceName(){
    return this.placeService.validatePlace(this.newPlace, this.url);
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

  //Registrierung und Login

  async login(){

    this.loggedInUser.pwHash = Md5.hashStr(this.loggedInUser.pwClear).toString();  

    this.loggedInUser.pwClear = "";
    
    await this.http.post(this.url+"/login", this.loggedInUser).toPromise().then((loadedData: User) => {
      if(loadedData.userID != null){
        this.loggedInUser.userID = loadedData.userID;
        console.log("Login hat funktioniert.");
        this.userLoggedIn = true;
      } else {
        console.log("Login hat nicht funktioniert.");
      }
    }, error => {
      console.log(error);
      
    });
    
  }

  async register(){
    if(this.passwordIsTheSame){

    } else {
      this.presentGeneralToast("The two password phrases aren't identical. Please check and try again!",5000);
    }

    this.wantsToRegister = false;
  }

  checkPassword(){
    if(this.secondPw == this.loggedInUser.pwClear){
      this.passwordIsTheSame = true;
    } else {
      this.passwordIsTheSame = false;
    }
  }

  checkEmail(){
    if(this.loggedInUser.emailAddress == ''){
      this.emailFormatIsCorrect = true;
      return;
    }
    let regex = /^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regex.test(this.loggedInUser.emailAddress)){
      this.emailFormatIsCorrect = true;
      console.log("Email is in correct format");
    } else {
      this.emailFormatIsCorrect = false;
      console.log("Email is not in correct format");
    }
    
  }

  goToRegistration(){
    this.wantsToRegister = true;
  }

  //Search

  filterSearch(){
    if(this.search.searchEntry == ''){
      this.loadTopPosts();
    } else {
      this.loadFilteredPosts();
    }

  }

  loadJourneyWithChildren(newJourney: Journey, journeyID:number) {
    this.journeyService.loadJourneyWithChildren(newJourney, journeyID,this.url);

    this.writeCostsAndTransports();

  }

  readCostsAndTransports() {
    this.newJourney.leisureCosts = this.costs[0];
    this.newJourney.accommodationCosts = this.costs[1];
    this.newJourney.mealsanddrinksCosts = this.costs[2];
    this.newJourney.transportationCosts = this.costs[3];
    this.newJourney.otherCosts = this.costs[4];

    this.newJourney.plane = this.transportsCheckbox[0];
    this.newJourney.car = this.transportsCheckbox[1];
    this.newJourney.bus = this.transportsCheckbox[2];
    this.newJourney.train = this.transportsCheckbox[3];
    this.newJourney.ship = this.transportsCheckbox[4];
    this.newJourney.motorbike = this.transportsCheckbox[5];
    this.newJourney.campingtrailer = this.transportsCheckbox[6];
    this.newJourney.hiking = this.transportsCheckbox[7];
    this.newJourney.bicycle = this.transportsCheckbox[8];
  }

  writeCostsAndTransports(){
    this.costs[0] = this.newJourney.leisureCosts;
    this.costs[1]=this.newJourney.accommodationCosts;
    this.costs[2]=this.newJourney.mealsanddrinksCosts;
    this.costs[3]=this.newJourney.transportationCosts;
    this.costs[4]=this.newJourney.otherCosts;

    this.transportsCheckbox[0]=this.newJourney.plane;
    this.transportsCheckbox[1]=this.newJourney.car;
    this.transportsCheckbox[2]=this.newJourney.bus;
    this.transportsCheckbox[3]=this.newJourney.train;
    this.transportsCheckbox[4]=this.newJourney.ship;
    this.transportsCheckbox[5]=this.newJourney.motorbike;
    this.transportsCheckbox[6]=this.newJourney.campingtrailer;
    this.transportsCheckbox[7]=this.newJourney.hiking;
    this.transportsCheckbox[8]=this.newJourney.bicycle;
  }
}
