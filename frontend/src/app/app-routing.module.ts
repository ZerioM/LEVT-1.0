import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'add-place', loadChildren: './Pages/add-place/add-place.module#AddPlacePageModule' },  { path: 'add-post', loadChildren: './Pages/add-post/add-post.module#AddPostPageModule' },
  { path: 'journey-detail', loadChildren: './Pages/journey-detail/journey-detail.module#JourneyDetailPageModule' },
  { path: 'place-detail', loadChildren: './Pages/place-detail/place-detail.module#PlaceDetailPageModule' },
  { path: 'post-detail', loadChildren: './Pages/post-detail/post-detail.module#PostDetailPageModule' },


 
  



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
