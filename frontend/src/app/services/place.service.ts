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

  savePlace(place: Place){
    //Abfragen, ob placeID == null, dann newJourney aufrufen, sonst updateJourney aufrufen

    this.http.post("http://levt.test/newPlace", place).subscribe((loadedData: Place) => {
      console.log(loadedData);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });
  }
}
