import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserPlaceDetailPage } from './user-place-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UserPlaceDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserPlaceDetailPage]
})
export class UserPlaceDetailPageModule {}
