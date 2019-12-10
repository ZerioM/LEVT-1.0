import { Component, OnInit } from '@angular/core';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/app/services/post.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {


  constructor(private journeyService: NewJourneyService, private data: DataService, private postService: PostService, private placeService: PlaceService, private navCtrl: NavController, private router: Router, private alertController:AlertController) {
    this.data.loadActivities();
    if(this.data.postInserted){

    } else {
      this.data.newPost = this.postService.newPost(this.data.newPlace);
    }
  }

  ngOnInit() {

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
