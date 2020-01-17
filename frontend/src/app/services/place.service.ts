import { Injectable } from '@angular/core';
import { Place } from '../Interfaces/Place';
import { Places } from '../Interfaces/Places';
import { Journey } from '../Interfaces/Journey';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../Interfaces/User'; //new


@Injectable({
  providedIn: 'root'
})
export class PlaceService {


  public updatePlaceWorks: boolean = true;

  constructor(private http: HttpClient) { }

  newPlace(journey: Journey) {
    let newPlace: Place = { placeID: null,_journeyID:journey.journeyID,_thumbnailID: null,_countryID: null ,detail: "", coordinateX: null, coordinateY: null, posts: [], thumbnailSrc: "" ,placeName:"",countryName:""}

    return newPlace;
  }

  async loadAllPlaces(url: string) {
    let places: Places;
    await this.http.get(url+"/allPlaces").toPromise().then((loadedData: Places) => {
      console.log(loadedData);
      places = loadedData;
    }, error => {
      console.log(error);
    });

    return places;
  }

  async savePlace(place: Place, url: string, loggedInUser: User){
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};
    //Abfragen, ob placeID == null, dann newPlace aufrufen, sonst updatePlace aufrufen
    if(place.placeID == null){
      await this.http.post(url+"/newPlace", place, loginHeaders).toPromise().then((loadedData: Place) => {
        console.log(loadedData);
        console.log("New Place in DB inserted");
        this.updatePlaceWorks = true;
        place.placeID = loadedData.placeID;      
      }, error => {
        this.updatePlaceWorks = true;
        console.log(error);
      });
    } else {
      await this.http.post(url+"/updatePlace", place, loginHeaders).toPromise().then((loadedData: Place) => {
        console.log(loadedData);
        console.log("Place with ID: ");
        console.log(place.placeID);
        console.log(" in DB updated");
        this.updatePlaceWorks = true;

        place.placeID = loadedData.placeID;

      }, error => {
        this.updatePlaceWorks = false;
        console.log(error);
      });
    }

  }

  async autocompletePlace(place: Place, url: string){
    let suggestedPlaces: Place[];

    await this.http.post(url+"/autocompletePlace", place).toPromise().then((loadedData: Places) => {
      console.log("Getting Autocomplete Data...");
      console.log(loadedData);
      suggestedPlaces = loadedData.places;
    }, error => {
      console.log(error);
    });

    return suggestedPlaces;
  }

  async validatePlace(place: Place, url: string){
    await this.http.post(url+"/validatePlace", place).toPromise().then((loadedData: Place) => {
      console.log(loadedData);
      place._countryID = loadedData._countryID;
      place.countryName = loadedData.countryName;
      place.coordinateX = loadedData.coordinateX;
      place.coordinateY = loadedData.coordinateY;
      place.placeName = loadedData.placeName;      
    }, error => {
      console.log(error);
    });
    console.log("Koordinaten von Platz:");
    console.log(place.coordinateX);
    console.log(place.coordinateY);
    if(place.coordinateX != null || place.coordinateY != null){
      return true;
    }
    
    return false;
  }

  async deletePlace(place: Place, url: string, loggedInUser: User){
    let isDeleted = false;
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};

    await this.http.post(url+"/deletePlace", place, loginHeaders).toPromise().then((loadedData: boolean) => {
      console.log(loadedData);
      console.log("Place in DB deleted");
      isDeleted = loadedData;      
    }, error => {
        console.log(error);
    });


    return isDeleted;
  }

  
}
