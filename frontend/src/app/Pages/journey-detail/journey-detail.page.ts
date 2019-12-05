import { AfterViewInit,Component, ElementRef,OnInit,ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
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

  showPlace(placeID: number){

    this.data.loadOnePlace(placeID);
      
    //go To Journey Detail 
    this.router.navigateByUrl('/tabs/tab1/place-detail');
  
   }

   backToHomepage(){

    this.router.navigateByUrl('/tabs/tab1');
  
   }

}
