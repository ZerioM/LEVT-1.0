import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Pages/tab1/tab1.module').then(m => m.Tab1PageModule)
          },{
            path: 'journey-detail',
            children:[
              {
                path:'',
                loadChildren:()=>
                import('../Pages/journey-detail/journey-detail.module').then (m => m.JourneyDetailPageModule)}
            ]
          },
          {
            path: 'place-detail',
            children:[
              {
                path:'',
                loadChildren:()=>
                import('../Pages/place-detail/place-detail.module').then (m => m.PlaceDetailPageModule)}
            ]
          }
        ]
      },
      
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Pages/tab2/tab2.module').then(m => m.Tab2PageModule)
          },
          {
            path: 'add-place',
            children:[
              {
                path:'',
                loadChildren:()=>
                import('../Pages/add-place/add-place.module').then (m => m.AddPlacePageModule)}
            ]
          },
          {
            path: 'add-post',
            children:[
              {
                path:'',
                loadChildren:()=>
                import('../Pages/add-post/add-post.module').then (m => m.AddPostPageModule)}
            ]
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Pages/tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },

      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Pages/tab4/tab4.module').then(m => m.Tab4PageModule)
          }
        ]
      },


      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Pages/tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
