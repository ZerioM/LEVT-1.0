import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewJourneyService } from 'src/app/services/new-journey.service';

declare var google;

@Component({
  selector: 'app-user-journey-detail',
  templateUrl: './user-journey-detail.page.html',
  styleUrls: ['./user-journey-detail.page.scss'],
})
export class UserJourneyDetailPage implements AfterViewInit, AfterViewChecked {
  [x: string]: any;

  @ViewChild('map',{read: false, static: false}) mapElement: ElementRef;
  map: any;
  marker: any;
  icon: any;

  constructor(private data: DataService, private navCtrl:NavController, private router: Router, private journeyService:NewJourneyService) { }

  ngAfterViewInit() {
  this.loadMap();
    console.log("After view has loaded.");
  }

  ngAfterViewChecked() {

    if(this.data.contentChanged) {
      console.log("After view checked.");
      console.log(this.data.currentJourney);
     this.loadMap();
      this.data.contentChanged = false;
    }
  }

  async showPlace(placeID: number){

    await this.data.presentLoading();
    await this.data.loadOneUserPlace(placeID);
    await this.data.dismissLoading();
        
      //go To Place Detail 
      this.router.navigateByUrl('/tabs/tab5/user-place-detail');
    
  }
  
  backToProfile(){
  
    this.router.navigateByUrl('/tabs/tab5');
    
  }


  async editJourney(){
    this.data.fromEditJourney=true;
    this.data.fromNewJourney=false;
  
    await this.journeyService.loadJourneyWithChildren(this.data.newJourney,this.data.currentJourney.journeyID,this.data.url);

    console.log("New Journey bei Edit");
    console.log(this.data.newJourney);

    this.router.navigateByUrl('tabs/tab2');
  
  }

  loadMap() {
      
    let centerlat: number = 47.612328;
    let centerlng: number = 13.2;
    let zoomlvl = 6;
  
    let bounds = new google.maps.LatLngBounds();
  
    if(this.data.currentJourney.places != null){
      if(this.data.currentJourney.places.length != 0){
        let place1 = this.data.currentJourney.places[0];
        if(place1 != null && place1.coordinateX != null && place1.coordinateY != null){
          centerlat = place1.coordinateX;
          centerlng = place1.coordinateY;
          zoomlvl = 12;
        }
      }
  
        /* TO DO: WARUM Macht das nichts?!
        this.data.currentJourney.places.forEach(place => {
          if(place.coordinateX != null && place.coordinateY != null){
            let placeLatLng = new google.maps.LatLng(place.coordinateX,place.coordinateY);
            bounds.extend(placeLatLng);
          }
        });*/
        
  
      if(this.data.currentJourney.places.length > 1){
  
        let placesLATArray: number[] = new Array();
        let placesLNGArray: number[] = new Array();
  
        this.data.currentJourney.places.forEach(place => {
          placesLATArray.push(place.coordinateX);
          placesLNGArray.push(place.coordinateY);
        });
  
        let minLAT = Math.min.apply(null,placesLATArray);
        let maxLAT = Math.max.apply(null,placesLATArray);
        let minLNG = Math.max.apply(null,placesLNGArray);
        let maxLNG = Math.max.apply(null,placesLNGArray);
  
        let placesLATDiff = maxLAT - minLAT;
        let placesLNGDiff = maxLNG - minLNG;
  
        console.log("Places LAT Diff:");
        console.log(placesLATDiff);
        console.log("Places LNG Diff:");
        console.log(placesLNGDiff);
  
        let generalDiff = (placesLATDiff + placesLNGDiff)/2;
  
        zoomlvl = 12;
  
        let zoomlvlChangeRate = 1 - (35 * generalDiff);
  
        console.log("zoom lvl change rate:")
        console.log(zoomlvlChangeRate);
  
        zoomlvl = zoomlvl * zoomlvlChangeRate;
  
        console.log("Zoom lvl");
        console.log(zoomlvl);
      }
    }
  
      
  
    let latLng = new google.maps.LatLng(centerlat, centerlng);
  
    let mapOptions = {
      center: latLng,
      zoom: zoomlvl,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
    if(this.data.currentJourney.places != null){
      this.data.currentJourney.places.forEach(place => {
        if(place.coordinateX != null && place.coordinateY != null){
          let placeLatLng = new google.maps.LatLng(place.coordinateX, place.coordinateY);
          if(place.thumbnailSrc != null && place.thumbnailSrc != ''){
            let marker = new google.maps.Marker({label: {color: "white", fontSize: "12px", fontWeight: "bold", text: place.placeName},position: placeLatLng, map: this.map, icon: {scaledSize: {width: 70, height: 63}, url: place.thumbnailSrc}});
          } else {
            let marker = new google.maps.Marker({label: {color: "white", fontSize: "10px", fontWeight: "bold", text: place.placeName},position: placeLatLng, map: this.map});
          }
            
        }
      });
    }
       
       
      
  }

}
