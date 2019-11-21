import { Component, OnInit } from '@angular/core';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  constructor(private journeyService: NewJourneyService, private data: DataService, private navCtrl: NavController, private router: Router) {
  }

  ngOnInit() {
  }

  savePost(){
    console.log("Post saved");
    this.router.navigateByUrl('/tabs/tab2/add-place');
  }  

}
