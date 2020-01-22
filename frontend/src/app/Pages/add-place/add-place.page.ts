import { Component, OnInit } from '@angular/core';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Place } from 'src/app/Interfaces/Place';
import { PlaceService } from 'src/app/services/place.service';
import { PostService } from 'src/app/services/post.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Post } from 'src/app/Interfaces/Post';
import { ChangeDetectorRef } from '@angular/core';
import { Image } from 'src/app/Interfaces/Image';

import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraSource } from '@capacitor/core';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';





@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {

  public placeValidated: boolean = false;
  public placeSuggestions: Place[] = null;
  public image: Image;

  //Gamification
  public enteredPlaceName:boolean = false;
  public enteredPlaceDetail:boolean = false;

  public delay = ms => new Promise(res => setTimeout(res, ms));

  constructor(private journeyService: NewJourneyService, private userService:UserService,private data: DataService, private imageService: ImageService, private navCtrl: NavController, private router: Router, private placeService: PlaceService, private postService: PostService, private alertController: AlertController,private changeRef: ChangeDetectorRef) {
    if(this.data.placeInserted){

    } else {
      this.data.newPlace = this.placeService.newPlace(this.data.newJourney);
    }

    console.log("Bool PlaceInserted:")
    console.log(this.data.placeInserted)

  
  }

  ngOnInit() {
  }

  async selectThumbnail(){

    const webPath = await this.getPhoto(CameraSource.Prompt);

    this.data.presentLoading();

    this.image = await this.imageService.uploadImage(webPath, null, this.data.url, this.data.loggedInUser);
    if(this.image.imageID != null){
      this.data.newPlace._thumbnailID = this.image.imageID;
      this.data.newPlace.thumbnailSrc = this.image.imgSrc;
    } else {
      this.data.presentNotSavedToast();
    }

    this.data.dismissLoading();
    
    

  }

  private async getPhoto(source: CameraSource) {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source,
      //height, width, allowEditing
    });

    return image.webPath;
    
  }

  private async deleteImage(image:Image){

    let isDeleted: boolean;

    this.data.presentLoading();
    isDeleted = await this.imageService.deleteImage(image, this.data.url, this.data.loggedInUser);
    this.data.dismissLoading();

    if(isDeleted){
      this.data.newPlace._thumbnailID = null;
      this.data.newPlace.thumbnailSrc = null;
    } else {
      this.data.presentNotSavedToast();
    }
    
  }

  private async deletePost(post: Post, index: number){
    let isDeleted: boolean;

    this.data.presentLoading();
    isDeleted = await this.postService.deletePost(post, this.data.url, this.data.loggedInUser);
    this.data.dismissLoading();

    if(isDeleted){
      this.data.newPlace.posts.splice(index,1);
    } else {
      this.data.presentNotSavedToast();
    }
  }

  goBackToJourney(){

    if(this.data.newPlace.placeName == "" && this.data.newPlace.detail == "" && this.data.newPlace.posts.length==null){
      this.goBacktoAddJourneyWithoutSaving();
    }else{
    this.alert();}
  }
  
  async goToAddNewPost(){

    if(this.data.newPlace.placeName == ""){

        this.data.presentMandatoryToast();
        return;

    }

    this.data.postInserted = false;
    if(this.placeValidated || this.data.newPlace.placeID != null){
      await this.data.presentLoading();
      await this.placeService.savePlace(this.data.newPlace, this.data.url, this.data.loggedInUser);
      await this.data.dismissLoading();
      if(this.data.newPlace.placeID != null && this.data.updatePlaceWorks()){
        this.postService.newPost(this.data.newPlace);
        this.router.navigateByUrl('/tabs/tab2/add-post');
      } else {
        //Toast ausgeben: Das Speichern hat nicht funktioniert.
        this.data.presentNotSavedToast();
        console.log("Das Speichern hat nicht funktioniert.");
      }
      
    } else {
      this.data.presentValidPlaceToast();
    }
    
  }

  async goToEditPost(po:Post,index:number){

    if(this.data.newPlace.placeName == ""){

      this.data.presentMandatoryToast();
      return;

    }

    this.data.postInserted = true;
    if(this.placeValidated || this.data.newPlace.placeID != null){
      await this.data.presentLoading();
      await this.placeService.savePlace(this.data.newPlace, this.data.url, this.data.loggedInUser);
      await this.data.dismissLoading();
      if(this.data.newPlace.placeID != null && this.data.updatePlaceWorks()){
        this.data.newPost = po;
        this.data.postInPlace = index;
        this.router.navigateByUrl('/tabs/tab2/add-post');
      } else {
        //Toast ausgeben: Das Speichern hat nicht funktioniert.
        this.data.presentNotSavedToast();
        console.log("Das Speichern hat nicht funktioniert.");
      }
      
    } else {
      this.data.presentValidPlaceToast();
    }

  }

  showNoPostWarning() {
    if(this.data.newPlace.posts != null){
      if (this.data.newPlace.posts.length == 0) {
        return true;
      } else {
        return false;
      }
    }
    
    return true;
  }

  async keyUpPlaceName(event: Event){
    console.log("Key Up");
   this.placeSuggestions = await this.placeService.autocompletePlace(this.data.newPlace, this.data.url);
   if(this.data.newPlace.placeName == null){
     this.placeSuggestions = null;
   }
  }

  setAutocompletion(placeName: string){
    this.data.newPlace.placeName = placeName;
  }

  async focusOutPlaceName(){
    await this.delay(1000);
    console.log("Waited 1s");
    this.placeSuggestions = null;
    this.data.newPlace.coordinateX = null;
    this.data.newPlace.coordinateY = null;
    this.placeValidated = false;
    if(await this.data.validatePlaceName()){
      this.placeValidated = true;
     if(this.data.newPlace.placeName.includes(',')){
        this.data.newPlace.placeName = this.data.newPlace.placeName.slice(0,this.data.newPlace.placeName.indexOf(','));
      }
    }

    
    console.log(this.placeValidated);
    //Gamification
    if(this.data.loggedInUser.pioneerBadgeProgress<50){

      this.data.loggedInUser.pioneerBadgeProgress=50;

       //Update User
       if(this.userService.updateUser(this.data.loggedInUser,this.data.url)!=null){
        await this.userService.updateUser(this.data.loggedInUser,this.data.url);
        }
    }

    if(this.enteredPlaceName == false){
      this.data.presentGamificationToast("Added a Place with a name! +10 Points!",3000);
      this.data.loggedInUser.gamificationPoints += 10;
      this.enteredPlaceName = true;

       //Update User
       if(this.userService.updateUser(this.data.loggedInUser,this.data.url)!=null){
        await this.userService.updateUser(this.data.loggedInUser,this.data.url);
        }
    }
  }

  async focusOutPlaceDetail(){
    if(this.enteredPlaceDetail == false){
      this.data.presentGamificationToast("Added more detail! +5 Points!",3000);
      this.data.loggedInUser.gamificationPoints += 5;
      this.enteredPlaceDetail = true;

       //Update User
       if(this.userService.updateUser(this.data.loggedInUser,this.data.url)!=null){
        await this.userService.updateUser(this.data.loggedInUser,this.data.url);
        }
    }
  }

  goBacktoAddJourneyWithoutSaving(){
    this.data.newPlace=this.placeService.newPlace(this.data.currentJourney);
    this.router.navigateByUrl('/tabs/tab2');
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Attention! Your Place isn´t saved yet!',
      message: '<strong>Would you like to save your created Place?</strong>',
      buttons: [
        {
          text: 'Continue without saving',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.goBacktoAddJourneyWithoutSaving();
          }
        }, {
          text: 'Save',
          handler: () => {
            console.log('Confirm Okay');
            this.savePlace();
          }
        }
      ]
    });

    await alert.present();
  }

  
  async savePlace(){

    if(this.data.newPlace.placeName == ""){

      this.data.presentMandatoryToast();
      return;

    } 

    if(this.placeValidated || this.data.newPlace.placeID != null){

      await this.data.presentLoading();
      await this.placeService.savePlace(this.data.newPlace, this.data.url, this.data.loggedInUser);
      await this.data.dismissLoading();

      if(this.data.newPlace.placeID != null){
        if(this.data.placeInserted){
          this.data.newJourney.places[this.data.placeInJourney] = this.data.newPlace;
          this.data.placeInJourney = null;
        } else {
          this.data.newJourney.places.push(this.data.newPlace);
        }
        this.data.contentChanged = true;
        this.data.newPlace = this.placeService.newPlace(this.data.newJourney);
        this.router.navigateByUrl('/tabs/tab2');
      } else {
        //Toast ausgeben: Speichern hat nicht funktioniert
        this.data.presentNotSavedToast();
        console.log("Speichern hat nicht funktioniert.");
      }
      
    } else {
      this.data.presentValidPlaceToast();
    }
  }  


  //Gamification

  closePioneerStep2Toast(){


    this.data.showedPioneerStep2=true;
  }

  closeChallengeToast(){
    this.data.showPointsChallenge = false;
  }


}
