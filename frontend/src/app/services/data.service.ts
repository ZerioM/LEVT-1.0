import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from 'src/app/Interfaces/Image';
import { Journey } from 'src/app/Interfaces/Journey';
import { Journeys } from 'src/app/Interfaces/Journeys';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentJourney:Journey={journeyID:null,name:"",username:"",userImgSrc:"",bookmarks:null,arrivalDate:null,departureDate:null,places:[],thumbnailSrc:null}

  public currentJourneys:Journeys={journeys:[]}

  constructor(private http: HttpClient) { }

  loadJSON(){
    // /assets/journeys.json liefert die Testdaten - Funktioniert schon
    // levt.test/top100 soll die Daten aus der DB liefern - Funktioniert noch nicht
    this.http.get("/assets/journeys.json").subscribe( (loadedData: Journeys)=> {
      if(loadedData!=null){
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.currentJourneys=loadedData;
        console.log(this.currentJourneys);
      }else{

        console.log("null per http geladen");
      }
    });

  }
}
