import { Component, OnInit } from '@angular/core';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { NavController } from '@ionic/angular';
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

  private inserted: boolean = false;;

  constructor(private journeyService: NewJourneyService, private data: DataService, private postService: PostService, private placeService: PlaceService, private navCtrl: NavController, private router: Router) {
    this.data.loadActivities();
    if(this.data.newPost == null){
      this.data.newPost = this.postService.newPost(this.data.newPlace);
      this.inserted = false;
    } else {
      this.inserted = true;
    }
  }

  ngOnInit() {

  }

  goBackToPlace(){
    this.savePost();
  }

  async savePost(){
    console.log(this.data.newPost._activityID);
    this.data.newPost = await this.postService.savePost(this.data.newPost);
    
    if(this.data.newPost.postID != null){
      console.log("Post saved");
      if(this.inserted){
        this.data.newPlace.posts[this.data.postInPlace] = this.data.newPost;
      } else {
        this.data.newPlace.posts.push(this.data.newPost);
      }
      this.data.newPost = this.postService.newPost(this.data.newPlace);
      this.router.navigateByUrl('/tabs/tab2/add-place');
    } else {
      //Toast ausgeben: Error
      console.log("Das Speichern hat nicht funktioniert.");
    }
    
  }  

}
