import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.page.html',
  styleUrls: ['./journey-detail.page.scss'],
})
export class JourneyDetailPage implements OnInit {

  constructor(private data: DataService, private navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }

}
