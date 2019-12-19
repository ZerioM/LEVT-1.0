import { AfterViewInit,Component, ElementRef,OnInit,ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Journey } from 'src/app/Interfaces/Journey';
//import {Geolocation}from '@ionic-native/geolocation/ngx';

//declare var google: { maps: { Map: new (arg0: any, arg1: { center: { lat: number; lng: number; }; zoom: number; }) => void; }; };


@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.page.html',
  styleUrls: ['./journey-detail.page.scss'],
})
export class JourneyDetailPage implements OnInit {
  map;
  @ViewChild('mapElement', {static:false}) mapElement:ElementRef;



  constructor(private data: DataService, private navCtrl:NavController, private router: Router) {
    //Bookmarked checken und Symbol richtig setzen
    
   }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
  }
 /* ngAfterViewInit(): void {
    console.log("Map geladen");
    //throw new Error("Method not implemented.");
    this.map=new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center:{lat:-34.397, lng:150.644},
        zoom:8
      });
      
  }*/

  async bookmarken(){
    console.log("Auf Bookmark geklickt.");
    
    
    if(this.data.currentBookmark.bookmarkID == null){

      console.log("Bookmark ist false.");
      this.data.bookmarkIcon = this.data.bookmarkSaved;

      await this.data.setBookmark()
      if(this.data.currentBookmark.bookmarkID != null){
        console.log("Bookmark gesetzt.");
        
      } else {
        console.log("Bookmark setzen hat nicht funktioniert.");
        this.data.bookmarkIcon = this.data.bookmarkUnsaved;
        this.data.presentNotSavedToast();
      }

    } else {

      console.log("Bookmark ist true");
      this.data.bookmarkIcon = this.data.bookmarkUnsaved;

      await this.data.unsetBookmark()
      if(this.data.currentBookmark.bookmarkID == null){
        console.log("Bookmark entfernt.");
        
      } else {
        console.log("Bookmark entfernen hat nicht funktioniert.");
        this.data.bookmarkIcon = this.data.bookmarkSaved;
        this.data.presentNotSavedToast();
      }
      
    }


  }

 async showPlace(placeID: number){

  await this.data.presentLoading();
  await this.data.loadOnePlace(placeID);
  await this.data.dismissLoading();
      
    //go To Journey Detail 
    this.router.navigateByUrl('/tabs/tab1/place-detail');
  
   }

   backToHomepage(){

    this.router.navigateByUrl('/tabs/tab1');
  
   }

  async editJourney(){

    this.data.fromEditJourney=true;
    this.data.fromNewJourney=false;

    this.data.newJourney = this.data.currentJourney;

    // this.data.newJourney.journeyID = this.data.currentJourney.journeyID;
    // this.data.newJourney._userID = this.data.currentJourney._userID;
    // this.data.newJourney._thumbnailID = this.data.currentJourney._thumbnailID;
    // this.data.newJourney._seasonID = this.data.currentJourney._seasonID;
    // this.data.newJourney._journeyCategoryID = this.data.currentJourney._journeyCategoryID;
    // this.data.newJourney._companionshipID = this.data.currentJourney._companionshipID;
    // this.data.newJourney.journeyName = this.data.currentJourney.journeyName;
    // this.data.newJourney.year = this.data.currentJourney.year;
    // this.data.newJourney.duration = this.data.currentJourney.duration;

    this.router.navigateByUrl('tabs/tab2');


   }

}
