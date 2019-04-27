import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'fb-login', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'fb-login', loadChildren: './fb-login/fb-login.module#FbLoginPageModule' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'map-directions', loadChildren: './map-directions/map-directions.module#MapDirectionsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
