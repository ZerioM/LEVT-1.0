import { Component, ViewChild, AfterContentInit, AfterViewInit, AfterContentChecked, OnInit, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {

  @ViewChild('map',{read: false, static: false}) mapElement: ElementRef;
  map: any;

  constructor(private data: DataService) {
    
  }

  async ngAfterViewInit() {
    console.log("Ion View did load.");
    this.data.allPlaces = await this.data.loadAllPlaces();
    this.loadMap();
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
          let marker = new google.maps.Marker({label: {color: "white", text: place.placeName},position: placeLatLng, map: this.map, icon: {scaledSize: {width: 100, height: 70}, url: place.thumbnailSrc}});
        } else {
          let marker = new google.maps.Marker({label: {color: "white", text: place.placeName},position: placeLatLng, map: this.map});
        }
      }
    });
    
  }


}
