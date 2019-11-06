import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

//@ViewChild (Content) content: Content;

  constructor(private data: DataService, private navCtrl:NavController) {

    this.loadJSON();
  }


  loadJSON(){

    this.data.loadTestJSON();
  }
}
