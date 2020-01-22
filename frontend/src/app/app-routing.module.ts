import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'add-place', loadChildren: './Pages/add-place/add-place.module#AddPlacePageModule' },
  { path: 'add-post', loadChildren: './Pages/add-post/add-post.module#AddPostPageModule' },
  { path: 'journey-detail', loadChildren: './Pages/journey-detail/journey-detail.module#JourneyDetailPageModule' },
  { path: 'place-detail', loadChildren: './Pages/place-detail/place-detail.module#PlaceDetailPageModule' },
  { path: 'post-detail', loadChildren: './Pages/post-detail/post-detail.module#PostDetailPageModule' },
  { path: 'user-journey-detail', loadChildren: './Pages/user-journey-detail/user-journey-detail.module#UserJourneyDetailPageModule' },
  { path: 'user-place-detail', loadChildren: './Pages/user-place-detail/user-place-detail.module#UserPlaceDetailPageModule' },
  { path: 'user-post-detail', loadChildren: './Pages/user-post-detail/user-post-detail.module#UserPostDetailPageModule' },  { path: 'image', loadChildren: './Pages/image/image.module#ImagePageModule' },
  { path: 'settings', loadChildren: './Pages/settings/settings.module#SettingsPageModule' },
  { path: 'chat-page', loadChildren: './Pages/chat-page/chat-page.module#ChatPagePageModule' },
  { path: 'data-privacy-page', loadChildren: './Pages/data-privacy-page/data-privacy-page.module#DataPrivacyPagePageModule' },
  { path: 'terms-of-use-page', loadChildren: './Pages/terms-of-use-page/terms-of-use-page.module#TermsOfUsePagePageModule' },
  { path: 'user', loadChildren: './Pages/user/user.module#UserPageModule' },
  { path: 'edit-profile', loadChildren: './Pages/edit-profile/edit-profile.module#EditProfilePageModule' },

  


 
  



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
