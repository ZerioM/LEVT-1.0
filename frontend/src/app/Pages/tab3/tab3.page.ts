import { Component, ViewChild, AfterContentInit, AfterViewInit, AfterContentChecked, OnInit, ElementRef, AfterViewChecked } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Place } from 'src/app/Interfaces/Place';
import { thresholdFreedmanDiaconis } from 'd3';
import { User } from 'src/app/Interfaces/User';
import { UserService } from 'src/app/services/user.service';

declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit, AfterViewChecked {

  @ViewChild('map',{read: false, static: false}) mapElement: ElementRef;
  map: any;
  public clicked: boolean = false;

  constructor(private data: DataService, private router: Router, private userService:UserService) {
    
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
          let marker = new google.maps.Marker({label: {color: "white", fontSize: "12px", fontWeight: "bold", text: place.placeName},position: placeLatLng, map: this.map, icon: {scaledSize: {width: 70, height: 63}, url: place.thumbnailSrc}});
          
          let infoWindow = new google.maps.InfoWindow({
            content: "Place: " + place.placeName + "\n" + "in: " + place.countryName + "\n" + "at lat: " + place.coordinateX + "/n" + "at long: " + place.coordinateY
          });
      
          google.maps.event.addListener(marker, 'mouseover', () => {
            console.log("mouse over: ");
            infoWindow.open(this.map, marker);
          });
          google.maps.event.addListener(marker, 'mousedown', () => {
            console.log("mouse down: ");
            infoWindow.open(this.map, marker);
          });
          google.maps.event.addListener(marker, 'dblclick', () => {
            this.routeToJourneyDetail(place);
          });

          
        } else {
          let marker = new google.maps.Marker({label: {color: "orange", fontSize: "10px", fontWeight: "bold", text: place.placeName},position: placeLatLng, map: this.map, icon: {scaledSize: {width: 70, height: 63}, url: "/assets/images/background_places.svg"}});
          
          let infoWindow = new google.maps.InfoWindow({
            content: "Place: " + place.placeName + "\n" + "in: " + place.countryName + "\n" + "at lat: " + place.coordinateX + "\n" + "at long: " + place.coordinateY
          });
      
          google.maps.event.addListener(marker, 'mouseover', () => {
            console.log("mouse over: ");
            infoWindow.open(this.map, marker);
          });
          google.maps.event.addListener(marker, 'mousedown', () => {
            console.log("mouse down: ");
            infoWindow.open(this.map, marker);
          });
          google.maps.event.addListener(marker, 'dblclick', () => {
            this.routeToJourneyDetail(place);
          });
        }
        
      }
    });
    
  }

  async routeToJourneyDetail(place: Place){
    await this.data.loadCurrentJourneyByPlaceID(place);
    this.router.navigateByUrl('/tabs/tab1/journey-detail');
  }

  async clickedMap(){
    this.data.clickedMap = true;
    if(this.data.loggedInUser.explorerBadgeProgress < 100 && this.data.showedExplorerMap==false){
      this.data.loggedInUser.explorerBadgeProgress += 33;
      this.data.showedExplorerMap=true; //Eventuell im Storage speichern
       //Update User
       if(this.userService.updateUser(this.data.loggedInUser,this.data.url)!=null){
        await this.userService.updateUser(this.data.loggedInUser,this.data.url);
        }
    }
  }

  closeExplorerToast(){
    this.data.showedExplorerMap = true;
  }


}
