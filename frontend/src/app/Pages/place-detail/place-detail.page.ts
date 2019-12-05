import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(private data: DataService, private navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }

  async showPost(postID: number){

   await this.data.presentLoading();
   await this.data.loadOnePost(postID);
   await this.data.dismissLoading();
      
    //go To Journey Detail 
    this.router.navigateByUrl('/tabs/tab1/post-detail');
  
   }

   backToJourneyDetail(){
     this.router.navigateByUrl('/tabs/tab1/journey-detail');
   }

}
