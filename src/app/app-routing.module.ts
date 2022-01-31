import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './app-login/app-login.component';

const routes: Routes = [
  {
    path : "", redirectTo: "login", pathMatch: "prefix"
  },
  {
    path: "login",
    component: AppLoginComponent
  },
  {
    path: "canvas",
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
