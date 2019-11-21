import { AfterViewInit,Component, ElementRef,OnInit,ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
//import {Geolocation}from '@ionic-native/geolocation/ngx';

declare var google: { maps: { Map: new (arg0: any, arg1: { center: { lat: number; lng: number; }; zoom: number; }) => void; }; };


@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.page.html',
  styleUrls: ['./journey-detail.page.scss'],
})
export class JourneyDetailPage implements OnInit, AfterViewInit {
  map;
  @ViewChild('mapElement', {static:false}) mapElement:ElementRef;
  
 

  public bookmarkUnsaved:string="assets/icon/bookmark_unsaved_icon.svg";
  public bookmarkSaved:string="assets/icon/bookmark_saved_icon.svg";

  public bookmarkIcon:string="assets/icon/bookmark_unsaved_icon.svg"

  constructor(private data: DataService, private navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log("Map geladen");
    //throw new Error("Method not implemented.");
    this.map=new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center:{lat:-34.397, lng:150.644},
        zoom:8
      });
      
  }

  bookmarken(){

    if(this.bookmarkIcon==this.bookmarkUnsaved){
      this.bookmarkIcon=this.bookmarkSaved;
    }else{
      this.bookmarkIcon=this.bookmarkUnsaved;
    }


  }

}
