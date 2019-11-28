import { Component, OnInit } from '@angular/core';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MapsAPILoader } from '@agm/core'; 
import { Place } from 'src/app/Interfaces/Place';
import { PlaceService } from 'src/app/services/place.service';
import { PostService } from 'src/app/services/post.service';
//import { google } from '@agm/core/services/google-maps-types';



@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {

  
  

  constructor(private journeyService: NewJourneyService, private data: DataService, private navCtrl: NavController, private router: Router, private placeService: PlaceService, private postService: PostService) {
    
    this.data.newPlace = this.placeService.newPlace(this.data.newJourney);
  
  }

  ngOnInit() {
  }

  
  async goToAddPost(){
    if(this.data.validatePlaceName()){
      this.data.newPlace = await this.placeService.savePlace(this.data.newPlace);
      if(this.data.newPlace.placeID != null){
        this.postService.newPost(this.data.newPlace);
        this.router.navigateByUrl('/tabs/tab2/add-post');
      } else {
        //Toast ausgeben: Das Speichern hat nicht funktioniert.
        console.log("Das Speichern hat nicht funktioniert.");
      }
      
    }
    
  }

  keyUpPlaceName(){
   this.data.autocompletePlaceName();
  }

  focusOutPlaceName(){
    if(this.data.validatePlaceName()){
      
    }
  }

  
  async savePlace(){
    //console.log("Place saved");
    if(this.data.validatePlaceName()){
      this.data.newPlace = await this.placeService.savePlace(this.data.newPlace);
      if(this.data.newPlace.placeID != null){
        this.data.newJourney.places.push(this.data.newPlace);
        this.router.navigateByUrl('/tabs/tab2');
      } else {
        //Toast ausgeben: Speichern hat nicht funktioniert
        console.log("Speichern hat nicht funktioniert.");
      }
      
    }
  }  


}
