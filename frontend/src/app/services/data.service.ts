import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from 'src/app/Interfaces/Image';
import { Journey } from 'src/app/Interfaces/Journey';
import { Journeys } from 'src/app/Interfaces/Journeys';
import { formatDate } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentJourney:Journey={journeyID:null,name:"",username:"",userImgSrc:"",bookmarks:null,arrivalDate:null,departureDate:null,places:[],thumbnailSrc:null}

  public currentJourneys:Journeys={journeys:[]}

  public arrivalDateString: string;
  public departureDateString: string;

  constructor(private http: HttpClient,@Inject(LOCALE_ID) private locale: string) { }

  loadJSON(){
    // /assets/journeys.json liefert die Testdaten - Funktioniert schon
    // http://levt.test/top100 soll die Daten aus der DB liefern - Funktioniert noch nicht
    this.http.get("/assets/journeys.json").subscribe( (loadedData: Journeys)=> {
      if(loadedData!=null){
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.currentJourneys=loadedData;

        this.currentJourneys.journeys.forEach(journey => {
          //Change Date format
           this.arrivalDateString = formatDate(journey.arrivalDate,'dd.MM.yyyy', this.locale);
           let arrivalDate = new Date(this.arrivalDateString);
           journey.arrivalDate = arrivalDate;

           this.departureDateString = formatDate(journey.departureDate,'dd.MM.yyyy',this.locale);
           let departureDate = new Date(this.departureDateString);
           journey.departureDate = departureDate;
        });

        console.log(this.currentJourneys);
      }else{

        console.log("null per http geladen");
      }
    });

  }
}
