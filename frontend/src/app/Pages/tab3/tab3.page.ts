import { Component, ViewChild, AfterContentInit, AfterViewInit, AfterContentChecked, OnInit, ElementRef, AfterViewChecked } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Place } from 'src/app/Interfaces/Place';

declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit, AfterViewChecked {

  @ViewChild('map',{read: false, static: false}) mapElement: ElementRef;
  map: any;

  constructor(private data: DataService, private router: Router) {
    
  }

  async ngAfterViewInit() {
    console.log("Ion View did load.");
    this.data.allPlaces = await this.data.loadAllPlaces();
    this.loadMap();
  }

  async ngAfterViewChecked() {
    if(this.data.contentChanged){
      console.log("View checked.");
      this.data.contentChanged = false;
      this.data.allPlaces = await this.data.loadAllPlaces();
      this.loadMap();
    }
    
  }

  async loadMap() {
    let centerlat = 47.612328;
    let centerlng = 13.2;
    let zoomlvl = 6;

    let latLng = new google.maps.LatLng(centerlat, centerlng);

    let mapOptions = {
      center: latLng,
      zoom: zoomlvl,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    if(this.mapElement != null){
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }

    this.data.allPlaces.places.forEach(place => {
      if(place.coordinateX != null && place.coordinateY != null){
        let placeLatLng = new google.maps.LatLng(place.coordinateX, place.coordinateY);
        if(place.thumbnailSrc != null && place.thumbnailSrc != ''){
          let marker = new google.maps.Marker({label: {color: "white", text: place.placeName},position: placeLatLng, map: this.map, icon: {scaledSize: {width: 50, height: 35}, url: place.thumbnailSrc}});
          
          let infoWindow = new google.maps.InfoWindow({
            content: "Place: " + place.placeName + "\n" + "in: " + place.countryName + "\n" + "at lat: " + place.coordinateX + "/n" + "at long: " + place.coordinateY
          });
      
          google.maps.event.addListener(marker, 'click', () => {
            this.routeToJourneyDetail(place);
          });
          google.maps.event.addListener(marker, 'mouseover', () => {
            console.log("mouse over: " + place.placeName);
            infoWindow.open(this.map, marker);
          });
          
        } else {
          let marker = new google.maps.Marker({label: {color: "white", text: place.placeName},position: placeLatLng, map: this.map});
          
          let infoWindow = new google.maps.InfoWindow({
            content: "Place: " + place.placeName + "\n" + "in: " + place.countryName + "\n" + "at lat: " + place.coordinateX + "\n" + "at long: " + place.coordinateY
          });
      
          google.maps.event.addListener(marker, 'click', () => {
            this.routeToJourneyDetail(place);
          });
          google.maps.event.addListener(marker, 'mouseover', () => {
            infoWindow.open(this.map, marker);
          });

        }
        
      }
    });
    
  }

  async routeToJourneyDetail(place: Place){
    await this.data.loadCurrentJourneyByPlaceID(place);
    this.router.navigateByUrl('/tabs/tab1/journey-detail');
  }


}
