import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private data: DataService, private navCtrl:NavController,  private router: Router) {
    this.loadJSON();
  }

  goToAddPlace(){
    this.router.navigateByUrl('/tabs/tab2/add-place');
  }


  loadJSON(){

    this.data.loadTestJSON();
  }
}

