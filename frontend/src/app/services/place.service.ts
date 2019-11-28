import { Injectable } from '@angular/core';
import { Place } from '../Interfaces/Place';
import { Journey } from '../Interfaces/Journey';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {


  constructor(private http: HttpClient) { }

  newPlace(journey: Journey) {
    let newPlace: Place = { placeID: null,_journeyID:journey.journeyID,_thumbnailID: null,_countryID:"AT",detail: "", coordinateX: 48.208767, coordinateY: 16.372526, posts: [], thumbnailSrc: "" ,placeName:"",countryName:""}

    return newPlace;
  }

  async savePlace(place: Place){
    //Abfragen, ob placeID == null, dann newPlace aufrufen, sonst updatePlace aufrufen
    if(place.placeID == null){
      await this.http.post("http://levt.test/newPlace", place).toPromise().then((loadedData: Place) => {
        console.log(loadedData);
        console.log("New Place in DB inserted");
        place = loadedData;      
      }, error => {
        console.log(error);
      });
    } else {
      await this.http.post("http://levt.test/updatePlace", place).toPromise().then((loadedData: Place) => {
        console.log(loadedData);
        console.log("Place with ID: ");
        console.log(place.placeID);
        console.log(" in DB updated");
        place = loadedData;
      }, error => {
        console.log(error);
      });
    }
    
    return place;
  }
}
