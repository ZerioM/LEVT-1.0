import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private data: DataService, private navCtrl:NavController, private router: Router) {

    this.loadJSON();
   }

  ngOnInit() {
  }

   //Daten laden
   loadJSON(){

    this.data.loadTopPosts();
    

 }

}
