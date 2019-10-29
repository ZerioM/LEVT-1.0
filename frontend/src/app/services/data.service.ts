import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from 'src/assets/Interfaces/Image';
import { Journey } from 'src/assets/Interfaces/Journey';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentJourney:Journey={journeyID:null,name:"",username:"",userImageScrc:"",likes:null,disklikes:null,places:[],thumbnail:null}

  constructor(private http: HttpClient) { }

  loadJSON(){
    this.http.get("assets/journeys.json").subscribe( (loadedData: Journey)=> {
      if(loadedData!=null){
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.currentJourney=loadedData;
        console.log(this.currentJourney);
      }else{

        console.log("null per http geladen");
      }
    });

  }
}
