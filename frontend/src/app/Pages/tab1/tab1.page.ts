import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

//@ViewChild (Content) content: Content;

/*function smoothScrollJS(elementIDtoScrollTo, timeInMilli){
  [document.documentElement,document.body].animate({
    scrollTop: document.getElementById(elementIDtoScrollTo).offset().top}, timeInMilli);
}*/



  constructor(private data: DataService, private navCtrl:NavController) {

    this.loadJSON();
  }


  loadJSON(){

    this.data.loadTestJSON();
  }

  smoothScrollJS(){
    let content = document.querySelector('ion-content');
    let timeInMilli = 500;
    console.log("Try to animate...");
    content.scrollToTop(timeInMilli);
  }

}
