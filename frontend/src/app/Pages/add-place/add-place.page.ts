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




@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {

  public placeValidated: boolean = false;
  public placeSuggestions: Place[] = null;

  // public isThumbnail: boolean[][];

  public delay = ms => new Promise(res => setTimeout(res, ms));

  constructor(private journeyService: NewJourneyService, private data: DataService, private navCtrl: NavController, private router: Router, private placeService: PlaceService, private postService: PostService, private alertController: AlertController,private changeRef: ChangeDetectorRef) {
    if(this.data.placeInserted){

    } else {
      this.data.newPlace = this.placeService.newPlace(this.data.newJourney);
    }

    console.log("Bool PlaceInserted:")
    console.log(this.data.placeInserted)

  
  }

  ngOnInit() {
  }

  // setThumbnail(image: Image, index: number, jndex: number){
  //   this.data.newPlace._thumbnailID = image.imageID;
  //   this.data.newPlace.thumbnailSrc = image.imgSrc;

  //   this.isThumbnail.forEach(thumbnails => {
  //     thumbnails.forEach(thumbnail => {
  //       thumbnail = false;
  //     });
  //   });

  //   this.isThumbnail[jndex][index] = true;
  // }

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
    if(this.placeValidated){
      await this.data.presentLoading();
      await this.placeService.savePlace(this.data.newPlace, this.data.url);
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
    if(this.placeValidated){
      await this.data.presentLoading();
      await this.placeService.savePlace(this.data.newPlace, this.data.url);
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

    if(this.placeValidated){

      await this.data.presentLoading();
      await this.placeService.savePlace(this.data.newPlace, this.data.url);
      await this.data.dismissLoading();

      if(this.data.newPlace.placeID != null){
        if(this.data.placeInserted){
          this.data.newJourney.places[this.data.placeInJourney] = this.data.newPlace;
          this.data.placeInJourney = null;
        } else {
          this.data.newJourney.places.push(this.data.newPlace);
        }
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


}
