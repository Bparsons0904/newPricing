import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompareComponent } from './components/compare/compare.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compare', component: CompareComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: []
})
export class AppRoutingModule { }
