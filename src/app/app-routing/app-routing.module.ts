import { AuthGuardService } from './../user/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LoginComponent } from '../user/login/login.component';
import { HomescreenComponent } from '../homescreen/homescreen.component'
// import { RecipeListComponent } from './../recipe-list/recipe-list.component';
// import { AddRecipeComponent } from './../add-recipe/add-recipe.component';

const appRoutes: Routes = [
  {
    path: 'reservation',
    canActivate: [AuthGuardService],
    loadChildren: '../reservation/reservation.module#ReservationModule'
  },
  {
    path: 'review',
    canActivate: [AuthGuardService],
    loadChildren: '../review/review.module#ReviewModule'
  },
  {path: 'home', component: HomescreenComponent},
  {path: '', component: LoginComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {preloadingStrategy: PreloadAllModules})
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
