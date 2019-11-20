import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

//@ViewChild (Content) content: Content;

  constructor(private data: DataService, private navCtrl:NavController, private router: Router) {

    this.loadJSON();
  }

    //Daten laden
    loadJSON(){

      this.data.loadTopPosts();
      
  
   }

   showJourney(journeyID: number){

    this.data.loadOneJourney(journeyID);
      
    //go To Journey Detail 
    this.router.navigateByUrl('/tabs/tab1/journey-detail');
  
   }

  smoothScrollJS(){
    let content = document.querySelector('ion-content');
    let timeInMilli = 500;
    console.log("Try to animate...");
    content.scrollToTop(timeInMilli);
  }
}
