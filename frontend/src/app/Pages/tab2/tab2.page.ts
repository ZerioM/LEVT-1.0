import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private data: DataService, private navCtrl:NavController) {}

  goToAddCountries(){
    this.navCtrl.navigateForward("");
  }
}

