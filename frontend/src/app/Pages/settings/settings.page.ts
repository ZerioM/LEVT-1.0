import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private data: DataService, private navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }

  backToProfileOrHomepage(){


    this.data.resetTab=true;

  

    this.router.navigateByUrl('/tabs/tab1');
  


   }

}
