import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {

  constructor(private data: DataService,private router: Router) { }

  ngOnInit() {
  }


goBackToAddPost(){

  this.router.navigateByUrl('/tabs/tab2/add-post');

}
}
