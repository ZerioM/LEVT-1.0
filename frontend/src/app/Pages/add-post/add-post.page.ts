import { Component, OnInit, SecurityContext } from '@angular/core';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/app/services/post.service';
import { PlaceService } from 'src/app/services/place.service';

import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraSource } from '@capacitor/core';
import { NgIfContext } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Image } from 'src/app/Interfaces/Image';
import { ImageService } from 'src/app/services/image.service';

import * as Exif from 'exif-js';
import { UserService } from 'src/app/services/user.service';

const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  //Gamification
  public enteredPostDetail:boolean = false;

  respData: any;
  image: Image;
  imgArray: Image[];
  metaData: any;

  photo:SafeResourceUrl=null;
  photos:SafeResourceUrl[]=[];
  public cropPath:string;

  constructor(private domSanitizer: DomSanitizer, private journeyService: NewJourneyService, private imageService:ImageService, private data: DataService,private userService:UserService, private postService: PostService, private placeService: PlaceService, private navCtrl: NavController, private router: Router, private alertController:AlertController, private crop: Crop, private imagePicker: ImagePicker, private transfer: FileTransfer, public actionSheetController: ActionSheetController) {
    this.data.loadActivities();
    if(this.data.postInserted){

    } else {
      this.data.newPost = this.postService.newPost(this.data.newPlace);
    }
  }

  

  ngOnInit() {

  }

  async selectPhoto(){

    const webPath = await this.getPhoto(CameraSource.Prompt);
    
    
  

    this.data.presentLoading();
    await this.postService.savePost(this.data.newPost, this.data.url, this.data.loggedInUser);
    if(this.data.newPost.postID != null){
      this.image = await this.imageService.uploadImage(webPath, this.data.newPost, this.data.url, this.data.loggedInUser);
      if(this.image.imageID != null){
      this.data.newPost.images.push(this.image);
      } else {
      this.data.presentNotSavedToast();
      }
    } else {
      this.data.presentNotSavedToast();
    }
    this.data.dismissLoading();
    
    if(this.data.loggedInUser.pioneerBadgeProgress<75){

      this.data.loggedInUser.pioneerBadgeProgress=75;

       //Update User
       if(this.userService.updateUser(this.data.loggedInUser,this.data.url)!=null){
        await this.userService.updateUser(this.data.loggedInUser,this.data.url);
        }
    }

      this.data.presentGamificationToast("Added an Image! +20 Points!",3000);
      this.data.loggedInUser.gamificationPoints += 20;
       //Update User
       if(this.userService.updateUser(this.data.loggedInUser,this.data.url)!=null){
        await this.userService.updateUser(this.data.loggedInUser,this.data.url);
        }

    
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

  // cropImage(fileUrl) {
  //   this.crop.crop(fileUrl, { quality: 50 })
  //     .then(
  //       newPath => {
  //         this.cropPath=newPath;
  //       },
  //       error => {
  //         alert('Error cropping image' + error);
  //       }
  //     );
  // }

  
  

  private showImage(image: Image){

    this.data.newImage=image;
    this.router.navigateByUrl('/tabs/tab2/image');


  }

  private async deleteImage(image:Image,index:number){

    let isDeleted: boolean;

    this.data.presentLoading();
    isDeleted = await this.imageService.deleteImage(image, this.data.url, this.data.loggedInUser);
    this.data.dismissLoading();

    if(isDeleted){
      this.data.newPost.images.splice(index,1);
    } else {
      this.data.presentNotSavedToast();
    }
    
  }


  // cropUpload() {
  //   this.imagePicker.getPictures({ maximumImagesCount: 10, outputType: 0 }).then((results) => {
  //     for (let i = 0; i < results.length; i++) {
  //         Exif.getData(results[i], function() {
  //           this.metaData = Exif.getAllTags(this);
  //           console.log(this.metaData);
  //         });
  //         console.log('Image URI: ' + results[i]);
  //         this.crop.crop(results[i], { quality: 100, targetHeight: 700, targetWidth: 1000})
  //           .then(
  //             newImageString => {
  //               console.log('new image path is: ' + newImageString);
  //               this.fileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(newImageString);
  //               const fileTransfer: FileTransferObject = this.transfer.create();
  //               const uploadOpts: FileUploadOptions = {
  //                  fileKey: 'file',
  //                  fileName: newImageString.substr(newImageString.lastIndexOf('/') + 1)
  //               };
  
  //               this.image = this.imageService.uploadImage(newImageString, this.data.newPost, this.metaData);
  //             },
  //             error => console.error('Error cropping image', error)
  //           );
  //           this.imgArray.push(this.image);
  //     }
  //   }, (err) => { console.log(err); });
  //   console.log(this.imgArray);
  // }

  showNoImageWarning(){
    if(this.data.newPost.images != null){
      if (this.data.newPost.images.length == 0) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  goBackToPlace(){
    if(this.data.newPost._activityID == null && this.data.newPost.detail == "" && this.data.newPost.images.length==null){
      this.goBacktoAddPlaceWithoutSaving();
    }else{
    this.alert();}
  }

  goBacktoAddPlaceWithoutSaving(){
    this.data.newPost=this.postService.newPost(this.data.currentPlace);
    this.router.navigateByUrl('/tabs/tab2/add-place');
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Attention! Your Post isn´t saved yet!',
      message: '<strong>Would you like to save your created Post?</strong>',
      buttons: [
        {
          text: 'Continue without saving',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.goBacktoAddPlaceWithoutSaving();
          }
        }, {
          text: 'Save',
          handler: () => {
            console.log('Confirm Okay');
            this.savePost();
          }
        }
      ]
    });

    await alert.present();
  }

  async savePost(){
    console.log(this.data.newPost._activityID);

    if(this.data.newPost._activityID == null){

      this.data.presentMandatoryToast();
      return;

    }

    await this.data.presentLoading();

    await this.postService.savePost(this.data.newPost, this.data.url, this.data.loggedInUser);
    await this.data.dismissLoading();

    if(this.data.newPost.postID != null && this.data.updatePostWorks()){

      console.log("Post saved");
      if(this.data.postInserted){
        this.data.newPlace.posts[this.data.postInPlace] = this.data.newPost;
      } else {
        this.data.newPlace.posts.push(this.data.newPost);
      }
      this.data.newPost = this.postService.newPost(this.data.newPlace);
     // this.data.showPointsChallenge = true;
      this.router.navigateByUrl('/tabs/tab2/add-place');
    } else {
      //Toast ausgeben: Error
      this.data.presentNotSavedToast();
      console.log("Das Speichern hat nicht funktioniert.");
    }
    
  }  

//Gamification

focusOutPostDetail(){
  if(this.enteredPostDetail == false){
    this.data.presentGamificationToast("Added a post! +10 Points!",3000);
    this.data.loggedInUser.gamificationPoints += 10;
    this.enteredPostDetail = true;
  }
}

closePioneerStep3Toast(){


  this.data.showedPioneerStep3=true;
}

}
