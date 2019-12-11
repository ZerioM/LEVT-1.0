import { Component, OnInit } from '@angular/core';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/app/services/post.service';
import { PlaceService } from 'src/app/services/place.service';

import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { Capacitor, Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';
import { NgIfContext } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  fileUrl: SafeResourceUrl = null;
  respData: any;

  constructor(private domSanitizer: DomSanitizer, private journeyService: NewJourneyService, private data: DataService, private postService: PostService, private placeService: PlaceService, private navCtrl: NavController, private router: Router, private alertController:AlertController, private crop: Crop, private imagePicker: ImagePicker, private transfer: FileTransfer) {
    this.data.loadActivities();
    if(this.data.postInserted){

    } else {
      this.data.newPost = this.postService.newPost(this.data.newPlace);
    }
  }

  

  ngOnInit() {

  }

  cropUpload() {
    this.imagePicker.getPictures({ maximumImagesCount: 10, outputType: 0 }).then((results) => {
      for (let i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.crop.crop(results[i], { quality: 100, targetHeight: 700, targetWidth: 1000 })
            .then(
              newImage => {
                console.log('new image path is: ' + newImage);
                this.fileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(newImage);
                const fileTransfer: FileTransferObject = this.transfer.create();
                const uploadOpts: FileUploadOptions = {
                   fileKey: 'file',
                   fileName: newImage.substr(newImage.lastIndexOf('/') + 1)
                };
  
                
              },
              error => console.error('Error cropping image', error)
            );
      }
    }, (err) => { console.log(err); });
  }

  goBackToPlace(){
    this.alert();
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
    this.data.newPost = await this.postService.savePost(this.data.newPost);
    await this.data.dismissLoading();

    if(this.data.newPost.postID != null){
      console.log("Post saved");
      if(this.data.postInserted){
        this.data.newPlace.posts[this.data.postInPlace] = this.data.newPost;
      } else {
        this.data.newPlace.posts.push(this.data.newPost);
      }
      this.data.newPost = this.postService.newPost(this.data.newPlace);
      this.router.navigateByUrl('/tabs/tab2/add-place');
    } else {
      //Toast ausgeben: Error
      this.data.presentNotSavedToast();
      console.log("Das Speichern hat nicht funktioniert.");
    }
    
  }  

}
