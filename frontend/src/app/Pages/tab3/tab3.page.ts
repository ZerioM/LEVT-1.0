import { Component, ViewChild, AfterContentInit, AfterViewInit, AfterContentChecked, OnInit, ElementRef } from '@angular/core';

declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {

  @ViewChild('map',{read: false, static: false}) mapElement: ElementRef;
  map: any;

  constructor() {
    
  }

  ngAfterViewInit() {
    console.log("Ion View did load.");
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
    
  }


}
