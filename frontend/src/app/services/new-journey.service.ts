import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Journey } from '../Interfaces/Journey';
import { JourneyCategories } from '../Interfaces/JourneyCategories';
import { Companionships } from '../Interfaces/Companionships';
import { Transports } from '../Interfaces/Transports';
import { Activities } from '../Interfaces/Activities';
import { Seasons } from '../Interfaces/Seasons';
import { Place } from '../Interfaces/Place';
import { TouchSequence } from 'selenium-webdriver';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class NewJourneyService {


  postData: any;



  constructor(private http: HttpClient, private data:DataService) { }




  loadCurrentJourney() {
    //ladet das JSON File mit den Testdaten aus den assets
    this.http.get("/assets/placesTest.json").subscribe((loadedData: Journey) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.data.currentJourney = loadedData;

        console.log("currentJourney wurde überschrieben");

        // console.log(loadedData);

        console.log(this.data.currentJourney);
      } else {

        console.log("null per http geladen");
      }
    });



  }

  loadJourneyCategories() {
    //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
    this.http.get("http://levt.test/allJourneyCategories").subscribe((loadedData: JourneyCategories) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.data.journeyCategories = loadedData;

        console.log("journeyCategories wurden überschrieben");

        //console.log(loadedData);

        console.log(this.data.journeyCategories);
      } else {

        console.log("null per http geladen");
      }
    });



  }


  loadCompanionships() {
    //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
    this.http.get("http://levt.test/allCompanionships").subscribe((loadedData: Companionships) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.data.companionships = loadedData;

        console.log("Companionships wurden überschrieben");

        //console.log(loadedData);

        console.log(this.data.companionships);
      } else {

        console.log("null per http geladen");
      }
    });



  }

  loadTransports() {
    //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
    this.http.get("http://levt.test/allTransports").subscribe((loadedData: Transports) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.data.transports = loadedData;

        console.log("Transports wurden überschrieben");

        //console.log(loadedData);

        console.log(this.data.transports);
      } else {

        console.log("null per http geladen");
      }
    });


  }
  loadActivities() {
    this.http.get("http://levt.test/allActivities").subscribe((loadedData: Activities) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.data.activities = loadedData;

        console.log("Transports wurden überschrieben");

        //console.log(loadedData);

        console.log(this.data.activities);
      } else {

        console.log("null per http geladen");
      }
    });
  }


  loadSeasons() {
    this.http.get("http://levt.test/allSeasons").subscribe((loadedData: Seasons) => {
      if (loadedData != null) {
        console.log("Json file wurde geladen");
        //console.log(JSON.stringify(loadedData));
        this.data.seasons = loadedData;

        console.log("Transports wurden überschrieben");

        //console.log(loadedData);

        console.log(this.data.seasons);
      } else {

        console.log("null per http geladen");
      }
    });
  }



  sendPostRequest() {

    this.postData = this.data.currentJourney;
  

    this.http.post("http://levt.test/newJourney", this.data).subscribe((loadedData: any) => {
      console.log(loadedData);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });

  }
}

